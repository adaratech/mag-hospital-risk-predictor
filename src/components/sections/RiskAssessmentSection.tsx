"use client";

import { riskAssessmentItems } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { ShieldAlert, TrendingDown, Coins, ArrowDownRight } from "lucide-react";
import { useChartTheme } from "@/lib/chart-theme";

const severityConfig: Record<string, { label: string; color: string; bg: string }> = {
  critico: { label: "CRITICO", color: "#ef4444", bg: "#ef444415" },
  alto: { label: "ALTO", color: "#f59e0b", bg: "#f59e0b15" },
  medio: { label: "MEDIO", color: "#3b82f6", bg: "#3b82f615" },
  basso: { label: "BASSO", color: "#10b981", bg: "#10b98115" },
};

const totalScenarios = riskAssessmentItems.reduce((s, r) => s + r.scenarios, 0);
const totalMaxExposure = riskAssessmentItems.reduce((s, r) => s + r.maxExposure, 0);
const totalWeightedExposure = riskAssessmentItems.reduce((s, r) => s + r.weightedExposure, 0);
const totalMitigationCost = riskAssessmentItems.reduce((s, r) => s + r.mitigationCost, 0);

const chartData = riskAssessmentItems
  .sort((a, b) => b.weightedExposure - a.weightedExposure)
  .map((r) => ({
    name: r.description.length > 35 ? r.description.substring(0, 35) + "..." : r.description,
    exposure: r.weightedExposure,
    mitigation: r.mitigationCost,
  }));

export default function RiskAssessmentSection() {
  const ct = useChartTheme();
  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Criticità Rilevate", value: riskAssessmentItems.length.toString(), icon: ShieldAlert, color: "#ef4444" },
          { label: "Scenari di Danno", value: totalScenarios.toString(), icon: TrendingDown, color: "#f59e0b" },
          { label: "Esposizione Max", value: formatCurrency(totalMaxExposure), icon: Coins, color: "#C4956A" },
          { label: "Esposizione Pesata", value: formatCurrency(totalWeightedExposure), icon: ArrowDownRight, color: "#3b82f6" },
        ].map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div key={kpi.label} className="relative bg-[var(--color-surface-card)] border border-[var(--color-border)] rounded-xl p-5 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ backgroundColor: kpi.color }} />
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-1">{kpi.label}</p>
                  <p className="text-xl font-bold text-[var(--color-text-primary)]">{kpi.value}</p>
                </div>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${kpi.color}15` }}>
                  <Icon className="w-4 h-4" style={{ color: kpi.color }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Chart */}
      <div className="bg-[var(--color-surface-card)] border border-[var(--color-border)] rounded-xl p-6">
        <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-1">
          Esposizione Pesata per Criticità
        </h3>
        <p className="text-xs text-[var(--color-text-muted)] mb-4">
          Approccio Solvency II - scenari di danno con quantificazione finanziaria
        </p>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} layout="vertical" margin={{ left: 180 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={ct.grid} opacity={0.5} horizontal={false} />
            <XAxis type="number" tick={{ fill: ct.tick, fontSize: 10 }} axisLine={{ stroke: ct.axis }} tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`} />
            <YAxis type="category" dataKey="name" tick={{ fill: ct.label, fontSize: 10 }} axisLine={{ stroke: ct.axis }} width={175} />
            <Tooltip
              contentStyle={{ backgroundColor: ct.tooltipBg, border: `1px solid ${ct.tooltipBorder}`, borderRadius: 8 }}
              labelStyle={{ color: ct.tooltipLabel }}
              formatter={(value) => [formatCurrency(Number(value)), ""]}
            />
            <Bar dataKey="exposure" name="Esposizione Pesata" fill="#C4956A" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Risk Items Table */}
      <div className="bg-[var(--color-surface-card)] border border-[var(--color-border)] rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-[var(--color-border)]">
          <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">Dettaglio Criticità</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[var(--color-surface)]">
                <th className="text-left px-4 py-3 text-[10px] uppercase tracking-wider text-[var(--color-text-muted)] font-medium">Categoria</th>
                <th className="text-left px-4 py-3 text-[10px] uppercase tracking-wider text-[var(--color-text-muted)] font-medium">Criticità</th>
                <th className="text-center px-4 py-3 text-[10px] uppercase tracking-wider text-[var(--color-text-muted)] font-medium">Severità</th>
                <th className="text-center px-4 py-3 text-[10px] uppercase tracking-wider text-[var(--color-text-muted)] font-medium">Scenari</th>
                <th className="text-right px-4 py-3 text-[10px] uppercase tracking-wider text-[var(--color-text-muted)] font-medium">Esp. Pesata</th>
                <th className="text-right px-4 py-3 text-[10px] uppercase tracking-wider text-[var(--color-text-muted)] font-medium">Costo Mitigazione</th>
                <th className="text-right px-4 py-3 text-[10px] uppercase tracking-wider text-[var(--color-text-muted)] font-medium">ROI %</th>
              </tr>
            </thead>
            <tbody>
              {riskAssessmentItems.map((item, i) => {
                const sev = severityConfig[item.severity];
                return (
                  <tr key={item.id} className={i % 2 === 0 ? "" : "bg-[var(--color-surface)]/30"}>
                    <td className="px-4 py-3 text-xs text-[var(--color-text-secondary)]">{item.category}</td>
                    <td className="px-4 py-3 text-xs text-[var(--color-text-primary)] max-w-xs">
                      {item.description}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className="px-2 py-0.5 rounded text-[10px] font-bold"
                        style={{ backgroundColor: sev.bg, color: sev.color }}
                      >
                        {sev.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center text-xs text-[var(--color-text-primary)] font-medium">{item.scenarios}</td>
                    <td className="px-4 py-3 text-right text-xs font-semibold text-[var(--color-brand-copper-light)]">{formatCurrency(item.weightedExposure)}</td>
                    <td className="px-4 py-3 text-right text-xs text-[var(--color-text-secondary)]">{formatCurrency(item.mitigationCost)}</td>
                    <td className="px-4 py-3 text-right">
                      <span className="text-xs font-bold text-[#10b981]">{item.mitigationROI}%</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ROI Summary Card */}
      <div className="bg-gradient-to-r from-[var(--color-brand-copper)]/10 to-[var(--color-brand-copper-dark)]/5 border border-[var(--color-brand-copper)]/20 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-[var(--color-brand-copper)]/20 flex items-center justify-center">
            <TrendingDown className="w-4 h-4 text-[var(--color-brand-copper-light)]" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">Analisi ROI Investimenti Mitigativi</h3>
            <p className="text-xs text-[var(--color-text-muted)]">Impatto finanziario della rimozione delle criticità</p>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-6">
          <div>
            <p className="text-xs text-[var(--color-text-muted)] mb-1">Investimento Totale Mitigazione</p>
            <p className="text-2xl font-bold text-[var(--color-text-primary)]">{formatCurrency(totalMitigationCost)}</p>
          </div>
          <div>
            <p className="text-xs text-[var(--color-text-muted)] mb-1">Riduzione Esposizione Attesa</p>
            <p className="text-2xl font-bold text-[#10b981]">{formatCurrency(totalWeightedExposure)}</p>
          </div>
          <div>
            <p className="text-xs text-[var(--color-text-muted)] mb-1">ROI Complessivo</p>
            <p className="text-2xl font-bold text-[var(--color-brand-copper-light)]">
              {Math.round(((totalWeightedExposure - totalMitigationCost) / totalMitigationCost) * 100)}%
            </p>
          </div>
          <div>
            <p className="text-xs text-[var(--color-text-muted)] mb-1">Rapporto Costo/Beneficio</p>
            <p className="text-2xl font-bold text-[var(--color-text-primary)]">
              1:{Math.round(totalWeightedExposure / totalMitigationCost)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
