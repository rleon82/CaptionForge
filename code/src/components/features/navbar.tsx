"use client";

import { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/ui";
import { cn } from "@/lib/cn";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#features", label: "Funkcje" },
    { href: "#how-it-works", label: "Jak działa" },
    { href: "#generator", label: "Generator" },
    { href: "#faq", label: "FAQ" },
  ];

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const offset = 80; // navbar height
      const top =
        target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
    setMobileOpen(false);
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-[rgb(var(--color-surface)/0.95)] backdrop-blur-md shadow-sm border-b border-[rgb(var(--color-border))]"
          : "bg-transparent"
      )}
    >
      <div className="section-container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-2 font-black text-xl"
            onClick={(e) => scrollTo(e, "#hero")}
          >
            <span className="text-2xl">✍️</span>
            <span className="gradient-text">CaptionForge</span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollTo(e, link.href)}
                className="text-sm font-medium text-[rgb(var(--color-text-secondary))] hover:text-[rgb(var(--color-primary))] transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <a
              href="#generator"
              onClick={(e) => scrollTo(e, "#generator")}
              className="hidden sm:flex btn-primary text-sm px-4 py-2"
            >
              Generuj za darmo →
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-xl hover:bg-[rgb(var(--color-primary)/0.1)] transition-colors"
              aria-label={mobileOpen ? "Zamknij menu" : "Otwórz menu"}
              aria-expanded={mobileOpen}
            >
              <span
                className={cn(
                  "w-5 h-0.5 bg-current transition-all duration-300",
                  mobileOpen && "rotate-45 translate-y-2"
                )}
              />
              <span
                className={cn(
                  "w-5 h-0.5 bg-current transition-all duration-300",
                  mobileOpen && "opacity-0"
                )}
              />
              <span
                className={cn(
                  "w-5 h-0.5 bg-current transition-all duration-300",
                  mobileOpen && "-rotate-45 -translate-y-2"
                )}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden border-t border-[rgb(var(--color-border))] bg-[rgb(var(--color-surface))] overflow-hidden transition-all duration-300",
          mobileOpen ? "max-h-64 py-4" : "max-h-0"
        )}
      >
        <div className="section-container flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => scrollTo(e, link.href)}
              className="text-base font-medium py-2 text-[rgb(var(--color-text-secondary))] hover:text-[rgb(var(--color-primary))] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#generator"
            onClick={(e) => scrollTo(e, "#generator")}
            className="btn-primary text-center"
          >
            Generuj za darmo →
          </a>
        </div>
      </div>
    </nav>
  );
}
