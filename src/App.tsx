import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './lib/supabaseClient';
import AuthLayout from './layouts/AuthLayout';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import DashboardLayout from './layouts/DashboardLayout';
import RewardsPage from './components/pages/RewardsPage';

function App() {
  const [isLoginView, setIsLoginView] = useState(true);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={
            !session ? (
              <AuthLayout>
                {isLoginView ? (
                  <LoginForm onSwitch={() => setIsLoginView(false)} />
                ) : (
                  <SignUpForm onSwitch={() => setIsLoginView(true)} />
                )}
              </AuthLayout>
            ) : (
              <Navigate to="/dashboard/rewards/redeem" />
            )
          } 
        />
        <Route path="/dashboard" element={session ? <DashboardLayout /> : <Navigate to="/login" />}>
          <Route path="rewards" element={<RewardsPage />}>
            <Route path="redeem" element={<div />} />
            <Route path="earn" element={<div className="p-10 text-center text-gray-400"></div>} />
          </Route>
          <Route path="home" element={<div></div>} />
        </Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}


export default App;