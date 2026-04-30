import React from "react";

interface DarkPillProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  disabled?: boolean;
}

export const DarkPill: React.FC<DarkPillProps> = ({
  children,
  disabled = false,
  ...props
}) => {
  return (
    <button
      className={`px-4 py-2 rounded-spotify-full-pill bg-spotify-surface text-text-base font-button text-button uppercase tracking-button-wide transition-colors ${
        disabled
          ? "opacity-50 cursor-not-allowed"
          : "hover:bg-card-dark active:bg-card-mid"
      }`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
