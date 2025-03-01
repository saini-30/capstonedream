
import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t bg-secondary/40">
      <div className="container px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4">
          <div className="md:col-span-1 lg:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <h2 className="text-2xl font-bold">capstone</h2>
            </Link>
            <p className="mb-4 text-muted-foreground">
              Premium quality caps designed for style and comfort.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-foreground/80 transition-colors hover:text-primary"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="#" 
                className="text-foreground/80 transition-colors hover:text-primary"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="#" 
                className="text-foreground/80 transition-colors hover:text-primary"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="mb-4 text-sm font-medium uppercase tracking-wider">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/shop" className="text-muted-foreground transition-colors hover:text-foreground">
                  All Caps
                </Link>
              </li>
              <li>
                <Link to="/shop?category=new" className="text-muted-foreground transition-colors hover:text-foreground">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/shop?category=trending" className="text-muted-foreground transition-colors hover:text-foreground">
                  Trending
                </Link>
              </li>
              <li>
                <Link to="/shop?category=sale" className="text-muted-foreground transition-colors hover:text-foreground">
                  Sale
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="mb-4 text-sm font-medium uppercase tracking-wider">Info</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-muted-foreground transition-colors hover:text-foreground">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/materials" className="text-muted-foreground transition-colors hover:text-foreground">
                  Materials
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-muted-foreground transition-colors hover:text-foreground">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground transition-colors hover:text-foreground">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="mb-4 text-sm font-medium uppercase tracking-wider">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-muted-foreground transition-colors hover:text-foreground">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground transition-colors hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-muted-foreground transition-colors hover:text-foreground">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t pt-8">
          <p className="text-center text-sm text-muted-foreground">
            © {currentYear} capstone. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
