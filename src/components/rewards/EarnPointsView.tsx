import  { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ShareModal from './ShareModal';
import JourneySection from './JourneySection';
import TasksSection from './TasksSection';
import ReferEarnSection from './ReferEarnSection';

const EarnPointsView = () => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [points, setPoints] = useState(0);
  const [streak, setStreak] = useState(1);
  const [loading, setLoading] = useState(true);
  const [claiming, setClaiming] = useState(false);
  const [canClaim, setCanClaim] = useState(false);
  const referralLink = "https://app.flowvahub.com/signup/?ref=willy1815";

  useEffect(() => { fetchUserData(); }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase.from('profiles').select('points, last_claim, streak').eq('id', user.id).single();

      if (error || !data) {
        setCanClaim(true);
        await supabase.from('notifications').insert([{
          user_id: user.id,
          title: `Welcome, ${user.email?.split('@')[0]}!`,
          message: "We're thrilled to have you on board! Explore powerful tools to boost productivity.",
          is_read: false,
        }]);
      } else {
        setPoints(data.points || 0);
        setStreak(data.streak || 1);
        if (data.last_claim) {
          const lastDate = new Date(data.last_claim);
          const nextAvailableDate = new Date(lastDate.getTime() + 24 * 60 * 60 * 1000);
          setCanClaim(new Date() >= nextAvailableDate);
        } else { setCanClaim(true); }
      }
    } catch (err) { console.error(err); setCanClaim(true); } finally { setLoading(false); }
  };

  const handleClaimPoints = async () => {
    if (!canClaim || claiming) return;
    try {
      setClaiming(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const now = new Date().toISOString();
      const newPoints = points + 5;

      const { error } = await supabase.from('profiles').upsert({ id: user.id, points: newPoints, last_claim: now, streak: streak });
      if (error) throw error;

      await supabase.from('notifications').insert([{
        user_id: user.id, title: 'Reward Claimed! 🎁', message: `Successfully claimed 5 Flowva points. Your new balance is ${newPoints} pts.`, is_read: false,
      }]);

      setPoints(newPoints);
      setCanClaim(false);
      toast.success('Successfully claimed 5 points!');
    } catch (err) { toast.error('Claim failed.'); console.error(err); } finally { setClaiming(false); }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-10">
      <ToastContainer position="bottom-right" theme="colored" />
      <ShareModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} />
      
      <JourneySection 
        points={points} 
        streak={streak} 
        loading={loading} 
        canClaim={canClaim} 
        claiming={claiming} 
        onClaim={handleClaimPoints} 
      />

      <TasksSection onShareClick={() => setIsShareModalOpen(true)} />

      <ReferEarnSection referralLink={referralLink} />
    </div>
  );
};

export default EarnPointsView;