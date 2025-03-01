
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Star } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ui/product-card";
import { Section, SectionHeader } from "@/components/ui/section";
import { ReviewCard } from "@/components/ui/review-card";
import { getNewProducts, getTrendingProducts } from "@/data/products";
import { reviews } from "@/data/reviews";

const Index = () => {
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [isHeroLoaded, setIsHeroLoaded] = useState(false);
  
  useEffect(() => {
    setTrendingProducts(getTrendingProducts());
    setNewProducts(getNewProducts());
    
    // Simulate hero image loading
    const timer = setTimeout(() => {
      setIsHeroLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative flex min-h-[90vh] items-center overflow-hidden bg-gray-100">
        <div 
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${isHeroLoaded ? 'opacity-100' : 'opacity-0'}`}
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1556306535-0f09a537f0a3?q=80&w=1170&auto=format&fit=crop')",
            backgroundPosition: "center 40%"
          }}
        >
          <div className="absolute inset-0 bg-black/30" />
        </div>
        
        <div className="container relative z-10 px-4 md:px-6">
          <div className="max-w-2xl animate-slide-in text-white">
            <div className="inline-block rounded-full bg-white/20 px-4 py-1 backdrop-blur-sm mb-6">
              <span className="text-sm font-medium">New Collection Available</span>
            </div>
            <h1 className="h1 mb-6">Premium Quality Caps For Your Style</h1>
            <p className="mb-8 text-lg opacity-90 md:text-xl">
              Handcrafted with premium materials for a perfect fit and timeless look.
            </p>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
              <Button 
                asChild
                size="lg" 
                className="bg-white text-gray-900 hover:bg-white/90"
              >
                <Link to="/shop">Shop Now</Link>
              </Button>
              <Button 
                asChild
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10"
              >
                <Link to="/about">Our Story</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Product Categories */}
      <Section className="bg-white">
        <SectionHeader
          title="Shop By Category"
          description="Explore our range of premium caps for every style and occasion"
        />
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Link 
            to="/shop?category=lifestyle"
            className="hover-scale group relative overflow-hidden rounded-lg"
          >
            <div className="aspect-square">
              <img 
                src="https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1036&auto=format&fit=crop"
                alt="Lifestyle Caps"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6">
              <h3 className="text-2xl font-semibold text-white">Lifestyle</h3>
            </div>
          </Link>
          
          <Link 
            to="/shop?category=street"
            className="hover-scale group relative overflow-hidden rounded-lg"
          >
            <div className="aspect-square">
              <img 
                src="https://images.unsplash.com/photo-1534215754734-5e89a7a0e66d?q=80&w=1170&auto=format&fit=crop"
                alt="Street Caps"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6">
              <h3 className="text-2xl font-semibold text-white">Street</h3>
            </div>
          </Link>
          
          <Link 
            to="/shop?category=sports"
            className="hover-scale group relative overflow-hidden rounded-lg"
          >
            <div className="aspect-square">
              <img 
                src="https://images.unsplash.com/photo-1578998941989-5463856eae5a?q=80&w=1170&auto=format&fit=crop"
                alt="Sports Caps"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6">
              <h3 className="text-2xl font-semibold text-white">Sports</h3>
            </div>
          </Link>
          
          <Link 
            to="/shop?category=outdoor"
            className="hover-scale group relative overflow-hidden rounded-lg"
          >
            <div className="aspect-square">
              <img 
                src="https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?q=80&w=687&auto=format&fit=crop"
                alt="Outdoor Caps"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6">
              <h3 className="text-2xl font-semibold text-white">Outdoor</h3>
            </div>
          </Link>
        </div>
      </Section>
      
      {/* New Arrivals */}
      {newProducts.length > 0 && (
        <Section className="bg-secondary/60">
          <SectionHeader
            title="New Arrivals"
            description="Check out our latest caps fresh off the production line"
          />
          
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
            {newProducts.map((product) => (
              <ProductCard key={product.id} product={product} className="animate-slide-up" />
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Button asChild variant="outline" className="group">
              <Link to="/shop">
                View All Products
                <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </Section>
      )}
      
      {/* Featured Product Banner */}
      <section className="bg-gray-100">
        <div className="container px-4 py-16 md:py-24">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div className="animate-slide-in">
              <div className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1">
                <span className="text-sm font-medium text-primary">Featured Product</span>
              </div>
              <h2 className="h2 mb-4">Classic Black Cap</h2>
              <p className="mb-6 text-lg text-muted-foreground">
                Our bestselling cap crafted from premium materials for ultimate comfort and style. Perfect for any occasion, it features an adjustable strap for a custom fit.
              </p>
              <div className="mb-8 flex items-center">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={20} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="ml-2 text-sm text-muted-foreground">Based on 124 reviews</span>
              </div>
              <Button asChild size="lg">
                <Link to="/product/1">Shop Now</Link>
              </Button>
            </div>
            
            <div className="overflow-hidden rounded-lg">
              <img 
                src="https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1036&auto=format&fit=crop"
                alt="Classic Black Cap"
                className="h-full w-full object-cover hover-scale"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Trending Products */}
      {trendingProducts.length > 0 && (
        <Section className="bg-white">
          <SectionHeader
            title="Trending Now"
            description="Our most popular styles that everyone's talking about"
          />
          
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {trendingProducts.map((product) => (
              <ProductCard key={product.id} product={product} className="animate-slide-up" />
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Button asChild variant="outline" className="group">
              <Link to="/shop">
                View All Products
                <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </Section>
      )}
      
      {/* First-Time Discount */}
      <section className="bg-primary text-white">
        <div className="container px-4 py-12 md:py-16">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="h2 mb-4">Get 29% Off Your First Order</h2>
            <p className="mb-8 text-lg opacity-90">
              Sign up for our newsletter and receive a 29% discount code for your first purchase.
            </p>
            <div className="mx-auto flex max-w-md flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="rounded-md border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/60 backdrop-blur-sm"
              />
              <Button className="bg-white text-primary hover:bg-white/90">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Customer Reviews */}
      <Section className="bg-secondary/40">
        <SectionHeader
          title="What Our Customers Say"
          description="Read the experiences of cap enthusiasts who've shopped with us"
        />
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.slice(0, 3).map((review) => (
            <ReviewCard key={review.id} review={review} className="animate-slide-up" />
          ))}
        </div>
      </Section>
      
      {/* Instagram Feed */}
      <Section className="bg-white">
        <SectionHeader
          title="Follow Us On Instagram"
          description="See how our community styles their caps @capstone"
        />
        
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <a 
              key={i}
              href="#"
              className="hover-scale group relative overflow-hidden"
            >
              <div className="aspect-square">
                <img 
                  src={`https://source.unsplash.com/random/300x300?caps&sig=${i}`}
                  alt="Instagram post"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/30">
                <span className="scale-0 text-white transition-transform group-hover:scale-100">
                  View Post
                </span>
              </div>
            </a>
          ))}
        </div>
      </Section>
    </Layout>
  );
};

export default Index;
