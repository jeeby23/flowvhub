import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Menu, ChevronLeft } from 'lucide-react'
import Sidebar from './Sidebar'

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <div className="flex min-h-screen bg-[#FDFDFF] font-sans relative">
      <div
        className={`fixed inset-y-0 left-0 z-50 transition-transform duration-300 ease-in-out transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar onClose={() => setIsSidebarOpen(false)} />
      </div>
      {!isSidebarOpen && (
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="fixed top-6 left-6 z-40 p-3 bg-white border border-gray-100 rounded-xl shadow-lg text-purple-600 hover:bg-purple-50 transition-all animate-in fade-in zoom-in"
        >
          <Menu size={24} />
        </button>
      )}

      <main
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'ml-64' : 'ml-0'
        } min-h-screen overflow-y-auto p-8`}
      >
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default DashboardLayout
