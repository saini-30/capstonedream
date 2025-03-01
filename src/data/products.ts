
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  description?: string;
  features?: string[];
  materials?: string[];
  isNew?: boolean;
  isTrending?: boolean;
  isSale?: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Classic Black Cap",
    category: "Lifestyle",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1036&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1036&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?q=80&w=1170&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534215754734-5e89a7a0e66d?q=80&w=1170&auto=format&fit=crop"
    ],
    description: "A timeless classic black cap with a minimalist design. Made with premium materials for comfort and durability.",
    features: [
      "Adjustable strap for perfect fit",
      "Breathable fabric",
      "Embroidered logo",
      "UV protection"
    ],
    materials: [
      "100% premium cotton",
      "Brass buckle",
      "Embroidered details"
    ],
    isTrending: true
  },
  {
    id: "2",
    name: "Urban Explorer Cap",
    category: "Street",
    price: 45.99,
    originalPrice: 59.99,
    image: "https://images.unsplash.com/photo-1534215754734-5e89a7a0e66d?q=80&w=1170&auto=format&fit=crop",
    isSale: true
  },
  {
    id: "3",
    name: "Summer Breeze Mesh Cap",
    category: "Lifestyle",
    price: 42.99,
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1036&auto=format&fit=crop",
    isNew: true
  },
  {
    id: "4",
    name: "Retro Vintage Cap",
    category: "Vintage",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?q=80&w=1170&auto=format&fit=crop",
    isTrending: true
  },
  {
    id: "5",
    name: "Sports Performance Cap",
    category: "Sports",
    price: 36.99,
    originalPrice: 47.99,
    image: "https://images.unsplash.com/photo-1578998941989-5463856eae5a?q=80&w=1170&auto=format&fit=crop",
    isSale: true
  },
  {
    id: "6",
    name: "Mountain Explorer Cap",
    category: "Outdoor",
    price: 52.99,
    image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?q=80&w=687&auto=format&fit=crop",
    isNew: true
  },
  {
    id: "7",
    name: "Minimalist White Cap",
    category: "Lifestyle",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=1170&auto=format&fit=crop"
  },
  {
    id: "8",
    name: "Navy Ocean Cap",
    category: "Lifestyle",
    price: 44.99,
    image: "https://images.unsplash.com/photo-1620231108902-6edca861ad2f?q=80&w=1170&auto=format&fit=crop"
  }
];

export function getProductById(id: string): Product | undefined {
  return products.find(product => product.id === id);
}

export function getNewProducts(): Product[] {
  return products.filter(product => product.isNew);
}

export function getTrendingProducts(): Product[] {
  return products.filter(product => product.isTrending);
}

export function getSaleProducts(): Product[] {
  return products.filter(product => product.isSale);
}
