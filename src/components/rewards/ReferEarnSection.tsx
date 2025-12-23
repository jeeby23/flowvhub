import React from 'react'
import { Users, Copy, Facebook, Linkedin } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import { toast } from 'react-toastify'

const ReferEarnSection = ({ referralLink }: any) => {
  const copy = () => {
    navigator.clipboard.writeText(referralLink)
    toast.info('Link copied!')
  }

  return (
    <section>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-6 bg-purple-600 rounded-full" />
        <h2 className="text-xl font-bold text-gray-900">Refer & Earn</h2>
      </div>
      <div className="bg-[#F9F9FF] border border-purple-50 rounded-[2.5rem] p-8">
        <div className="grid grid-cols-2 gap-4 mb-12 text-center">
          <div>
            <p className="text-3xl font-black text-purple-600">0</p>
            <p className="text-sm text-gray-500 font-medium">Referrals</p>
          </div>
          <div>
            <p className="text-3xl font-black text-purple-600">0</p>
            <p className="text-sm text-gray-500 font-medium">Points Earned</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-white border border-gray-100 rounded-2xl p-2 pl-4 shadow-sm">
          <input
            type="text"
            readOnly
            value={referralLink}
            className="flex-1 text-sm bg-transparent outline-none"
          />
          <button onClick={copy} className="p-2 text-purple-600 cursor-pointer">
            <Copy size={20} />
          </button>
        </div>
        <div className="flex justify-center gap-4 mt-8">
          <button className="w-10 h-10 bg-[#1877F2] text-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-90">
            <Facebook size={20} fill="currentColor" />
          </button>
          <button className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center cursor-pointer font-bold">
            <a href="https://x.com/FlowvaHub/status/2003150894712652192?s=20">𝕏</a>
          </button>
          <button className="w-10 h-10 bg-[#0A66C2] text-white rounded-full flex items-center justify-center cursor-pointer">
            <Linkedin size={20} fill="currentColor" />
          </button>
          <button className="w-10 h-10 bg-[#25D366] text-white rounded-full flex items-center justify-center cursor-pointer text-xl">
            <a
              href="`https://api.whatsapp.com/send?text=%F0%9F%9A%80%20Join%20me%20on%20Flowva!%0AFlowva%20is%20where%20I%20discover%20top%20tools%2C%20earn%20rewards%2C%20and%20grow%20with%20community%20power.%0A%0AUse%20my%20referral%20link%20to%20sign%20up%20and%20get%20rewarded%20too%3A%0Ahttps%3A%2F%2Fapp.flowvahub.com%2Fsignup%2F%3Fref%3Dmujee6586`"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp size={20} />
            </a>
          </button>
        </div>
      </div>
    </section>
  )
}

export default ReferEarnSection
