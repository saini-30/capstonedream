
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Heart, ShoppingCart, ArrowLeft, Check } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { getProductById } from "@/data/products";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ReturnType<typeof getProductById>>(undefined);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState("");
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToCart, isInCart } = useCart();
  
  useEffect(() => {
    if (id) {
      const foundProduct = getProductById(id);
      setProduct(foundProduct);
      
      if (foundProduct?.images?.length) {
        setActiveImage(foundProduct.images[0]);
      } else if (foundProduct) {
        setActiveImage(foundProduct.image);
      }
    }
  }, [id]);
  
  const toggleWishlist = () => {
    if (!product) return;
    
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };
  
  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, quantity);
  };
  
  if (!product) {
    return (
      <Layout>
        <div className="container pt-32 pb-16 text-center">
          <h1 className="mb-4 text-2xl font-bold">Product Not Found</h1>
          <p className="mb-8">The product you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/shop">Return to Shop</Link>
          </Button>
        </div>
      </Layout>
    );
  }
  
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;
  
  return (
    <Layout>
      <div className="container pt-24 pb-16">
        <Link to="/shop" className="inline-flex items-center text-sm font-medium mb-8 hover:text-primary transition-colors">
          <ArrowLeft size={16} className="mr-2" />
          Back to shop
        </Link>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden bg-muted rounded-lg">
              <img 
                src={activeImage || product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button 
                    key={index}
                    className={`aspect-square overflow-hidden rounded-md bg-muted ${image === activeImage ? 'ring-2 ring-primary' : ''}`}
                    onClick={() => setActiveImage(image)}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} - view ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <div>
            <div className="mb-2 text-sm uppercase tracking-wider text-muted-foreground">
              {product.category}
            </div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <>
                  <span className="text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
                  <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded">
                    {discount}% OFF
                  </span>
                </>
              )}
            </div>
            
            {product.description && (
              <p className="text-muted-foreground mb-8">{product.description}</p>
            )}
            
            {product.features && (
              <div className="mb-8">
                <h3 className="font-medium mb-2">Features</h3>
                <ul className="space-y-1">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check size={16} className="text-primary mr-2 mt-1 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {product.materials && (
              <div className="mb-8">
                <h3 className="font-medium mb-2">Materials</h3>
                <ul className="space-y-1">
                  {product.materials.map((material, index) => (
                    <li key={index} className="flex items-start">
                      <Check size={16} className="text-primary mr-2 mt-1 flex-shrink-0" />
                      <span>{material}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="mb-8">
              <div className="flex gap-6 items-center mb-6">
                <div className="flex items-center">
                  <button 
                    className="w-10 h-10 flex items-center justify-center rounded-l-md border border-r-0"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </button>
                  <div className="w-12 h-10 flex items-center justify-center border">
                    {quantity}
                  </div>
                  <button 
                    className="w-10 h-10 flex items-center justify-center rounded-r-md border border-l-0"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
                
                <div className="text-sm text-muted-foreground">
                  In Stock
                </div>
              </div>
              
              <div className="flex gap-4">
                <Button 
                  className="flex-1" 
                  onClick={handleAddToCart}
                  disabled={isInCart(product.id)}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  {isInCart(product.id) ? 'Added to Cart' : 'Add to Cart'}
                </Button>
                
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={toggleWishlist}
                  aria-label={isInWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}
                >
                  <Heart 
                    className={isInWishlist(product.id) ? "fill-primary text-primary" : ""} 
                  />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
