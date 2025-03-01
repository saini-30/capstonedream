
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function Section({ children, className, id }: SectionProps) {
  return (
    <section 
      id={id} 
      className={cn("py-12 md:py-16 lg:py-20", className)}
    >
      <div className="container px-4 md:px-6">
        {children}
      </div>
    </section>
  );
}

interface SectionHeaderProps {
  title: string;
  description?: string;
  align?: "left" | "center" | "right";
  className?: string;
}

export function SectionHeader({ 
  title, 
  description, 
  align = "center", 
  className 
}: SectionHeaderProps) {
  return (
    <div 
      className={cn(
        "mb-10 md:mb-14",
        {
          "text-left": align === "left",
          "text-center mx-auto max-w-2xl": align === "center",
          "text-right ml-auto": align === "right",
        },
        className
      )}
    >
      <h2 className="h2 mb-3">{title}</h2>
      {description && (
        <p className="text-lg text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
