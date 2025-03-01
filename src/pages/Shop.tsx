import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { ProductCard } from "@/components/ui/product-card";
import { Section, SectionHeader } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Filter } from "lucide-react";
import { products, Product } from "@/data/products";

const Shop = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get("category");
  
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || "all");
  const [sortOption, setSortOption] = useState("newest");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  
  const categories = [
    { value: "all", label: "All Categories" },
    { value: "lifestyle", label: "Lifestyle" },
    { value: "street", label: "Street" },
    { value: "vintage", label: "Vintage" },
    { value: "sports", label: "Sports" },
    { value: "outdoor", label: "Outdoor" }
  ];
  
  const sortOptions = [
    { value: "newest", label: "Newest" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "name-asc", label: "Name: A to Z" },
    { value: "name-desc", label: "Name: Z to A" }
  ];
  
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);
  
  useEffect(() => {
    let filtered = [...products];
    
    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    
    // Sort products
    switch (sortOption) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        // Keep the default order (newest)
        break;
    }
    
    setFilteredProducts(filtered);
  }, [selectedCategory, sortOption]);
  
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    
    // Update URL with category parameter
    if (category === "all") {
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete("category");
      window.history.pushState({}, "", newUrl.toString());
    } else {
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.set("category", category);
      window.history.pushState({}, "", newUrl.toString());
    }
  };
  
  return (
    <Layout>
      <Section>
        <SectionHeader
          title="Shop All Caps"
          description="Browse our collection of premium quality caps"
        />
        
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row">
          {/* Category Filter */}
          <div className="flex space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="min-w-[180px] justify-between">
                  <div className="flex items-center">
                    <Filter size={16} className="mr-2" />
                    <span>
                      {categories.find(cat => cat.value === selectedCategory)?.label || "All Categories"}
                    </span>
                  </div>
                  <ChevronDown size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-[180px]">
                {categories.map((category) => (
                  <DropdownMenuItem
                    key={category.value}
                    onClick={() => handleCategoryChange(category.value)}
                    className="cursor-pointer"
                  >
                    {category.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          {/* Sort Options */}
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="min-w-[180px] justify-between">
                  <span>Sort: {sortOptions.find(opt => opt.value === sortOption)?.label}</span>
                  <ChevronDown size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[180px]">
                {sortOptions.map((option) => (
                  <DropdownMenuItem
                    key={option.value}
                    onClick={() => setSortOption(option.value)}
                    className="cursor-pointer"
                  >
                    {option.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        {filteredProducts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} className="animate-fade-in" />
            ))}
          </div>
        ) : (
          <div className="my-16 text-center">
            <h3 className="h3 mb-2">No products found</h3>
            <p className="text-muted-foreground">
              Try changing your filters or check back later for new products.
            </p>
          </div>
        )}
      </Section>
    </Layout>
  );
};

export default Shop;
