import React, { useState } from 'react';
import { useApp } from '../App';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter } from './ui/card';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Slider } from './ui/slider';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Star, Filter, Grid3x3, List, Search } from 'lucide-react';
import { Input } from './ui/input';

const translations = {
  en: {
    shop: 'Shop',
    allProducts: 'All Products',
    filters: 'Filters',
    categories: 'Categories',
    priceRange: 'Price Range',
    rating: 'Rating & Above',
    sortBy: 'Sort By',
    popular: 'Popular',
    priceLowHigh: 'Price: Low to High',
    priceHighLow: 'Price: High to Low',
    newest: 'Newest',
    rating: 'Rating',
    clearFilters: 'Clear Filters',
    showingResults: 'Showing {count} products',
    noResults: 'No products found',
    addToCart: 'Add to Cart',
    supplements: 'Supplements',
    cosmetics: 'Natural Cosmetics',
    herbal: 'Herbal Products',
    accessories: 'Wellness Accessories',
    searchProducts: 'Search products...',
  },
  ar: {
    shop: 'المتجر',
    allProducts: 'جميع المنتجات',
    filters: 'المرشحات',
    categories: 'الفئات',
    priceRange: 'نطاق السعر',
    rating: 'التقييم وأعلى',
    sortBy: 'ترتيب حسب',
    popular: 'الأكثر شعبية',
    priceLowHigh: 'السعر: من الأقل للأعلى',
    priceHighLow: 'السعر: من الأعلى للأقل',
    newest: 'الأحدث',
    rating: 'التقييم',
    clearFilters: 'مسح المرشحات',
    showingResults: 'عرض {count} منتج',
    noResults: 'لم يتم العثور على منتجات',
    addToCart: 'أضف للسلة',
    supplements: 'المكملات الغذائية',
    cosmetics: 'مستحضرات التجميل الطبيعية',
    herbal: 'المنتجات العشبية',
    accessories: 'إكسسوارات العافية',
    searchProducts: 'البحث عن المنتجات...',
  },
};

// Extended product data
const allProducts = [
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
  {
    id: 4,
    name: { en: 'Omega-3 Fish Oil', ar: 'زيت السمك أوميغا-3' },
    price: 24.99,
    rating: 4.6,
    reviews: 176,
    image: 'https://images.unsplash.com/photo-1734607402858-a10164ded7a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmFsJTIwc3VwcGxlbWVudHMlMjB2aXRhbWluc3xlbnwxfHx8fDE3NTkwNzU2MjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'supplements',
  },
  {
    id: 5,
    name: { en: 'Natural Body Lotion', ar: 'لوشن الجسم الطبيعي' },
    price: 19.99,
    rating: 4.5,
    reviews: 98,
    image: 'https://images.unsplash.com/photo-1723392197044-515b81ec57cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwc2tpbmNhcmUlMjBjb3NtZXRpY3N8ZW58MXx8fHwxNzU5MDc1NjI0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'cosmetics',
  },
  {
    id: 6,
    name: { en: 'Detox Green Tea', ar: 'شاي أخضر ديتوكس' },
    price: 16.99,
    rating: 4.4,
    reviews: 134,
    image: 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZXJiYWwlMjB0ZWElMjBlc3NlbnRpYWwlMjBvaWxzfGVufDF8fHx8MTc1OTA3NTYyN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'herbal',
  },
];

export function Shop() {
  const { language, setCurrentPage, setSelectedProduct, cart, setCart } = useApp();
  const t = translations[language];

  // Filter states
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('popular');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = [
    { key: 'supplements', label: t.supplements },
    { key: 'cosmetics', label: t.cosmetics },
    { key: 'herbal', label: t.herbal },
    { key: 'accessories', label: t.accessories },
  ];

  // Filter products
  const filteredProducts = allProducts.filter(product => {
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesRating = product.rating >= minRating;
    const matchesSearch = searchQuery === '' || 
      product.name[language].toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesPrice && matchesRating && matchesSearch;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'priceLowHigh':
        return a.price - b.price;
      case 'priceHighLow':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return b.id - a.id;
      default:
        return b.reviews - a.reviews; // Popular by review count
    }
  });

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

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 100]);
    setMinRating(0);
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl text-green-800 mb-4">{t.shop}</h1>
          
          {/* Search Bar */}
          <div className="relative max-w-md mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder={t.searchProducts}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-green-200 focus:border-green-400"
            />
          </div>

          {/* Controls */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div className="flex items-center gap-4">
              <span className="text-gray-600">
                {t.showingResults.replace('{count}', sortedProducts.length.toString())}
              </span>
              
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="p-2"
                >
                  <Grid3x3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="p-2"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder={t.sortBy} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">{t.popular}</SelectItem>
                  <SelectItem value="priceLowHigh">{t.priceLowHigh}</SelectItem>
                  <SelectItem value="priceHighLow">{t.priceHighLow}</SelectItem>
                  <SelectItem value="newest">{t.newest}</SelectItem>
                  <SelectItem value="rating">{t.rating}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg text-green-800">{t.filters}</h3>
                <Button variant="link" size="sm" onClick={clearFilters} className="text-green-600">
                  {t.clearFilters}
                </Button>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h4 className="text-green-800 mb-3">{t.categories}</h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category.key} className="flex items-center space-x-2">
                      <Checkbox
                        id={category.key}
                        checked={selectedCategories.includes(category.key)}
                        onCheckedChange={() => toggleCategory(category.key)}
                      />
                      <label
                        htmlFor={category.key}
                        className="text-sm text-gray-700 cursor-pointer"
                      >
                        {category.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="text-green-800 mb-3">{t.priceRange}</h4>
                <div className="px-2">
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={100}
                    step={5}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Rating Filter */}
              <div className="mb-6">
                <h4 className="text-green-800 mb-3">{t.rating}</h4>
                <div className="space-y-2">
                  {[4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center space-x-2">
                      <Checkbox
                        id={`rating-${rating}`}
                        checked={minRating === rating}
                        onCheckedChange={() => setMinRating(minRating === rating ? 0 : rating)}
                      />
                      <label
                        htmlFor={`rating-${rating}`}
                        className="text-sm text-gray-700 cursor-pointer flex items-center"
                      >
                        <div className="flex items-center mr-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        & up
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {sortedProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">{t.noResults}</p>
              </div>
            ) : (
              <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 xl:grid-cols-3 gap-6' : 'space-y-4'}>
                {sortedProducts.map((product) => (
                  <Card
                    key={product.id}
                    className={`group hover:shadow-lg transition-shadow duration-300 border-green-100 ${
                      viewMode === 'list' ? 'flex flex-row' : ''
                    }`}
                  >
                    <CardContent className={`p-0 ${viewMode === 'list' ? 'flex-shrink-0' : ''}`}>
                      <div className="relative">
                        <ImageWithFallback
                          src={product.image}
                          alt={product.name[language]}
                          className={`object-cover ${
                            viewMode === 'list' 
                              ? 'w-48 h-32' 
                              : 'w-full h-48'
                          } ${viewMode === 'grid' ? 'rounded-t-lg' : 'rounded-l-lg'}`}
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
                    </CardContent>

                    <div className={`flex flex-col justify-between ${viewMode === 'list' ? 'flex-1' : ''}`}>
                      <CardContent className="p-6">
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
                      </CardContent>
                      
                      <CardFooter className="p-6 pt-0">
                        <Button 
                          className="w-full bg-green-600 hover:bg-green-700 text-white"
                          onClick={() => addToCart(product)}
                        >
                          {t.addToCart}
                        </Button>
                      </CardFooter>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}