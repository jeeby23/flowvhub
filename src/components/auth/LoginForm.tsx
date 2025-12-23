import React, { useState } from 'react'
import { Mail, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabaseClient'
import PasswordField from './PasswordField'

const LoginForm = ({ onSwitch }: { onSwitch: () => void }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })

      if (error) {
        alert(error.message)
      } else if (data.session) {
        navigate('/dashboard/rewards/redeem')
      }
    } catch (err) {
      alert('Network error: Please check your internet connection and Supabase URL.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard/rewards/redeem`,
      },
    })
    if (error) alert(error.message)
  }

  return (
    <div className="w-full max-w-md mx-auto animate-in fade-in duration-500">
      <div className="flex flex-col items-center mb-8">
        <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mb-4">
          <User className="text-[#6B21A8] w-8 h-8" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Welcome Back!!</h1>
      </div>

      <button
        onClick={handleGoogleLogin}
        type="button"
        className="w-full mb-6 flex items-center justify-center gap-3 border border-gray-200 py-3 rounded-xl hover:bg-gray-50 transition-all font-medium text-gray-700 cursor-pointer"
      >
        <img
          src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
          className="w-5 h-5"
          alt="Google"
        />
        Continue with Google
      </button>

      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-200"></span>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-gray-400">Or continue with email</span>
        </div>
      </div>

      <form onSubmit={handleLogin} className="space-y-5">
        <div className="space-y-1">
          <label className="text-sm font-semibold text-gray-700">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#6B21A8] outline-none transition-all"
              placeholder="Enter your email"
              required
            />
          </div>
        </div>

        <PasswordField
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          disabled={loading}
          type="submit"
          className="w-full bg-[#6B21A8] hover:bg-purple-800 text-white font-bold py-4 rounded-xl shadow-lg transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Logging in...' : 'Log In'}
        </button>
      </form>

      <p className="mt-8 text-center text-gray-600">
        Don't have an account?{' '}
        <button
          onClick={onSwitch}
          className="text-[#6B21A8] font-bold hover:underline cursor-pointer"
        >
          Sign Up
        </button>
      </p>
    </div>
  )
}

export default LoginForm
