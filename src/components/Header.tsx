"use client";

import { Bell, Search, User, Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { useState, useRef, useEffect } from "react";

interface HeaderProps {
  title: string;
  subtitle?: string;
}

type Theme = "light" | "dark" | "system";

const themeOptions: { value: Theme; label: string; icon: typeof Sun }[] = [
  { value: "light", label: "Chiaro", icon: Sun },
  { value: "dark", label: "Scuro", icon: Moon },
  { value: "system", label: "Sistema", icon: Monitor },
];

export default function Header({ title, subtitle }: HeaderProps) {
  const { theme, setTheme, resolved } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const ActiveIcon = resolved === "dark" ? Moon : Sun;

  return (
    <header className="h-16 border-b border-[var(--color-border)] bg-[var(--color-surface)]/80 backdrop-blur-xl sticky top-0 z-40 flex items-center justify-between px-8">
      <div>
        <h1 className="text-lg font-semibold text-[var(--color-text-primary)]">{title}</h1>
        {subtitle && (
          <p className="text-xs text-[var(--color-text-muted)]">{subtitle}</p>
        )}
      </div>
      <div className="flex items-center gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
          <input
            type="text"
            placeholder="Cerca struttura, sinistro..."
            className="pl-9 pr-4 py-2 w-64 bg-[var(--color-surface-card)] border border-[var(--color-border)] rounded-lg text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-brand-copper)]/50 transition-colors"
          />
        </div>

        {/* Theme Switcher */}
        <div className="relative" ref={ref}>
          <button
            onClick={() => setOpen(!open)}
            className="p-2 rounded-lg hover:bg-[var(--color-surface-hover)] transition-colors"
            title="Cambia tema"
          >
            <ActiveIcon className="w-[18px] h-[18px] text-[var(--color-text-muted)]" />
          </button>
          {open && (
            <div className="absolute right-0 top-full mt-2 w-40 bg-[var(--color-surface-card)] border border-[var(--color-border)] rounded-xl shadow-lg overflow-hidden z-50">
              {themeOptions.map((opt) => {
                const Icon = opt.icon;
                const isActive = theme === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => { setTheme(opt.value); setOpen(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                      isActive
                        ? "bg-[var(--color-brand-copper)]/10 text-[var(--color-brand-copper-light)]"
                        : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)]"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{opt.label}</span>
                    {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[var(--color-brand-copper)]" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <button className="relative p-2 rounded-lg hover:bg-[var(--color-surface-hover)] transition-colors">
          <Bell className="w-[18px] h-[18px] text-[var(--color-text-muted)]" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[var(--color-danger)] rounded-full" />
        </button>
        <div className="flex items-center gap-2 pl-3 ml-1 border-l border-[var(--color-border)]">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--color-brand-copper)] to-[var(--color-brand-copper-dark)] flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <div className="text-right">
            <div className="text-xs font-medium text-[var(--color-text-primary)]">F. Montesi Righetti</div>
            <div className="text-[10px] text-[var(--color-text-muted)]">Risk Manager</div>
          </div>
        </div>
      </div>
    </header>
  );
}
