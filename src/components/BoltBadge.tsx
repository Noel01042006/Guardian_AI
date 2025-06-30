// src/components/BoltBadge.tsx
import React from 'react';

const CustomBoltBadge: React.FC = () => {
  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  return (
    <a
      href="https://bolt.new"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed top-4 right-4 z-50 flex items-center gap-2 px-3 py-2 rounded-full shadow-md transition-colors bg-white dark:bg-black text-black dark:text-white border border-gray-300 dark:border-gray-700 hover:scale-105"
      style={{ fontFamily: 'sans-serif', fontSize: '0.9rem' }}
    >
      <img
        src={
          isDark
            ? 'https://raw.githubusercontent.com/kickiniteasy/bolt-hackathon-badge/main/public/bolt-badge-dark.svg'
            : 'https://raw.githubusercontent.com/kickiniteasy/bolt-hackathon-badge/main/public/bolt-badge-light.svg'
        }
        alt="bolt.new"
        className="w-5 h-5"
      />
      <span>Made with bolt.new</span>
    </a>
  );
};

export default CustomBoltBadge;

