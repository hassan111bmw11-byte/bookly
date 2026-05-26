"use client";

import { useEffect, useState } from "react";

export function useTheme(defaultDark = true) {
  const [dark, setDark] = useState(defaultDark);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedTheme = window.localStorage.getItem("theme");
    if (storedTheme === "light") {
      setDark(false);
      return;
    }

    if (storedTheme === "dark") {
      setDark(true);
      return;
    }

    setDark(defaultDark);
  }, [defaultDark]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const root = window.document.documentElement;
    if (dark) {
      root.classList.add("dark");
      window.localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      window.localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return { dark, setDark };
}
