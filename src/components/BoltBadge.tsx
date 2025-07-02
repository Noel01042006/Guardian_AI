import React from "react";

const CustomBoltBadge: React.FC = () => {
  return (
    <a
      href="https://bolt.new"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed top-4 right-20 z-50"
    >
      <img
        src="/Capture.jpg"
        alt="Bolt Badge"
        className="w-20 h-auto"
      />
    </a>
  );
};

export default CustomBoltBadge;
