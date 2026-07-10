import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "dark" | "light";
  hover?: boolean;
}

export function GlassCard({
  children,
  className,
  variant = "dark",
  hover = false,
}: GlassCardProps) {
  return (
    <div
      className={cn(
        variant === "dark" ? "glass-card" : "glass-card-light",
        "rounded-2xl p-6 md:p-8 transition-all duration-500",
        hover && "hover:border-gold/40 hover:shadow-[0_12px_40px_rgba(201,154,61,0.15)]",
        className
      )}
    >
      {children}
    </div>
  );
}
