import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { User, Mail, Phone, ArrowRight, LogIn, Lock, Eye, EyeOff, Key, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

export function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    username: '',
    password: '',
    confirmPassword: '',
    isOwner: false,
    accessWord: '',
  });
  const [errors, setErrors] = useState<{ 
    fullName?: string; 
    email?: string; 
    phone?: string;
    username?: string;
    password?: string;
    confirmPassword?: string;
    accessWord?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showAccessWord, setShowAccessWord] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^\+?[\d\s\-()]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
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

  const validateStep1 = () => {
    const newErrors: { fullName?: string; email?: string; phone?: string } = {};
    
    if (!formData.fullName) {
      newErrors.fullName = 'El nombre completo es requerido';
    } else if (formData.fullName.length < 3) {
      newErrors.fullName = 'El nombre debe tener al menos 3 caracteres';
    }
    
    if (!formData.email) {
      newErrors.email = 'El correo electrónico es requerido';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Por favor ingresa un correo electrónico válido';
    }
    
    if (!formData.phone) {
      newErrors.phone = 'El teléfono es requerido';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Por favor ingresa un número de teléfono válido';
    }
    
    return newErrors;
  };

  const validateStep2 = () => {
    const newErrors: { username?: string; password?: string; confirmPassword?: string; accessWord?: string } = {};
    
    if (!formData.username) {
      newErrors.username = 'El nombre de usuario es requerido';
    } else if (formData.username.length < 3) {
      newErrors.username = 'El usuario debe tener al menos 3 caracteres';
    }
    
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirma tu contraseña';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    if (formData.isOwner) {
      if (!formData.accessWord) {
        newErrors.accessWord = 'La palabra de acceso es requerida para propietarios';
      } else if (formData.accessWord.length < 4) {
        newErrors.accessWord = 'La palabra de acceso debe tener al menos 4 caracteres';
      }
    }
    
    return newErrors;
  };

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();
    
    let newErrors = {};
    
    if (step === 1) {
      newErrors = validateStep1();
    } else if (step === 2) {
      newErrors = validateStep2();
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulación de llamada API
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (step < 3) {
        setStep(step + 1);
        toast.success(`Paso ${step} completado`, {
          description: 'Continúa con el siguiente paso',
        });
      } else {
        // Registro completo
        const userType = formData.isOwner ? 'propietario' : 'usuario';
        toast.success('¡Cuenta creada exitosamente!', {
          description: `Bienvenido ${formData.fullName} como ${userType}`,
        });
        console.log('Registration complete:', formData);
        setTimeout(() => navigate('/'), 2000);
      }
    } catch (error) {
      toast.error('Error al procesar', {
        description: 'Por favor intenta nuevamente',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSocialRegister = (provider: string) => {
    toast.info(`Registrando con ${provider}...`, {
      description: 'Esta es una demostración',
    });
  };

  const progressWidth = (step / 3) * 100;

  return (
    <div className="bg-[#E1E5F2] min-h-screen flex items-center justify-center p-6" style={{ fontFamily: 'var(--font-inter)' }}>
      <div className="w-full max-w-[1000px] flex flex-col gap-6">
        {/* Logo Area */}
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="size-8 text-[#2ba692]">
            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_6_330)">
                <path clipRule="evenodd" d="M24 0.757355L47.2426 24L24 47.2426L0.757355 24L24 0.757355ZM21 35.7574V12.2426L9.24264 24L21 35.7574Z" fill="currentColor" fillRule="evenodd" />
              </g>
              <defs>
                <clipPath id="clip0_6_330">
                  <rect fill="white" height="48" width="48" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <h1 className="text-[#333745] text-2xl font-bold tracking-tight">Rural Rental</h1>
        </div>

        {/* Main Card Container */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden flex flex-col md:flex-row min-h-[600px]">
          {/* Left Side: Visual/Context */}
          <div 
            className="hidden md:flex md:w-5/12 bg-[#2ba692] relative overflow-hidden flex-col justify-end p-10 text-white"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=1200&fit=crop')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 z-0 opacity-40 bg-center bg-cover"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#2ba692]/90 to-transparent z-10"></div>
            <div className="relative z-20">
              <h2 className="text-3xl font-bold mb-4 leading-tight">Escape to the peaceful countryside.</h2>
              <p className="text-white/80 text-lg">Join thousands of travelers finding their perfect rural retreat.</p>
            </div>
          </div>

          {/* Right Side: Registration Form */}
          <div className="flex-1 p-8 lg:p-12 flex flex-col">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-[#333745]">Create Account</h2>
                <span className="text-sm font-semibold text-[#2ba692]">Step {step} of 3</span>
              </div>
              {/* Progress Bar */}
              <div className="w-full bg-slate-100 h-2 rounded-full mb-2">
                <div 
                  className="bg-[#2ba692] h-2 rounded-full transition-all duration-500"
                  style={{ width: `${progressWidth}%` }}
                ></div>
              </div>
              <p className="text-slate-500 text-sm">
                {step === 1 && 'Personal Information'}
                {step === 2 && 'Account Credentials'}
                {step === 3 && 'Preferences & Confirmation'}
              </p>
            </div>

            <form className="space-y-4 flex-1 flex flex-col" onSubmit={handleNext}>
              {/* Step 1: Personal Information */}
              {step === 1 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="space-y-1">
                    <label className="block text-sm font-semibold text-[#333745]">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                      <input
                        className={`w-full pl-10 pr-4 py-3 border ${
                          errors.fullName ? 'border-red-500' : 'border-slate-200'
                        } rounded-lg focus:ring-2 focus:ring-[#2ba692]/20 focus:border-[#2ba692] outline-none transition-all text-[#333745]`}
                        placeholder="John Doe"
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                      />
                    </div>
                    {errors.fullName && (
                      <p className="text-red-500 text-xs">{errors.fullName}</p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="block text-sm font-semibold text-[#333745]">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                      <input
                        className={`w-full pl-10 pr-4 py-3 border ${
                          errors.email ? 'border-red-500' : 'border-slate-200'
                        } rounded-lg focus:ring-2 focus:ring-[#2ba692]/20 focus:border-[#2ba692] outline-none transition-all text-[#333745]`}
                        placeholder="john@example.com"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-xs">{errors.email}</p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="block text-sm font-semibold text-[#333745]">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                      <input
                        className={`w-full pl-10 pr-4 py-3 border ${
                          errors.phone ? 'border-red-500' : 'border-slate-200'
                        } rounded-lg focus:ring-2 focus:ring-[#2ba692]/20 focus:border-[#2ba692] outline-none transition-all text-[#333745]`}
                        placeholder="+1 (555) 000-0000"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-red-500 text-xs">{errors.phone}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Step 2: Account Credentials */}
              {step === 2 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="space-y-1">
                    <label className="block text-sm font-semibold text-[#333745]">Username</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                      <input
                        className={`w-full pl-10 pr-4 py-3 border ${
                          errors.username ? 'border-red-500' : 'border-slate-200'
                        } rounded-lg focus:ring-2 focus:ring-[#2ba692]/20 focus:border-[#2ba692] outline-none transition-all text-[#333745]`}
                        placeholder="john_doe"
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                      />
                    </div>
                    {errors.username && (
                      <p className="text-red-500 text-xs">{errors.username}</p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="block text-sm font-semibold text-[#333745]">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                      <input
                        className={`w-full pl-10 pr-12 py-3 border ${
                          errors.password ? 'border-red-500' : 'border-slate-200'
                        } rounded-lg focus:ring-2 focus:ring-[#2ba692]/20 focus:border-[#2ba692] outline-none transition-all text-[#333745]`}
                        placeholder="••••••••"
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-red-500 text-xs">{errors.password}</p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="block text-sm font-semibold text-[#333745]">Confirm Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                      <input
                        className={`w-full pl-10 pr-12 py-3 border ${
                          errors.confirmPassword ? 'border-red-500' : 'border-slate-200'
                        } rounded-lg focus:ring-2 focus:ring-[#2ba692]/20 focus:border-[#2ba692] outline-none transition-all text-[#333745]`}
                        placeholder="••••••••"
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-xs">{errors.confirmPassword}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <input
                      className="size-4 rounded border-slate-300 text-[#2ba692] focus:ring-[#2ba692]"
                      id="isOwner"
                      name="isOwner"
                      type="checkbox"
                      checked={formData.isOwner}
                      onChange={handleInputChange}
                    />
                    <label className="text-sm text-[#333745] font-semibold cursor-pointer" htmlFor="isOwner">
                      Crear cuenta como propietario
                    </label>
                  </div>

                  {formData.isOwner && (
                    <div className="space-y-1 animate-in fade-in slide-in-from-top-2 duration-300">
                      <label className="block text-sm font-semibold text-[#333745]">Palabra de Acceso (Propietarios)</label>
                      <div className="relative">
                        <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input
                          className={`w-full pl-10 pr-12 py-3 border ${
                            errors.accessWord ? 'border-red-500' : 'border-slate-200'
                          } rounded-lg focus:ring-2 focus:ring-[#2ba692]/20 focus:border-[#2ba692] outline-none transition-all text-[#333745]`}
                          placeholder="Palabra de acceso especial"
                          type={showAccessWord ? 'text' : 'password'}
                          name="accessWord"
                          value={formData.accessWord}
                          onChange={handleInputChange}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                          onClick={() => setShowAccessWord(!showAccessWord)}
                        >
                          {showAccessWord ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                      {errors.accessWord && (
                        <p className="text-red-500 text-xs">{errors.accessWord}</p>
                      )}
                      <p className="text-xs text-slate-500 italic">
                        * Esta palabra te permite acceder a funciones exclusivas de propietario
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Step 3: Confirmation */}
              {step === 3 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="bg-slate-50 rounded-lg p-6 space-y-4">
                    <h3 className="text-lg font-bold text-[#333745]">Resumen de tu cuenta</h3>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between py-2 border-b border-slate-200">
                        <span className="text-sm text-slate-600">Nombre completo:</span>
                        <span className="text-sm font-semibold text-[#333745]">{formData.fullName}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-slate-200">
                        <span className="text-sm text-slate-600">Email:</span>
                        <span className="text-sm font-semibold text-[#333745]">{formData.email}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-slate-200">
                        <span className="text-sm text-slate-600">Teléfono:</span>
                        <span className="text-sm font-semibold text-[#333745]">{formData.phone}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-slate-200">
                        <span className="text-sm text-slate-600">Usuario:</span>
                        <span className="text-sm font-semibold text-[#333745]">{formData.username}</span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="text-sm text-slate-600">Tipo de cuenta:</span>
                        <span className={`text-sm font-semibold ${formData.isOwner ? 'text-[#2ba692]' : 'text-[#333745]'}`}>
                          {formData.isOwner ? '👑 Propietario' : '👤 Usuario'}
                        </span>
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                      <p className="text-xs text-blue-800">
                        ✓ Al crear tu cuenta aceptas nuestros términos y condiciones
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-3 mt-auto pt-6">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex items-center justify-center gap-2 py-3 px-6 border border-slate-300 rounded-lg text-[#333745] font-semibold hover:bg-slate-50 transition-colors"
                  >
                    <ArrowLeft size={20} />
                    <span>Back</span>
                  </button>
                )}
                
                <button
                  className="flex-1 bg-[#2ba692] hover:bg-[#2ba692]/90 text-white font-bold py-4 rounded-lg transition-colors shadow-lg shadow-[#2ba692]/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  type="submit"
                  disabled={isLoading}
                >
                  <span>
                    {isLoading ? 'Processing...' : step === 3 ? 'Create Account' : 'Continue'}
                  </span>
                  <ArrowRight size={20} />
                </button>
              </div>
            </form>

            {step === 1 && (
              <>
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-slate-500 uppercase tracking-widest text-xs font-bold">
                      Or register with
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    className="flex items-center justify-center gap-2 py-3 px-4 border border-[#333745]/20 rounded-lg text-[#333745] font-medium hover:bg-slate-50 transition-colors"
                    type="button"
                    onClick={() => handleSocialRegister('Google')}
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                    </svg>
                    <span>Google</span>
                  </button>
                  <button
                    className="flex items-center justify-center gap-2 py-3 px-4 border border-[#333745]/20 rounded-lg text-[#333745] font-medium hover:bg-slate-50 transition-colors"
                    type="button"
                    onClick={() => handleSocialRegister('Facebook')}
                  >
                    <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
                    </svg>
                    <span>Facebook</span>
                  </button>
                </div>
              </>
            )}

            <div className="mt-6 text-center">
              <p className="text-slate-500">Already have an account?</p>
              <Link to="/" className="text-[#AA4465] font-bold hover:underline inline-flex items-center gap-1 mt-1">
                <LogIn size={16} />
                Back to Login
              </Link>
            </div>
          </div>
        </div>

        {/* Trust Badges Footer */}
        <div className="flex flex-wrap justify-center gap-8 text-[#333745]/40 font-semibold text-xs uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">verified_user</span>
            Secure Verification
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">encrypted</span>
            Privacy First
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">support_agent</span>
            24/7 Rural Support
          </div>
        </div>
      </div>
    </div>
  );
}
