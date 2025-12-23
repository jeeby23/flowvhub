import { useEffect, useState } from 'react'
import { Bell, CheckCircle2, Star } from 'lucide-react'
import { supabase } from '../lib/supabaseClient'

const NotificationPanel = ({ onClose }: { onClose: () => void }) => {
  const [notifications, setNotifications] = useState<any[]>([])

  const fetchNotifications = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
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
          const {
            data: { user },
          } = await supabase.auth.getUser()
          if (user && payload.new.user_id === user.id) {
            setNotifications((prev) => [payload.new, ...prev])
          }
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const markAllRead = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (user) {
      await supabase.from('notifications').update({ is_read: true }).eq('user_id', user.id)
      fetchNotifications()
    }
  }

  const deleteAll = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (user) {
      await supabase.from('notifications').delete().eq('user_id', user.id)
      setNotifications([])
    }
  }

  return (
    <div className="absolute right-0 mt-4 w-85 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
      <div className="bg-purple-600 p-5 flex justify-between items-center text-white">
        <h3 className="font-bold">Notifications</h3>
        <div className="flex gap-3 text-[10px] uppercase font-bold opacity-80">
          <button onClick={markAllRead} className="hover:underline cursor-pointer">
            Mark read
          </button>
          <button onClick={deleteAll} className="hover:underline cursor-pointer">
            Delete All
          </button>
        </div>
      </div>
      <div className="max-h-[400px] overflow-y-auto p-2 scrollbar-hide">
        {notifications.length === 0 ? (
          <div className="h-40 flex flex-col items-center justify-center text-gray-300">
            <Bell size={32} className="mb-2" />
            <p className="text-xs">No notifications yet</p>
          </div>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              className={`flex gap-4 p-4 rounded-2xl mb-1 transition-all ${!n.is_read ? 'bg-purple-50' : 'hover:bg-gray-50'}`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${n.title.toLowerCase().includes('reward') ? 'bg-purple-100 text-purple-600' : 'bg-green-100 text-green-600'}`}
              >
                {n.title.toLowerCase().includes('reward') ? (
                  <Star size={18} fill="currentColor" />
                ) : (
                  <CheckCircle2 size={18} />
                )}
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-bold text-gray-800 truncate">{n.title}</p>
                <p className="text-xs text-gray-500 line-clamp-2 leading-tight">{n.message}</p>
                <p className="text-[10px] text-gray-400 mt-1 uppercase">
                  {new Date(n.created_at).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default NotificationPanel
