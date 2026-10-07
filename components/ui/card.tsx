import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export function Card({
  children,
  className = "",
  hoverEffect = false,
  ...props
}: CardProps) {
  return (
    <div
      className={`rounded-lg border border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-[#0e1017]/80 backdrop-blur-sm p-6 transition-all duration-200 ${
        hoverEffect
          ? "hover:border-slate-300 dark:hover:border-white/20 hover:shadow-md hover:-translate-y-0.5"
          : ""
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
