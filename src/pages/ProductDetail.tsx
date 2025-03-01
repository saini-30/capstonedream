
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Heart, ShoppingCart, ChevronLeft, ChevronRight, Star } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Section } from "@/components/ui/section";
import { ProductCard } from "@/components/ui/product-card";
import { ReviewCard } from "@/components/ui/review-card";
import { useToast } from "@/hooks/use-toast";
import { getProductById, getTrendingProducts, Product } from "@/data/products";
import { reviews } from "@/data/reviews";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    if (id) {
      const foundProduct = getProductById(id);
      if (foundProduct) {
        setProduct(foundProduct);
        setCurrentImageIndex(0);
      }
      
      // Set related products (using trending products as an example)
      const trending = getTrendingProducts().filter(p => p.id !== id);
      setRelatedProducts(trending.slice(0, 4));
    }
  }, [id]);
  
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };
  
  const nextImage = () => {
    if (product?.images) {
      setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    }
  };
  
  const prevImage = () => {
    if (product?.images) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? product.images.length - 1 : prev - 1
      );
    }
  };
  
  const selectImage = (index: number) => {
    setCurrentImageIndex(index);
  };
  
  const handleAddToCart = () => {
    if (product) {
      toast({
        title: "Added to cart",
        description: `${quantity} × ${product.name} has been added to your cart.`,
        duration: 3000,
      });
    }
  };
  
  const handleToggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    
    if (product) {
      toast({
        title: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
        description: `${product.name} has been ${isWishlisted ? "removed from" : "added to"} your wishlist.`,
        duration: 2000,
      });
    }
  };
  
  if (!product) {
    return (
      <Layout>
        <Section className="min-h-[50vh] flex items-center justify-center">
          <div className="text-center">
            <h2 className="h2 mb-4">Product Not Found</h2>
            <p className="mb-6 text-muted-foreground">
              The product you are looking for might have been removed or is temporarily unavailable.
            </p>
            <Button asChild>
              <Link to="/shop">Back to Shop</Link>
            </Button>
          </div>
        </Section>
      </Layout>
    );
  }
  
  // Calculate discount percentage if applicable
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;
  
  return (
    <Layout>
      <Section className="py-8 md:py-12">
        <div className="mb-4">
          <Link 
            to="/shop" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft size={16} className="mr-1" />
            Back to Shop
          </Link>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
              <img
                src={product.images?.[currentImageIndex] || product.image}
                alt={product.name}
                className="h-full w-full object-cover transition-all duration-300"
              />
              
              {product.images && product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/70 text-foreground transition-colors hover:bg-white backdrop-blur-sm"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/70 text-foreground transition-colors hover:bg-white backdrop-blur-sm"
                    aria-label="Next image"
                  >
                    <ChevronRight size={18} />
                  </button>
                </>
              )}
            </div>
            
            {/* Image thumbnails */}
            {product.images && product.images.length > 1 && (
              <div className="flex space-x-2 overflow-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => selectImage(index)}
                    className={`relative aspect-square w-20 flex-shrink-0 overflow-hidden rounded-md border-2 transition-all ${
                      currentImageIndex === index 
                        ? "border-primary" 
                        : "border-transparent"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} - view ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Product Info */}
          <div className="animate-slide-in">
            <div className="mb-2 text-sm font-medium uppercase tracking-wider text-muted-foreground">
              {product.category}
            </div>
            
            <h1 className="h2 mb-4">{product.name}</h1>
            
            <div className="mb-6 flex items-center">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star 
                    key={i} 
                    size={18} 
                    className="fill-yellow-400 text-yellow-400" 
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-muted-foreground">
                5.0 (18 reviews)
              </span>
            </div>
            
            <div className="mb-6 flex items-center space-x-3">
              <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-muted-foreground line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                  <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-600">
                    {discountPercentage}% OFF
                  </span>
                </>
              )}
            </div>
            
            {product.description && (
              <p className="mb-6 text-muted-foreground">{product.description}</p>
            )}
            
            {/* Quantity Selector */}
            <div className="mb-6">
              <label htmlFor="quantity" className="mb-2 block text-sm font-medium">
                Quantity
              </label>
              <div className="flex h-10 w-32">
                <button
                  type="button"
                  className="flex w-10 items-center justify-center rounded-l-md border border-r-0 bg-muted text-foreground hover:bg-muted/80"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <input
                  type="number"
                  id="quantity"
                  className="w-12 border-y px-2 py-0 text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  value={quantity}
                  onChange={(e) => handleQuantityChange(Number(e.target.value))}
                  min="1"
                  max="10"
                />
                <button
                  type="button"
                  className="flex w-10 items-center justify-center rounded-r-md border border-l-0 bg-muted text-foreground hover:bg-muted/80"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= 10}
                >
                  +
                </button>
              </div>
            </div>
            
            {/* Add to Cart and Wishlist */}
            <div className="mb-8 flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
              <Button 
                size="lg"
                className="gap-2"
                onClick={handleAddToCart}
              >
                <ShoppingCart size={18} />
                Add to Cart
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                className="gap-2"
                onClick={handleToggleWishlist}
              >
                <Heart 
                  size={18} 
                  className={isWishlisted ? "fill-primary text-primary" : ""} 
                />
                {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
              </Button>
            </div>
            
            {/* Product Details Tabs */}
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="materials">Materials</TabsTrigger>
                <TabsTrigger value="shipping">Shipping</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="mt-4 text-muted-foreground">
                <ul className="list-inside list-disc space-y-2">
                  {product.features?.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  )) || (
                    <>
                      <li>Premium quality cap with adjustable strap</li>
                      <li>Breathable fabric for all-day comfort</li>
                      <li>Designed for durability and style</li>
                      <li>Perfect for everyday wear</li>
                    </>
                  )}
                </ul>
              </TabsContent>
              
              <TabsContent value="materials" className="mt-4 text-muted-foreground">
                <ul className="list-inside list-disc space-y-2">
                  {product.materials?.map((material, index) => (
                    <li key={index}>{material}</li>
                  )) || (
                    <>
                      <li>100% premium cotton</li>
                      <li>Brass buckle closure</li>
                      <li>Embroidered details</li>
                    </>
                  )}
                </ul>
              </TabsContent>
              
              <TabsContent value="shipping" className="mt-4 text-muted-foreground">
                <ul className="list-inside list-disc space-y-2">
                  <li>Free shipping on orders over $50</li>
                  <li>2-4 business days delivery</li>
                  <li>30-day return policy</li>
                  <li>Secure payment processing</li>
                </ul>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </Section>
      
      {/* Customer Reviews */}
      <Section className="bg-secondary/40">
        <div className="mb-10">
          <h2 className="h3 mb-2">Customer Reviews</h2>
          <p className="text-muted-foreground">
            What our customers are saying about this product
          </p>
        </div>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.slice(0, 3).map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </Section>
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <Section>
          <div className="mb-10">
            <h2 className="h3 mb-2">You May Also Like</h2>
            <p className="text-muted-foreground">
              Similar products you might be interested in
            </p>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </Section>
      )}
    </Layout>
  );
};

export default ProductDetail;
