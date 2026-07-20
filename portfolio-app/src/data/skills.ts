import type { Localized } from "./profile";

export interface Certification {
  name: string;
  issuer: string;
}

// Expertise areas (from the EXPERTISE line). Some carry a localized label where
// a natural Turkish term exists; product/technology names stay as-is.
export const skills: Localized[] = [
  { en: "Salesforce (Apex · LWC · Flow)", tr: "Salesforce (Apex · LWC · Flow)" },
  {
    en: "Agentforce & AI-assisted development",
    tr: "Agentforce & yapay zeka destekli geliştirme",
  },
  {
    en: "Omni-Channel & Digital Engagement",
    tr: "Omni-Channel & Digital Engagement",
  },
  { en: "Integration (n8n · MuleSoft)", tr: "Entegrasyon (n8n · MuleSoft)" },
  {
    en: "Data Cloud & data management",
    tr: "Data Cloud & veri yönetimi",
  },
  { en: "Business process analysis", tr: "İş süreç analizi" },
  { en: "Requirements gathering & UAT", tr: "Gereksinim toplama & UAT" },
  { en: "CRM strategy", tr: "CRM stratejisi" },
];

export const certifications: Certification[] = [
  { name: "Salesforce Certified Data Cloud Consultant", issuer: "Salesforce" },
  { name: "Salesforce Certified Administrator", issuer: "Salesforce" },
  { name: "Salesforce Certified AI Associate", issuer: "Salesforce" },
  { name: "MuleSoft ADX350", issuer: "MuleSoft" },
];
