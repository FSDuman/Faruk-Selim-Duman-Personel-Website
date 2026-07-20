import type { Localized } from "./profile";

export interface Project {
  id: string;
  metric: string;
  metricLabel: Localized;
  title: Localized;
  description: Localized;
  tags: string[];
}

// Case studies distilled from the PwC / Oresoft experience bullets — no new claims.
export const projects: Project[] = [
  {
    id: "document-parsing",
    metric: "~70%",
    metricLabel: { en: "faster", tr: "daha hızlı" },
    title: {
      en: "Cross-platform document parsing",
      tr: "Platformlar arası belge ayrıştırma",
    },
    description: {
      en: "Owned the Salesforce side of an upload-and-parse solution spanning n8n, MuleSoft and Salesforce; built and tested every parsing Flow and coordinated the vendor and client.",
      tr: "n8n, MuleSoft ve Salesforce’u kapsayan bir yükle-ve-ayrıştır çözümünün Salesforce tarafını sahiplendim; tüm ayrıştırma Flow’larını kurup test ettim, tedarikçi ve müşteriyi koordine ettim.",
    },
    tags: ["n8n", "MuleSoft", "Salesforce Flow"],
  },
  {
    id: "ai-augmented",
    metric: "~30%",
    metricLabel: { en: "faster delivery", tr: "daha hızlı teslimat" },
    title: {
      en: "AI-augmented development",
      tr: "Yapay zeka destekli geliştirme",
    },
    description: {
      en: "Applied Salesforce MCP tools, Agentforce and Claude Code to Flow design and process analysis in daily work, measurably improving personal delivery speed.",
      tr: "Salesforce MCP araçları, Agentforce ve Claude Code’u günlük işte Flow tasarımı ve süreç analizine uyguladım; teslimat hızımı ölçülebilir şekilde artırdım.",
    },
    tags: ["Agentforce", "MCP", "Claude Code"],
  },
  {
    id: "loyalty-architecture",
    metric: "0",
    metricLabel: { en: "licenses used", tr: "lisans kullanıldı" },
    title: {
      en: "Custom Loyalty architecture",
      tr: "Özel Loyalty mimarisi",
    },
    description: {
      en: "Designed a custom Loyalty Management object architecture and contributed to its engine logic, replicating core module capabilities without the licensed Salesforce product.",
      tr: "Özel bir Loyalty Management nesne mimarisi tasarladım ve motor mantığına katkıda bulunarak, lisanslı Salesforce ürünü olmadan temel modül yeteneklerini yeniden oluşturdum.",
    },
    tags: ["Solution architecture", "Apex", "Data model"],
  },
  {
    id: "omni-channel",
    metric: "2",
    metricLabel: { en: "channels live", tr: "kanal devreye alındı" },
    title: {
      en: "Omni-channel enablement",
      tr: "Çok kanallı etkinleştirme",
    },
    description: {
      en: "Implemented WhatsApp and Facebook as customer-service channels via Salesforce Omni-Channel & Digital Engagement, with automated process-based routing flows.",
      tr: "Salesforce Omni-Channel & Digital Engagement üzerinden WhatsApp ve Facebook’u müşteri hizmetleri kanalları olarak, otomatik süreç bazlı yönlendirme akışlarıyla devreye aldım.",
    },
    tags: ["Omni-Channel", "Digital Engagement", "Routing"],
  },
];
