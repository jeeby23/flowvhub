import { CheckCircle2, X } from 'lucide-react'

interface LevelUpModalProps {
  isOpen: boolean
  onClose: () => void
}

const LevelUpModal = ({ isOpen, onClose }: LevelUpModalProps) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-md p-10 rounded-4xl shadow-2xl relative animate-in zoom-in-95 duration-300 mx-4 flex flex-col items-center text-center">
    
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
        >
          <X size={20} />
        </button>

        <div className="w-24 h-24 text-green-500 mb-6 animate-bounce">
          <CheckCircle2 size={96} strokeWidth={1.5} />
        </div>
        <h2 className="text-2xl font-bold text-[#9013FE] mb-2">
          Level Up! 🎉
        </h2>
        <div className="text-5xl font-black text-[#A855F7] mb-4">
          +5 Points
        </div>

        <div className="text-lg mb-6 tracking-[0.5em]">✨💎🍭</div>

        <p className="text-gray-600 font-medium leading-relaxed max-w-70">
          You've claimed your daily points! Come back tomorrow for more!
        </p>
      </div>
    </div>
  )
}

export default LevelUpModal