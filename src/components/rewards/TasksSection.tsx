import { Users, Share2 } from 'lucide-react'

const TasksSection = ({ onShareClick }: any) => (
  <section>
    <div className="flex items-center gap-3 mb-6">
      <div className="w-1 h-6 bg-purple-600 rounded-full" />
      <h2 className="text-xl font-bold text-gray-900">Earn More Points</h2>
    </div>
    <div className="flex flex-col md:flex-row gap-3 items-stretch">
      
      <div className="bg-white p-6  border border-gray-100 hover:border-purple-500 hover:shadow-2xl shadow-sm flex items-center justify-between md:w-112.5 transition-all duration-300">
        <div className="flex gap-4 items-center">
          <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 shrink-0">
            <Users size={24} />
          </div>
          <div>
            <p className="font-bold text-gray-800 text-sm mb-1">Refer and win 10,000 points!</p>
            <p className="text-[11px] text-gray-500 leading-relaxed">
              Invite 3 friends by Nov 20 and earn a chance to be one of 5 winners of{' '}
              <span className="text-purple-600 font-bold"> 10,000 points. </span> 
              Friends must complete onboarding to qualify.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6  border border-gray-100 hover:border-purple-500 hover:shadow-2xl shadow-sm flex items-center justify-between md:w-112.5 transition-all duration-300">
        <div className="flex gap-4 items-center">
          <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 shrink-0">
            <Share2 size={24} />
          </div>
          <div>
            <p className="font-bold text-gray-800 text-sm">Share Your Stack</p>
            <p className="text-[11px] text-purple-600 font-bold">Earn +25 pts</p>
            <p className="text-[11px] text-gray-500 mt-1">Share your tool stack</p>
          </div>
        </div>
        <button
          onClick={onShareClick}
          className="px-5 py-2.5 bg-purple-50 text-purple-600 rounded-xl font-bold text-xs cursor-pointer hover:bg-purple-100 flex items-center gap-2 transition-colors shrink-0"
        >
          <Share2 size={16} />
          Share
        </button>
      </div>

    </div>
  </section>
)

export default TasksSection