import { X, Cloud } from 'lucide-react';

interface ClaimPointsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ClaimPointsModal = ({ isOpen, onClose }: ClaimPointsModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-112.5 min-h-100 p-8 rounded shadow-2xl relative animate-in zoom-in-95 duration-300 mx-4">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
        >
          <X size={24} />
        </button>

        <div className="flex flex-col">
          <h2 className="text-2xl font-bold text-gray-900 ">Claim Your 25 Points</h2>
          
          <div className=" text-sm text-gray-600 mb-6 leading-relaxed">
            <p>Sign up for Reclaim (free, no payment needed), then fill the form below:</p>
            <div className="flex gap-2 items-start">
              <span className="bg-blue-100 text-blue-600 rounded px-1.5 font-bold text-xs mt-0.5 shrink-0">1</span>
              <p>Enter your Reclaim sign-up email.</p>
            </div>
            <div className="flex gap-2 items-start">
              <span className="bg-blue-100 text-blue-600 rounded px-1.5 font-bold text-xs mt-0.5 shrink-0">2</span>
              <p>Upload a screenshot of your Reclaim profile showing your email.</p>
            </div>
            <p>After verification, you'll get 25 Flowva Points! 🥳🎉</p>
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Email used on Reclaim</label>
              <input 
                type="email" 
                placeholder="user@example.com"
                className="w-full px-4 py-1 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none transition-all bg-gray-50/30"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Upload screenshot (mandatory)</label>
              <div className="relative group">
                <input 
                  type="file" 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="w-full py-1 px-4 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center gap-3 text-gray-500 group-hover:bg-gray-100 transition-all">
                  <Cloud size={24} />
                  <span className="font-medium">Choose file</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button 
                type="button"
                onClick={onClose}
                className="flex-1 py-3.5 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="flex-1 py-3.5 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition-all shadow-lg shadow-purple-200 cursor-pointer"
              >
                Submit Claim
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ClaimPointsModal;