'use client';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';

function ThemeSwitcher() {
  const [theme, setTheme] = useState('light');
  const t = useTranslations('common');
  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme) setTheme(currentTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    setTheme(newTheme);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium">{t('theme')}</span>
      <label className="swap swap-rotate">
        <input
          type="checkbox"
          className="theme-controller"
          checked={theme === 'dark'}
          onChange={toggleTheme}
        />
        <FiSun className="swap-on h-6 w-6" />
        <FiMoon className="swap-off h-6 w-6" />
      </label>
    </div>
  );
}

export default ThemeSwitcher;
