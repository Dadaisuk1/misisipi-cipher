import React from "react";

interface LightPillProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  disabled?: boolean;
}

export const LightPill: React.FC<LightPillProps> = ({
  children,
  disabled = false,
  ...props
}) => {
  return (
    <button
      className={`px-8 py-2 rounded-spotify-pill bg-surface-light text-spotify-dark font-button text-button uppercase tracking-button-wide transition-colors ${
        disabled
          ? "opacity-50 cursor-not-allowed"
          : "hover:bg-text-base active:bg-text-tertiary"
      }`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
