
import React from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Section, SectionHeader } from "@/components/ui/section";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Trash2, ShoppingCart, Plus, Minus, RefreshCw } from "lucide-react";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
  
  return (
    <Layout>
      <div className="pt-24 pb-12">
        <Section>
          <SectionHeader 
            title="Your Cart" 
            description="Review and manage your items"
            align="center"
          />
          
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart size={48} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">Your cart is empty</h3>
              <p className="text-muted-foreground mb-6">
                Add items to your cart to proceed with checkout.
              </p>
              <Button asChild>
                <Link to="/shop">Browse Products</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="flex justify-end mb-4">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={clearCart}
                    className="flex items-center gap-2"
                  >
                    <RefreshCw size={16} />
                    Clear Cart
                  </Button>
                </div>
                
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-muted text-sm">
                      <tr>
                        <th className="text-left p-4">Product</th>
                        <th className="text-center p-4">Quantity</th>
                        <th className="text-right p-4">Price</th>
                        <th className="p-4 w-12"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.map(item => (
                        <tr key={item.id} className="border-t">
                          <td className="p-4">
                            <div className="flex items-center gap-4">
                              <div className="w-16 h-16 rounded bg-muted overflow-hidden flex-shrink-0">
                                <img 
                                  src={item.image} 
                                  alt={item.name} 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                                <h4 className="font-medium">{item.name}</h4>
                                <p className="text-sm text-muted-foreground">{item.category}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center justify-center">
                              <button 
                                className="w-8 h-8 flex items-center justify-center rounded-l-md border border-r-0"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <Minus size={14} />
                              </button>
                              <div className="w-10 h-8 flex items-center justify-center border-y">
                                {item.quantity}
                              </div>
                              <button 
                                className="w-8 h-8 flex items-center justify-center rounded-r-md border border-l-0"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                          </td>
                          <td className="p-4 text-right font-medium">
                            ${(item.price * item.quantity).toFixed(2)}
                          </td>
                          <td className="p-4 text-center">
                            <button 
                              className="text-muted-foreground hover:text-destructive transition-colors"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <Trash2 size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="lg:col-span-1">
                <div className="border rounded-lg p-6 sticky top-24">
                  <h3 className="text-lg font-medium mb-4">Order Summary</h3>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium">${getCartTotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="font-medium">$0.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax</span>
                      <span className="font-medium">$0.00</span>
                    </div>
                    <div className="h-px bg-border my-2"></div>
                    <div className="flex justify-between text-lg">
                      <span className="font-medium">Total</span>
                      <span className="font-bold">${getCartTotal().toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <Button className="w-full mb-4">
                    Checkout
                  </Button>
                  <Button variant="outline" asChild className="w-full">
                    <Link to="/shop">Continue Shopping</Link>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Section>
      </div>
    </Layout>
  );
};

export default Cart;
