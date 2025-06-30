import React from "react";

const BackButton: React.FC = () => {
  const goBack = () => {
    window.history.back();
  };

  return (
    <button
      onClick={goBack}
      className="fixed top-4 left-4 z-50 bg-gray-100 dark:bg-gray-800 text-black dark:text-white px-3 py-1 rounded-lg shadow hover:bg-gray-200 dark:hover:bg-gray-700 transition"
    >
      ← Back
    </button>
  );
};

export default BackButton;
