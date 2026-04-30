import React from "react";

interface LargePillProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  disabled?: boolean;
}

export const LargePill: React.FC<LargePillProps> = ({
  children,
  disabled = false,
  ...props
}) => {
  return (
    <button
      className={`px-[43px] py-0 rounded-spotify-pill bg-spotify-dark text-text-base font-button text-button uppercase tracking-button-wide transition-colors ${
        disabled
          ? "opacity-50 cursor-not-allowed"
          : "hover:bg-spotify-surface active:bg-card-dark"
      }`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
