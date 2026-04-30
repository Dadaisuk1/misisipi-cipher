import React from "react";

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = "Search",
  ...props
}) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="w-full px-12 py-3 rounded-spotify-pill bg-spotify-surface text-text-base placeholder-text-secondary focus:outline-none focus:ring-1 focus:ring-spotify-green transition-all"
      style={{ boxShadow: "var(--shadow-inset)" }}
      {...props}
    />
  );
};
