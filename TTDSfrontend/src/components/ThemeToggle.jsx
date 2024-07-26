import React from 'react';

const ThemeToggle = () => {
  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
  };

  return (
    <button
      onClick={toggleTheme}
      className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
    >
      Toggle Theme
    </button>
  );
};

export default ThemeToggle;