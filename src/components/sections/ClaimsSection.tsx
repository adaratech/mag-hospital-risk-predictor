"use client";

import { useState, useMemo } from "react";
import { claims, claimsByType } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

type ClaimStatus = "aperto" | "riservato" | "liquidato" | "chiuso_senza_seguito";

const STATUS_CONFIG: Record<ClaimStatus, { label: string; color: string }> = {
  aperto: { label: "Aperto", color: "#ef4444" },
  riservato: { label: "Riservato", color: "#f59e0b" },
  liquidato: { label: "Liquidato", color: "#10b981" },
  chiuso_senza_seguito: { label: "Chiuso s.s.", color: "#6b7280" },
};

const TYPE_COLORS: Record<string, string> = {
  "Errore Chirurgico": "#3b82f6",
  "Errore Farmacologico": "#8b5cf6",
  "Infezione Nosocomiale": "#ef4444",
  "Ritardata Diagnosi": "#f59e0b",
  "Caduta Paziente": "#10b981",
  "Errore Trasfusionale": "#ec4899",
  "Altro": "#6b7280",
};

const statuses: ClaimStatus[] = ["aperto", "riservato", "liquidato", "chiuso_senza_seguito"];
const claimTypes = claimsByType.map((c) => c.type);

export default function ClaimsSection() {
  const [statusFilter, setStatusFilter] = useState<ClaimStatus | "all">("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  const filteredClaims = useMemo(() => {
    return claims.filter((claim) => {
      if (statusFilter !== "all" && claim.status !== statusFilter) return false;
      if (typeFilter !== "all" && claim.type !== typeFilter) return false;
      return true;
    });
  }, [statusFilter, typeFilter]);

  const totalReserves = useMemo(() => filteredClaims.reduce((s, c) => s + c.reserveAmount, 0), [filteredClaims]);
  const totalPaid = useMemo(() => filteredClaims.reduce((s, c) => s + c.paidAmount, 0), [filteredClaims]);
  const openCount = useMemo(() => filteredClaims.filter((c) => c.status === "aperto").length, [filteredClaims]);

  return (
    <div className="space-y-6">
      {/* Summary KPIs */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Sinistri Totali", value: filteredClaims.length.toString() },
          { label: "Riserve Totali", value: formatCurrency(totalReserves) },
          { label: "Totale Liquidato", value: formatCurrency(totalPaid) },
          { label: "Sinistri Aperti", value: openCount.toString(), highlight: true },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-[var(--color-surface-card)] border border-[var(--color-border)] rounded-xl p-5">
            <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-1">{kpi.label}</p>
            <p className={`text-2xl font-bold ${kpi.highlight ? "text-[#ef4444]" : "text-[var(--color-text-primary)]"}`}>
              {kpi.value}
            </p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-[var(--color-surface-card)] border border-[var(--color-border)] rounded-xl p-5">
        <div className="flex flex-wrap items-center gap-6">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-muted)] block mb-2">Stato</span>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setStatusFilter("all")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  statusFilter === "all"
                    ? "bg-[var(--color-text-primary)] text-[var(--color-surface)]"
                    : "bg-[var(--color-surface)] text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:border-[var(--color-text-muted)]"
                }`}
              >
                Tutti
              </button>
              {statuses.map((s) => {
                const conf = STATUS_CONFIG[s];
                return (
                  <button
                    key={s}
                    onClick={() => setStatusFilter(s)}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border"
                    style={{
                      backgroundColor: statusFilter === s ? `${conf.color}20` : "var(--color-surface)",
                      borderColor: statusFilter === s ? `${conf.color}40` : "var(--color-border)",
                      color: statusFilter === s ? conf.color : "var(--color-text-secondary)",
                    }}
                  >
                    {conf.label}
                  </button>
                );
              })}
            </div>
          </div>
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-muted)] block mb-2">Tipologia</span>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setTypeFilter("all")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  typeFilter === "all"
                    ? "bg-[var(--color-text-primary)] text-[var(--color-surface)]"
                    : "bg-[var(--color-surface)] text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:border-[var(--color-text-muted)]"
                }`}
              >
                Tutti
              </button>
              {claimTypes.map((t) => {
                const color = TYPE_COLORS[t] || "#6b7280";
                return (
                  <button
                    key={t}
                    onClick={() => setTypeFilter(t)}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border"
                    style={{
                      backgroundColor: typeFilter === t ? `${color}20` : "var(--color-surface)",
                      borderColor: typeFilter === t ? `${color}40` : "var(--color-border)",
                      color: typeFilter === t ? color : "var(--color-text-secondary)",
                    }}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Claims Table */}
      <div className="bg-[var(--color-surface-card)] border border-[var(--color-border)] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[var(--color-surface)]">
                <th className="text-left px-4 py-3 text-[10px] uppercase tracking-wider text-[var(--color-text-muted)] font-medium">Data</th>
                <th className="text-left px-4 py-3 text-[10px] uppercase tracking-wider text-[var(--color-text-muted)] font-medium">Reparto</th>
                <th className="text-left px-4 py-3 text-[10px] uppercase tracking-wider text-[var(--color-text-muted)] font-medium">Tipologia</th>
                <th className="text-left px-4 py-3 text-[10px] uppercase tracking-wider text-[var(--color-text-muted)] font-medium">Descrizione</th>
                <th className="text-center px-4 py-3 text-[10px] uppercase tracking-wider text-[var(--color-text-muted)] font-medium">Stato</th>
                <th className="text-right px-4 py-3 text-[10px] uppercase tracking-wider text-[var(--color-text-muted)] font-medium">Riserva</th>
                <th className="text-right px-4 py-3 text-[10px] uppercase tracking-wider text-[var(--color-text-muted)] font-medium">Liquidato</th>
              </tr>
            </thead>
            <tbody>
              {filteredClaims.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-[var(--color-text-muted)]">
                    Nessun sinistro trovato con i filtri selezionati.
                  </td>
                </tr>
              ) : (
                filteredClaims.map((claim, i) => {
                  const statusConf = STATUS_CONFIG[claim.status];
                  const typeColor = TYPE_COLORS[claim.type] || "#6b7280";
                  return (
                    <tr key={claim.id} className={`border-b border-[var(--color-border)] hover:bg-[var(--color-surface-hover)] transition-colors ${i % 2 !== 0 ? "bg-[var(--color-surface)]/30" : ""}`}>
                      <td className="px-4 py-3 text-xs text-[var(--color-text-primary)] tabular-nums whitespace-nowrap">{claim.date}</td>
                      <td className="px-4 py-3 text-xs text-[var(--color-text-primary)] font-medium whitespace-nowrap">{claim.department}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span
                          className="px-2 py-0.5 rounded text-[10px] font-medium"
                          style={{ backgroundColor: `${typeColor}15`, color: typeColor }}
                        >
                          {claim.type}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-[var(--color-text-secondary)] max-w-[250px] truncate" title={claim.description}>
                        {claim.description}
                      </td>
                      <td className="px-4 py-3 text-center whitespace-nowrap">
                        <span
                          className="px-2 py-0.5 rounded text-[10px] font-bold"
                          style={{ backgroundColor: `${statusConf.color}15`, color: statusConf.color }}
                        >
                          {statusConf.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right text-xs font-medium text-[var(--color-text-primary)] tabular-nums">
                        {formatCurrency(claim.reserveAmount)}
                      </td>
                      <td className="px-4 py-3 text-right text-xs font-medium text-[var(--color-text-primary)] tabular-nums">
                        {claim.paidAmount > 0 ? formatCurrency(claim.paidAmount) : "\u2014"}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        {filteredClaims.length > 0 && (
          <div className="flex items-center justify-between border-t border-[var(--color-border)] px-4 py-3">
            <span className="text-xs text-[var(--color-text-muted)]">
              {filteredClaims.length} sinistri visualizzati
            </span>
            <div className="flex gap-4 text-xs text-[var(--color-text-muted)]">
              <span>Riserve: <span className="font-medium text-[var(--color-text-primary)]">{formatCurrency(totalReserves)}</span></span>
              <span>Liquidato: <span className="font-medium text-[var(--color-text-primary)]">{formatCurrency(totalPaid)}</span></span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
