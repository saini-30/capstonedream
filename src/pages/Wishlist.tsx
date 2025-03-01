
import React from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Section, SectionHeader } from "@/components/ui/section";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";

const Wishlist = () => {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart, isInCart } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent, productId: string) => {
    e.preventDefault();
    const product = wishlist.find(item => item.id === productId);
    if (product) {
      addToCart(product);
    }
  };
  
  return (
    <Layout>
      <div className="pt-24 pb-12">
        <Section>
          <SectionHeader 
            title="Your Wishlist" 
            description="Items you've saved for later"
            align="center"
          />
          
          {wishlist.length === 0 ? (
            <div className="text-center py-12">
              <Heart size={48} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">Your wishlist is empty</h3>
              <p className="text-muted-foreground mb-6">
                Add items to your wishlist by clicking the heart icon on products you love.
              </p>
              <Button asChild>
                <Link to="/shop">Browse Products</Link>
              </Button>
            </div>
          ) : (
            <>
              <div className="flex justify-end mb-6">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={clearWishlist}
                  className="flex items-center gap-2"
                >
                  <Trash2 size={16} />
                  Clear Wishlist
                </Button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {wishlist.map(product => (
                  <div key={product.id} className="product-card group">
                    <div className="product-image-container">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="product-image"
                        loading="lazy"
                      />
                      <button 
                        className="wish-button text-primary" 
                        onClick={(e) => {
                          e.preventDefault();
                          removeFromWishlist(product.id);
                        }}
                        aria-label="Remove from wishlist"
                      >
                        <Heart size={18} className="fill-primary" />
                      </button>
                      
                      {product.isNew && (
                        <span className="card-badge bg-black text-white">New</span>
                      )}
                      {product.isTrending && !product.isNew && (
                        <span className="card-badge bg-primary">Trending</span>
                      )}
                      {product.isSale && !product.isNew && !product.isTrending && (
                        <span className="card-badge bg-red-500">
                          Sale
                        </span>
                      )}
                    </div>
                    
                    <div className="product-info">
                      <div className="product-category">{product.category}</div>
                      <h3 className="product-title">
                        <Link to={`/product/${product.id}`}>
                          {product.name}
                        </Link>
                      </h3>
                      
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
                          onClick={(e) => handleAddToCart(e, product.id)}
                          disabled={isInCart(product.id)}
                        >
                          <ShoppingCart size={16} className="mr-1" />
                          <span className="sr-only sm:not-sr-only">
                            {isInCart(product.id) ? "Added" : "Add"}
                          </span>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </Section>
      </div>
    </Layout>
  );
};

export default Wishlist;
