'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { BiMoon, BiSun } from 'react-icons/bi';
import { useAppText } from '@/i18n/state/client';
import SwitcherItem from '@/components/SwitcherItem';

export default function ThemeSwitcher() {
  const appText = useAppText();

  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isDark = theme === 'dark';

  return (
    <SwitcherItem
      icon={isDark ? <BiSun size={18} /> : <BiMoon size={16} />}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      tooltip={{ content: isDark ? appText.theme.light : appText.theme.dark }}
    />
  );
}
