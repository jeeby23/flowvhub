import { useState } from 'react';
import { Star, Calendar, Zap, Loader2, UserPlus } from 'lucide-react';
import ClaimPointsModal from './ClaimPointsModal';

const JourneySection = ({ points, streak, loading, canClaim, claiming, onClaim }: any) => {
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);
  const progressPercent = Math.min((points / 5000) * 100, 100);
  const currentDay = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;

  return (
    <section>
      <ClaimPointsModal 
        isOpen={isClaimModalOpen} 
        onClose={() => setIsClaimModalOpen(false)} 
      />

      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-6 bg-purple-600 rounded-full" />
        <h2 className="text-xl font-bold text-gray-900">Your Rewards Journey</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="text-purple-600 mb-4 flex items-start gap-3 "><Star fill="currentColor" size={24} /> <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Points Balance</h3>
             
            </div>
            <div className="text-4xl font-black text-purple-600 my-4 flex justify-between">{loading ? <Loader2 className="animate-spin" /> : points}
            <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-white text-xl">⭐</div>
            </div>
          </div>
          <div className="space-y-2 mt-auto">
             <div className="flex justify-between text-xs font-bold text-gray-500"><span>Progress to $5 Gift Card</span><span>{points}/5000</span></div>
             <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="bg-purple-500 h-full transition-all duration-500" style={{ width: `${progressPercent}%` }} />
             </div>
             <p className="text-[10px] text-gray-400 mt-2">🚀 Just getting started — keep earning points!</p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col justify-between ">
          <div>
            <div className="text-blue-400 mb-4 flex items-start gap-3 " ><Calendar size={24} />
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-6">Daily Streak</h3>
            </div>
            <div className="text-4xl font-black text-purple-600 mb-8">{streak} day</div>
            <div className="flex justify-between mb-6">
               {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                  <div key={i} className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold ${i === currentDay ? 'border border-purple-600 bg-gray-100 text-gray-400' : 'bg-gray-100 text-gray-400'}`}>{day}</div>
               ))}
            </div>
            <p className="text-center text-xs text-gray-500 mb-4 font-medium">Check in daily to earn +5 points</p>
          </div>
          <button onClick={onClaim} disabled={!canClaim || claiming} className={`w-full py-3 rounded-full font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${canClaim ? 'bg-purple-600 text-white hover:bg-purple-700' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}>
             {claiming ? <Loader2 className="animate-spin" size={16} /> : <><Zap size={16} /> {canClaim ? "Claim Today" : "Claimed Today"}</>}
          </button>
        </div>

        <div className="bg-linear-to-br from-purple-600 via-blue-500 to-cyan-400 p-[1.5px] rounded-[2.5rem] h-full shadow-lg">
          <div className="h-full w-full rounded-[2.4rem] p-8 relative overflow-hidden flex flex-col" style={{ background: `linear-gradient(135deg, #9013FE 0%, #70D6FF 100%) top / 100% 48% no-repeat, white` }}>
            <div className="flex justify-between items-start mb-4">
              <span className="bg-purple-400 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter">Featured</span>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <div className="grid grid-cols-2 gap-0.5">
                  <div className="w-2.5 h-2.5 bg-orange-400 rounded-sm"></div>
                  <div className="w-2.5 h-2.5 bg-pink-500 rounded-full"></div>
                  <div className="w-2.5 h-2.5 bg-purple-700 rounded-full"></div>
                  <div className="w-2.5 h-2.5 bg-blue-500 rounded-sm"></div>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="text-white font-bold text-lg leading-tight">Top Tool Spotlight</h3>
              <p className="text-white font-bold text-xl">Reclaim</p>
            </div>

            <div className="flex gap-3 mb-6">
              <div className="shrink-0 mt-1"><Calendar className="text-purple-600" size={20} /></div>
              <div>
                <h4 className="text-[12px] font-bold text-gray-900 leading-tight mb-1">Automate and Optimize Your Schedule</h4>
                <p className="text-[10px] text-gray-500 leading-relaxed">Reclaim.ai is an AI-powered calendar assistant that automatically schedules your tasks... earn Flowva Points when you sign up!</p>
              </div>
            </div>

            <div className="flex gap-3 mt-auto">
              <button className="flex-1 py-3.5 bg-purple-700 text-white rounded-xl text-[11px] font-bold cursor-pointer hover:bg-purple-800 transition-all flex items-center justify-center gap-2"><UserPlus size={14} /> 
              <a href="/login">
              Sign Up
              </a>
              </button>
              <button 
                onClick={() => setIsClaimModalOpen(true)}
                className="flex-1 py-3.5 bg-linear-to-r from-purple-500 to-pink-500 text-white rounded-xl text-[11px] font-bold cursor-pointer hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <Zap size={14} /> Claim 50 pts
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneySection;