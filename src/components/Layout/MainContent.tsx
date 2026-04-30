import React from "react";

interface MainContentProps {
  children: React.ReactNode;
  className?: string;
}

export const MainContent: React.FC<MainContentProps> = ({
  children,
  className = "",
}) => {
  return (
    <main className={`flex-1 bg-spotify-black overflow-y-auto ${className}`}>
      {children}
    </main>
  );
};
