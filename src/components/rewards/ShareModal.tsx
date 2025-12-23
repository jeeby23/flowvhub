import { X, Layers } from 'lucide-react'

const ShareModal = ({ isOpen, onClose }: any) => {
  if (!isOpen) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-md p-8 rounded-4xl shadow-2xl relative animate-in zoom-in-95 duration-300">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
        >
          <X size={24} />
        </button>
        <div className="flex flex-col items-center text-center">
          <h2 className="text-2xl font-black text-gray-900 mb-6">Share Your Stack</h2>
          <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 mb-6">
            <Layers size={32} fill="currentColor" fillOpacity={0.2} />
          </div>
          <p className="text-gray-500 text-sm leading-relaxed max-w-70">
            You have no stack created yet, go to{' '}
            <span className="font-bold text-gray-700">Tech Stack</span> to create one.
          </p>
        </div>
      </div>
    </div>
  )
}

export default ShareModal
