"use client";

import { smoothScrollTo } from "@/utils/smooth-scroll";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Switch } from "../ui/switch";

export const Header = () => {
  const [darkMode, setDarkMode] = useState(false);

  const handleNavClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    smoothScrollTo(id);

    if (id === "search-section") {
      setTimeout(() => {
        const input = document.getElementById("city-search");
        input?.focus();
      }, 100);
    }
  };

  // Efeito para aplicar/remover a classe dark no html
  useEffect(() => {
    // Verificar preferência salva ou do sistema
    const savedMode = localStorage.getItem("darkMode");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    const initialMode = savedMode ? JSON.parse(savedMode) : systemPrefersDark;
    setDarkMode(initialMode);
  }, []);

  useEffect(() => {
    // Aplicar/remover classe e salvar preferência
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <header id="header" className="bg-card border-primary border-b-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="from-primary to-destructive flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br shadow-lg">
              <FontAwesomeIcon
                icon={faCircle}
                className="text-2xl text-white"
              />
            </div>
            <h1 className="text-foreground text-3xl font-bold">
              <span className="text-primary">Poke</span>
              <span className="text-destructive">Hunter</span>
            </h1>
          </div>
          <div className="flex items-center gap-6">
            <nav className="hidden space-x-6 md:flex">
              <Link
                href="#main-content"
                className="text-muted-foreground hover:text-primary cursor-pointer font-semibold transition-colors"
                onClick={(e) => handleNavClick(e, "main-content")}
              >
                Home
              </Link>
              <Link
                href="#search-section"
                className="text-muted-foreground hover:text-primary cursor-pointer font-semibold transition-colors"
                onClick={(e) => handleNavClick(e, "search-section")}
              >
                Search
              </Link>
              <Link
                href="#history-section"
                className="text-muted-foreground hover:text-primary cursor-pointer font-semibold transition-colors"
                onClick={(e) => handleNavClick(e, "history-section")}
              >
                History
              </Link>
              <Link
                href="#instructions-section"
                className="text-muted-foreground hover:text-primary cursor-pointer font-semibold transition-colors"
                onClick={(e) => handleNavClick(e, "instructions-section")}
              >
                Help
              </Link>
            </nav>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground text-sm">☀️</span>
              <Switch
                checked={darkMode}
                onCheckedChange={setDarkMode}
                aria-label="Toggle dark mode"
              />
              <span className="text-muted-foreground text-sm">🌙</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
