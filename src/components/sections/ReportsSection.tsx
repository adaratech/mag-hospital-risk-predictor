"use client";

import { FileText, Download, FileCheck, Shield, Briefcase, Scale, Sparkles } from "lucide-react";

const reportTypes = [
  { icon: FileText, title: "Report Completo Analisi del Rischio", description: "Report completo con tutti i 4 blocchi: sinistri storici, risk assessment, benchmark e dati prestazionali." },
  { icon: Shield, title: "Raccomandazione Fondo Rischi", description: "Raccomandazione sul fondo rischi basata sull'analisi dei percentili e proiezioni attuariali." },
  { icon: Briefcase, title: "Analisi Trasferimento Assicurativo", description: "Ottimizzazione del trasferimento assicurativo con simulazione scenari e confronto polizze." },
  { icon: FileCheck, title: "Report ROI Investimenti Mitigativi", description: "Analisi del ritorno sugli investimenti in misure di mitigazione del rischio per il cliente." },
  { icon: FileText, title: "Executive Summary per DG", description: "Sintesi esecutiva per la direzione generale - tutela davanti alla Corte dei Conti." },
  { icon: Scale, title: "Report Conformità Legge Gelli", description: "Verifica conformità ai requisiti della Legge 24/2017 sulla responsabilità sanitaria." },
];

const recentReports = [
  { date: "2026-03-08", hospital: "ASL Bari - Ospedale San Paolo", type: "Report Completo Analisi del Rischio" },
  { date: "2026-03-05", hospital: "Humanitas Research Hospital", type: "Executive Summary per DG" },
  { date: "2026-03-02", hospital: "A.O. Moscati di Avellino", type: "Raccomandazione Fondo Rischi" },
  { date: "2026-02-27", hospital: "IRCCS Policlinico San Matteo", type: "Report Conformità Legge Gelli" },
];

const AI_NARRATIVE = `L'analisi del profilo di rischio dell'ASL Bari evidenzia un trend in crescita del 12,4% nella frequenza sinistri nel triennio 2023-2025, con concentrazione significativa nell'area chirurgica (38% dei sinistri totali) e nel pronto soccorso (22%). Il costo medio per sinistro si attesta a \u20ac187.500, superiore del 15% rispetto al benchmark regionale.\n\nSi raccomanda un adeguamento del fondo rischi a \u20ac4,2M (+\u20ac800K rispetto all'accantonamento attuale) per coprire il VaR al 75\u00b0 percentile. L'implementazione delle misure mitigative proposte \u2014 in particolare il protocollo di checklist chirurgica e il sistema di doppio controllo farmaci \u2014 potrebbe ridurre la frequenza sinistri stimata del 18-22% entro 24 mesi, con un ROI atteso di 3,2x sull'investimento in prevenzione.`;

export default function ReportsSection() {
  return (
    <div className="space-y-6">
      {/* Report Type Cards */}
      <div className="grid grid-cols-3 gap-4">
        {reportTypes.map((report) => {
          const Icon = report.icon;
          return (
            <div
              key={report.title}
              className="bg-[var(--color-surface-card)] border border-[var(--color-border)] rounded-xl p-5 hover:border-[var(--color-brand-copper)]/30 transition-all flex flex-col"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg bg-[var(--color-brand-copper)]/15 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-[var(--color-brand-copper-light)]" />
                </div>
                <h4 className="text-sm font-semibold text-[var(--color-text-primary)] leading-tight">{report.title}</h4>
              </div>
              <p className="text-xs text-[var(--color-text-muted)] leading-relaxed flex-1 mb-4">{report.description}</p>
              <button className="self-start px-4 py-2 text-xs font-semibold text-white bg-[var(--color-brand-copper)] rounded-lg hover:opacity-90 transition-opacity">
                Genera
              </button>
            </div>
          );
        })}
      </div>

      {/* AI Narrative Preview */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[var(--color-brand-copper)]/10 to-[var(--color-surface-card)] border-2 border-[var(--color-brand-copper)]/30 rounded-xl p-6">
        <div className="absolute top-[-20px] right-[-20px] opacity-[0.03]">
          <Sparkles size={200} />
        </div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-full bg-[var(--color-brand-copper)] flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[var(--color-text-primary)]">AI Narrative Preview</h3>
            <p className="text-[10px] text-[var(--color-text-muted)]">Esempio di narrativa generata automaticamente dall&apos;IA</p>
          </div>
        </div>
        <div className="bg-[var(--color-surface-card)]/80 rounded-lg p-5 border-l-4 border-[var(--color-brand-copper)]">
          <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed whitespace-pre-line">{AI_NARRATIVE}</p>
        </div>
        <p className="mt-3 text-[10px] text-[var(--color-text-muted)] italic">
          La narrativa AI trasforma ore di analisi manuale in commenti professionali pronti per il report in pochi secondi.
        </p>
      </div>

      {/* Recent Reports */}
      <div className="bg-[var(--color-surface-card)] border border-[var(--color-border)] rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-[var(--color-border)]">
          <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">Report Recenti</h3>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[var(--color-surface)]">
              <th className="text-left px-6 py-3 text-[10px] uppercase tracking-wider text-[var(--color-text-muted)] font-medium">Data</th>
              <th className="text-left px-6 py-3 text-[10px] uppercase tracking-wider text-[var(--color-text-muted)] font-medium">Struttura</th>
              <th className="text-left px-6 py-3 text-[10px] uppercase tracking-wider text-[var(--color-text-muted)] font-medium">Tipo Report</th>
              <th className="text-right px-6 py-3 text-[10px] uppercase tracking-wider text-[var(--color-text-muted)] font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {recentReports.map((r, i) => (
              <tr key={i} className="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-surface-hover)] transition-colors">
                <td className="px-6 py-3 text-xs text-[var(--color-text-muted)] tabular-nums">{r.date}</td>
                <td className="px-6 py-3 text-xs font-medium text-[var(--color-text-primary)]">{r.hospital}</td>
                <td className="px-6 py-3 text-xs text-[var(--color-text-secondary)]">{r.type}</td>
                <td className="px-6 py-3 text-right">
                  <button className="w-8 h-8 rounded-lg border border-[var(--color-border)] flex items-center justify-center hover:border-[var(--color-brand-copper)] hover:bg-[var(--color-brand-copper)]/10 transition-colors">
                    <Download className="w-3.5 h-3.5 text-[var(--color-brand-copper-light)]" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
