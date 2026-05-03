import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Leaf, Mail, Lock, User, Phone, Building } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

export function Auth() {
  const [tab, setTab] = useState<'login' | 'signup'>('login');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { state, login, signup } = useAuth();

  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [signupForm, setSignupForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    role: 'user' as const,
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(loginForm);
      toast.success('Signed in successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signup(signupForm);
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (state.isAuthenticated) {
      navigate('/dashboard');
    }
  }, [state.isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 dark:from-slate-950 dark:to-slate-950 light:from-white light:to-slate-50 pt-32 pb-12 px-4 flex items-center justify-center">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/3 right-1/3 w-96 h-96 bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-full blur-3xl dark:from-emerald-500/20 light:from-emerald-500/10"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-green-600 rounded-lg flex items-center justify-center">
            <Leaf className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
            ReLink
          </span>
        </Link>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 bg-slate-800 dark:bg-slate-800 light:bg-slate-200 p-1 rounded-lg">
          <button
            onClick={() => {
              setTab('login');
              setLoginForm({ email: '', password: '' });
            }}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
              tab === 'login'
                ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white'
                : 'text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-white dark:hover:text-white light:hover:text-slate-900'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => {
              setTab('signup');
              setSignupForm({
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                phone: '',
                role: 'user',
              });
            }}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
              tab === 'signup'
                ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white'
                : 'text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-white dark:hover:text-white light:hover:text-slate-900'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Login Form */}
        {tab === 'login' && (
          <motion.form
            onSubmit={handleLogin}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4 p-6 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 dark:from-slate-800 light:from-white border border-slate-700 dark:border-slate-700 light:border-slate-300"
          >
            <div>
              <Label className="text-slate-300 dark:text-slate-300 light:text-slate-700 mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </Label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={loginForm.email}
                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                className="bg-slate-900 dark:bg-slate-900 light:bg-slate-50 border-slate-700 dark:border-slate-700 light:border-slate-300 text-white dark:text-white light:text-slate-900 placeholder-slate-500 dark:placeholder-slate-500 light:placeholder-slate-400"
                required
              />
            </div>

            <div>
              <Label className="text-slate-300 dark:text-slate-300 light:text-slate-700 mb-2 flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Password
              </Label>
              <Input
                type="password"
                placeholder="••••••••"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                className="bg-slate-900 dark:bg-slate-900 light:bg-slate-50 border-slate-700 dark:border-slate-700 light:border-slate-300 text-white dark:text-white light:text-slate-900 placeholder-slate-500 dark:placeholder-slate-500 light:placeholder-slate-400"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white border-0 h-12 font-semibold"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>

            <p className="text-sm text-slate-400 dark:text-slate-400 light:text-slate-500 text-center">
              Demo: use any email and password to test
            </p>
          </motion.form>
        )}

        {/* Signup Form */}
        {tab === 'signup' && (
          <motion.form
            onSubmit={handleSignup}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4 p-6 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 dark:from-slate-800 light:from-white border border-slate-700 dark:border-slate-700 light:border-slate-300 max-h-[600px] overflow-y-auto"
          >
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-slate-300 dark:text-slate-300 light:text-slate-700 mb-2 flex items-center gap-2 text-sm">
                  <User className="w-4 h-4" />
                  First Name
                </Label>
                <Input
                  placeholder="John"
                  value={signupForm.firstName}
                  onChange={(e) => setSignupForm({ ...signupForm, firstName: e.target.value })}
                  className="bg-slate-900 dark:bg-slate-900 light:bg-slate-50 border-slate-700 dark:border-slate-700 light:border-slate-300 text-white dark:text-white light:text-slate-900 placeholder-slate-500 dark:placeholder-slate-500 light:placeholder-slate-400"
                  required
                />
              </div>
              <div>
                <Label className="text-slate-300 dark:text-slate-300 light:text-slate-700 mb-2 text-sm">Last Name</Label>
                <Input
                  placeholder="Doe"
                  value={signupForm.lastName}
                  onChange={(e) => setSignupForm({ ...signupForm, lastName: e.target.value })}
                  className="bg-slate-900 dark:bg-slate-900 light:bg-slate-50 border-slate-700 dark:border-slate-700 light:border-slate-300 text-white dark:text-white light:text-slate-900 placeholder-slate-500 dark:placeholder-slate-500 light:placeholder-slate-400"
                  required
                />
              </div>
            </div>

            <div>
              <Label className="text-slate-300 dark:text-slate-300 light:text-slate-700 mb-2 flex items-center gap-2 text-sm">
                <Building className="w-4 h-4" />
                Role
              </Label>
              <Select value={signupForm.role} onValueChange={(value: any) => setSignupForm({ ...signupForm, role: value })}>
                <SelectTrigger className="bg-slate-900 dark:bg-slate-900 light:bg-slate-50 border-slate-700 dark:border-slate-700 light:border-slate-300 text-white dark:text-white light:text-slate-900">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 dark:bg-slate-900 light:bg-slate-50 border-slate-700 dark:border-slate-700 light:border-slate-300">
                  <SelectItem value="user" className="text-white dark:text-white light:text-slate-900">
                    User (Schedule Pickups)
                  </SelectItem>
                  <SelectItem value="collector" className="text-white dark:text-white light:text-slate-900">
                    Collector (Pickup Service)
                  </SelectItem>
                  <SelectItem value="recycler" className="text-white dark:text-white light:text-slate-900">
                    Recycler (Process E-Waste)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-slate-300 dark:text-slate-300 light:text-slate-700 mb-2 flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4" />
                Email
              </Label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={signupForm.email}
                onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                className="bg-slate-900 dark:bg-slate-900 light:bg-slate-50 border-slate-700 dark:border-slate-700 light:border-slate-300 text-white dark:text-white light:text-slate-900 placeholder-slate-500 dark:placeholder-slate-500 light:placeholder-slate-400"
                required
              />
            </div>

            <div>
              <Label className="text-slate-300 dark:text-slate-300 light:text-slate-700 mb-2 flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4" />
                Phone Number
              </Label>
              <Input
                type="tel"
                placeholder="+91 98765 43210"
                value={signupForm.phone}
                onChange={(e) => setSignupForm({ ...signupForm, phone: e.target.value })}
                className="bg-slate-900 dark:bg-slate-900 light:bg-slate-50 border-slate-700 dark:border-slate-700 light:border-slate-300 text-white dark:text-white light:text-slate-900 placeholder-slate-500 dark:placeholder-slate-500 light:placeholder-slate-400"
              />
            </div>

            <div>
              <Label className="text-slate-300 dark:text-slate-300 light:text-slate-700 mb-2 flex items-center gap-2 text-sm">
                <Lock className="w-4 h-4" />
                Password
              </Label>
              <Input
                type="password"
                placeholder="••••••••"
                value={signupForm.password}
                onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                className="bg-slate-900 dark:bg-slate-900 light:bg-slate-50 border-slate-700 dark:border-slate-700 light:border-slate-300 text-white dark:text-white light:text-slate-900 placeholder-slate-500 dark:placeholder-slate-500 light:placeholder-slate-400"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white border-0 h-12 font-semibold"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>

            <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-500 text-center">
              By signing up, you agree to our Terms of Service and Privacy Policy
            </p>
          </motion.form>
        )}

        {/* Footer Link */}
        <p className="text-center text-slate-400 dark:text-slate-400 light:text-slate-600 text-sm mt-6">
          {tab === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button
            onClick={() => setTab(tab === 'login' ? 'signup' : 'login')}
            className="text-emerald-400 dark:text-emerald-400 light:text-emerald-600 hover:text-emerald-300 dark:hover:text-emerald-300 light:hover:text-emerald-700 font-semibold"
          >
            {tab === 'login' ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </motion.div>
    </div>
  );
}

export default Auth;
