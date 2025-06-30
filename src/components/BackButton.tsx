import React from 'react';

interface BackButtonProps {
  onClick: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick }) => {
  return (
    <div className="fixed top-4 left-4 z-50">
      <button
        onClick={onClick}
        className="bg-gray-800 text-white dark:bg-white dark:text-black px-4 py-2 rounded-full shadow hover:opacity-80 transition"
      >
        ← Back
      </button>
    </div>
  );
};

export default BackButton;
