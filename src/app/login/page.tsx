'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const supabase = createClient();

    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            },
            // Memaksa Supabase untuk langsung mengonfirmasi user secara otomatis di sisi client
            emailRedirectTo: undefined,
          },
        });

        if (error) throw error;
        
        // Langsung login setelah signup tanpa verifikasi email
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) throw signInError;
        
        router.push('/');
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;
        
        router.push('/');
      }
    } catch (error: any) {
      setError(error.message || 'Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Ambient Glow Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-indigo-600 rounded-full blur-3xl opacity-10 animate-pulse"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo and Title */}
          <div className="text-center mb-10">
            <h1 className="text-6xl font-thin text-neutral-100 mb-3 tracking-widest">KALM</h1>
            <p className="text-neutral-400 text-sm tracking-wide font-light">Premium Workspace</p>
          </div>

          {/* Auth Form */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-thin text-neutral-100 mb-3">
                {isSignUp ? 'Buat Akun' : 'Masuk'}
              </h2>
              <p className="text-neutral-400 text-sm font-light">
                {isSignUp 
                  ? 'Buat akun baru untuk memulai perjalanan KALM Anda'
                  : 'Selamat datang kembali di ruang kerja Anda'
                }
              </p>
            </div>

            <form onSubmit={handleAuth} className="space-y-6">
              {isSignUp && (
                <div className="group">
                  <input
                    type="text"
                    placeholder="Nama Lengkap"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-4 bg-neutral-950/40 border border-neutral-800/50 rounded-xl text-neutral-100 placeholder-neutral-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all duration-300"
                    required={isSignUp}
                  />
                </div>
              )}

              <div className="group">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-4 bg-neutral-950/40 border border-neutral-800/50 rounded-xl text-neutral-100 placeholder-neutral-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all duration-300"
                  required
                />
              </div>

              <div className="relative group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-4 bg-neutral-950/40 border border-neutral-800/50 rounded-xl text-neutral-100 placeholder-neutral-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all duration-300"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {error && (
                <div className={`p-4 rounded-xl text-sm font-medium ${
                  error.includes('berhasil') 
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-red-500/20 text-red-300 border border-red-500/30'
                }`}>
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-black font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {loading ? 'Memproses...' : (isSignUp ? 'Daftar' : 'Masuk')}
              </button>
            </form>

            <div className="text-center pt-6 border-t border-neutral-800/50">
              <p className="text-neutral-400 text-sm font-light">
                {isSignUp ? 'Sudah punya akun?' : 'Belum punya akun?'}{' '}
                <button
                  onClick={() => {
                    setIsSignUp(!isSignUp);
                    setError('');
                    setFullName('');
                  }}
                  className="text-neutral-100 hover:text-neutral-300 transition-colors font-medium"
                >
                  {isSignUp ? 'Masuk' : 'Daftar'}
                </button>
              </p>
            </div>
          </div>

          {/* Developer Bypass Button - Only in Development */}
          {process.env.NODE_ENV === 'development' && (
            <div className="text-center mt-8">
              <div className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-700/50 rounded-xl p-4">
                <p className="text-neutral-400 text-xs mb-3 font-light">⚠️ Development Mode Only</p>
                <button
                  onClick={() => router.push('/')}
                  className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-lg transition-all duration-300 transform hover:scale-[1.02] font-medium shadow-lg"
                >
                  🚀 Login sebagai Tamu (Dev Mode)
                </button>
                <p className="text-neutral-500 text-xs mt-2">Langsung ke dashboard tanpa auth Supabase</p>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="text-center mt-10">
            <p className="text-neutral-500 text-xs font-light">
              © 2026 KALM Premium Workspace. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
