
import React, { createContext, useState, useContext, useEffect } from "react";
import { Product } from "@/data/products";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { useAuth } from "./AuthContext";

type WishlistContextType = {
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();
  
  // Load wishlist when user changes
  useEffect(() => {
    const loadWishlist = async () => {
      if (isAuthenticated && user) {
        // Try to get wishlist from Supabase
        const { data, error } = await supabase
          .from('wishlists')
          .select('products')
          .eq('user_id', user.id)
          .single();
        
        if (error) {
          console.error("Failed to load wishlist from Supabase:", error);
          // If no wishlist exists for this user, create one
          if (error.code === 'PGRST116') {
            // Load from localStorage as fallback and sync later
            const savedWishlist = localStorage.getItem("wishlist");
            if (savedWishlist) {
              try {
                setWishlist(JSON.parse(savedWishlist));
              } catch (err) {
                console.error("Failed to parse wishlist from localStorage:", err);
              }
            }
          }
        } else if (data) {
          setWishlist(data.products || []);
        }
      } else {
        // Not authenticated, use localStorage
        const savedWishlist = localStorage.getItem("wishlist");
        if (savedWishlist) {
          try {
            setWishlist(JSON.parse(savedWishlist));
          } catch (error) {
            console.error("Failed to parse wishlist from localStorage:", error);
          }
        }
      }
    };
    
    loadWishlist();
  }, [user, isAuthenticated]);
  
  // Save wishlist when it changes
  useEffect(() => {
    const saveWishlist = async () => {
      // Always save to localStorage as backup
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      
      // If authenticated, also save to Supabase
      if (isAuthenticated && user) {
        const { error } = await supabase
          .from('wishlists')
          .upsert({ 
            user_id: user.id, 
            products: wishlist,
            updated_at: new Date().toISOString()
          }, { 
            onConflict: 'user_id' 
          });
        
        if (error) {
          console.error("Failed to save wishlist to Supabase:", error);
        }
      }
    };
    
    saveWishlist();
  }, [wishlist, isAuthenticated, user]);
  
  const addToWishlist = (product: Product) => {
    if (!isInWishlist(product.id)) {
      setWishlist([...wishlist, product]);
      toast({
        title: "Added to wishlist",
        description: `${product.name} has been added to your wishlist.`,
        duration: 2000,
      });
    }
  };
  
  const removeFromWishlist = (productId: string) => {
    const product = wishlist.find(p => p.id === productId);
    setWishlist(wishlist.filter(product => product.id !== productId));
    
    if (product) {
      toast({
        title: "Removed from wishlist",
        description: `${product.name} has been removed from your wishlist.`,
        duration: 2000,
      });
    }
  };
  
  const isInWishlist = (productId: string): boolean => {
    return wishlist.some(product => product.id === productId);
  };
  
  const clearWishlist = async () => {
    setWishlist([]);
    
    toast({
      title: "Wishlist cleared",
      description: "All items have been removed from your wishlist.",
      duration: 2000,
    });
    
    // If authenticated, clear from Supabase too
    if (isAuthenticated && user) {
      const { error } = await supabase
        .from('wishlists')
        .update({ products: [], updated_at: new Date().toISOString() })
        .eq('user_id', user.id);
      
      if (error) {
        console.error("Failed to clear wishlist in Supabase:", error);
      }
    }
  };
  
  return (
    <WishlistContext.Provider value={{ 
      wishlist, 
      addToWishlist, 
      removeFromWishlist, 
      isInWishlist,
      clearWishlist 
    }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
