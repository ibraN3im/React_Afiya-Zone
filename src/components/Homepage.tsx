import React from 'react';
import { useApp } from '../App';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Star, Leaf, Heart, Shield, ArrowRight } from 'lucide-react';

const translations = {
  en: {
    heroTitle: 'Your Trusted Care & Wellness Zone',
    heroSubtitle: 'Discover premium natural products for a healthier, happier you',
    shopNow: 'Shop Now',
    learnMore: 'Learn More',
    featuredProducts: 'Featured Products',
    viewAll: 'View All Products',
    addToCart: 'Add to Cart',
    whyChooseUs: 'Why Choose Afiya Zone?',
    naturalIngredients: 'Natural Ingredients',
    naturalDesc: 'All our products are made with carefully selected natural ingredients',
    trustedQuality: 'Trusted Quality',
    trustedDesc: 'Rigorous testing and quality control for your peace of mind',
    expertCare: 'Expert Care',
    expertDesc: 'Formulated by wellness experts and health professionals',
    secureShipping: 'Secure Shipping',
    secureDesc: 'Fast, secure delivery to your doorstep',
    wellnessTips: 'Wellness Tips & Insights',
    tipTitle1: '5 Morning Rituals for Better Health',
    tipTitle2: 'Natural Ways to Boost Your Immunity',
    tipTitle3: 'The Power of Herbal Supplements',
    readMore: 'Read More',
  },
  ar: {
    heroTitle: 'منطقة العافية والرعاية الموثوقة',
    heroSubtitle: 'اكتشف المنتجات الطبيعية المميزة لحياة أكثر صحة وسعادة',
    shopNow: 'تسوق الآن',
    learnMore: 'اعرف المزيد',
    featuredProducts: 'المنتجات المميزة',
    viewAll: 'عرض جميع المنتجات',
    addToCart: 'أضف للسلة',
    whyChooseUs: 'لماذا تختار منطقة العافية؟',
    naturalIngredients: 'مكونات طبيعية',
    naturalDesc: 'جميع منتجاتنا مصنوعة من مكونات طبيعية مختارة بعناية',
    trustedQuality: 'جودة موثوقة',
    trustedDesc: 'اختبارات صارمة ومراقبة جودة لراحة بالك',
    expertCare: 'رعاية خبراء',
    expertDesc: 'مُركبة من قبل خبراء العافية والمهنيين الصحيين',
    secureShipping: 'شحن آمن',
    secureDesc: 'توصيل سريع وآمن إلى باب منزلك',
    wellnessTips: 'نصائح ورؤى العافية',
    tipTitle1: '٥ طقوس صباحية لصحة أفضل',
    tipTitle2: 'طرق طبيعية لتعزيز مناعتك',
    tipTitle3: 'قوة المكملات العشبية',
    readMore: 'اقرأ المزيد',
  },
};

// Sample product data
const featuredProducts = [
  {
    id: 1,
    name: { en: 'Vitamin D3 + K2', ar: 'فيتامين د3 + ك2' },
    price: 29.99,
    originalPrice: 39.99,
    rating: 4.8,
    reviews: 152,
    image: 'https://images.unsplash.com/photo-1734607402858-a10164ded7a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmFsJTIwc3VwcGxlbWVudHMlMjB2aXRhbWluc3xlbnwxfHx8fDE3NTkwNzU2MjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'supplements',
    badge: { en: 'Best Seller', ar: 'الأكثر مبيعاً' },
  },
  {
    id: 2,
    name: { en: 'Organic Face Serum', ar: 'سيروم الوجه العضوي' },
    price: 45.99,
    rating: 4.9,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1723392197044-515b81ec57cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwc2tpbmNhcmUlMjBjb3NtZXRpY3N8ZW58MXx8fHwxNzU5MDc1NjI0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'cosmetics',
    badge: { en: 'New', ar: 'جديد' },
  },
  {
    id: 3,
    name: { en: 'Herbal Sleep Tea', ar: 'شاي النوم العشبي' },
    price: 18.99,
    rating: 4.7,
    reviews: 203,
    image: 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZXJiYWwlMjB0ZWElMjBlc3NlbnRpYWwlMjBvaWxzfGVufDF8fHx8MTc1OTA3NTYyN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'herbal',
    badge: { en: 'Popular', ar: 'رائج' },
  },
];

export function Homepage() {
  const { language, setCurrentPage, setSelectedProduct, cart, setCart } = useApp();
  const t = translations[language];

  const addToCart = (product: any) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const viewProduct = (product: any) => {
    setSelectedProduct(product);
    setCurrentPage('product');
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 via-white to-green-50 py-3 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl text-green-800 leading-tight">
                  {t.heroTitle}
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {t.heroSubtitle}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
                  onClick={() => setCurrentPage('shop')}
                >
                  {t.shopNow}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-3"
                  onClick={() => setCurrentPage('about')}
                >
                  {t.learnMore}
                </Button>
              </div>
            </div>
            {/* <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-200/30 to-green-300/30 rounded-3xl transform rotate-3"></div>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1671492241057-e0ad01ceb1c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWxsbmVzcyUyMG5hdHVyYWwlMjBwcm9kdWN0cyUyMHNwYXxlbnwxfHx8fDE3NTkwNzU2MTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Wellness products"
                className="relative w-full h-96 object-cover rounded-3xl shadow-xl"
              />
            </div> */}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl text-green-800 mb-4">{t.featuredProducts}</h2>
            <Button 
              variant="link" 
              className="text-green-600 hover:text-green-700"
              onClick={() => setCurrentPage('shop')}
            >
              {t.viewAll} <ArrowRight className="ml-1 w-4 h-4" />
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-shadow duration-300 border-green-100">
                <CardContent className="p-0">
                  <div className="relative">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name[language]}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    {product.badge && (
                      <Badge className="absolute top-3 left-3 bg-green-500 text-white">
                        {product.badge[language]}
                      </Badge>
                    )}
                    {product.originalPrice && (
                      <Badge variant="destructive" className="absolute top-3 right-3">
                        -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                      </Badge>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <h3 
                      className="text-lg text-green-800 mb-2 cursor-pointer hover:text-green-600 transition-colors"
                      onClick={() => viewProduct(product)}
                    >
                      {product.name[language]}
                    </h3>
                    
                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 ml-2">
                        ({product.reviews})
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-xl text-green-700">${product.price}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="p-6 pt-0">
                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => addToCart(product)}
                  >
                    {t.addToCart}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4 bg-gradient-to-br from-green-50 to-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl text-green-800 mb-4">{t.whyChooseUs}</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Leaf,
                title: t.naturalIngredients,
                description: t.naturalDesc,
              },
              {
                icon: Shield,
                title: t.trustedQuality,
                description: t.trustedDesc,
              },
              {
                icon: Heart,
                title: t.expertCare,
                description: t.expertDesc,
              },
              {
                icon: ArrowRight,
                title: t.secureShipping,
                description: t.secureDesc,
              },
            ].map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                  <feature.icon className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg text-green-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wellness Tips */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl text-green-800 mb-4">{t.wellnessTips}</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: t.tipTitle1,
                image: 'https://images.unsplash.com/photo-1671492241057-e0ad01ceb1c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWxsbmVzcyUyMG5hdHVyYWwlMjBwcm9kdWN0cyUyMHNwYXxlbnwxfHx8fDE3NTkwNzU2MTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
              },
              {
                title: t.tipTitle2,
                image: 'https://images.unsplash.com/photo-1734607402858-a10164ded7a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmFsJTIwc3VwcGxlbWVudHMlMjB2aXRhbWluc3xlbnwxfHx8fDE3NTkwNzU2MjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
              },
              {
                title: t.tipTitle3,
                image: 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZXJiYWwlMjB0ZWElMjBlc3NlbnRpYWwlMjBvaWxzfGVufDF8fHx8MTc1OTA3NTYyN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
              },
            ].map((tip, index) => (
              <Card key={index} className="group hover:shadow-lg transition-shadow duration-300 border-green-100">
                <CardContent className="p-0">
                  <ImageWithFallback
                    src={tip.image}
                    alt={tip.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="p-6">
                    <h3 className="text-lg text-green-800 mb-3">{tip.title}</h3>
                    <Button variant="link" className="p-0 text-green-600 hover:text-green-700">
                      {t.readMore} <ArrowRight className="ml-1 w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}