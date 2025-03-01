
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Heart, User, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
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
            className="p-1.5 text-foreground/80 transition-colors hover:text-foreground"
            aria-label="Wishlist"
          >
            <Heart size={20} />
          </Link>
          <Link 
            to="/cart" 
            className="p-1.5 text-foreground/80 transition-colors hover:text-foreground"
            aria-label="Cart"
          >
            <ShoppingCart size={20} />
          </Link>
          <Link 
            to="/account" 
            className="p-1.5 text-foreground/80 transition-colors hover:text-foreground"
            aria-label="Account"
          >
            <User size={20} />
          </Link>
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
            <div className="flex justify-start space-x-8">
              <Link 
                to="/wishlist" 
                className="flex items-center space-x-2 text-lg"
              >
                <Heart size={20} />
                <span>Wishlist</span>
              </Link>
              <Link 
                to="/cart" 
                className="flex items-center space-x-2 text-lg"
              >
                <ShoppingCart size={20} />
                <span>Cart</span>
              </Link>
              <Link 
                to="/account" 
                className="flex items-center space-x-2 text-lg"
              >
                <User size={20} />
                <span>Account</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
