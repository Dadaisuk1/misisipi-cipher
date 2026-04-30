import React from "react";

interface NowPlayingBarProps {
  children?: React.ReactNode;
  className?: string;
}

export const NowPlayingBar: React.FC<NowPlayingBarProps> = ({
  children,
  className = "",
}) => {
  return (
    <footer
      className={`h-24 bg-spotify-surface border-t border-border-gray flex items-center px-8 gap-4 ${className}`}
      style={{ boxShadow: "var(--shadow-heavy)" }}
    >
      {children}
    </footer>
  );
};
