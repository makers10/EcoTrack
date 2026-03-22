import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Leaf, Mail, Lock, User, ArrowRight, Loader2, Sparkles, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api';

// Use the generated image (using a placeholder-like syntax that works with the local system)
import worldTreeImg from '../assets/world_tree_visual.png'; 

export function AuthPage({ mode }: { mode: 'login' | 'register' }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    name: '',
  });
  
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (mode === 'register') {
        const res = await api.post('/auth/register', {
          email: formData.email,
          password: formData.password,
          username: formData.username,
          name: formData.name,
        });
        localStorage.setItem('token', res.data.access_token);
        localStorage.setItem('user', JSON.stringify(res.data.user || res.data));
      } else {
        const res = await api.post('/auth/login', {
          email: formData.email,
          password: formData.password,
        });
        localStorage.setItem('token', res.data.access_token);
        localStorage.setItem('user', JSON.stringify(res.data.user || res.data));
      }
      window.location.href = '/dashboard';
    } catch (err: any) {
      setError(err.response?.data?.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = () => {
    localStorage.setItem('token', 'guest_token');
    localStorage.setItem('user', JSON.stringify({ name: 'Eco Guest', username: 'guest_user' }));
    window.location.href = '/dashboard';
  };

  return (
    <div className="min-h-screen bg-background flex text-text overflow-hidden">
      
      {/* Left Side: Visual/Inspirational - The "World Tree" Side */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        className="hidden lg:flex w-1/2 relative flex-col p-16 justify-between overflow-hidden"
      >
        <div className="absolute inset-0 z-10 bg-linear-to-b from-primary/5 via-transparent to-background/30" />
        <img 
          src={worldTreeImg} 
          alt="World Tree" 
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-100 scale-105"
        />

        <div className="absolute bottom-0 left-0 right-0 z-20 pb-10 bg-linear-to-t from-background via-background/60 to-transparent pt-32 px-12 flex flex-col items-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, type: 'spring', stiffness: 100 }}
              className="text-center space-y-1"
            >
              <h3 className="text-3xl font-black tracking-[0.3em] text-white drop-shadow-2xl uppercase">
                EcoTrack
              </h3>
              <p className="text-base font-bold text-primary drop-shadow-md tracking-widest opacity-90">
                Nurturing the Roots of Tomorrow, Today.
              </p>
            </motion.div>
        </div>
      </motion.div>

      {/* Right Side: Action/Form Side */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-full lg:w-1/2 flex items-center justify-center p-3 bg-surface/30 backdrop-blur-3xl lg:bg-transparent"
      >
        <div className="w-full max-w-sm space-y-6 m-3">
          <div className="text-center lg:text-left">
            <h1 className="text-2xl font-black mb-1">
              {mode === 'login' ? 'Welcome Back!' : 'Plant Your Seed'}
            </h1>
            <p className="text-text-muted text-xs">
              {mode === 'login' ? 'Continue your journey.' : 'Start your journey today.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <AnimatePresence mode="wait">
              {mode === 'register' && (
                <motion.div 
                   initial={{ opacity: 0, height: 0 }} 
                   animate={{ opacity: 1, height: 'auto' }} 
                   exit={{ opacity: 0, height: 0 }}
                   className="space-y-3"
                >
                  <div className="relative group">
                    <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                    <input
                      type="text"
                      required
                      className="input-field w-full pl-10 h-10 text-sm bg-white/5 border-white/10"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="relative group">
                    <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                    <input
                      type="text"
                      required
                      className="input-field w-full pl-10 h-10 text-sm bg-white/5 border-white/10"
                      placeholder="Username"
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative group">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
              <input
                type="email"
                required
                className="input-field w-full pl-10 h-10 text-sm bg-white/5 border-white/10"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="relative group">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
              <input
                type="password"
                required
                className="input-field w-full pl-10 h-10 text-sm bg-white/5 border-white/10"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>

            {error && <p className="text-red-400 text-[10px] font-bold text-center bg-red-400/10 p-2 rounded-lg border border-red-400/20">{error}</p>}

            <button type="submit" disabled={loading} className="btn-primary w-full h-10 flex items-center justify-center gap-2 text-sm">
              {loading ? <Loader2 size={16} className="animate-spin" /> : (
                <>
                  {mode === 'login' ? 'Sign In' : 'Join Now'}
                  <ArrowRight size={16} />
                </>
              )}
            </button>

            <div className="relative py-2 flex items-center">
               <div className="flex-1 border-t border-white/10"></div>
               <span className="px-3 text-[9px] font-bold text-text-muted uppercase tracking-widest">or</span>
               <div className="flex-1 border-t border-white/10"></div>
            </div>

            <button 
              type="button" 
              onClick={handleGuestLogin}
              className="w-full h-10 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-bold transition-all border border-white/5 group"
            >
              Explore as <span className="text-primary underline">Eco Guest</span>
            </button>
          </form>

          <footer className="text-center pt-3 border-t border-white/5">
            <p className="text-text-muted text-xs font-medium">
              {mode === 'login' ? "New here?" : "Already joined?"}{' '}
              <Link 
                to={mode === 'login' ? '/signup' : '/login'} 
                className="text-primary hover:text-primary-light font-bold transition-colors underline"
              >
                {mode === 'login' ? 'Create Account' : 'Log In'}
              </Link>
            </p>
          </footer>
        </div>
      </motion.div>
    </div>
  );
}
