"use client";

import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell,
} from "recharts";
import { SlidersHorizontal, CheckCircle2 } from "lucide-react";
import { insuranceScenarios } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import { useChartTheme } from "@/lib/chart-theme";

const COLORS = { premium: "#6366f1", retained: "#f59e0b", transferred: "#3b82f6", optimal: "#10b981" };

export default function ScenariosSection() {
  const ct = useChartTheme();
  const [sirLevel, setSirLevel] = useState(250000);
  const [policyLimit, setPolicyLimit] = useState(5000000);

  const optimalScenario = insuranceScenarios.reduce((best, c) => c.tcr < best.tcr ? c : best);

  const chartData = insuranceScenarios.map((s) => ({
    name: s.name.replace("Scenario ", "").substring(0, 20),
    Premio: s.premium,
    Ritenuta: s.retained,
    Trasferita: s.transferred,
    TCR: s.tcr,
    isOptimal: s.name === optimalScenario.name,
  }));

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="bg-[var(--color-surface-card)] border border-[var(--color-border)] rounded-xl p-6">
        <div className="flex items-center gap-2 mb-5">
          <SlidersHorizontal className="w-4 h-4 text-[var(--color-brand-copper-light)]" />
          <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">Parametri di Simulazione</h3>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs text-[var(--color-text-secondary)]">SIR (Self Insurance Retention)</label>
              <span className="text-xs font-bold tabular-nums px-2 py-0.5 rounded bg-[var(--color-brand-copper)]/15 text-[var(--color-brand-copper-light)]">
                {formatCurrency(sirLevel)}
              </span>
            </div>
            <input
              type="range" min={50000} max={1000000} step={25000} value={sirLevel}
              onChange={(e) => setSirLevel(Number(e.target.value))}
              className="w-full h-1.5 rounded-lg appearance-none cursor-pointer"
              style={{ accentColor: "#C4956A" }}
            />
            <div className="flex justify-between text-[10px] text-[var(--color-text-muted)] mt-1">
              <span>{formatCurrency(50000)}</span>
              <span>{formatCurrency(1000000)}</span>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs text-[var(--color-text-secondary)]">Limite di Polizza</label>
              <span className="text-xs font-bold tabular-nums px-2 py-0.5 rounded bg-[var(--color-brand-copper)]/15 text-[var(--color-brand-copper-light)]">
                {formatCurrency(policyLimit)}
              </span>
            </div>
            <input
              type="range" min={1000000} max={15000000} step={500000} value={policyLimit}
              onChange={(e) => setPolicyLimit(Number(e.target.value))}
              className="w-full h-1.5 rounded-lg appearance-none cursor-pointer"
              style={{ accentColor: "#C4956A" }}
            />
            <div className="flex justify-between text-[10px] text-[var(--color-text-muted)] mt-1">
              <span>{formatCurrency(1000000)}</span>
              <span>{formatCurrency(15000000)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scenario Cards */}
      <div className="grid grid-cols-4 gap-4">
        {insuranceScenarios.map((scenario) => {
          const isOptimal = scenario.name === optimalScenario.name;
          return (
            <div
              key={scenario.name}
              className={`bg-[var(--color-surface-card)] border rounded-xl p-5 transition-all ${
                isOptimal ? "border-[#10b981]/40 bg-[#10b981]/5" : "border-[var(--color-border)]"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className={`text-xs font-bold ${isOptimal ? "text-[#10b981]" : "text-[var(--color-text-primary)]"}`}>
                  {scenario.name}
                </h4>
                {isOptimal && <CheckCircle2 className="w-4 h-4 text-[#10b981]" />}
              </div>
              <div className="space-y-2">
                <div>
                  <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">Premio</p>
                  <p className="text-sm font-semibold tabular-nums text-[var(--color-text-primary)]">{formatCurrency(scenario.premium)}</p>
                </div>
                <div>
                  <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">SIR</p>
                  <p className="text-sm tabular-nums text-[var(--color-text-secondary)]">{formatCurrency(scenario.sir)}</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">Ritenuta</p>
                    <p className="text-xs font-medium tabular-nums text-[#f59e0b]">{formatCurrency(scenario.retained)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">Trasferita</p>
                    <p className="text-xs font-medium tabular-nums text-[#3b82f6]">{formatCurrency(scenario.transferred)}</p>
                  </div>
                </div>
                <div className="pt-2 border-t border-[var(--color-border)]">
                  <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">Total Cost of Risk</p>
                  <p className={`text-lg font-bold tabular-nums ${isOptimal ? "text-[#10b981]" : "text-[var(--color-text-primary)]"}`}>
                    {formatCurrency(scenario.tcr)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Chart */}
      <div className="bg-[var(--color-surface-card)] border border-[var(--color-border)] rounded-xl p-6">
        <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-1">Confronto Scenari Assicurativi</h3>
        <p className="text-xs text-[var(--color-text-muted)] mb-4">Composizione del Total Cost of Risk per scenario</p>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={chartData} margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={ct.grid} opacity={0.5} />
            <XAxis dataKey="name" tick={{ fill: ct.tick, fontSize: 10 }} axisLine={{ stroke: ct.axis }} />
            <YAxis tick={{ fill: ct.tick, fontSize: 11 }} axisLine={{ stroke: ct.axis }} tickFormatter={(v) => `${(Number(v) / 1000000).toFixed(1)}M`} />
            <Tooltip
              formatter={(value, name) => [formatCurrency(Number(value)), String(name)]}
              contentStyle={{ backgroundColor: ct.tooltipBg, border: `1px solid ${ct.tooltipBorder}`, borderRadius: 8 }}
              labelStyle={{ color: ct.tooltipLabel }}
            />
            <Legend wrapperStyle={{ fontSize: 11, color: ct.label }} />
            <Bar dataKey="Premio" fill={COLORS.premium} radius={[4, 4, 0, 0]} />
            <Bar dataKey="Ritenuta" fill={COLORS.retained} radius={[4, 4, 0, 0]} />
            <Bar dataKey="Trasferita" fill={COLORS.transferred} radius={[4, 4, 0, 0]} />
            <Bar dataKey="TCR" radius={[4, 4, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={index} fill={entry.isOptimal ? COLORS.optimal : "#4b5563"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* TCR Summary */}
      <div className="bg-[#10b981]/5 border border-[#10b981]/20 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <CheckCircle2 className="w-6 h-6 text-[#10b981]" />
          <div>
            <h3 className="text-base font-bold text-[var(--color-text-primary)]">Total Cost of Risk - Confronto</h3>
            <p className="text-xs text-[var(--color-text-secondary)]">Lo scenario ottimale minimizza il costo totale bilanciando premio, ritenzione e trasferimento</p>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          {insuranceScenarios.map((s) => {
            const isOpt = s.name === optimalScenario.name;
            return (
              <div
                key={s.name}
                className={`rounded-lg px-4 py-3 border text-center min-w-[150px] ${
                  isOpt ? "bg-[#10b981]/10 border-[#10b981]/40" : "bg-[var(--color-surface-card)] border-[var(--color-border)]"
                }`}
              >
                <p className={`text-[10px] font-medium mb-1 truncate ${isOpt ? "text-[#10b981]" : "text-[var(--color-text-muted)]"}`}>
                  {s.name}
                </p>
                <p className={`text-base font-bold tabular-nums ${isOpt ? "text-[#10b981]" : "text-[var(--color-text-primary)]"}`}>
                  {formatCurrency(s.tcr)}
                </p>
                {isOpt && <p className="text-[10px] font-bold text-[#10b981] mt-0.5">Ottimale</p>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
