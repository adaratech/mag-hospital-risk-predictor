"use client";

import { hospitals, monthlyTrend, claimsByType, departmentExposureData } from "@/lib/mock-data";
import { formatCurrency, formatNumber } from "@/lib/utils";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Legend,
} from "recharts";
import { Building2, DollarSign, ShieldAlert, ClipboardCheck } from "lucide-react";
import { useChartTheme } from "@/lib/chart-theme";

const COLORS = ["#C4956A", "#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#6b7280"];

const totalExposure = hospitals.reduce(
  (sum, h) => sum + h.departments.reduce((ds, d) => ds + d.exposure, 0), 0
);
const avgRisk = Math.round(hospitals.reduce((s, h) => s + h.riskScore, 0) / hospitals.length);
const activeAssessments = hospitals.filter(h => h.status === "in_analisi").length;

const kpis = [
  { label: "Strutture Gestite", value: formatNumber(hospitals.length), icon: Building2, color: "#3b82f6" },
  { label: "Esposizione Totale", value: formatCurrency(totalExposure), icon: DollarSign, color: "#C4956A" },
  { label: "Risk Score Medio", value: `${avgRisk}/100`, icon: ShieldAlert, color: avgRisk > 60 ? "#f59e0b" : "#10b981" },
  { label: "Assessment Attivi", value: formatNumber(activeAssessments), icon: ClipboardCheck, color: "#8b5cf6" },
];

export default function DashboardSection() {
  const ct = useChartTheme();
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.label}
              className="relative bg-[var(--color-surface-card)] border border-[var(--color-border)] rounded-xl p-5 overflow-hidden"
            >
              <div
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{ backgroundColor: kpi.color }}
              />
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-1">
                    {kpi.label}
                  </p>
                  <p className="text-2xl font-bold text-[var(--color-text-primary)]">
                    {kpi.value}
                  </p>
                </div>
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${kpi.color}15` }}
                >
                  <Icon className="w-5 h-5" style={{ color: kpi.color }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-3 gap-6">
        {/* Department Exposure Chart */}
        <div className="col-span-2 bg-[var(--color-surface-card)] border border-[var(--color-border)] rounded-xl p-6">
          <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-1">
            Esposizione per Reparto vs Benchmark
          </h3>
          <p className="text-xs text-[var(--color-text-muted)] mb-4">
            ASL Bari - Ospedale San Paolo
          </p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={departmentExposureData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke={ct.grid} opacity={0.5} />
              <XAxis dataKey="name" tick={{ fill: ct.tick, fontSize: 11 }} axisLine={{ stroke: ct.axis }} />
              <YAxis tick={{ fill: ct.tick, fontSize: 11 }} axisLine={{ stroke: ct.axis }} tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`} />
              <Tooltip
                contentStyle={{ backgroundColor: ct.tooltipBg, border: `1px solid ${ct.tooltipBorder}`, borderRadius: 8 }}
                labelStyle={{ color: ct.tooltipLabel }}
                formatter={(value) => [formatCurrency(Number(value)), ""]}
              />
              <Bar dataKey="exposure" name="Esposizione" fill="#C4956A" radius={[4, 4, 0, 0]} />
              <Bar dataKey="benchmark" name="Benchmark" fill="#3b82f6" opacity={0.5} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Claims by Type Pie */}
        <div className="bg-[var(--color-surface-card)] border border-[var(--color-border)] rounded-xl p-6">
          <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-1">
            Sinistri per Tipologia
          </h3>
          <p className="text-xs text-[var(--color-text-muted)] mb-4">Distribuzione benchmark nazionale</p>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={claimsByType}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                dataKey="count"
                nameKey="type"
                paddingAngle={2}
              >
                {claimsByType.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: ct.tooltipBg, border: `1px solid ${ct.tooltipBorder}`, borderRadius: 8 }}
                labelStyle={{ color: ct.tooltipLabel }}
              />
              <Legend
                wrapperStyle={{ fontSize: 10, color: ct.label }}
                iconSize={8}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-3 gap-6">
        {/* Monthly Trend */}
        <div className="col-span-2 bg-[var(--color-surface-card)] border border-[var(--color-border)] rounded-xl p-6">
          <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-1">
            Trend Sinistri Mensile
          </h3>
          <p className="text-xs text-[var(--color-text-muted)] mb-4">Ultimo anno - frequenza e costo</p>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke={ct.grid} opacity={0.5} />
              <XAxis dataKey="month" tick={{ fill: ct.tick, fontSize: 11 }} axisLine={{ stroke: ct.axis }} />
              <YAxis yAxisId="left" tick={{ fill: ct.tick, fontSize: 11 }} axisLine={{ stroke: ct.axis }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fill: ct.tick, fontSize: 11 }} axisLine={{ stroke: ct.axis }} tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`} />
              <Tooltip
                contentStyle={{ backgroundColor: ct.tooltipBg, border: `1px solid ${ct.tooltipBorder}`, borderRadius: 8 }}
                labelStyle={{ color: ct.tooltipLabel }}
              />
              <Line yAxisId="left" type="monotone" dataKey="claims" name="N. Sinistri" stroke="#C4956A" strokeWidth={2} dot={{ fill: "#C4956A", r: 3 }} />
              <Line yAxisId="right" type="monotone" dataKey="exposure" name="Esposizione" stroke="#3b82f6" strokeWidth={2} dot={{ fill: "#3b82f6", r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Hospital List */}
        <div className="bg-[var(--color-surface-card)] border border-[var(--color-border)] rounded-xl p-6">
          <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-4">
            Strutture Recenti
          </h3>
          <div className="space-y-3">
            {hospitals.map((h) => {
              const exposure = h.departments.reduce((s, d) => s + d.exposure, 0);
              const riskColor = h.riskScore > 70 ? "#ef4444" : h.riskScore > 50 ? "#f59e0b" : "#10b981";
              const statusLabels: Record<string, string> = { attivo: "Attivo", in_analisi: "In Analisi", completato: "Completato" };
              const statusColors: Record<string, string> = { attivo: "#10b981", in_analisi: "#f59e0b", completato: "#3b82f6" };
              return (
                <div key={h.id} className="flex items-center justify-between py-2 border-b border-[var(--color-border)] last:border-0">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[var(--color-text-primary)] truncate">{h.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] text-[var(--color-text-muted)]">{h.city}</span>
                      <span
                        className="text-[9px] px-1.5 py-0.5 rounded-full font-medium"
                        style={{ backgroundColor: `${statusColors[h.status]}15`, color: statusColors[h.status] }}
                      >
                        {statusLabels[h.status]}
                      </span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 ml-3">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: riskColor }} />
                      <span className="text-xs font-semibold" style={{ color: riskColor }}>{h.riskScore}</span>
                    </div>
                    <p className="text-[10px] text-[var(--color-text-muted)]">{formatCurrency(exposure)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
