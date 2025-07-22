import React from "react";
import { useApp } from '../context/AppContext';

const CustomBoltBadge: React.FC = () => {
  const { darkMode } = useApp();

  return (
    <a
      href="https://bolt.new"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed top-4 right-24 z-50"
    >
      <img
        src={darkMode ? "/assets/black_circle_360x360.png" : "/assets/white_circle_360x360.png"}
        alt="Bolt Badge"
        className="w-12 h-auto"
      />
    </a>
  );
};

export default CustomBoltBadge;
