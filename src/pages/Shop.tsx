import React, { useState } from 'react';
import { ShoppingCart, Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import ProductCard from '@/components/ProductCard';
import Cart from '@/components/Cart';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'skincare' | 'giftcard' | 'course';
  rating: number;
  inStock: boolean;
  isDigital: boolean;
}

const mockProducts: Product[] = [
  // Productos de cuidado de la piel
  {
    id: '1',
    name: 'Sérum Hidratante Premium',
    description: 'Sérum intensivo con ácido hialurónico para hidratación profunda',
    price: 89.99,
    image: '/placeholder.svg',
    category: 'skincare',
    rating: 4.8,
    inStock: true,
    isDigital: false
  },
  {
    id: '2',
    name: 'Crema Anti-Edad Luxury',
    description: 'Crema nutritiva con retinol y vitamina C para combatir signos de envejecimiento',
    price: 129.99,
    image: '/placeholder.svg',
    category: 'skincare',
    rating: 4.9,
    inStock: true,
    isDigital: false
  },
  {
    id: '3',
    name: 'Limpiador Facial Profundo',
    description: 'Gel limpiador suave que elimina impurezas sin resecar la piel',
    price: 45.99,
    image: '/placeholder.svg',
    category: 'skincare',
    rating: 4.7,
    inStock: true,
    isDigital: false
  },
  
  // Gift Cards
  {
    id: '4',
    name: 'Gift Card $50',
    description: 'Tarjeta regalo válida para cualquier servicio del spa',
    price: 50.00,
    image: '/placeholder.svg',
    category: 'giftcard',
    rating: 5.0,
    inStock: true,
    isDigital: true
  },
  {
    id: '5',
    name: 'Gift Card $100',
    description: 'Tarjeta regalo válida para cualquier servicio del spa',
    price: 100.00,
    image: '/placeholder.svg',
    category: 'giftcard',
    rating: 5.0,
    inStock: true,
    isDigital: true
  },
  {
    id: '6',
    name: 'Gift Card $200',
    description: 'Tarjeta regalo válida para cualquier servicio del spa',
    price: 200.00,
    image: '/placeholder.svg',
    category: 'giftcard',
    rating: 5.0,
    inStock: true,
    isDigital: true
  },

  // Cursos digitales
  {
    id: '7',
    name: 'Curso Microblading Profesional',
    description: 'Curso completo de microblading con certificación incluida. 8 horas de contenido',
    price: 299.99,
    image: '/placeholder.svg',
    category: 'course',
    rating: 4.9,
    inStock: true,
    isDigital: true
  },
  {
    id: '8',
    name: 'Curso Tatuaje de Labios',
    description: 'Aprende las técnicas profesionales de tatuaje de labios paso a paso',
    price: 249.99,
    image: '/placeholder.svg',
    category: 'course',
    rating: 4.8,
    inStock: true,
    isDigital: true
  },
  {
    id: '9',
    name: 'Curso Depilación de Cejas',
    description: 'Técnicas avanzadas de depilación y diseño de cejas con hilo y cera',
    price: 149.99,
    image: '/placeholder.svg',
    category: 'course',
    rating: 4.7,
    inStock: true,
    isDigital: true
  },
];

const categories = [
  { id: 'all', name: 'Todos', count: mockProducts.length },
  { id: 'skincare', name: 'Cuidado de la Piel', count: mockProducts.filter(p => p.category === 'skincare').length },
  { id: 'course', name: 'Cursos Digitales', count: mockProducts.filter(p => p.category === 'course').length },
  { id: 'giftcard', name: 'Gift Cards', count: mockProducts.filter(p => p.category === 'giftcard').length },
];

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [cartItems, setCartItems] = useState<Array<{product: Product, quantity: number}>>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const filteredProducts = mockProducts.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
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
              <h1 className="text-3xl font-bold text-foreground">Tienda Online</h1>
              <p className="text-muted-foreground mt-2">Productos premium de belleza y cursos profesionales</p>
            </div>
            <Button
              onClick={() => setIsCartOpen(true)}
              variant="outline"
              className="relative"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Carrito
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
                  Buscar
                </h3>
                <Input
                  placeholder="Buscar productos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Categories */}
              <div>
                <h3 className="font-semibold mb-3 flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  Categorías
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
                Mostrando {filteredProducts.length} productos
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
                <p className="text-muted-foreground text-lg">No se encontraron productos</p>
                <p className="text-muted-foreground">Intenta con otros términos de búsqueda</p>
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