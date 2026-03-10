"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Building2,
  FileText,
  ShieldAlert,
  Calculator,
  TrendingUp,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Activity,
} from "lucide-react";

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "structures", label: "Strutture", icon: Building2 },
  { id: "claims", label: "Statistiche Sinistri", icon: FileText },
  { id: "risk-assessment", label: "Risk Assessment", icon: ShieldAlert },
  { id: "simulation", label: "Motore Attuariale", icon: Calculator },
  { id: "scenarios", label: "Scenari What-If", icon: TrendingUp },
  { id: "reports", label: "Report", icon: BarChart3 },
];

export default function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-screen z-50 flex flex-col transition-all duration-300 ease-in-out",
        "bg-[var(--color-surface-sidebar)] border-r border-[var(--color-border)]",
        collapsed ? "w-[72px]" : "w-[260px]"
      )}
    >
      <div className="flex items-center gap-3 px-5 h-16 border-b border-[var(--color-border)]">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--color-brand-copper)] to-[var(--color-brand-copper-dark)] flex items-center justify-center flex-shrink-0">
          <Activity className="w-4 h-4 text-white" />
        </div>
        {!collapsed && (
          <div className="animate-fade-in">
            <div className="text-sm font-bold tracking-wide text-[var(--color-text-primary)]">
              Hospital Risk Predictor
            </div>
            <div className="text-[10px] text-[var(--color-text-muted)] tracking-wider uppercase">
              MAG Broker
            </div>
          </div>
        )}
      </div>

      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                "hover:bg-[var(--color-surface-hover)]",
                isActive
                  ? "bg-[var(--color-brand-copper)]/10 text-[var(--color-brand-copper-light)] border border-[var(--color-brand-copper)]/20"
                  : "text-[var(--color-text-secondary)] border border-transparent"
              )}
            >
              <Icon
                className={cn(
                  "w-[18px] h-[18px] flex-shrink-0",
                  isActive ? "text-[var(--color-brand-copper-light)]" : "text-[var(--color-text-muted)]"
                )}
              />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      <div className="p-3 border-t border-[var(--color-border)]">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] transition-colors"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          {!collapsed && <span>Comprimi</span>}
        </button>
      </div>
    </aside>
  );
}
