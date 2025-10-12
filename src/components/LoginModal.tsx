import React, { useState } from 'react';
import { useApp } from '../App';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Eye, EyeOff, User, Mail, Lock } from 'lucide-react';
import { toast } from 'sonner';

const translations = {
  en: {
    welcome: 'Welcome to Afiya Zone',
    login: 'Login',
    register: 'Register',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    firstName: 'First Name',
    lastName: 'Last Name',
    phone: 'Phone Number',
    forgotPassword: 'Forgot Password?',
    noAccount: "Don't have an account?",
    hasAccount: 'Already have an account?',
    signUp: 'Sign Up',
    signIn: 'Sign In',
    createAccount: 'Create Account',
    loginSuccess: 'Welcome back!',
    registerSuccess: 'Account created successfully!',
    invalidCredentials: 'Invalid email or password',
    emailRequired: 'Email is required',
    passwordRequired: 'Password is required',
    passwordMismatch: 'Passwords do not match',
    nameRequired: 'Name is required',
    phoneRequired: 'Phone number is required',
    termsAccept: 'I accept the Terms and Conditions',
    newsletter: 'Subscribe to our newsletter for wellness tips',
    close: 'Close',
  },
  ar: {
    welcome: 'مرحباً بك في منطقة العافية',
    login: 'تسجيل الدخول',
    register: 'إنشاء حساب',
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    confirmPassword: 'تأكيد كلمة المرور',
    firstName: 'الاسم الأول',
    lastName: 'اسم العائلة',
    phone: 'رقم الهاتف',
    forgotPassword: 'نسيت كلمة المرور؟',
    noAccount: 'ليس لديك حساب؟',
    hasAccount: 'لديك حساب بالفعل؟',
    signUp: 'إنشاء حساب',
    signIn: 'تسجيل الدخول',
    createAccount: 'إنشاء الحساب',
    loginSuccess: 'مرحباً بعودتك!',
    registerSuccess: 'تم إنشاء الحساب بنجاح!',
    invalidCredentials: 'بريد إلكتروني أو كلمة مرور غير صحيحة',
    emailRequired: 'البريد الإلكتروني مطلوب',
    passwordRequired: 'كلمة المرور مطلوبة',
    passwordMismatch: 'كلمة المرور غير متطابقة',
    nameRequired: 'الاسم مطلوب',
    phoneRequired: 'رقم الهاتف مطلوب',
    termsAccept: 'أوافق على الشروط والأحكام',
    newsletter: 'اشترك في نشرتنا الإخبارية للحصول على نصائح العافية',
    close: 'إغلاق',
  },
};

export function LoginModal() {
  const { language, showLoginModal, setShowLoginModal, setUser } = useApp();
  const t = translations[language];

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Login form state
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  // Register form state
  const [registerForm, setRegisterForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    newsletter: false,
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validation
    if (!loginForm.email) {
      toast.error(t.emailRequired);
      setIsLoading(false);
      return;
    }
    if (!loginForm.password) {
      toast.error(t.passwordRequired);
      setIsLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      // Mock successful login
      const mockUser = {
        id: 1,
        name: 'Ahmed Hassan',
        email: loginForm.email,
        phone: '+966501234567',
        joinDate: '2024-01-15',
      };

      setUser(mockUser);
      setShowLoginModal(false);
      toast.success(`${t.loginSuccess} ${t.welcome}, ${mockUser.name}!`);
      setIsLoading(false);

      // Reset form
      setLoginForm({ email: '', password: '' });
    }, 1000);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validation
    if (!registerForm.firstName || !registerForm.lastName) {
      toast.error(t.nameRequired);
      setIsLoading(false);
      return;
    }
    if (!registerForm.email) {
      toast.error(t.emailRequired);
      setIsLoading(false);
      return;
    }
    if (!registerForm.phone) {
      toast.error(t.phoneRequired);
      setIsLoading(false);
      return;
    }
    if (!registerForm.password) {
      toast.error(t.passwordRequired);
      setIsLoading(false);
      return;
    }
    if (registerForm.password !== registerForm.confirmPassword) {
      toast.error(t.passwordMismatch);
      setIsLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      // Mock successful registration
      const mockUser = {
        id: 2,
        name: `${registerForm.firstName} ${registerForm.lastName}`,
        email: registerForm.email,
        phone: registerForm.phone,
        joinDate: new Date().toISOString().split('T')[0],
      };

      setUser(mockUser);
      setShowLoginModal(false);
      toast.success(`${t.registerSuccess} ${t.welcome}, ${mockUser.name}!`);
      setIsLoading(false);

      // Reset form
      setRegisterForm({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false,
        newsletter: false,
      });
    }, 1000);
  };

  return (
    <Dialog open={showLoginModal} onOpenChange={setShowLoginModal}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-green-800">
            {t.welcome}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-green-50">
            <TabsTrigger 
              value="login" 
              className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
            >
              {t.login}
            </TabsTrigger>
            <TabsTrigger 
              value="register" 
              className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
            >
              {t.register}
            </TabsTrigger>
          </TabsList>

          {/* Login Tab */}
          <TabsContent value="login">
            <Card>
              <form onSubmit={handleLogin}>
                <CardHeader>
                  <div className="text-center">
                    <User className="w-12 h-12 text-green-600 mx-auto mb-2" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">{t.email}</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="example@afiyazone.com"
                        value={loginForm.email}
                        onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password">{t.password}</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="login-password"
                        type={showPassword ? 'text' : 'password'}
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                        className="pl-10 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <Button variant="link" size="sm" className="text-green-600 hover:text-green-700 p-0">
                      {t.forgotPassword}
                    </Button>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Loading...' : t.signIn}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          {/* Register Tab */}
          <TabsContent value="register">
            <Card>
              <form onSubmit={handleRegister}>
                <CardContent className="space-y-4 pt-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">{t.firstName}</Label>
                      <Input
                        id="first-name"
                        value={registerForm.firstName}
                        onChange={(e) => setRegisterForm({ ...registerForm, firstName: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">{t.lastName}</Label>
                      <Input
                        id="last-name"
                        value={registerForm.lastName}
                        onChange={(e) => setRegisterForm({ ...registerForm, lastName: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-email">{t.email}</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="example@afiyazone.com"
                        value={registerForm.email}
                        onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">{t.phone}</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+966501234567"
                      value={registerForm.phone}
                      onChange={(e) => setRegisterForm({ ...registerForm, phone: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-password">{t.password}</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="register-password"
                        type={showPassword ? 'text' : 'password'}
                        value={registerForm.password}
                        onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                        className="pl-10 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">{t.confirmPassword}</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="confirm-password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={registerForm.confirmPassword}
                        onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                        className="pl-10 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="terms"
                        checked={registerForm.acceptTerms}
                        onChange={(e) => setRegisterForm({ ...registerForm, acceptTerms: e.target.checked })}
                        className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                        required
                        placeholder={t.termsAccept}
                        title={t.termsAccept}
                      />
                      <Label htmlFor="terms" className="text-sm">
                        {t.termsAccept}
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="newsletter"
                        checked={registerForm.newsletter}
                        onChange={(e) => setRegisterForm({ ...registerForm, newsletter: e.target.checked })}
                        className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                        title={t.newsletter}
                        placeholder={t.newsletter}
                      />
                      <Label htmlFor="newsletter" className="text-sm">
                        {t.newsletter}
                      </Label>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Loading...' : t.createAccount}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}