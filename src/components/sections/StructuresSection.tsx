"use client";

import { hospitals } from "@/lib/mock-data";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { MapPin, Bed, Building2, Calendar } from "lucide-react";

const typeConfig: Record<string, { label: string; color: string }> = {
  pubblico: { label: "Pubblico", color: "#3b82f6" },
  privato: { label: "Privato", color: "#8b5cf6" },
  universitario: { label: "Universitario", color: "#10b981" },
};

const statusConfig: Record<string, { label: string; color: string }> = {
  attivo: { label: "Attivo", color: "#10b981" },
  in_analisi: { label: "In Analisi", color: "#f59e0b" },
  completato: { label: "Completato", color: "#3b82f6" },
};

export default function StructuresSection() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-[var(--color-text-secondary)]">
          {hospitals.length} strutture nel portafoglio
        </p>
        <button className="px-4 py-2 bg-[var(--color-brand-copper)] text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity">
          + Nuova Struttura
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {hospitals.map((h) => {
          const exposure = h.departments.reduce((s, d) => s + d.exposure, 0);
          const riskColor = h.riskScore > 70 ? "#ef4444" : h.riskScore > 50 ? "#f59e0b" : "#10b981";
          const typeConf = typeConfig[h.type];
          const statusConf = statusConfig[h.status];

          return (
            <div
              key={h.id}
              className="bg-[var(--color-surface-card)] border border-[var(--color-border)] rounded-xl p-6 hover:border-[var(--color-brand-copper)]/30 transition-all duration-200 cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-base font-semibold text-[var(--color-text-primary)] truncate">
                      {h.name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[var(--color-text-muted)]">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {h.city}, {h.region}
                    </span>
                    <span
                      className="px-2 py-0.5 rounded-full text-[10px] font-medium"
                      style={{ backgroundColor: `${typeConf.color}15`, color: typeConf.color }}
                    >
                      {typeConf.label}
                    </span>
                    <span
                      className="px-2 py-0.5 rounded-full text-[10px] font-medium"
                      style={{ backgroundColor: `${statusConf.color}15`, color: statusConf.color }}
                    >
                      {statusConf.label}
                    </span>
                  </div>
                </div>

                {/* Risk Score Circle */}
                <div className="flex-shrink-0 ml-4">
                  <div className="relative w-16 h-16">
                    <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
                      <circle cx="32" cy="32" r="28" stroke="var(--color-border)" strokeWidth="4" fill="none" />
                      <circle
                        cx="32" cy="32" r="28"
                        stroke={riskColor}
                        strokeWidth="4"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={`${(h.riskScore / 100) * 175.9} 175.9`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-lg font-bold" style={{ color: riskColor }}>{h.riskScore}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-3 mb-4 py-3 border-y border-[var(--color-border)]">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-[var(--color-text-muted)] mb-0.5">
                    <Bed className="w-3 h-3" />
                    <span className="text-[10px] uppercase tracking-wider">Posti Letto</span>
                  </div>
                  <p className="text-sm font-semibold text-[var(--color-text-primary)]">{formatNumber(h.beds)}</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-[var(--color-text-muted)] mb-0.5">
                    <Building2 className="w-3 h-3" />
                    <span className="text-[10px] uppercase tracking-wider">Reparti</span>
                  </div>
                  <p className="text-sm font-semibold text-[var(--color-text-primary)]">{h.departments.length}</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-[var(--color-text-muted)] mb-0.5">
                    <Calendar className="w-3 h-3" />
                    <span className="text-[10px] uppercase tracking-wider">Assessment</span>
                  </div>
                  <p className="text-sm font-semibold text-[var(--color-text-primary)]">{h.lastAssessment}</p>
                </div>
              </div>

              {/* Exposure */}
              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-[var(--color-text-muted)]">Esposizione Finanziaria Totale</span>
                  <span className="text-sm font-bold text-[var(--color-brand-copper-light)]">{formatCurrency(exposure)}</span>
                </div>
              </div>

              {/* Department Pills */}
              <div className="flex flex-wrap gap-1.5">
                {h.departments.map((dept) => {
                  const dColor = dept.riskScore > 70 ? "#ef4444" : dept.riskScore > 50 ? "#f59e0b" : "#10b981";
                  return (
                    <span
                      key={dept.id}
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] bg-[var(--color-surface)] border border-[var(--color-border)]"
                    >
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: dColor }} />
                      <span className="text-[var(--color-text-secondary)]">{dept.name}</span>
                      <span className="font-semibold" style={{ color: dColor }}>{dept.riskScore}</span>
                    </span>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
