import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Bell } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';
import RewardCard from '../rewards/RewardCard';
import EarnPointsView from '../rewards/EarnPointsView';
import NotificationPanel from '../../layouts/NotificationPanel';

const RewardsPage = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [filter, setFilter] = useState('All Rewards');
  const location = useLocation();
  const isRedeemTab = location.pathname.includes('redeem');

  useEffect(() => {
    const fetchUnread = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { count } = await supabase
          .from('notifications')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id)
          .eq('is_read', false);
        setUnreadCount(count || 0);
      }
    };

    fetchUnread();
    const channel = supabase.channel('badge-sync')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'notifications' }, () => {
        fetchUnread();
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const rewards = [
    { id: 1, title: '$5 Bank Transfer', desc: 'The $5 equivalent will be transferred to your bank account.', cost: 5000, type: 'Locked', icon: '💸' },
    { id: 2, title: '$5 PayPal International', desc: 'Receive a $5 PayPal balance transfer directly to your account.', cost: 5000, type: 'Locked', icon: '💸' },
    { id: 3, title: '$5 Virtual Visa Card', desc: 'Use your $5 prepaid card to shop anywhere Visa is accepted online.', cost: 5000, type: 'Locked', icon: '🎁' },
    { id: 4, title: '$5 Apple Gift Card', desc: 'Redeem for apps, games, music, movies, and more on the App Store.', cost: 5000, type: 'Locked', icon: '🎁' },
    { id: 5, title: '$5 Google Play Card', desc: 'Purchase apps, games, movies, books, and more on the Play Store.', cost: 5000, type: 'Locked', icon: '🎁' },
    { id: 6, title: '$5 Amazon Gift Card', desc: 'Spend on your favorite tools or products on the Amazon platform.', cost: 5000, type: 'Locked', icon: '🎁' },
    { id: 7, title: '$10 Gift Voucher', desc: 'A special locked voucher for top contributors.', cost: 10000, type: 'Locked', icon: '🎫' },
    { id: 8, title: 'Free Udemy Course', desc: 'Coming soon', cost: 15000, type: 'Coming Soon', icon: '🚀' },
  ];
  const filteredRewards = filter === 'All Rewards' 
    ? rewards 
    : rewards.filter(reward => reward.type === filter);

  return (
    <div className="relative min-h-screen">
      <div className="flex justify-between items-start mb-6">
        <header>
          <h1 className="text-3xl font-bold text-gray-900">Rewards Hub</h1>
          <p className="text-gray-500 mt-1">Earn points, unlock rewards, and celebrate your progress!</p>
        </header>

        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-3 bg-slate-100 rounded-full text-slate-600 hover:bg-slate-200 transition-all relative"
          >
            <Bell size={22} />
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-full border-2 border-white animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && <NotificationPanel onClose={() => setShowNotifications(false)} />}
        </div>
      </div>

      <div className="flex gap-4 mb-8">
        <NavLink to="/dashboard/rewards/earn" className={({ isActive }) => `px-6 py-2 text-sm font-bold transition-all ${isActive ? 'bg-[#F4EFFB] text-[#9012FE] border-b-2 transition ease-in ' : ' text-gray-500 hover:bg-[#F4EFFB]'}`}>Earn Points</NavLink>
        <NavLink to="/dashboard/rewards/redeem" className={({ isActive }) => `px-6 py-2 text-sm font-bold transition-all ${isActive ? 'bg-[#F4EFFB] text-[#9012FE] border-b-2 transition ease-in' : ' text-gray-500 hover:bg-[#F4EFFB]'}`}>Redeem Rewards</NavLink>
      </div>

      {isRedeemTab ? (
        <section className="animate-in fade-in duration-500">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-6 bg-purple-600 rounded-full" />
            <h2 className="text-2xl font-bold text-gray-900">Redeem Your Points</h2>
          </div>
          
          <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
            {[
              { name: 'All Rewards', count: rewards.length },
              { name: 'Unlocked', count: rewards.filter(r => r.type === 'Unlocked').length },
              { name: 'Locked', count: rewards.filter(r => r.type === 'Locked').length },
              { name: 'Coming Soon', count: rewards.filter(r => r.type === 'Coming Soon').length }
            ].map(f => (
              <button 
                key={f.name} 
                onClick={() => setFilter(f.name)} 
                className={`px-5 py-2 rounded-xl text-sm font-bold whitespace-nowrap border transition-all ${filter === f.name ? 'bg-purple-50 border-purple-200 text-purple-600' : 'bg-white border-gray-100 text-gray-400'}`}
              >
                {f.name} <span className="ml-1 opacity-60 bg-purple-200 px-1.5 rounded text-[10px]">{f.count}</span>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRewards.length > 0 ? (
              filteredRewards.map(reward => <RewardCard key={reward.id} reward={reward} userPoints={5} />)
            ) : (
              <div className="col-span-full py-20 text-center text-gray-400 font-medium">
                No rewards found in this category.
              </div>
            )}
          </div>
        </section>
      ) : <EarnPointsView />}
    </div>
  );
};

export default RewardsPage;