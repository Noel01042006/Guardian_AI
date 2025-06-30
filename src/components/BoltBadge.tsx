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
        src="https://github.com/kickiniteasy/bolt-hackathon-badge/blob/main/src/public/bolt-badge/white_circle_360x360/white_circle_360x360.png"
        alt="Made in Bolt.new"
        className="w-16 h-16 dark:hidden"
      />
      {/* Dark Mode Badge */}
      <img
        src="https://github.com/kickiniteasy/bolt-hackathon-badge/blob/main/src/public/bolt-badge/black_circle_360x360/black_circle_360x360.png"
        alt="Made in Bolt.new"
        className="w-16 h-16 hidden dark:block"
      />
    </a>
  );
};

export default CustomBoltBadge;
