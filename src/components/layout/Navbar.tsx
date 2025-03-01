
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Heart, User, Menu, X, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const { getCartCount } = useCart();
  const { wishlist } = useWishlist();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);
  
  const isActive = (path: string) => location.pathname === path;
  
  const cartCount = getCartCount();
  const wishlistCount = wishlist.length;
  
  return (
    <header 
      className={cn(
        "fixed top-0 left-0 z-50 w-full transition-all duration-300",
        isScrolled 
          ? "bg-white/80 shadow-sm backdrop-blur-md" 
          : "bg-transparent"
      )}
    >
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link 
          to="/" 
          className="text-2xl font-bold tracking-tight transition-opacity hover:opacity-80"
        >
          capstone
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            to="/" 
            className={cn("nav-link", isActive("/") && "nav-link-active")}
          >
            Home
          </Link>
          <Link 
            to="/shop" 
            className={cn("nav-link", isActive("/shop") && "nav-link-active")}
          >
            Shop
          </Link>
          <Link 
            to="/about" 
            className={cn("nav-link", isActive("/about") && "nav-link-active")}
          >
            About
          </Link>
        </nav>
        
        {/* Desktop Icons */}
        <div className="hidden md:flex items-center space-x-4">
          <Link 
            to="/wishlist" 
            className="p-1.5 text-foreground/80 transition-colors hover:text-foreground relative"
            aria-label="Wishlist"
          >
            <Heart size={20} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Link>
          <Link 
            to="/cart" 
            className="p-1.5 text-foreground/80 transition-colors hover:text-foreground relative"
            aria-label="Cart"
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          
          {isAuthenticated ? (
            <div className="relative group">
              <button className="p-1.5 text-foreground/80 transition-colors hover:text-foreground flex items-center gap-2">
                <User size={20} />
                <span className="text-sm font-medium">{user?.name.split(' ')[0]}</span>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden z-20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <div className="p-3 border-b">
                  <p className="font-medium text-sm">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
                <Link to="/profile" className="block px-4 py-2 text-sm hover:bg-muted transition-colors">My Profile</Link>
                <Link to="/orders" className="block px-4 py-2 text-sm hover:bg-muted transition-colors">My Orders</Link>
                <button 
                  onClick={logout}
                  className="w-full text-left px-4 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors flex items-center gap-2"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link 
              to="/auth" 
              className="p-1.5 text-foreground/80 transition-colors hover:text-foreground"
              aria-label="Login / Signup"
            >
              <User size={20} />
            </Link>
          )}
        </div>
        
        {/* Mobile Menu Button */}
        <Button 
          variant="ghost" 
          size="icon"
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex flex-col pt-16 bg-background animate-fade-in">
          <div className="container px-4 py-8 flex flex-col space-y-6">
            <Link 
              to="/" 
              className={cn(
                "text-2xl font-medium",
                isActive("/") && "text-primary"
              )}
            >
              Home
            </Link>
            <Link 
              to="/shop" 
              className={cn(
                "text-2xl font-medium",
                isActive("/shop") && "text-primary"
              )}
            >
              Shop
            </Link>
            <Link 
              to="/about" 
              className={cn(
                "text-2xl font-medium",
                isActive("/about") && "text-primary"
              )}
            >
              About
            </Link>
            <div className="h-px w-full bg-border my-4" />
            <div className="flex flex-col space-y-4">
              <Link 
                to="/wishlist" 
                className="flex items-center space-x-2 text-lg"
              >
                <Heart size={20} />
                <span>Wishlist</span>
                {wishlistCount > 0 && (
                  <span className="bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center ml-auto">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              <Link 
                to="/cart" 
                className="flex items-center space-x-2 text-lg"
              >
                <ShoppingCart size={20} />
                <span>Cart</span>
                {cartCount > 0 && (
                  <span className="bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center ml-auto">
                    {cartCount}
                  </span>
                )}
              </Link>
              
              {isAuthenticated ? (
                <>
                  <div className="border-t border-border pt-4 mt-2">
                    <div className="flex items-center space-x-2 mb-4">
                      <User size={20} />
                      <div>
                        <p className="font-medium">{user?.name}</p>
                        <p className="text-sm text-muted-foreground">{user?.email}</p>
                      </div>
                    </div>
                    <Link to="/profile" className="block py-2 text-lg">My Profile</Link>
                    <Link to="/orders" className="block py-2 text-lg">My Orders</Link>
                    <button 
                      onClick={logout}
                      className="flex items-center space-x-2 text-lg text-destructive py-2"
                    >
                      <LogOut size={20} />
                      <span>Logout</span>
                    </button>
                  </div>
                </>
              ) : (
                <Link 
                  to="/auth" 
                  className="flex items-center space-x-2 text-lg"
                >
                  <User size={20} />
                  <span>Login / Sign Up</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
