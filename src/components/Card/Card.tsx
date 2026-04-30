import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  elevated?: boolean;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  elevated = false,
  className = "",
  ...props
}) => {
  return (
    <div
      className={`bg-spotify-dark rounded-spotify-standard ${
        elevated
          ? "shadow-spotify-medium hover:bg-card-mid transition-colors"
          : ""
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
