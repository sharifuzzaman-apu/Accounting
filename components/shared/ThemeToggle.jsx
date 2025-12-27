'use client';

import { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import { FaMoon, FaSun } from 'react-icons/fa';

export default function ThemeToggle({ showLabel = true, size = 'md' }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved) {
      setIsDark(saved === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');

    // You can add actual theme switching logic here
    // document.documentElement.classList.toggle('dark', newTheme)
  };

  return (
    <Button
      variant="secondary"
      size={size}
      onClick={toggleTheme}
      className="flex items-center gap-2"
    >
      {isDark ? (
        <FaSun className="text-yellow-500" />
      ) : (
        <FaMoon className="text-gray-600" />
      )}
      {showLabel && <span>{isDark ? 'Light' : 'Dark'}</span>}
    </Button>
  );
}
