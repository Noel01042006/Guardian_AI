import React from 'react';

const CustomBoltBadge = () => {
  return (
    <a
      href="https://bolt.new"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed top-4 right-4 z-50"
      aria-label="Made with Bolt.new"
    >
      {/* Light Mode Badge */}
      <img
        src="https://cdn.jsdelivr.net/gh/kickiniteasy/bolt-hackathon-badge/public/bolt-badge-black.png"
        alt="Made in Bolt.new"
        className="w-16 h-16 dark:hidden"
      />
      {/* Dark Mode Badge */}
      <img
        src="https://cdn.jsdelivr.net/gh/kickiniteasy/bolt-hackathon-badge/public/bolt-badge-white.png"
        alt="Made in Bolt.new"
        className="w-16 h-16 hidden dark:block"
      />
    </a>
  );
};

export default CustomBoltBadge;
