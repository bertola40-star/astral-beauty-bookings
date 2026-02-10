import React, { useState } from 'react';
import { ShoppingCart, Filter, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import ProductCard from '@/components/ProductCard';
import Cart from '@/components/Cart';

export interface Product {
  id: string;
  nameKey: string;
  descriptionKey: string;
  price: number;
  image: string;
  category: 'skincare' | 'giftcard' | 'course';
  rating: number;
  inStock: boolean;
  isDigital: boolean;
}

const mockProducts: Product[] = [
  {
    id: '1',
    nameKey: 'products.serumName',
    descriptionKey: 'products.serumDesc',
    price: 89.99,
    image: '/placeholder.svg',
    category: 'skincare',
    rating: 4.8,
    inStock: true,
    isDigital: false
  },
  {
    id: '2',
    nameKey: 'products.antiAgeName',
    descriptionKey: 'products.antiAgeDesc',
    price: 129.99,
    image: '/placeholder.svg',
    category: 'skincare',
    rating: 4.9,
    inStock: true,
    isDigital: false
  },
  {
    id: '3',
    nameKey: 'products.cleanserName',
    descriptionKey: 'products.cleanserDesc',
    price: 45.99,
    image: '/placeholder.svg',
    category: 'skincare',
    rating: 4.7,
    inStock: true,
    isDigital: false
  },
  {
    id: '4',
    nameKey: 'products.giftCard50',
    descriptionKey: 'products.giftCardDesc',
    price: 50.00,
    image: '/placeholder.svg',
    category: 'giftcard',
    rating: 5.0,
    inStock: true,
    isDigital: true
  },
  {
    id: '5',
    nameKey: 'products.giftCard100',
    descriptionKey: 'products.giftCardDesc',
    price: 100.00,
    image: '/placeholder.svg',
    category: 'giftcard',
    rating: 5.0,
    inStock: true,
    isDigital: true
  },
  {
    id: '6',
    nameKey: 'products.giftCard200',
    descriptionKey: 'products.giftCardDesc',
    price: 200.00,
    image: '/placeholder.svg',
    category: 'giftcard',
    rating: 5.0,
    inStock: true,
    isDigital: true
  },
  {
    id: '7',
    nameKey: 'products.microbladingCourse',
    descriptionKey: 'products.microbladingCourseDesc',
    price: 299.99,
    image: '/placeholder.svg',
    category: 'course',
    rating: 4.9,
    inStock: true,
    isDigital: true
  },
  {
    id: '8',
    nameKey: 'products.lipTattooCourse',
    descriptionKey: 'products.lipTattooCourseDesc',
    price: 249.99,
    image: '/placeholder.svg',
    category: 'course',
    rating: 4.8,
    inStock: true,
    isDigital: true
  },
  {
    id: '9',
    nameKey: 'products.eyebrowCourse',
    descriptionKey: 'products.eyebrowCourseDesc',
    price: 149.99,
    image: '/placeholder.svg',
    category: 'course',
    rating: 4.7,
    inStock: true,
    isDigital: true
  },
];

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [cartItems, setCartItems] = useState<Array<{product: Product, quantity: number}>>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { t } = useTranslation();

  const categories = [
    { id: 'all', name: t('shop.all'), count: mockProducts.length },
    { id: 'skincare', name: t('shop.skincare'), count: mockProducts.filter(p => p.category === 'skincare').length },
    { id: 'course', name: t('shop.courses'), count: mockProducts.filter(p => p.category === 'course').length },
    { id: 'giftcard', name: t('shop.giftCards'), count: mockProducts.filter(p => p.category === 'giftcard').length },
  ];

  const filteredProducts = mockProducts.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const name = t(product.nameKey).toLowerCase();
    const desc = t(product.descriptionKey).toLowerCase();
    const matchesSearch = name.includes(searchTerm.toLowerCase()) || desc.includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (product: Product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">{t('shop.title')}</h1>
              <p className="text-muted-foreground mt-2">{t('shop.subtitle')}</p>
            </div>
            <Button
              onClick={() => setIsCartOpen(true)}
              variant="outline"
              className="relative"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              {t('shop.cart')}
              {getTotalItems() > 0 && (
                <Badge variant="destructive" className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center">
                  {getTotalItems()}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="space-y-6">
              {/* Search */}
              <div>
                <h3 className="font-semibold mb-3 flex items-center">
                  <Search className="h-4 w-4 mr-2" />
                  {t('shop.search')}
                </h3>
                <Input
                  placeholder={t('shop.searchPlaceholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Categories */}
              <div>
                <h3 className="font-semibold mb-3 flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  {t('shop.categories')}
                </h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-accent hover:text-accent-foreground'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span>{category.name}</span>
                        <Badge variant="secondary">{category.count}</Badge>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:w-3/4">
            <div className="mb-6">
              <p className="text-muted-foreground">
                {t('shop.showing', { count: filteredProducts.length })}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">{t('shop.noProducts')}</p>
                <p className="text-muted-foreground">{t('shop.tryOtherTerms')}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cart Sidebar */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={removeFromCart}
        onUpdateQuantity={updateQuantity}
        totalPrice={getTotalPrice()}
      />
    </div>
  );
};

export default Shop;