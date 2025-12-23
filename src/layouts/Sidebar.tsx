import { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Home, Compass, Library, Box, Zap, Gift, Settings, ChevronLeft, LogOut } from 'lucide-react'
import { supabase } from '../lib/supabaseClient'
import brandLogo from '../assets/brand.svg'

interface SidebarProps {
  onClose: () => void
}

const Sidebar = ({ onClose }: SidebarProps) => {
  const [user, setUser] = useState<{ email?: string; name?: string } | null>(null)
  const [showSignOut, setShowSignOut] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const getUserData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (user) {
        setUser({
          email: user.email,
          name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
        })
      }
    }

    getUserData()
  }, [])

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (!error) {
      navigate('/login')
    }
  }

  const menuItems = [
    { icon: <Home size={20} />, label: 'Home', path: '/dashboard/home' },
    { icon: <Compass size={20} />, label: 'Discover', path: '/dashboard/discover' },
    { icon: <Library size={20} />, label: 'Library', path: '/dashboard/library' },
    { icon: <Zap size={20} />, label: 'Tech Stack', path: '/dashboard/stack' },
    { icon: <Box size={20} />, label: 'Subscriptions', path: '/dashboard/subs' },
    { icon: <Gift size={20} />, label: 'Rewards Hub', path: '/dashboard/rewards/earn' },
    { icon: <Settings size={20} />, label: 'Settings', path: '/dashboard/settings' },
  ]

  return (
    <aside className="w-64 border-r border-gray-100 h-screen flex flex-col p-6 bg-white shadow-sm relative">
      {/* Logo Section */}
      <div className="flex items-center justify-between mb-10 px-2">
        <div className="flex items-center gap-2">
          <img src={brandLogo} alt="Flowva Logo" />
        </div>

        <button
          onClick={onClose}
          className="p-1.5 hover:bg-purple-50 text-gray-400 hover:text-purple-600 rounded-lg transition-colors cursor-pointer"
          title="Close Sidebar"
        >
          <ChevronLeft size={20} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive ||
                (item.label === 'Rewards Hub' && window.location.pathname.includes('rewards'))
                  ? 'bg-purple-100 text-purple-600 font-bold'
                  : 'text-gray-500 hover:bg-gray-50'
              }`
            }
          >
            {item.icon} {item.label}
          </NavLink>
        ))}
      </nav>

      {/* User Profile Section with Sign Out Button */}
      <div className="relative border-t border-gray-100 pt-6">
        {showSignOut && (
          <button
            onClick={handleSignOut}
            className="absolute bottom-full left-0 w-full mb-2 bg-white border border-gray-100 rounded-xl shadow-xl p-3 flex items-center gap-3 text-red-500 font-bold text-sm hover:bg-red-50 transition-all animate-in slide-in-from-bottom-2 duration-200 cursor-pointer"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        )}

        <button 
          onClick={() => setShowSignOut(!showSignOut)}
          className={`w-full flex items-center gap-3 p-2 rounded-xl transition-all cursor-pointer ${showSignOut ? 'bg-gray-50' : 'hover:bg-gray-50'}`}
        >
          <div className="relative shrink-0">
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold uppercase">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="absolute top-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
          <div className="overflow-hidden text-left">
            <p className="text-sm font-bold truncate text-gray-800 capitalize">
              {user?.name || 'Loading...'}
            </p>
            <p className="text-xs text-gray-500 truncate">{user?.email || 'Loading...'}</p>
          </div>
        </button>
      </div>
    </aside>
  )
}

export default Sidebar