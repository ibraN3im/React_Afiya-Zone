import React, { useState } from 'react';
import { useApp } from '../App';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Star, Heart, Share2, Minus, Plus, ArrowLeft, ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';

const translations = {
  en: {
    backToShop: 'Back to Shop',
    addToCart: 'Add to Cart',
    addToWishlist: 'Add to Wishlist',
    share: 'Share',
    quantity: 'Quantity',
    inStock: 'In Stock',
    outOfStock: 'Out of Stock',
    description: 'Description',
    benefits: 'Benefits',
    usage: 'Usage Instructions',
    ingredients: 'Ingredients',
    reviews: 'Reviews',
    specifications: 'Specifications',
    relatedProducts: 'Related Products',
    writeReview: 'Write a Review',
    seeAllReviews: 'See All Reviews',
    addedToCart: 'Added to cart successfully!',
    addedToWishlist: 'Added to wishlist!',
    selectQuantity: 'Select quantity',
  },
  ar: {
    backToShop: 'العودة للمتجر',
    addToCart: 'أضف للسلة',
    addToWishlist: 'أضف للمفضلة',
    share: 'مشاركة',
    quantity: 'الكمية',
    inStock: 'متوفر',
    outOfStock: 'غير متوفر',
    description: 'الوصف',
    benefits: 'الفوائد',
    usage: 'تعليمات الاستخدام',
    ingredients: 'المكونات',
    reviews: 'التقييمات',
    specifications: 'المواصفات',
    relatedProducts: 'منتجات ذات صلة',
    writeReview: 'اكتب تقييم',
    seeAllReviews: 'عرض جميع التقييمات',
    addedToCart: 'تم إضافة المنتج للسلة بنجاح!',
    addedToWishlist: 'تم إضافة المنتج للمفضلة!',
    selectQuantity: 'اختر الكمية',
  },
};

// Sample product data with multiple images
const sampleProduct = {
  id: 1,
  name: { en: 'Vitamin D3 + K2 Premium', ar: 'فيتامين د3 + ك2 بريميوم' },
  price: 29.99,
  originalPrice: 39.99,
  rating: 4.8,
  reviews: 152,
  inStock: true,
  images: [
    'https://images.unsplash.com/photo-1734607402858-a10164ded7a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmFsJTIwc3VwcGxlbWVudHMlMjB2aXRhbWluc3xlbnwxfHx8fDE3NTkwNzU2MjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    'https://images.unsplash.com/photo-1714411892980-d1fa234f61ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWxsbmVzcyUyMHN1cHBsZW1lbnQlMjBib3R0bGV8ZW58MXx8fHwxNzU5MDc1NzQ5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    'https://images.unsplash.com/photo-1671492241057-e0ad01ceb1c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWxsbmVzcyUyMG5hdHVyYWwlMjBwcm9kdWN0cyUyMHNwYXxlbnwxfHx8fDE3NTkwNzU2MTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  ],
  category: 'supplements',
  badge: { en: 'Best Seller', ar: 'الأكثر مبيعاً' },
  description: {
    en: 'Our premium Vitamin D3 + K2 supplement combines the power of vitamin D3 with vitamin K2 for optimal bone health and calcium absorption. Made with high-quality, natural ingredients and third-party tested for purity.',
    ar: 'مكمل فيتامين د3 + ك2 المميز يجمع بين قوة فيتامين د3 وفيتامين ك2 لصحة العظام المثلى وامتصاص الكالسيوم. مصنوع من مكونات طبيعية عالية الجودة ومختبر من طرف ثالث للنقاء.',
  },
  benefits: {
    en: [
      'Supports bone health and density',
      'Enhances calcium absorption',
      'Boosts immune system function',
      'Promotes cardiovascular health',
      'Supports muscle function'
    ],
    ar: [
      'يدعم صحة وكثافة العظام',
      'يعزز امتصاص الكالسيوم',
      'يقوي وظائف الجهاز المناعي',
      'يعزز صحة القلب والأوعية الدموية',
      'يدعم وظائف العضلات'
    ],
  },
  usage: {
    en: 'Take 1 capsule daily with food, or as directed by your healthcare professional. Best taken with a fat-containing meal for optimal absorption.',
    ar: 'تناول كبسولة واحدة يومياً مع الطعام، أو حسب توجيهات أخصائي الرعاية الصحية. يُفضل تناولها مع وجبة تحتوي على دهون للامتصاص الأمثل.',
  },
  ingredients: {
    en: 'Vitamin D3 (Cholecalciferol) 2000 IU, Vitamin K2 (MK-7) 100 mcg, Organic Coconut Oil, Gelatin Capsule, Purified Water',
    ar: 'فيتامين د3 (كولي كالسيفيرول) 2000 وحدة دولية، فيتامين ك2 (MK-7) 100 ميكروغرام، زيت جوز الهند العضوي، كبسولة الجيلاتين، ماء مقطر',
  },
};

export function ProductDetail() {
  const { language, setCurrentPage, selectedProduct, cart, setCart } = useApp();
  const t = translations[language];
  
  const product = selectedProduct || sampleProduct;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const addToCart = () => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity }]);
    }
    toast.success(t.addedToCart);
  };

  const addToWishlist = () => {
    toast.success(t.addedToWishlist);
  };

  const shareProduct = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name[language],
        text: product.description[language],
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => setCurrentPage('shop')}
          className="mb-6 text-green-600 hover:text-green-700"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t.backToShop}
        </Button>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative">
              <ImageWithFallback
                src={product.images[currentImageIndex]}
                alt={product.name[language]}
                className="w-full h-96 lg:h-[500px] object-cover rounded-xl shadow-lg"
              />
              {product.badge && (
                <Badge className="absolute top-4 left-4 bg-green-500 text-white">
                  {product.badge[language]}
                </Badge>
              )}
              {product.originalPrice && (
                <Badge variant="destructive" className="absolute top-4 right-4">
                  -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                </Badge>
              )}
            </div>

            {/* Thumbnail Images */}
            <div className="flex space-x-2">
              {product.images.map((image: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  title={`${product.name[language]} thumbnail ${index + 1}`}
                  aria-label={`${product.name[language]} thumbnail ${index + 1}`}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    index === currentImageIndex ? 'border-green-500' : 'border-gray-200'
                  }`}
                >
                  <ImageWithFallback
                    src={image}
                    alt={`${product.name[language]} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl text-green-800 mb-2">{product.name[language]}</h1>
              
              {/* Rating */}
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600 ml-2">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-3xl text-green-700">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>

              {/* Stock Status */}
              <div className="mb-6">
                <Badge 
                  variant={product.inStock ? 'default' : 'destructive'}
                  className={product.inStock ? 'bg-green-100 text-green-800' : ''}
                >
                  {product.inStock ? t.inStock : t.outOfStock}
                </Badge>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-2">
              <label className="text-green-800">{t.quantity}</label>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  className="w-10 h-10 p-0"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 p-0"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Button
                size="lg"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3"
                onClick={addToCart}
                disabled={!product.inStock}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {t.addToCart}
              </Button>
              
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1 border-green-600 text-green-600 hover:bg-green-50"
                  onClick={addToWishlist}
                >
                  <Heart className="w-5 h-5 mr-2" />
                  {t.addToWishlist}
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1 border-green-600 text-green-600 hover:bg-green-50"
                  onClick={shareProduct}
                >
                  <Share2 className="w-5 h-5 mr-2" />
                  {t.share}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-green-50">
              <TabsTrigger value="description" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
                {t.description}
              </TabsTrigger>
              <TabsTrigger value="benefits" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
                {t.benefits}
              </TabsTrigger>
              <TabsTrigger value="usage" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
                {t.usage}
              </TabsTrigger>
              <TabsTrigger value="ingredients" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
                {t.ingredients}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="mt-8">
              <Card>
                <CardContent className="p-8">
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {product.description[language]}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="benefits" className="mt-8">
              <Card>
                <CardContent className="p-8">
                  <ul className="space-y-3">
                    {product.benefits[language].map((benefit: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="usage" className="mt-8">
              <Card>
                <CardContent className="p-8">
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {product.usage[language]}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="ingredients" className="mt-8">
              <Card>
                <CardContent className="p-8">
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {product.ingredients[language]}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}