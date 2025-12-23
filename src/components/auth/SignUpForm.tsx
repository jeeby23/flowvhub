import React, { useState } from 'react'
import { Mail, UserPlus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabaseClient'
import PasswordField from './PasswordField'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const SignUpForm = ({ onSwitch }: { onSwitch: () => void }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) return toast.error('Passwords do not match!')

    setLoading(true)
    try {
      const { data, error } = await supabase.auth.signUp({ email, password })
      
      if (error) {
        toast.error(error.message)
      } else if (data.user) {
        toast.success('Account created successfully!')
        
        setTimeout(() => {
          navigate('/dashboard/rewards/earn')
        }, 2000)
      }
    } catch (err) {
      toast.error('Connection failed: Check your internet settings.')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleAuth = async () => {
    const { error } = await supabase.auth.signInWithOAuth({ 
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard/rewards/earn`
      }
    })
    if (error) toast.error(error.message)
  }

  return (
    <div className="w-full max-w-md mx-auto animate-in fade-in duration-500">
      <ToastContainer position="top-center" theme="colored" autoClose={3000} />
      
      <div className="flex flex-col items-center mb-6">
        <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mb-4">
          <UserPlus className="text-[#6B21A8] w-8 h-8" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
      </div>

      <button
        onClick={handleGoogleAuth}
        type="button"
        className="w-full mb-6 flex items-center justify-center gap-3 border border-gray-200 py-3 rounded-xl hover:bg-gray-50 transition-all font-medium text-gray-700 cursor-pointer"
      >
        <img
          src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
          className="w-5 h-5"
          alt="Google"
        />
        Sign up with Google
      </button>

      <form onSubmit={handleSignUp} className="space-y-4">
        <div className="space-y-1">
          <label className="text-sm font-semibold text-gray-700">Email</label>
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
        <PasswordField
          label="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Repeat password"
        />

        <button
          disabled={loading}
          type="submit"
          className="w-full bg-[#6B21A8] hover:bg-purple-800 text-white font-bold py-4 rounded-xl shadow-lg transition-all mt-4 cursor-pointer disabled:opacity-50"
        >
          {loading ? 'Creating...' : 'Create Account'}
        </button>
      </form>

      <p className="mt-6 text-center text-gray-600">
        Already have an account?{' '}
        <button
          onClick={onSwitch}
          className="text-[#6B21A8] font-bold hover:underline cursor-pointer"
        >
          Log In
        </button>
      </p>
    </div>
  )
}

export default SignUpForm