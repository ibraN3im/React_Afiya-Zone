import React, { useState } from 'react';
import { useApp } from '../App';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { User, Package, Heart, Settings, Edit3, Save, X, Eye } from 'lucide-react';
import { toast } from 'sonner';

const translations = {
  en: {
    myAccount: 'My Account',
    profile: 'Profile',
    orders: 'Orders',
    wishlist: 'Wishlist',
    settings: 'Settings',
    personalInfo: 'Personal Information',
    contactInfo: 'Contact Information',
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'Email',
    phone: 'Phone',
    dateJoined: 'Member Since',
    edit: 'Edit',
    save: 'Save',
    cancel: 'Cancel',
    orderHistory: 'Order History',
    orderNumber: 'Order #',
    orderDate: 'Date',
    status: 'Status',
    total: 'Total',
    items: 'Items',
    viewOrder: 'View Details',
    noOrders: 'No orders yet',
    noOrdersDesc: 'Start shopping to see your orders here',
    myWishlist: 'My Wishlist',
    noWishlist: 'No items in wishlist',
    noWishlistDesc: 'Add products to your wishlist to see them here',
    addToCart: 'Add to Cart',
    removeFromWishlist: 'Remove from Wishlist',
    accountSettings: 'Account Settings',
    changePassword: 'Change Password',
    notifications: 'Notifications',
    privacy: 'Privacy & Security',
    language: 'Language',
    currency: 'Currency',
    logout: 'Logout',
    profileUpdated: 'Profile updated successfully',
    orderDelivered: 'Delivered',
    orderShipped: 'Shipped',
    orderProcessing: 'Processing',
    orderCancelled: 'Cancelled',
    shopNow: 'Shop Now',
  },
  ar: {
    myAccount: 'حسابي',
    profile: 'الملف الشخصي',
    orders: 'الطلبات',
    wishlist: 'المفضلة',
    settings: 'الإعدادات',
    personalInfo: 'المعلومات الشخصية',
    contactInfo: 'معلومات التواصل',
    firstName: 'الاسم الأول',
    lastName: 'اسم العائلة',
    email: 'البريد الإلكتروني',
    phone: 'الهاتف',
    dateJoined: 'عضو منذ',
    edit: 'تعديل',
    save: 'حفظ',
    cancel: 'إلغاء',
    orderHistory: 'تاريخ الطلبات',
    orderNumber: 'رقم الطلب',
    orderDate: 'التاريخ',
    status: 'الحالة',
    total: 'المجموع',
    items: 'العناصر',
    viewOrder: 'عرض التفاصيل',
    noOrders: 'لا توجد طلبات بعد',
    noOrdersDesc: 'ابدأ التسوق لرؤية طلباتك هنا',
    myWishlist: 'مفضلتي',
    noWishlist: 'لا توجد عناصر في المفضلة',
    noWishlistDesc: 'أضف المنتجات إلى مفضلتك لرؤيتها هنا',
    addToCart: 'أضف للسلة',
    removeFromWishlist: 'إزالة من المفضلة',
    accountSettings: 'إعدادات الحساب',
    changePassword: 'تغيير كلمة المرور',
    notifications: 'الإشعارات',
    privacy: 'الخصوصية والأمان',
    language: 'اللغة',
    currency: 'العملة',
    logout: 'تسجيل الخروج',
    profileUpdated: 'تم تحديث الملف الشخصي بنجاح',
    orderDelivered: 'تم التوصيل',
    orderShipped: 'تم الشحن',
    orderProcessing: 'قيد المعالجة',
    orderCancelled: 'ملغي',
    shopNow: 'تسوق الآن',
  },
};

// Sample order data
const sampleOrders = [
  {
    id: 'AFZ-2024-001',
    date: '2024-12-20',
    status: 'delivered',
    total: 89.97,
    items: [
      { id: 1, name: { en: 'Vitamin D3 + K2', ar: 'فيتامين د3 + ك2' }, quantity: 2, price: 29.99 },
      { id: 2, name: { en: 'Organic Face Serum', ar: 'سيروم الوجه العضوي' }, quantity: 1, price: 29.99 },
    ],
  },
  {
    id: 'AFZ-2024-002',
    date: '2024-12-25',
    status: 'shipped',
    total: 67.98,
    items: [
      { id: 3, name: { en: 'Herbal Sleep Tea', ar: 'شاي النوم العشبي' }, quantity: 2, price: 18.99 },
      { id: 4, name: { en: 'Omega-3 Fish Oil', ar: 'زيت السمك أوميغا-3' }, quantity: 1, price: 29.99 },
    ],
  },
];

// Sample wishlist data
const sampleWishlist = [
  {
    id: 5,
    name: { en: 'Natural Body Lotion', ar: 'لوشن الجسم الطبيعي' },
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1723392197044-515b81ec57cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwc2tpbmNhcmUlMjBjb3NtZXRpY3N8ZW58MXx8fHwxNzU5MDc1NjI0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.5,
  },
  {
    id: 6,
    name: { en: 'Detox Green Tea', ar: 'شاي أخضر ديتوكس' },
    price: 16.99,
    image: 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZXJiYWwlMjB0ZWElMjBlc3NlbnRpYWwlMjBvaWxzfGVufDF8fHx8MTc1OTA3NTYyN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.4,
  },
];

export function UserAccount() {
  const { language, user, setUser, setCurrentPage, cart, setCart } = useApp();
  const t = translations[language];

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  const [orders] = useState(sampleOrders);
  const [wishlist, setWishlist] = useState(sampleWishlist);

  const handleSaveProfile = () => {
    setUser({
      ...user,
      name: `${editForm.firstName} ${editForm.lastName}`,
      email: editForm.email,
      phone: editForm.phone,
    });
    setIsEditing(false);
    toast.success(t.profileUpdated);
  };

  const handleCancelEdit = () => {
    setEditForm({
      firstName: user?.name?.split(' ')[0] || '',
      lastName: user?.name?.split(' ')[1] || '',
      email: user?.email || '',
      phone: user?.phone || '',
    });
    setIsEditing(false);
  };

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
    toast.success('Added to cart!');
  };

  const removeFromWishlist = (productId: number) => {
    setWishlist(wishlist.filter(item => item.id !== productId));
    toast.success('Removed from wishlist');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('home');
    toast.success('Logged out successfully');
  };

  type OrderStatus = 'delivered' | 'shipped' | 'processing' | 'cancelled';

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<OrderStatus, { color: string; label: string }> = {
      delivered: { color: 'bg-green-100 text-green-800', label: t.orderDelivered },
      shipped: { color: 'bg-blue-100 text-blue-800', label: t.orderShipped },
      processing: { color: 'bg-yellow-100 text-yellow-800', label: t.orderProcessing },
      cancelled: { color: 'bg-red-100 text-red-800', label: t.orderCancelled },
    };

    const config = statusConfig[status as OrderStatus] || statusConfig.processing;
    return (
      <Badge className={config.color}>
        {config.label}
      </Badge>
    );
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Please login to view your account</p>
          <Button onClick={() => setCurrentPage('home')}>Go to Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl text-green-800 mb-2">{t.myAccount}</h1>
          <p className="text-gray-600">Welcome back, {user.name}!</p>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-green-50 mb-8">
            <TabsTrigger 
              value="profile" 
              className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
            >
              <User className="w-4 h-4 mr-2" />
              {t.profile}
            </TabsTrigger>
            <TabsTrigger 
              value="orders" 
              className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
            >
              <Package className="w-4 h-4 mr-2" />
              {t.orders}
            </TabsTrigger>
            <TabsTrigger 
              value="wishlist" 
              className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
            >
              <Heart className="w-4 h-4 mr-2" />
              {t.wishlist}
            </TabsTrigger>
            <TabsTrigger 
              value="settings" 
              className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
            >
              <Settings className="w-4 h-4 mr-2" />
              {t.settings}
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-green-800 flex items-center justify-between">
                    {t.personalInfo}
                    {!isEditing && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsEditing(true)}
                        className="text-green-600 hover:text-green-700"
                      >
                        <Edit3 className="w-4 h-4 mr-1" />
                        {t.edit}
                      </Button>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isEditing ? (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">{t.firstName}</Label>
                          <Input
                            id="firstName"
                            value={editForm.firstName}
                            onChange={(e) => setEditForm({ ...editForm, firstName: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">{t.lastName}</Label>
                          <Input
                            id="lastName"
                            value={editForm.lastName}
                            onChange={(e) => setEditForm({ ...editForm, lastName: e.target.value })}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="email">{t.email}</Label>
                        <Input
                          id="email"
                          type="email"
                          value={editForm.email}
                          onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="phone">{t.phone}</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={editForm.phone}
                          onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                        />
                      </div>
                      
                      <div className="flex space-x-3 pt-4">
                        <Button
                          onClick={handleSaveProfile}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          <Save className="w-4 h-4 mr-1" />
                          {t.save}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={handleCancelEdit}
                        >
                          <X className="w-4 h-4 mr-1" />
                          {t.cancel}
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="space-y-3">
                        <div>
                          <Label className="text-gray-600">{t.firstName}</Label>
                          <p className="text-green-800">{user.name?.split(' ')[0]}</p>
                        </div>
                        <div>
                          <Label className="text-gray-600">{t.lastName}</Label>
                          <p className="text-green-800">{user.name?.split(' ')[1]}</p>
                        </div>
                        <div>
                          <Label className="text-gray-600">{t.email}</Label>
                          <p className="text-green-800">{user.email}</p>
                        </div>
                        <div>
                          <Label className="text-gray-600">{t.phone}</Label>
                          <p className="text-green-800">{user.phone}</p>
                        </div>
                        <div>
                          <Label className="text-gray-600">{t.dateJoined}</Label>
                          <p className="text-green-800">{user.joinDate}</p>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-green-800">{t.accountSettings}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      {t.changePassword}
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      {t.notifications}
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      {t.privacy}
                    </Button>
                    <Button 
                      variant="destructive" 
                      className="w-full"
                      onClick={handleLogout}
                    >
                      {t.logout}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle className="text-green-800">{t.orderHistory}</CardTitle>
              </CardHeader>
              <CardContent>
                {orders.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg text-gray-600 mb-2">{t.noOrders}</h3>
                    <p className="text-gray-500 mb-4">{t.noOrdersDesc}</p>
                    <Button 
                      onClick={() => setCurrentPage('shop')}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      {t.shopNow}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <Card key={order.id} className="border-green-100">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <h3 className="text-green-800">{t.orderNumber} {order.id}</h3>
                              <p className="text-gray-600 text-sm">{order.date}</p>
                            </div>
                            <div className="text-right">
                              {getStatusBadge(order.status)}
                              <p className="text-lg text-green-700 mt-1">${order.total.toFixed(2)}</p>
                            </div>
                          </div>
                          
                          <div className="space-y-2 mb-4">
                            {order.items.map((item, index) => (
                              <div key={index} className="flex justify-between text-sm">
                                <span>{item.name[language]} × {item.quantity}</span>
                                <span>${(item.price * item.quantity).toFixed(2)}</span>
                              </div>
                            ))}
                          </div>
                          
                          <Button variant="outline" size="sm" className="border-green-600 text-green-600">
                            <Eye className="w-4 h-4 mr-1" />
                            {t.viewOrder}
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Wishlist Tab */}
          <TabsContent value="wishlist">
            <Card>
              <CardHeader>
                <CardTitle className="text-green-800">{t.myWishlist}</CardTitle>
              </CardHeader>
              <CardContent>
                {wishlist.length === 0 ? (
                  <div className="text-center py-12">
                    <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg text-gray-600 mb-2">{t.noWishlist}</h3>
                    <p className="text-gray-500 mb-4">{t.noWishlistDesc}</p>
                    <Button 
                      onClick={() => setCurrentPage('shop')}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      {t.shopNow}
                    </Button>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlist.map((item) => (
                      <Card key={item.id} className="border-green-100">
                        <CardContent className="p-4">
                          <ImageWithFallback
                            src={item.image}
                            alt={item.name[language]}
                            className="w-full h-32 object-cover rounded-lg mb-3"
                          />
                          <h3 className="text-green-800 mb-2">{item.name[language]}</h3>
                          <p className="text-lg text-green-700 mb-3">${item.price}</p>
                          <div className="space-y-2">
                            <Button
                              size="sm"
                              className="w-full bg-green-600 hover:bg-green-700 text-white"
                              onClick={() => addToCart(item)}
                            >
                              {t.addToCart}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full text-red-600 border-red-200 hover:bg-red-50"
                              onClick={() => removeFromWishlist(item.id)}
                            >
                              {t.removeFromWishlist}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-green-800">{t.accountSettings}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>{t.language}</Label>
                      <Button variant="outline" size="sm">
                        {language === 'en' ? 'English' : 'العربية'}
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>{t.currency}</Label>
                      <Button variant="outline" size="sm">
                        USD ($)
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-green-800">{t.notifications}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm">Order Updates</p>
                        <p className="text-xs text-gray-600">Get notified about order status</p>
                      </div>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm">Promotions</p>
                        <p className="text-xs text-gray-600">Receive special offers and discounts</p>
                      </div>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm">Newsletter</p>
                        <p className="text-xs text-gray-600">Weekly wellness tips and product updates</p>
                      </div>
                      <input type="checkbox" className="rounded" aria-label="Newsletter subscription" title="Newsletter subscription" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}