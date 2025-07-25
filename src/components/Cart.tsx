import React from 'react';
import { X, Minus, Plus, ShoppingBag, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import type { Product } from '@/pages/Shop';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (productId: string) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  totalPrice: number;
}

const Cart: React.FC<CartProps> = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onUpdateQuantity,
  totalPrice
}) => {
  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const handleCheckout = () => {
    // TODO: Integrar con sistema de pagos
    alert('¡Próximamente! Integraremos el sistema de pagos.');
  };

  if (items.length === 0) {
    return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="w-full sm:max-w-lg">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              Carrito de Compras
            </SheetTitle>
          </SheetHeader>
          
          <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
            <ShoppingBag className="h-16 w-16 text-muted-foreground" />
            <div>
              <h3 className="text-lg font-semibold">Tu carrito está vacío</h3>
              <p className="text-muted-foreground">Agrega algunos productos para comenzar</p>
            </div>
            <Button onClick={onClose} variant="outline">
              Continuar Comprando
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              Carrito de Compras
            </div>
            <Badge variant="secondary">
              {getTotalItems()} {getTotalItems() === 1 ? 'artículo' : 'artículos'}
            </Badge>
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-4">
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.product.id} className="flex gap-4 p-4 border rounded-lg">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-16 object-cover rounded-md"
                />
                
                <div className="flex-1 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium line-clamp-1">{item.product.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        ${item.product.price.toFixed(2)}
                      </p>
                      {item.product.isDigital && (
                        <Badge variant="outline" className="text-xs mt-1">
                          Digital
                        </Badge>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onRemoveItem(item.product.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="h-8 w-8 p-0"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="h-8 w-8 p-0"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    
                    <div className="font-semibold">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t pt-4 space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Envío:</span>
              <span>Calculado al finalizar</span>
            </div>
            <Separator />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>

          <div className="space-y-2">
            <Button onClick={handleCheckout} className="w-full" size="lg">
              <CreditCard className="h-4 w-4 mr-2" />
              Proceder al Pago
            </Button>
            <Button variant="outline" onClick={onClose} className="w-full">
              Continuar Comprando
            </Button>
          </div>

          <div className="text-xs text-muted-foreground text-center">
            <p>Pagos seguros con encriptación SSL</p>
            <p>Los productos digitales se entregan instantáneamente</p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;