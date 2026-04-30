import React from "react";

interface AppLayoutProps {
  sidebar: React.ReactNode;
  main: React.ReactNode;
  nowPlaying?: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({
  sidebar,
  main,
  nowPlaying,
}) => {
  return (
    <div className="flex h-screen bg-spotify-black">
      {/* Sidebar */}
      <div className="w-64 bg-spotify-black border-r border-border-gray overflow-y-auto">
        {sidebar}
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        <main className="flex-1 overflow-y-auto">{main}</main>

        {/* Now Playing Bar */}
        {nowPlaying && (
          <footer
            className="h-24 bg-spotify-surface border-t border-border-gray flex items-center px-8 gap-4"
            style={{ boxShadow: "var(--shadow-heavy)" }}
          >
            {nowPlaying}
          </footer>
        )}
      </div>
    </div>
  );
};
