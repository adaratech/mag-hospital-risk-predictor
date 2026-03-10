"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import DashboardSection from "@/components/sections/DashboardSection";
import StructuresSection from "@/components/sections/StructuresSection";
import ClaimsSection from "@/components/sections/ClaimsSection";
import RiskAssessmentSection from "@/components/sections/RiskAssessmentSection";
import SimulationSection from "@/components/sections/SimulationSection";
import ScenariosSection from "@/components/sections/ScenariosSection";
import ReportsSection from "@/components/sections/ReportsSection";

const sectionConfig: Record<string, { title: string; subtitle: string }> = {
  dashboard: {
    title: "Dashboard",
    subtitle: "Panoramica del portafoglio rischi sanitari",
  },
  structures: {
    title: "Strutture Sanitarie",
    subtitle: "Gestione clienti e strutture ospedaliere",
  },
  claims: {
    title: "Statistiche Sinistri",
    subtitle: "Blocco 1 \u2014 Anamnesi: analisi della sinistrosit\u00e0 storica",
  },
  "risk-assessment": {
    title: "Risk Assessment",
    subtitle: "Blocco 2 \u2014 Diagnosi: analisi qualitativa del rischio clinico (Solvency II)",
  },
  simulation: {
    title: "Motore Attuariale",
    subtitle: "Simulatore probabilistico \u2014 integrazione dei 4 blocchi informativi",
  },
  scenarios: {
    title: "Scenari What-If",
    subtitle: "Ottimizzazione della struttura assicurativa e Total Cost of Risk",
  },
  reports: {
    title: "Generazione Report",
    subtitle: "Report analitici automatici per clienti e stakeholder",
  },
};

export default function Home() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const config = sectionConfig[activeSection];

  return (
    <div className="flex min-h-screen">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <main className="flex-1 ml-[260px] transition-all duration-300">
        <Header title={config.title} subtitle={config.subtitle} />
        <div className="p-8 animate-fade-in" key={activeSection}>
          {activeSection === "dashboard" && <DashboardSection />}
          {activeSection === "structures" && <StructuresSection />}
          {activeSection === "claims" && <ClaimsSection />}
          {activeSection === "risk-assessment" && <RiskAssessmentSection />}
          {activeSection === "simulation" && <SimulationSection />}
          {activeSection === "scenarios" && <ScenariosSection />}
          {activeSection === "reports" && <ReportsSection />}
        </div>
      </main>
    </div>
  );
}
