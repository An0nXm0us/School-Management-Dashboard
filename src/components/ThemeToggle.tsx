"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="w-7 h-7 rounded-full bg-muted" aria-hidden />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="w-7 h-7 flex items-center justify-center rounded-full bg-muted text-foreground hover:bg-border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      {isDark ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-4 h-4"
        >
          <path d="M12 3a1 1 0 011 1v1a1 1 0 11-2 0V4a1 1 0 011-1zm0 15a5 5 0 100-10 5 5 0 000 10zm9-6a1 1 0 010 2h-1a1 1 0 110-2h1zM4 12a1 1 0 010 2H3a1 1 0 110-2h1zm14.657-6.657a1 1 0 011.414 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707zM6.05 17.95a1 1 0 011.414 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707zm12.607 1.414a1 1 0 01-1.414 0l-.707-.707a1 1 0 111.414-1.414l.707.707a1 1 0 010 1.414zM6.757 6.757a1 1 0 01-1.414 0l-.707-.707A1 1 0 116.05 4.636l.707.707a1 1 0 010 1.414zM12 20a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-4 h-4"
        >
          <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )}
    </button>
  );
};

export default ThemeToggle;
