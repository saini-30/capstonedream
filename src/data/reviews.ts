
export interface Review {
  id: string;
  name: string;
  avatar?: string;
  rating: number;
  date: string;
  content: string;
}

export const reviews: Review[] = [
  {
    id: "1",
    name: "Alex Johnson",
    rating: 5,
    date: "March 15, 2023",
    content: "Absolutely love the quality of these caps! The material feels premium and the fit is perfect. Will definitely be ordering more in different colors."
  },
  {
    id: "2",
    name: "Jamie Smith",
    rating: 4,
    date: "February 28, 2023",
    content: "Great cap for everyday wear. Comfortable and stylish. The only reason for 4 stars is that I wish there were more color options available."
  },
  {
    id: "3",
    name: "Taylor Wilson",
    rating: 5,
    date: "April 10, 2023",
    content: "I've tried many different cap brands, but these are by far the best quality. The attention to detail is impressive and they hold up well over time."
  },
  {
    id: "4",
    name: "Morgan Lee",
    rating: 5,
    date: "January 5, 2023",
    content: "The Summer Breeze Mesh Cap is perfect for hot days. Breathable and lightweight while still looking stylish. Worth every penny!"
  },
  {
    id: "5",
    name: "Casey Brown",
    rating: 4,
    date: "May 22, 2023",
    content: "Bought the Urban Explorer Cap and I'm impressed with the quality. Fits well and looks great with almost any outfit."
  }
];
