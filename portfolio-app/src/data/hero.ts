import type { Localized } from "./profile";

export interface HeroStat {
  num: string;
  label: Localized;
}

export const heroStats: HeroStat[] = [
  {
    num: "~70%",
    label: {
      en: "Document-processing time cut on an integration project",
      tr: "Bir entegrasyon projesinde belge işleme süresinde azalma",
    },
  },
  {
    num: "~30%",
    label: {
      en: "Faster delivery with AI-augmented development",
      tr: "AI destekli geliştirme ile daha hızlı teslimat",
    },
  },
  {
    num: "4",
    label: {
      en: "Salesforce & MuleSoft certifications",
      tr: "Salesforce & MuleSoft sertifikası",
    },
  },
];
