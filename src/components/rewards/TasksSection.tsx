import React from 'react'
import { Users, Share2 } from 'lucide-react'

const TasksSection = ({ onShareClick }: any) => (
  <section>
    <div className="flex items-center gap-3 mb-6">
      <div className="w-1 h-6 bg-purple-600 rounded-full" />
      <h2 className="text-xl font-bold text-gray-900">Earn More Points</h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-">
      <div className="bg-white p-6 rounded border border-gray-100 hover:border-purple-500 hover:shadow-2xl shadow-sm flex items-center justify-between w-full md:w-[400px] ">
        <div className="flex gap-4 items-center">
          <div className="w-12 h-12 bg-purple-50 rounded flex items-center justify-center text-purple-600 p-2">
            <Users />
          </div>
          <div>
            <p className="font-bold text-gray-800 text-sm py-5">Refer and win 10,000 points!</p>
            <p className="text-xs text-gray-500">
              Invite 3 friends by Nov 20 and earn a chance to be one of 5 winners of{' '}
              <span className="text-purple-600"> 10,000 points. </span> Friends must complete
              onboarding to qualify.
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded border border-gray-100  hover:border-purple-500 hover:shadow-2xl shadow-sm flex items-center justify-between w-full md:w-[400px]">
        <div className="flex gap-4 items-center">
          <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600">
            <Share2 />
          </div>
          <div>
            <p className="font-bold text-gray-800 text-sm">Share Your Stack</p>
            <p className="text-xs text-purple-600 font-bold">Earn +25 pts</p>
          </div>
        </div>
        <button
          onClick={onShareClick}
          className="px-6 py-2 bg-purple-50 text-purple-600 rounded-xl font-bold text-sm cursor-pointer hover:bg-purple-100 flex items-center gap-2"
        >
          <Share2 />
          Share
        </button>
      </div>
    </div>
  </section>
)

export default TasksSection
