
import React, { createContext, useState, useContext, useEffect } from "react";
import { Product } from "@/data/products";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { useAuth } from "./AuthContext";

interface CartItem extends Product {
  quantity: number;
}

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (productId: string) => boolean;
  getCartTotal: () => number;
  getCartCount: () => number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();
  
  // Load cart when user changes
  useEffect(() => {
    const loadCart = async () => {
      if (isAuthenticated && user) {
        // Try to get cart from Supabase
        const { data, error } = await supabase
          .from('carts')
          .select('items')
          .eq('user_id', user.id)
          .single();
        
        if (error) {
          console.error("Failed to load cart from Supabase:", error);
          // If no cart exists for this user, create one
          if (error.code === 'PGRST116') {
            // Load from localStorage as fallback and sync later
            const savedCart = localStorage.getItem("cart");
            if (savedCart) {
              try {
                setCart(JSON.parse(savedCart));
              } catch (err) {
                console.error("Failed to parse cart from localStorage:", err);
              }
            }
          }
        } else if (data) {
          setCart(data.items || []);
        }
      } else {
        // Not authenticated, use localStorage
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
          try {
            setCart(JSON.parse(savedCart));
          } catch (error) {
            console.error("Failed to parse cart from localStorage:", error);
          }
        }
      }
    };
    
    loadCart();
  }, [user, isAuthenticated]);
  
  // Save cart when it changes
  useEffect(() => {
    const saveCart = async () => {
      // Always save to localStorage as backup
      localStorage.setItem("cart", JSON.stringify(cart));
      
      // If authenticated, also save to Supabase
      if (isAuthenticated && user) {
        const { error } = await supabase
          .from('carts')
          .upsert({ 
            user_id: user.id, 
            items: cart,
            updated_at: new Date().toISOString()
          }, { 
            onConflict: 'user_id' 
          });
        
        if (error) {
          console.error("Failed to save cart to Supabase:", error);
        }
      }
    };
    
    saveCart();
  }, [cart, isAuthenticated, user]);
  
  const addToCart = (product: Product, quantity = 1) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      updateQuantity(product.id, existingItem.quantity + quantity);
    } else {
      setCart([...cart, { ...product, quantity }]);
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
        duration: 2000,
      });
    }
  };
  
  const removeFromCart = (productId: string) => {
    const item = cart.find(item => item.id === productId);
    setCart(cart.filter(item => item.id !== productId));
    
    if (item) {
      toast({
        title: "Removed from cart",
        description: `${item.name} has been removed from your cart.`,
        duration: 2000,
      });
    }
  };
  
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    
    setCart(cart.map(item => 
      item.id === productId ? { ...item, quantity } : item
    ));
    
    const item = cart.find(item => item.id === productId);
    if (item) {
      toast({
        title: "Cart updated",
        description: `${item.name} quantity updated to ${quantity}.`,
        duration: 2000,
      });
    }
  };
  
  const clearCart = async () => {
    setCart([]);
    
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
      duration: 2000,
    });
    
    // If authenticated, clear from Supabase too
    if (isAuthenticated && user) {
      const { error } = await supabase
        .from('carts')
        .update({ items: [], updated_at: new Date().toISOString() })
        .eq('user_id', user.id);
      
      if (error) {
        console.error("Failed to clear cart in Supabase:", error);
      }
    }
  };
  
  const isInCart = (productId: string): boolean => {
    return cart.some(item => item.id === productId);
  };
  
  const getCartTotal = (): number => {
    return parseFloat(cart.reduce((total, item) => 
      total + item.price * item.quantity, 0
    ).toFixed(2));
  };
  
  const getCartCount = (): number => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };
  
  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart, 
      isInCart,
      getCartTotal,
      getCartCount
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
