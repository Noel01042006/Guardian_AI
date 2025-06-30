// src/components/BoltBadge.tsx
import React from "react";

const CustomBoltBadge: React.FC = () => {
  return (
    <a
      href="https://bolt.new"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed top-4 right-4 z-50"
    >
      <svg
        width="64"
        height="64"
        viewBox="0 0 64 64"
        className="transition-all duration-300 dark:invert"
      >
        <circle cx="32" cy="32" r="32" fill="white" />
        <path
          d="M32 12 L42 32 H34 L38 52 L22 30 H30 L26 12 Z"
          fill="black"
        />
      </svg>
    </a>
  );
};

export default CustomBoltBadge;
