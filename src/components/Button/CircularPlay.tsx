import React from "react";

interface CircularPlayProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  disabled?: boolean;
}

export const CircularPlay: React.FC<CircularPlayProps> = ({
  icon,
  disabled = false,
  ...props
}) => {
  return (
    <button
      className={`w-12 h-12 rounded-spotify-circle bg-spotify-green text-spotify-black flex items-center justify-center font-button transition-transform ${
        disabled
          ? "opacity-50 cursor-not-allowed"
          : "hover:scale-110 active:scale-95"
      }`}
      disabled={disabled}
      {...props}
    >
      {icon}
    </button>
  );
};
