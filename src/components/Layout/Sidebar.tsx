import React from "react";

interface SidebarProps {
  children?: React.ReactNode;
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  children,
  className = "",
}) => {
  return (
    <aside
      className={`w-64 bg-spotify-black border-r border-border-gray flex flex-col overflow-y-auto ${className}`}
    >
      {children}
    </aside>
  );
};
