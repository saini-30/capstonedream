
import { Link } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  isNew?: boolean;
  isTrending?: boolean;
  isSale?: boolean;
}

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToCart, isInCart } = useCart();
  
  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
  };
  
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;
  
  return (
    <Link to={`/product/${product.id}`} className={cn("product-card group", className)}>
      <div className="product-image-container">
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
          loading="lazy"
        />
        <button 
          className="wish-button" 
          onClick={toggleWishlist}
          aria-label={isInWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart 
            size={18} 
            className={isInWishlist(product.id) ? "fill-primary text-primary" : ""} 
          />
        </button>
        
        {product.isNew && (
          <span className="card-badge bg-black text-white">New</span>
        )}
        {product.isTrending && !product.isNew && (
          <span className="card-badge bg-primary">Trending</span>
        )}
        {product.isSale && !product.isNew && !product.isTrending && (
          <span className="card-badge bg-red-500">
            {discount > 0 ? `-${discount}%` : "Sale"}
          </span>
        )}
      </div>
      
      <div className="product-info">
        <div className="product-category">{product.category}</div>
        <h3 className="product-title">{product.name}</h3>
        
        <div className="product-price">
          <div className="price-container">
            <span className="current-price">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="original-price">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>
          
          <Button 
            size="sm" 
            variant="outline" 
            className="add-to-cart-button" 
            onClick={handleAddToCart}
            disabled={isInCart(product.id)}
          >
            <ShoppingCart size={16} className="mr-1" />
            <span className="sr-only sm:not-sr-only">
              {isInCart(product.id) ? "Added" : "Add"}
            </span>
          </Button>
        </div>
      </div>
    </Link>
  );
}
