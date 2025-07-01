import React from "react";

const CustomBoltBadge: React.FC = () => {
  return (
    <a
      href="https://bolt.new"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed top-4 right-20 z-50"
      aria-label="Made with Bolt.new"
    >
      <img
        src="https://imagedelivery.net/lLmNeOP7HXG0OqaG97wimw/a1c1a0e2-a9e6-4a3e-8b6c-4b5c4e4e4e00/public"
        alt="Built with Bolt"
        className="w-32 h-auto"
      />
    </a>
  );
};

export default CustomBoltBadge;