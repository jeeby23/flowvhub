Flowva Rewards Hub 🚀
A modern, high-performance rewards management dashboard built with React, TypeScript, and Vite. This project features a gamified "Rewards Journey" where users can earn points through daily streaks, referrals, and tool sign-ups, all synced in real-time with Supabase.

✨ Key Features
Rewards Journey Dashboard: Visual tracking of points balance and progress towards rewards (e.g., $5 Gift Cards).

Daily Streak System: A gamified calendar check-in system that rewards users with points for consecutive daily activity.

Real-time Notifications: A live notification bell and dropdown panel that updates instantly when points are claimed or accounts are created using Supabase Realtime.

Sign-up Verification Modal: A dedicated verification flow for third-party tool sign-ups (like Reclaim.ai) including email submission and screenshot uploads.

Referral System: Integrated social sharing and unique referral link management to drive user growth.

Authentication: Secure user login and registration powered by Supabase Auth with immediate dashboard redirection.

🛠️ Tech Stack
Frontend: React 18, TypeScript, Vite.

Styling: Tailwind CSS (including custom linear gradients and animations).

Backend/Database: Supabase (Auth, Storage).

Icons: Lucide React.

Notifications: React Toastify for UI feedback and a custom Realtime Notification Panel.

📁 Project Structure
Plaintext

src/
├── components/
│   ├── auth/            # SignUp and Login forms
│   ├── rewards/         # JourneySection, TasksSection, Modal components
├── layouts/
│   ├── DashboardLayout  # Main wrapper with Sidebar
│   ├── Sidebar          # Navigation with user profile and Sign Out
│   └── NotificationPanel # Real-time notification dropdown
└── lib/
    └── supabaseClient   # Supabase configuration and initialization
🚀 Getting Started
1. Clone and Install
Bash

git clone <your-repo-url>
cd flowva-rewards
npm install
2. Environment Variables
Create a .env.local file in the root directory and add your Supabase credentials:

Code snippet

VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
3. Database Setup
To ensure the notification system works, run the following in your Supabase SQL Editor:

SQL

-- Create notifications table
CREATE TABLE notifications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  title TEXT,
  message TEXT,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE notifications;
4. Run Development Server
Bash

npm run dev
