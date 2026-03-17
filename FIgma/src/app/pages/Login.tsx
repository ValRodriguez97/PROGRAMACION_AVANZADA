import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Mail, Lock, Eye, EyeOff, User, Key } from 'lucide-react';
import { toast } from 'sonner';

export function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    isOwner: false,
    accessWord: '',
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showAccessWord, setShowAccessWord] = useState(false);
  const [errors, setErrors] = useState<{ username?: string; email?: string; password?: string; accessWord?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Limpiar errores al escribir
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validación
    const newErrors: { username?: string; email?: string; password?: string; accessWord?: string } = {};
    
    if (!formData.username) {
      newErrors.username = 'El nombre de usuario es requerido';
    } else if (formData.username.length < 3) {
      newErrors.username = 'El usuario debe tener al menos 3 caracteres';
    }

    if (!formData.email) {
      newErrors.email = 'El correo electrónico es requerido';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Por favor ingresa un correo electrónico válido';
    }
    
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    if (formData.isOwner) {
      if (!formData.accessWord) {
        newErrors.accessWord = 'La palabra de acceso es requerida para propietarios';
      } else if (formData.accessWord.length < 4) {
        newErrors.accessWord = 'La palabra de acceso debe tener al menos 4 caracteres';
      }
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Simular login
    setIsLoading(true);
    
    try {
      // Simulación de llamada API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const userType = formData.isOwner ? 'propietario' : 'usuario';
      toast.success('¡Inicio de sesión exitoso!', {
        description: `Bienvenido de nuevo, ${formData.username} (${userType})`,
      });
      
      console.log('Login successful:', formData);
    } catch (error) {
      toast.error('Error al iniciar sesión', {
        description: 'Por favor verifica tus credenciales',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    toast.info(`Iniciando sesión con ${provider}...`, {
      description: 'Esta es una demostración',
    });
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden" style={{ fontFamily: 'var(--font-display)' }}>
      {/* Navigation */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-[#E1E5F2] bg-white px-10 py-3 z-10">
        <div className="flex items-center gap-4 text-[#333745]">
          <div className="size-6 text-[#2CA58D]">
            <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path clipRule="evenodd" d="M24 0.757355L47.2426 24L24 47.2426L0.757355 24L24 0.757355ZM21 35.7574V12.2426L9.24264 24L21 35.7574Z" fillRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-[#333745] text-xl font-bold leading-tight tracking-[-0.015em]">Rural Rental</h2>
        </div>
        <div className="flex flex-1 justify-end gap-8">
          <div className="flex items-center gap-9">
            <a className="text-[#333745] text-sm font-medium hover:text-[#2CA58D] transition-colors" href="#">Browse Cabins</a>
            <a className="text-[#333745] text-sm font-medium hover:text-[#2CA58D] transition-colors" href="#">Host Your Home</a>
            <a className="text-[#333745] text-sm font-medium hover:text-[#2CA58D] transition-colors" href="#">Help</a>
          </div>
          <div className="flex gap-2">
            <button className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-[#2CA58D] text-white text-sm font-bold">
              Log In
            </button>
            <Link to="/register">
              <button className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-[#f8f6f7] text-[#333745] text-sm font-bold border border-[#E1E5F2]">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content (Split Screen) */}
      <main className="flex flex-1">
        {/* Left Side: Cozy Cabin Image */}
        <div 
          className="hidden lg:flex lg:w-1/2 bg-cover bg-center relative" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=1200&h=1200&fit=crop')" }}
        >
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute bottom-12 left-12 right-12 text-white">
            <h1 className="text-5xl font-black leading-tight tracking-tight mb-4 drop-shadow-md">
              Escape to the <br />peace of nature.
            </h1>
            <p className="text-lg font-medium drop-shadow-sm max-w-md">
              Discover hand-picked cabins and rural retreats away from the city noise.
            </p>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
          <div className="w-full max-w-[440px] flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <h2 className="text-3xl font-black text-[#333745] tracking-tight">Welcome Back</h2>
              <p className="text-[#333745]/70 text-base">Please enter your details to sign in to your account.</p>
            </div>

            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-[#333745] px-1" htmlFor="username">
                  Username
                </label>
                <div className="relative flex items-center">
                  <User className="absolute left-4 text-[#333745]/40" size={20} />
                  <input
                    className={`w-full h-14 pl-12 pr-4 rounded-xl border ${
                      errors.username ? 'border-red-500' : 'border-[#E1E5F2]'
                    } bg-white text-[#333745] focus:ring-2 focus:ring-[#2CA58D]/20 focus:border-[#2CA58D] outline-none transition-all placeholder:text-[#333745]/30`}
                    id="username"
                    name="username"
                    placeholder="john_doe"
                    type="text"
                    value={formData.username}
                    onChange={handleInputChange}
                  />
                </div>
                {errors.username && (
                  <p className="text-red-500 text-xs px-1">{errors.username}</p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-[#333745] px-1" htmlFor="email">
                  Email Address
                </label>
                <div className="relative flex items-center">
                  <Mail className="absolute left-4 text-[#333745]/40" size={20} />
                  <input
                    className={`w-full h-14 pl-12 pr-4 rounded-xl border ${
                      errors.email ? 'border-red-500' : 'border-[#E1E5F2]'
                    } bg-white text-[#333745] focus:ring-2 focus:ring-[#2CA58D]/20 focus:border-[#2CA58D] outline-none transition-all placeholder:text-[#333745]/30`}
                    id="email"
                    name="email"
                    placeholder="you@example.com"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs px-1">{errors.email}</p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center px-1">
                  <label className="text-sm font-bold text-[#333745]" htmlFor="password">
                    Password
                  </label>
                  <a className="text-xs font-bold text-[#AA4465] hover:underline" href="#">
                    Forgot Password?
                  </a>
                </div>
                <div className="relative flex items-center">
                  <Lock className="absolute left-4 text-[#333745]/40" size={20} />
                  <input
                    className={`w-full h-14 pl-12 pr-12 rounded-xl border ${
                      errors.password ? 'border-red-500' : 'border-[#E1E5F2]'
                    } bg-white text-[#333745] focus:ring-2 focus:ring-[#2CA58D]/20 focus:border-[#2CA58D] outline-none transition-all placeholder:text-[#333745]/30`}
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  <button
                    type="button"
                    className="absolute right-4 text-[#333745]/40 hover:text-[#333745]/70 transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs px-1">{errors.password}</p>
                )}
              </div>

              <div className="flex items-center gap-2 px-1">
                <input
                  className="size-4 rounded border-[#E1E5F2] text-[#2CA58D] focus:ring-[#2CA58D]"
                  id="isOwner"
                  name="isOwner"
                  type="checkbox"
                  checked={formData.isOwner}
                  onChange={handleInputChange}
                />
                <label className="text-sm text-[#333745] font-semibold cursor-pointer" htmlFor="isOwner">
                  Ingresar como propietario
                </label>
              </div>

              {formData.isOwner && (
                <div className="flex flex-col gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
                  <label className="text-sm font-bold text-[#333745] px-1" htmlFor="accessWord">
                    Palabra de Acceso (Propietarios)
                  </label>
                  <div className="relative flex items-center">
                    <Key className="absolute left-4 text-[#333745]/40" size={20} />
                    <input
                      className={`w-full h-14 pl-12 pr-12 rounded-xl border ${
                        errors.accessWord ? 'border-red-500' : 'border-[#E1E5F2]'
                      } bg-white text-[#333745] focus:ring-2 focus:ring-[#2CA58D]/20 focus:border-[#2CA58D] outline-none transition-all placeholder:text-[#333745]/30`}
                      id="accessWord"
                      name="accessWord"
                      placeholder="Palabra de acceso"
                      type={showAccessWord ? 'text' : 'password'}
                      value={formData.accessWord}
                      onChange={handleInputChange}
                    />
                    <button
                      type="button"
                      className="absolute right-4 text-[#333745]/40 hover:text-[#333745]/70 transition-colors"
                      onClick={() => setShowAccessWord(!showAccessWord)}
                    >
                      {showAccessWord ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {errors.accessWord && (
                    <p className="text-red-500 text-xs px-1">{errors.accessWord}</p>
                  )}
                </div>
              )}

              <div className="flex items-center gap-2 px-1">
                <input
                  className="size-4 rounded border-[#E1E5F2] text-[#2CA58D] focus:ring-[#2CA58D]"
                  id="remember"
                  name="rememberMe"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                />
                <label className="text-sm text-[#333745]/70 cursor-pointer" htmlFor="remember">
                  Remember me for 30 days
                </label>
              </div>

              <button
                className="w-full h-14 bg-[#2CA58D] text-white rounded-xl font-bold text-lg shadow-lg shadow-[#2CA58D]/20 hover:bg-[#2CA58D]/90 transition-all active:scale-[0.98] mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'Logging In...' : 'Log In'}
              </button>
            </form>

            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-[#E1E5F2]"></div>
              <span className="flex-shrink mx-4 text-[#333745]/40 text-xs font-bold uppercase tracking-widest">
                or continue with
              </span>
              <div className="flex-grow border-t border-[#E1E5F2]"></div>
            </div>

            <div className="flex gap-4">
              <button 
                className="flex-1 h-12 flex items-center justify-center gap-2 border border-[#E1E5F2] rounded-xl hover:bg-[#f8f6f7] transition-colors text-sm font-bold text-[#333745]"
                type="button"
                onClick={() => handleSocialLogin('Google')}
              >
                <img
                  alt="Google"
                  className="size-5"
                  src="https://www.google.com/favicon.ico"
                />
                Google
              </button>
              <button 
                className="flex-1 h-12 flex items-center justify-center gap-2 border border-[#E1E5F2] rounded-xl hover:bg-[#f8f6f7] transition-colors text-sm font-bold text-[#333745]"
                type="button"
                onClick={() => handleSocialLogin('Apple')}
              >
                <span className="material-symbols-outlined text-xl">apple</span>
                Apple
              </button>
            </div>

            <p className="text-center text-sm text-[#333745]/70">
              Don't have an account?{' '}
              <Link to="/register" className="text-[#AA4465] font-bold hover:underline">
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="bg-white border-t border-[#E1E5F2] px-10 py-6 text-center lg:text-left">
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[#333745]/50">© 2024 Rural Rental Inc. All rights reserved.</p>
          <div className="flex gap-6 text-xs text-[#333745]/50 font-medium">
            <a className="hover:text-[#2CA58D]" href="#">Privacy Policy</a>
            <a className="hover:text-[#2CA58D]" href="#">Terms of Service</a>
            <a className="hover:text-[#2CA58D]" href="#">Cookie Settings</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
