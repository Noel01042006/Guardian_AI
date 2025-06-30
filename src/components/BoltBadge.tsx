import React from "react";

const CustomBoltBadge: React.FC = () => {
  return (
    <a
      href="https://bolt.new"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed top-4 right-4 z-50"
      aria-label="Made with Bolt.new"
    >
      <picture>
        <source
          srcSet="https://raw.githubusercontent.com/kickiniteasy/bolt-hackathon-badge/main/public/bolt-badge-white.png"
          media="(prefers-color-scheme: dark)"
        />
        <img
          src="https://raw.githubusercontent.com/kickiniteasy/bolt-hackathon-badge/main/public/bolt-badge-black.png"
          alt="Made in Bolt.new"
          className="w-16 h-16"
        />
      </picture>
    </a>
  );
};

export default CustomBoltBadge;
