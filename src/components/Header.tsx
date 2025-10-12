import React, { useState } from 'react';
import { useApp } from '../App';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Search, ShoppingCart, User, Menu, Globe } from 'lucide-react';

const translations = {
  en: {
    home: 'Home',
    shop: 'Shop',
    about: 'About Us',
    contact: 'Contact',
    cart: 'Cart',
    account: 'Account',
    login: 'Login',
    search: 'Search products...',
    supplements: 'Supplements',
    cosmetics: 'Natural Cosmetics',
    herbal: 'Herbal Products',
    accessories: 'Wellness Accessories',
  },
  ar: {
    home: 'الرئيسية',
    shop: 'المتجر',
    about: 'من نحن',
    contact: 'اتصل بنا',
    cart: 'السلة',
    account: 'الحساب',
    login: 'تسجيل الدخول',
    search: 'البحث عن المنتجات...',
    supplements: 'المكملات الغذائية',
    cosmetics: 'مستحضرات التجميل الطبيعية',
    herbal: 'المنتجات العشبية',
    accessories: 'إكسسوارات العافية',
  },
};

export function Header() {
  const { currentPage, setCurrentPage, language, setLanguage, user, setShowLoginModal, cart } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const t = translations[language];

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  const navigationItems = [
    { key: 'home', label: t.home },
    { key: 'shop', label: t.shop },
    { key: 'about', label: t.about },
    { key: 'contact', label: t.contact },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-green-100 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer"
            onClick={() => setCurrentPage('home')}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mr-3">
              <span className="text-white font-bold">A</span>
            </div>
            <h1 className="text-xl text-green-800 tracking-wide">Afiya Zone</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <button
                key={item.key}
                onClick={() => setCurrentPage(item.key)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentPage === item.key
                    ? 'bg-green-100 text-green-800'
                    : 'text-gray-700 hover:text-green-700 hover:bg-green-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder={t.search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-green-200 focus:border-green-400 focus:ring-green-400"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
              className="hidden sm:flex items-center space-x-1 text-gray-600 hover:text-green-700"
            >
              <Globe className="w-4 h-4" />
              <span>{language === 'en' ? 'AR' : 'EN'}</span>
            </Button>

            {/* Cart */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentPage('cart')}
              className="relative text-gray-600 hover:text-green-700"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemsCount > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-green-500 text-white text-xs min-w-[1.2rem] h-5 flex items-center justify-center">
                  {cartItemsCount}
                </Badge>
              )}
            </Button>

            {/* User Account */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => user ? setCurrentPage('account') : setShowLoginModal(true)}
              className="hidden sm:flex items-center space-x-1 text-gray-600 hover:text-green-700"
            >
              <User className="w-4 h-4" />
              <span>{user ? user.name : t.login}</span>
            </Button>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side={language === 'ar' ? 'left' : 'right'} className="w-80">
                <div className="flex flex-col space-y-4 mt-8">
                  {/* Mobile Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder={t.search}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  {/* Mobile Navigation */}
                  {navigationItems.map((item) => (
                    <button
                      key={item.key}
                      onClick={() => {
                        setCurrentPage(item.key);
                        setShowMobileMenu(false);
                      }}
                      className={`text-left px-4 py-3 rounded-lg transition-colors ${
                        currentPage === item.key
                          ? 'bg-green-100 text-green-800'
                          : 'text-gray-700 hover:text-green-700 hover:bg-green-50'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}

                  {/* Mobile User Actions */}
                  <div className="border-t pt-4 space-y-2">
                    <button
                      onClick={() => {
                        user ? setCurrentPage('account') : setShowLoginModal(true);
                        setShowMobileMenu(false);
                      }}
                      className="w-full text-left px-4 py-3 rounded-lg text-gray-700 hover:text-green-700 hover:bg-green-50"
                    >
                      <User className="w-4 h-4 inline mr-2" />
                      {user ? user.name : t.login}
                    </button>
                    
                    <button
                      onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
                      className="w-full text-left px-4 py-3 rounded-lg text-gray-700 hover:text-green-700 hover:bg-green-50"
                    >
                      <Globe className="w-4 h-4 inline mr-2" />
                      {language === 'en' ? 'العربية' : 'English'}
                    </button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}