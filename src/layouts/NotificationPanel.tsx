import { useEffect, useState, useRef } from 'react'
import { Bell, CheckCircle2, Star, MoreVertical, Trash2 } from 'lucide-react'
import { supabase } from '../lib/supabaseClient'
import DeleteConfirmModal from '../components/rewards/DeleteConfirmModal' 

const NotificationPanel = ({ onClose }: { onClose: () => void }) => {
  const [notifications, setNotifications] = useState<any[]>([])
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  const fetchNotifications = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      const { data } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
      setNotifications(data || [])
    }
  }

  useEffect(() => {
    fetchNotifications()
    const channel = supabase
      .channel('realtime-notif-panel')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'notifications' },
        async (payload) => {
          const { data: { user } } = await supabase.auth.getUser()
          if (user && payload.new.user_id === user.id) {
            setNotifications((prev) => {
               const exists = prev.some(n => n.id === payload.new.id);
               if (exists) return prev;
               return [payload.new, ...prev];
            })
          }
        },
      )
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const markAllRead = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      await supabase.from('notifications').update({ is_read: true }).eq('user_id', user.id)
      setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
    }
  }

  const deleteSingle = async (id: string) => {
    const { error } = await supabase.from('notifications').delete().eq('id', id)
    if (!error) {
      setNotifications(prev => prev.filter(n => n.id !== id))
      setActiveMenu(null)
    }
  }

  const confirmDeleteAll = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      await supabase.from('notifications').delete().eq('user_id', user.id)
      setNotifications([])
      setShowConfirmModal(false)
    }
  }

  return (
    <>
      <DeleteConfirmModal 
        isOpen={showConfirmModal} 
        onClose={() => setShowConfirmModal(false)} 
        onConfirm={confirmDeleteAll} 
      />

      <div className="absolute right-0 mt-4 w-85 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
        <div className="bg-purple-600 p-5 flex justify-between items-center text-white">
          <h3 className="font-bold">Notifications</h3>
          <div className="flex gap-3 text-[10px] uppercase font-bold opacity-80">
            <button onClick={markAllRead} className="hover:underline cursor-pointer">Mark all as read</button>
            <button onClick={() => setShowConfirmModal(true)} className="hover:underline cursor-pointer">Delete All</button>
            <button onClick={onClose} className="hover:opacity-80 cursor-pointer" aria-label="Close notifications">✕</button>
          </div>
        </div>
        
        <div className="max-h-100 overflow-y-auto p-2 scrollbar-hide bg-white">
          {notifications.length === 0 ? (
            <div className="h-40 flex flex-col items-center justify-center text-gray-300">
              <Bell size={32} className="mb-2" />
              <p className="text-xs font-bold tracking-tight">No notifications yet</p>
            </div>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                className={`group flex gap-4 p-4 rounded-2xl mb-1 transition-all border-b border-gray-50 relative ${!n.is_read ? 'bg-purple-50/50' : 'hover:bg-gray-50'}`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                    n.title.toLowerCase().includes('reward') || n.title.toLowerCase().includes('claim') 
                    ? 'bg-purple-100 text-purple-600' 
                    : 'bg-green-100 text-green-600'
                  }`}
                >
                  {n.title.toLowerCase().includes('reward') || n.title.toLowerCase().includes('claim') ? (
                    <Star size={18} fill="currentColor" />
                  ) : (
                    <CheckCircle2 size={18} />
                  )}
                </div>
                
                <div className="flex-1 overflow-hidden pr-6">
                  <p className="text-sm font-bold text-gray-800 truncate">{n.title}</p>
                  <p className="text-xs text-gray-500 line-clamp-2 leading-tight mt-0.5">{n.message}</p>
                  <p className="text-[10px] text-gray-400 mt-2 font-bold uppercase tracking-tight">
                    {new Date(n.created_at).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>

                <div className="absolute right-3 top-4" ref={activeMenu === n.id ? menuRef : null}>
                  <button 
                    onClick={() => setActiveMenu(activeMenu === n.id ? null : n.id)}
                    className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-all cursor-pointer"
                  >
                    <MoreVertical size={18} />
                  </button>
                  
                  {activeMenu === n.id && (
                    <div className="absolute right-0 mt-1 w-28 bg-white border border-gray-100 rounded-xl shadow-xl z-[51] animate-in fade-in zoom-in-95 duration-100">
                      <button 
                        onClick={() => deleteSingle(n.id)}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-red-500 hover:bg-red-50 transition-all rounded-xl cursor-pointer"
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  )
}

export default NotificationPanel