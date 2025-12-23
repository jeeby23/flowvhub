interface Reward {
  id: number | string
  title: string
  desc: string
  cost: number
  type: string
  icon: string
}

interface RewardCardProps {
  reward: Reward
  userPoints: number
}

const RewardCard = ({ reward, userPoints }: RewardCardProps) => {
  const isInsufficientPoints = userPoints < reward.cost
  const isLocked = reward.type === 'Locked' || isInsufficientPoints

  return (
    <div className="bg-white border border-gray-100 rounded-4xl p-8 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow ">
      <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center text-3xl mb-4">
        {reward.icon}
      </div>

      <h3 className="font-bold text-lg mb-2 text-gray-800">{reward.title}</h3>
      <p className="text-sm text-gray-500 mb-6 leading-relaxed px-4">{reward.desc}</p>

      <div className="flex flex-col items-center gap-1 mb-6">
        <div className="flex items-center gap-1 text-purple-600 font-bold">
          ⭐ {reward.cost} Points
        </div>

        {isInsufficientPoints && reward.type !== 'Locked' && (
          <span className="text-[10px] text-red-400 font-medium">
            Need {reward.cost - userPoints} more pts
          </span>
        )}
      </div>

      <button
        disabled={isLocked}
        className={`w-full py-3 rounded-xl font-bold transition-all ${
          isLocked
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed '
            : 'bg-[#A855F7] text-white hover:bg-purple-700 active:scale-95 shadow-lg shadow-purple-100'
        }`}
      >
        {isLocked ? (isInsufficientPoints ? 'Locked' : 'Not enough points') : 'Redeem Now'}
      </button>
    </div>
  )
}

export default RewardCard
