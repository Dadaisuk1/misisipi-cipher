import React from "react";

interface OutlinedPillProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export const OutlinedPill: React.FC<OutlinedPillProps> = ({
  children,
  icon,
  disabled = false,
  ...props
}) => {
  return (
    <button
      className={`px-4 py-1 rounded-spotify-full-pill bg-transparent border border-border-light text-text-base font-button text-button uppercase tracking-button-wide transition-colors flex items-center gap-3 ${
        disabled
          ? "opacity-50 cursor-not-allowed"
          : "hover:border-text-base active:bg-card-dark"
      }`}
      disabled={disabled}
      {...props}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
};
