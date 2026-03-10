"use client";

import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine,
} from "recharts";
import { TrendingUp, Shield, AlertTriangle } from "lucide-react";
import { returnPeriodTable, simulationCurveData } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import { useChartTheme } from "@/lib/chart-theme";

const p50 = returnPeriodTable.find((r) => r.percentile === "50\u00b0");
const p75 = returnPeriodTable.find((r) => r.percentile === "75\u00b0");
const currentPolicyExposure = 4200000;

export default function SimulationSection() {
  const ct = useChartTheme();
  return (
    <div className="space-y-6">
      {/* Description */}
      <div className="flex items-center gap-3 p-4 bg-[var(--color-surface-card)] border border-[var(--color-border)] rounded-xl">
        <div className="w-10 h-10 rounded-lg bg-[var(--color-brand-copper)]/15 flex items-center justify-center flex-shrink-0">
          <TrendingUp className="w-5 h-5 text-[var(--color-brand-copper-light)]" />
        </div>
        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
          Simulazione probabilistica basata su approccio <strong className="text-[var(--color-text-primary)]">Solvency II</strong>.
          Il motore integra i 4 blocchi informativi per generare distribuzioni di esposizione attesa
          e determinare il fabbisogno ottimale del fondo rischi.
        </p>
      </div>

      {/* Return Period Table */}
      <div className="bg-[var(--color-surface-card)] border border-[var(--color-border)] rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-[var(--color-border)]">
          <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">Tabella Periodi di Ritorno</h3>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[var(--color-surface)]">
              <th className="text-left px-6 py-3 text-[10px] uppercase tracking-wider text-[var(--color-text-muted)] font-medium">Percentile</th>
              <th className="text-right px-6 py-3 text-[10px] uppercase tracking-wider text-[var(--color-text-muted)] font-medium">Sinistri Attesi</th>
              <th className="text-right px-6 py-3 text-[10px] uppercase tracking-wider text-[var(--color-text-muted)] font-medium">Esposizione Totale</th>
              <th className="text-right px-6 py-3 text-[10px] uppercase tracking-wider text-[var(--color-text-muted)] font-medium">Severit&agrave; Media</th>
            </tr>
          </thead>
          <tbody>
            {returnPeriodTable.map((row) => {
              const isRecommended = row.percentile === "50\u00b0" || row.percentile === "75\u00b0";
              return (
                <tr
                  key={row.percentile}
                  className={`border-b border-[var(--color-border)] last:border-0 ${isRecommended ? "bg-[var(--color-brand-copper)]/5" : ""}`}
                  style={isRecommended ? { borderLeft: "3px solid var(--color-brand-copper)" } : undefined}
                >
                  <td className="px-6 py-3">
                    <span className={`font-medium ${isRecommended ? "text-[var(--color-brand-copper-light)]" : "text-[var(--color-text-primary)]"}`}>
                      {row.percentile} percentile
                    </span>
                    {isRecommended && (
                      <span className="ml-2 text-[10px] px-2 py-0.5 rounded-full font-medium bg-[var(--color-brand-copper)]/15 text-[var(--color-brand-copper-light)]">
                        Raccomandato
                      </span>
                    )}
                  </td>
                  <td className="text-right px-6 py-3 tabular-nums text-[var(--color-text-primary)]">{row.claims}</td>
                  <td className="text-right px-6 py-3 tabular-nums font-medium text-[var(--color-text-primary)]">{formatCurrency(row.totalExposure)}</td>
                  <td className="text-right px-6 py-3 tabular-nums text-[var(--color-text-secondary)]">{formatCurrency(row.avgSeverity)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Simulation Curve */}
      <div className="bg-[var(--color-surface-card)] border border-[var(--color-border)] rounded-xl p-6">
        <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-1">Curva di Distribuzione</h3>
        <p className="text-xs text-[var(--color-text-muted)] mb-4">Esposizione per percentile - simulazione Monte Carlo</p>
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={simulationCurveData} margin={{ top: 10, right: 30, left: 20, bottom: 0 }}>
            <defs>
              <linearGradient id="copperGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#C4956A" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#C4956A" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={ct.grid} opacity={0.5} />
            <XAxis dataKey="percentile" tick={{ fill: ct.tick, fontSize: 11 }} axisLine={{ stroke: ct.axis }} tickFormatter={(v) => `${v}\u00b0`} />
            <YAxis tick={{ fill: ct.tick, fontSize: 11 }} axisLine={{ stroke: ct.axis }} tickFormatter={(v) => `${(Number(v) / 1000000).toFixed(1)}M`} />
            <Tooltip
              formatter={(value) => [formatCurrency(Number(value)), "Esposizione"]}
              labelFormatter={(label) => `${label}\u00b0 percentile`}
              contentStyle={{ backgroundColor: ct.tooltipBg, border: `1px solid ${ct.tooltipBorder}`, borderRadius: 8 }}
              labelStyle={{ color: ct.tooltipLabel }}
            />
            <ReferenceLine x={50} stroke="#C4956A" strokeDasharray="5 5" strokeWidth={1.5} label={{ value: "P50", position: "top", fill: "#C4956A", fontSize: 11 }} />
            <ReferenceLine x={75} stroke="#C4956A" strokeDasharray="5 5" strokeWidth={1.5} label={{ value: "P75", position: "top", fill: "#C4956A", fontSize: 11 }} />
            <ReferenceLine y={currentPolicyExposure} stroke="#3b82f6" strokeDasharray="8 4" strokeWidth={1.5} label={{ value: "Polizza Attuale", position: "right", fill: "#3b82f6", fontSize: 11 }} />
            <Area type="monotone" dataKey="exposure" stroke="#C4956A" strokeWidth={2.5} fill="url(#copperGradient)" />
          </AreaChart>
        </ResponsiveContainer>
        <div className="mt-4 flex items-center gap-2 text-sm px-4 py-2.5 rounded-lg bg-[#3b82f6]/10 border border-[#3b82f6]/20">
          <Shield className="w-4 h-4 text-[#3b82f6]" />
          <span className="text-[var(--color-text-secondary)]">
            La polizza attuale (<strong className="text-[#3b82f6]">{formatCurrency(currentPolicyExposure)}</strong>) si posiziona circa al <strong className="text-[var(--color-text-primary)]">60&deg; percentile</strong> della distribuzione simulata.
          </span>
        </div>
      </div>

      {/* Recommendation Card */}
      <div className="bg-gradient-to-r from-[var(--color-brand-copper)]/10 to-[var(--color-brand-copper-dark)]/5 border border-[var(--color-brand-copper)]/20 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-[var(--color-brand-copper)]/15 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-6 h-6 text-[var(--color-brand-copper-light)]" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-2">Raccomandazione Fondo Rischi</h3>
            <p className="text-sm text-[var(--color-text-secondary)] mb-4 leading-relaxed">
              Sulla base della simulazione attuariale, si raccomanda di dimensionare il fondo rischi nel range operativo tra il 50&deg; e il 75&deg; percentile.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg p-4 bg-[var(--color-surface-card)] border border-[var(--color-brand-copper)]/20">
                <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-1">50&deg; Percentile (Base)</p>
                <p className="text-2xl font-bold tabular-nums text-[var(--color-brand-copper-light)]">
                  {p50 ? formatCurrency(p50.totalExposure) : "N/A"}
                </p>
              </div>
              <div className="rounded-lg p-4 bg-[var(--color-surface-card)] border border-[var(--color-brand-copper)]/20">
                <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-1">75&deg; Percentile (Prudenziale)</p>
                <p className="text-2xl font-bold tabular-nums text-[var(--color-brand-copper-light)]">
                  {p75 ? formatCurrency(p75.totalExposure) : "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
