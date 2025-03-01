
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Review {
  id: string;
  name: string;
  avatar?: string;
  rating: number;
  date: string;
  content: string;
}

interface ReviewCardProps {
  review: Review;
  className?: string;
}

export function ReviewCard({ review, className }: ReviewCardProps) {
  return (
    <div 
      className={cn(
        "flex flex-col space-y-3 rounded-lg border p-5 transition-shadow hover:shadow-md",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {review.avatar ? (
            <img
              src={review.avatar}
              alt={review.name}
              className="h-10 w-10 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-sm font-medium uppercase">
              {review.name.charAt(0)}
            </div>
          )}
          <div>
            <h4 className="font-medium">{review.name}</h4>
            <time className="text-sm text-muted-foreground">{review.date}</time>
          </div>
        </div>
        <div className="flex">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={16}
              className={cn(
                i < review.rating 
                  ? "fill-yellow-400 text-yellow-400" 
                  : "fill-gray-200 text-gray-200"
              )}
            />
          ))}
        </div>
      </div>
      <p className="text-sm text-foreground">{review.content}</p>
    </div>
  );
}
