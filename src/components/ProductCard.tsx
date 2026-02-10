import React from 'react';
import { Star, ShoppingCart, Gift, Video, Package } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Product } from '@/pages/Shop';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const { t } = useTranslation();

  const getCategoryIcon = () => {
    switch (product.category) {
      case 'skincare':
        return <Package className="h-4 w-4" />;
      case 'course':
        return <Video className="h-4 w-4" />;
      case 'giftcard':
        return <Gift className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  const getCategoryLabel = () => {
    switch (product.category) {
      case 'skincare':
        return t('shop.skincare');
      case 'course':
        return t('shop.digitalCourse');
      case 'giftcard':
        return t('shop.giftCards');
      default:
        return t('shop.product');
    }
  };

  const getCategoryColor = () => {
    switch (product.category) {
      case 'skincare':
        return 'default';
      case 'course':
        return 'secondary';
      case 'giftcard':
        return 'destructive';
      default:
        return 'default';
    }
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating)
            ? 'fill-yellow-400 text-yellow-400'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
      <CardHeader className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={product.image}
            alt={t(product.nameKey)}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 left-3">
            <Badge variant={getCategoryColor() as any} className="flex items-center gap-1">
              {getCategoryIcon()}
              {getCategoryLabel()}
            </Badge>
          </div>
          {product.isDigital && (
            <div className="absolute top-3 right-3">
              <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
                Digital
              </Badge>
            </div>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Badge variant="destructive">{t('shop.outOfStock')}</Badge>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
              {t(product.nameKey)}
            </h3>
            <p className="text-muted-foreground text-sm line-clamp-2 mt-1">
              {t(product.descriptionKey)}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {renderStars(product.rating)}
            </div>
            <span className="text-sm text-muted-foreground">
              {product.rating}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-primary">
              ${product.price.toFixed(2)}
            </div>
            {product.inStock && (
              <Badge variant="outline" className="text-green-600 border-green-600">
                {t('shop.inStock')}
              </Badge>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={() => onAddToCart(product)}
          disabled={!product.inStock}
          className="w-full"
          variant={product.inStock ? "default" : "outline"}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          {product.inStock ? t('shop.addToCart') : t('shop.outOfStock')}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;