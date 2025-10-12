import React, { useState, createContext, useContext } from 'react';
import { Header } from './components/Header';
import { Homepage } from './components/Homepage';
import { Shop } from './components/Shop';
import { ProductDetail } from './components/ProductDetail';
import { Cart } from './components/Cart';
import { Checkout } from './components/Checkout';
import { UserAccount } from './components/UserAccount';
import { AboutUs } from './components/AboutUs';
import { Contact } from './components/Contact';
import { LoginModal } from './components/LoginModal';
import { Footer } from './components/Footer';
import { Toaster } from './components/ui/sonner';

// Context for global state
interface AppContextType {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  language: 'en' | 'ar';
  setLanguage: (lang: 'en' | 'ar') => void;
  user: any;
  setUser: (user: any) => void;
  cart: any[];
  setCart: (cart: any[]) => void;
  selectedProduct: any;
  setSelectedProduct: (product: any) => void;
  showLoginModal: boolean;
  setShowLoginModal: (show: boolean) => void;
}

const AppContext = createContext<AppContextType>({} as AppContextType);

export const useApp = () => useContext(AppContext);

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const contextValue = {
    currentPage,
    setCurrentPage,
    language,
    setLanguage,
    user,
    setUser,
    cart,
    setCart,
    selectedProduct,
    setSelectedProduct,
    showLoginModal,
    setShowLoginModal,
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <Homepage />;
      case 'shop':
        return <Shop />;
      case 'product':
        return <ProductDetail />;
      case 'cart':
        return <Cart />;
      case 'checkout':
        return <Checkout />;
      case 'account':
        return <UserAccount />;
      case 'about':
        return <AboutUs />;
      case 'contact':
        return <Contact />;
      default:
        return <Homepage />;
    }
  };

  return (
    <AppContext.Provider value={contextValue}>
      <div className={`min-h-screen bg-gradient-to-br from-green-50 to-white ${language === 'ar' ? 'rtl' : 'ltr'}`}>
        <Header />
        <main className="pt-20">
          {renderCurrentPage()}
        </main>
        <Footer />
        {showLoginModal && <LoginModal />}
        <Toaster />
      </div>
    </AppContext.Provider>
  );
}