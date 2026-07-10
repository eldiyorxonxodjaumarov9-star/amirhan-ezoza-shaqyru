import { cn } from "@/lib/utils";

interface GoldenDividerProps {
  className?: string;
  withOrnament?: boolean;
}

export function GoldenDivider({ className, withOrnament = true }: GoldenDividerProps) {
  return (
    <div className={cn("flex items-center justify-center gap-4 my-8", className)}>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold/60 to-gold/30" />
      {withOrnament && (
        <svg width="24" height="24" viewBox="0 0 24 24" className="text-gold shrink-0">
          <path
            fill="currentColor"
            d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
            opacity="0.8"
          />
        </svg>
      )}
      <div className="flex-1 h-px bg-gradient-to-l from-transparent via-gold/60 to-gold/30" />
    </div>
  );
}
