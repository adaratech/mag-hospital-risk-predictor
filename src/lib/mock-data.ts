export interface Hospital {
  id: string;
  name: string;
  type: "pubblico" | "privato" | "universitario";
  region: string;
  city: string;
  beds: number;
  departments: Department[];
  riskScore: number;
  lastAssessment: string;
  status: "attivo" | "in_analisi" | "completato";
}

export interface Department {
  id: string;
  name: string;
  beds: number;
  surgeries: number;
  admissions: number;
  riskScore: number;
  exposure: number;
}

export interface Claim {
  id: string;
  hospitalId: string;
  date: string;
  department: string;
  description: string;
  type: "Errore Chirurgico" | "Errore Farmacologico" | "Infezione Nosocomiale" | "Ritardata Diagnosi" | "Caduta Paziente" | "Errore Trasfusionale" | "Altro";
  status: "aperto" | "riservato" | "liquidato" | "chiuso_senza_seguito";
  reserveAmount: number;
  paidAmount: number;
  unitaOperativa: string;
}

export interface RiskAssessmentItem {
  id: string;
  category: string;
  description: string;
  severity: "critico" | "alto" | "medio" | "basso";
  scenarios: number;
  maxExposure: number;
  weightedExposure: number;
  mitigationCost: number;
  mitigationROI: number;
}

export interface ReturnPeriodRow {
  percentile: string;
  claims: number;
  totalExposure: number;
  avgSeverity: number;
}

export const hospitals: Hospital[] = [
  {
    id: "h1",
    name: "ASL Bari - Ospedale San Paolo",
    type: "pubblico",
    region: "Puglia",
    city: "Bari",
    beds: 450,
    riskScore: 68,
    lastAssessment: "2026-02-15",
    status: "in_analisi",
    departments: [
      { id: "d1", name: "Chirurgia Generale", beds: 60, surgeries: 2400, admissions: 3200, riskScore: 72, exposure: 2800000 },
      { id: "d2", name: "Ostetricia e Ginecologia", beds: 40, surgeries: 1800, admissions: 2600, riskScore: 85, exposure: 4200000 },
      { id: "d3", name: "Ortopedia", beds: 45, surgeries: 2100, admissions: 2800, riskScore: 58, exposure: 1600000 },
      { id: "d4", name: "Pronto Soccorso", beds: 30, surgeries: 0, admissions: 28000, riskScore: 65, exposure: 1900000 },
      { id: "d5", name: "Medicina Interna", beds: 80, surgeries: 0, admissions: 4200, riskScore: 42, exposure: 800000 },
      { id: "d6", name: "Geriatria", beds: 50, surgeries: 0, admissions: 2100, riskScore: 38, exposure: 520000 },
    ],
  },
  {
    id: "h2",
    name: "Humanitas Research Hospital",
    type: "privato",
    region: "Lombardia",
    city: "Rozzano (MI)",
    beds: 750,
    riskScore: 45,
    lastAssessment: "2026-01-20",
    status: "completato",
    departments: [
      { id: "d7", name: "Chirurgia Generale", beds: 80, surgeries: 4200, admissions: 5600, riskScore: 52, exposure: 3100000 },
      { id: "d8", name: "Cardiochirurgia", beds: 35, surgeries: 1200, admissions: 1800, riskScore: 78, exposure: 5800000 },
      { id: "d9", name: "Oncologia", beds: 90, surgeries: 800, admissions: 3400, riskScore: 35, exposure: 920000 },
      { id: "d10", name: "Neurochirurgia", beds: 30, surgeries: 900, admissions: 1200, riskScore: 82, exposure: 4600000 },
      { id: "d11", name: "Ortopedia", beds: 55, surgeries: 3100, admissions: 4200, riskScore: 48, exposure: 1800000 },
    ],
  },
  {
    id: "h3",
    name: "A.O. Moscati di Avellino",
    type: "pubblico",
    region: "Campania",
    city: "Avellino",
    beds: 380,
    riskScore: 72,
    lastAssessment: "2026-02-28",
    status: "in_analisi",
    departments: [
      { id: "d12", name: "Chirurgia Generale", beds: 50, surgeries: 1900, admissions: 2600, riskScore: 68, exposure: 2200000 },
      { id: "d13", name: "Ostetricia e Ginecologia", beds: 35, surgeries: 1400, admissions: 2100, riskScore: 88, exposure: 4800000 },
      { id: "d14", name: "Pronto Soccorso", beds: 25, surgeries: 0, admissions: 22000, riskScore: 75, exposure: 2400000 },
      { id: "d15", name: "Medicina Interna", beds: 70, surgeries: 0, admissions: 3800, riskScore: 45, exposure: 750000 },
    ],
  },
  {
    id: "h4",
    name: "IRCCS Policlinico San Matteo",
    type: "universitario",
    region: "Lombardia",
    city: "Pavia",
    beds: 900,
    riskScore: 52,
    lastAssessment: "2025-12-10",
    status: "completato",
    departments: [
      { id: "d16", name: "Chirurgia Generale", beds: 70, surgeries: 3800, admissions: 5000, riskScore: 55, exposure: 2900000 },
      { id: "d17", name: "Cardiochirurgia", beds: 40, surgeries: 1400, admissions: 2000, riskScore: 75, exposure: 5200000 },
      { id: "d18", name: "Ostetricia e Ginecologia", beds: 45, surgeries: 2000, admissions: 2800, riskScore: 80, exposure: 4400000 },
      { id: "d19", name: "Neurochirurgia", beds: 25, surgeries: 700, admissions: 1000, riskScore: 79, exposure: 4100000 },
      { id: "d20", name: "Oncologia", beds: 100, surgeries: 600, admissions: 3800, riskScore: 32, exposure: 680000 },
      { id: "d21", name: "Pediatria", beds: 60, surgeries: 500, admissions: 2400, riskScore: 62, exposure: 3200000 },
    ],
  },
  {
    id: "h5",
    name: "Ospedale San Luigi Gonzaga",
    type: "universitario",
    region: "Piemonte",
    city: "Orbassano (TO)",
    beds: 520,
    riskScore: 58,
    lastAssessment: "2026-01-05",
    status: "attivo",
    departments: [
      { id: "d22", name: "Chirurgia Generale", beds: 55, surgeries: 2200, admissions: 3000, riskScore: 60, exposure: 2100000 },
      { id: "d23", name: "Medicina Interna", beds: 75, surgeries: 0, admissions: 4000, riskScore: 40, exposure: 700000 },
      { id: "d24", name: "Ortopedia", beds: 40, surgeries: 1800, admissions: 2400, riskScore: 52, exposure: 1400000 },
      { id: "d25", name: "Pronto Soccorso", beds: 28, surgeries: 0, admissions: 25000, riskScore: 70, exposure: 2100000 },
    ],
  },
];

export const claims: Claim[] = [
  { id: "c1", hospitalId: "h1", date: "2025-11-15", department: "Chirurgia Generale", description: "Complicanza post-operatoria: aderenze intestinali non rilevate durante intervento di colecistectomia laparoscopica", type: "Errore Chirurgico", status: "riservato", reserveAmount: 180000, paidAmount: 0, unitaOperativa: "Chirurgia Generale" },
  { id: "c2", hospitalId: "h1", date: "2025-09-22", department: "Ostetricia e Ginecologia", description: "Paralisi del plesso brachiale neonatale durante parto distocico", type: "Errore Chirurgico", status: "riservato", reserveAmount: 850000, paidAmount: 0, unitaOperativa: "Ostetricia e Ginecologia" },
  { id: "c3", hospitalId: "h1", date: "2025-08-10", department: "Pronto Soccorso", description: "Ritardata diagnosi di infarto miocardico acuto con dimissione inappropriata", type: "Ritardata Diagnosi", status: "aperto", reserveAmount: 420000, paidAmount: 0, unitaOperativa: "Pronto Soccorso" },
  { id: "c4", hospitalId: "h1", date: "2025-06-03", department: "Medicina Interna", description: "Somministrazione errata di anticoagulante con dosaggio 10x superiore", type: "Errore Farmacologico", status: "liquidato", reserveAmount: 95000, paidAmount: 95000, unitaOperativa: "Medicina Interna" },
  { id: "c5", hospitalId: "h1", date: "2025-04-18", department: "Ortopedia", description: "Infezione del sito chirurgico post-artroprotesi di ginocchio con necessit\u00e0 di revisione", type: "Infezione Nosocomiale", status: "riservato", reserveAmount: 220000, paidAmount: 0, unitaOperativa: "Ortopedia" },
  { id: "c6", hospitalId: "h1", date: "2025-03-07", department: "Geriatria", description: "Caduta da letto con frattura del femore in paziente non sorvegliato", type: "Caduta Paziente", status: "liquidato", reserveAmount: 65000, paidAmount: 58000, unitaOperativa: "Geriatria" },
  { id: "c7", hospitalId: "h1", date: "2025-01-22", department: "Chirurgia Generale", description: "Corpo estraneo (garza) ritenuto in addome post-intervento di emicolectomia", type: "Errore Chirurgico", status: "liquidato", reserveAmount: 310000, paidAmount: 285000, unitaOperativa: "Chirurgia Generale" },
  { id: "c8", hospitalId: "h1", date: "2024-12-14", department: "Pronto Soccorso", description: "Mancata diagnosi di embolia polmonare con esito fatale", type: "Ritardata Diagnosi", status: "riservato", reserveAmount: 980000, paidAmount: 0, unitaOperativa: "Pronto Soccorso" },
  { id: "c9", hospitalId: "h1", date: "2024-11-05", department: "Ostetricia e Ginecologia", description: "Errore nella somministrazione di ossitocina con sofferenza fetale", type: "Errore Farmacologico", status: "aperto", reserveAmount: 1200000, paidAmount: 0, unitaOperativa: "Ostetricia e Ginecologia" },
  { id: "c10", hospitalId: "h1", date: "2024-09-20", department: "Ortopedia", description: "Intervento su arto sbagliato (lateralit\u00e0 errata) in artroscopia del ginocchio", type: "Errore Chirurgico", status: "liquidato", reserveAmount: 150000, paidAmount: 142000, unitaOperativa: "Ortopedia" },
  { id: "c11", hospitalId: "h1", date: "2024-07-12", department: "Medicina Interna", description: "Reazione allergica grave a farmaco noto in anamnesi", type: "Errore Farmacologico", status: "chiuso_senza_seguito", reserveAmount: 0, paidAmount: 0, unitaOperativa: "Medicina Interna" },
  { id: "c12", hospitalId: "h1", date: "2024-05-30", department: "Chirurgia Generale", description: "Lesione iatrogena del coledoco durante colecistectomia", type: "Errore Chirurgico", status: "riservato", reserveAmount: 380000, paidAmount: 0, unitaOperativa: "Chirurgia Generale" },
];

export const riskAssessmentItems: RiskAssessmentItem[] = [
  { id: "r1", category: "Blocco Operatorio", description: "Mancata applicazione sistematica della checklist chirurgica OMS", severity: "critico", scenarios: 18, maxExposure: 3200000, weightedExposure: 1280000, mitigationCost: 45000, mitigationROI: 2744 },
  { id: "r2", category: "Blocco Operatorio", description: "Protocollo di igiene delle mani non conforme alle linee guida WHO", severity: "critico", scenarios: 22, maxExposure: 4100000, weightedExposure: 1640000, mitigationCost: 15000, mitigationROI: 10833 },
  { id: "r3", category: "Gestione Farmaci", description: "Assenza di sistema di doppio controllo nella preparazione dei farmaci ad alto rischio", severity: "alto", scenarios: 14, maxExposure: 2800000, weightedExposure: 840000, mitigationCost: 120000, mitigationROI: 600 },
  { id: "r4", category: "Gestione Farmaci", description: "Conservazione farmaci LASA senza separazione fisica adeguata", severity: "alto", scenarios: 10, maxExposure: 1500000, weightedExposure: 525000, mitigationCost: 25000, mitigationROI: 2000 },
  { id: "r5", category: "Emergenza", description: "Procedura di triage non aggiornata ai nuovi codici colore nazionali", severity: "medio", scenarios: 8, maxExposure: 1200000, weightedExposure: 360000, mitigationCost: 35000, mitigationROI: 929 },
  { id: "r6", category: "Emergenza", description: "Tempo medio di attesa per codici arancione superiore ai limiti regionali", severity: "alto", scenarios: 12, maxExposure: 2400000, weightedExposure: 960000, mitigationCost: 280000, mitigationROI: 243 },
  { id: "r7", category: "Strutturale", description: "Barriere di protezione nel blocco operatorio non conformi", severity: "critico", scenarios: 15, maxExposure: 3800000, weightedExposure: 1520000, mitigationCost: 300000, mitigationROI: 407 },
  { id: "r8", category: "Ostetricia", description: "Mancanza di protocollo per la gestione del parto distocico", severity: "critico", scenarios: 20, maxExposure: 8500000, weightedExposure: 3400000, mitigationCost: 80000, mitigationROI: 4150 },
  { id: "r9", category: "Documentale", description: "Cartelle cliniche incomplete nel 35% dei casi analizzati", severity: "alto", scenarios: 8, maxExposure: 900000, weightedExposure: 315000, mitigationCost: 60000, mitigationROI: 425 },
  { id: "r10", category: "Organizzativo", description: "Rapporto infermieri/pazienti inadeguato nel turno notturno", severity: "alto", scenarios: 11, maxExposure: 1800000, weightedExposure: 720000, mitigationCost: 450000, mitigationROI: 60 },
];

export const returnPeriodTable: ReturnPeriodRow[] = [
  { percentile: "5\u00b0", claims: 3, totalExposure: 420000, avgSeverity: 140000 },
  { percentile: "25\u00b0", claims: 8, totalExposure: 1850000, avgSeverity: 231250 },
  { percentile: "50\u00b0", claims: 14, totalExposure: 4200000, avgSeverity: 300000 },
  { percentile: "75\u00b0", claims: 22, totalExposure: 8100000, avgSeverity: 368182 },
  { percentile: "95\u00b0", claims: 38, totalExposure: 18500000, avgSeverity: 486842 },
  { percentile: "99\u00b0", claims: 52, totalExposure: 32000000, avgSeverity: 615385 },
];

export const simulationCurveData = Array.from({ length: 100 }, (_, i) => {
  const p = i + 1;
  const exposure = Math.round(200000 * Math.pow(p / 10, 2.3) + (p * 50000));
  return { percentile: p, exposure };
});

export const claimsByType = [
  { type: "Errore Chirurgico", count: 42, amount: 12800000 },
  { type: "Errore Farmacologico", count: 28, amount: 4200000 },
  { type: "Infezione Nosocomiale", count: 35, amount: 8900000 },
  { type: "Ritardata Diagnosi", count: 22, amount: 9600000 },
  { type: "Caduta Paziente", count: 18, amount: 1800000 },
  { type: "Errore Trasfusionale", count: 5, amount: 2100000 },
  { type: "Altro", count: 12, amount: 1600000 },
];

export const monthlyTrend = [
  { month: "Gen", claims: 4, exposure: 1200000 },
  { month: "Feb", claims: 3, exposure: 890000 },
  { month: "Mar", claims: 6, exposure: 2100000 },
  { month: "Apr", claims: 2, exposure: 580000 },
  { month: "Mag", claims: 5, exposure: 1800000 },
  { month: "Giu", claims: 4, exposure: 1350000 },
  { month: "Lug", claims: 7, exposure: 2800000 },
  { month: "Ago", claims: 3, exposure: 920000 },
  { month: "Set", claims: 5, exposure: 1600000 },
  { month: "Ott", claims: 4, exposure: 1100000 },
  { month: "Nov", claims: 6, exposure: 2400000 },
  { month: "Dic", claims: 3, exposure: 780000 },
];

export const insuranceScenarios = [
  {
    name: "Scenario A: Polizza Attuale",
    premium: 2800000,
    sir: 150000,
    retained: 1200000,
    transferred: 6900000,
    tcr: 4000000,
  },
  {
    name: "Scenario B: SIR Aumentata",
    premium: 1900000,
    sir: 300000,
    retained: 2400000,
    transferred: 5700000,
    tcr: 4300000,
  },
  {
    name: "Scenario C: Fondo Rischi",
    premium: 0,
    sir: 0,
    retained: 8100000,
    transferred: 0,
    tcr: 8100000,
  },
  {
    name: "Scenario D: Sistema Misto Ottimale",
    premium: 1200000,
    sir: 250000,
    retained: 3100000,
    transferred: 5000000,
    tcr: 3500000,
  },
];

export const departmentExposureData = [
  { name: "Ostetricia", exposure: 4200000, benchmark: 3800000 },
  { name: "Chirurgia Gen.", exposure: 2800000, benchmark: 2500000 },
  { name: "Pronto Soccorso", exposure: 1900000, benchmark: 2100000 },
  { name: "Ortopedia", exposure: 1600000, benchmark: 1400000 },
  { name: "Medicina Int.", exposure: 800000, benchmark: 750000 },
  { name: "Geriatria", exposure: 520000, benchmark: 480000 },
];
