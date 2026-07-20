import type { Localized } from "./profile";

export interface Experience {
  id: string;
  company: string;
  period: Localized;
  intern?: Localized;
  role: Localized;
  bullets: Localized[];
}

export const experience: Experience[] = [
  {
    id: "pwc",
    company: "PwC",
    period: { en: "Jan 2025 – Jul 2026", tr: "Oca 2025 – Tem 2026" },
    intern: {
      en: "Intern: Sep 2024 – Jan 2025",
      tr: "Stajyer: Eyl 2024 – Oca 2025",
    },
    role: {
      en: "Management Consulting Associate",
      tr: "Yönetim Danışmanlığı Uzmanı",
    },
    bullets: [
      {
        en: "Led client-facing meetings and owned assigned processes end to end — from business analysis and requirements gathering through development, testing and delivery.",
        tr: "Müşteri toplantılarını yönettim ve atanan süreçleri uçtan uca sahiplendim — iş analizi ve gereksinim toplamadan geliştirme, test ve teslimata kadar.",
      },
      {
        en: "Owned the Salesforce side of a document upload & parsing solution spanning n8n, MuleSoft and Salesforce; coordinated the client and MuleSoft vendor and cut document-processing time by ~70%.",
        tr: "n8n, MuleSoft ve Salesforce’u kapsayan bir belge yükleme & ayrıştırma çözümünün Salesforce tarafını sahiplendim; müşteri ve MuleSoft tedarikçisini koordine ederek belge işleme süresini ~%70 azalttım.",
      },
      {
        en: "Process owner for product- and sales-based realization and targeting setups; designed numerous Flows and built measurable, report-ready sales pipelines.",
        tr: "Ürün ve satış bazlı gerçekleşme ve hedefleme kurulumlarının süreç sahibi oldum; çok sayıda Flow tasarlayarak ölçülebilir, raporlanabilir satış hatları kurdum.",
      },
      {
        en: "Implemented WhatsApp as a customer-service channel via Salesforce Omni-Channel with automated, process-based routing.",
        tr: "Salesforce Omni-Channel üzerinden WhatsApp’ı bir müşteri hizmetleri kanalı olarak, otomatik ve süreç bazlı yönlendirmeyle hayata geçirdim.",
      },
      {
        en: "Designed a custom Loyalty Management object architecture and contributed to its engine logic, replicating core capabilities without the licensed product.",
        tr: "Özel bir Loyalty Management nesne mimarisi tasarladım ve motor mantığına katkıda bulunarak, lisanslı ürün olmadan temel yetenekleri yeniden oluşturdum.",
      },
      {
        en: "Used Salesforce MCP tools, Agentforce and Claude Code daily, applying AI to Flow design and process analysis for ~30% faster delivery.",
        tr: "Salesforce MCP araçlarını, Agentforce’u ve Claude Code’u günlük olarak kullandım; Flow tasarımı ve süreç analizinde yapay zekayı uygulayarak teslimatımı ~%30 hızlandırdım.",
      },
    ],
  },
  {
    id: "oresoft",
    company: "Oresoft Yazılım",
    period: { en: "Oct 2023 – Jul 2024", tr: "Eki 2023 – Tem 2024" },
    role: {
      en: "Junior Software Developer",
      tr: "Junior Yazılım Geliştirici",
    },
    bullets: [
      {
        en: "UK energy client (Business Analyst & Salesforce Admin/Developer): translated requirements into tailored Salesforce solutions; ran task planning, estimation and tracking in JIRA; planned and ran UAT sessions; contributed to documentation and training.",
        tr: "İngiltere enerji sektörü müşterisi (İş Analisti & Salesforce Admin/Developer): gereksinimleri özel Salesforce çözümlerine dönüştürdüm; JIRA’da görev planlama, tahmin ve takibi yürüttüm; UAT oturumlarını planlayıp yürüttüm; dokümantasyon ve eğitime katkıda bulundum.",
      },
      {
        en: "German venture builder (Business Analyst & Salesforce Admin): administered the platform end to end — users, permissions, security, bulk data with Data Loader; automated approvals with Flow and Process Builder; built reports & dashboards; integrated WhatsApp Business and Facebook via Digital Engagement; set up an Experience Cloud partner community.",
        tr: "Alman venture builder (İş Analisti & Salesforce Admin): platformu uçtan uca yönettim — kullanıcı ve yetki yönetimi, güvenlik yapılandırması, Data Loader ile toplu veri işlemleri; Flow ve Process Builder ile onay süreçlerini otomatikleştirdim; rapor & dashboard oluşturdum; Digital Engagement ile WhatsApp Business ve Facebook’u entegre ettim; Experience Cloud ile partner topluluk sayfaları kurdum.",
      },
      {
        en: "In-house development: inventory tracking and calculation modules in .NET.",
        tr: "Şirket içi geliştirme: .NET ile envanter takip ve hesaplama modülleri.",
      },
    ],
  },
  {
    id: "rise-of-turtles",
    company: "Rise of Turtles",
    period: { en: "Dec 2021 – Jul 2022", tr: "Ara 2021 – Tem 2022" },
    role: {
      en: "Co-founder · Social Media Manager & Graphic Designer (NFT Collection)",
      tr: "Kurucu Ortak · Sosyal Medya Yöneticisi & Grafik Tasarımcı (NFT Koleksiyonu)",
    },
    bullets: [
      {
        en: "Co-founded and launched an NFT comic-book collection, owning brand identity, visual design and content strategy end to end.",
        tr: "Bir NFT çizgi roman koleksiyonunu kurup lanse ettim; marka kimliği, görsel tasarım ve içerik stratejisini uçtan uca sahiplendim.",
      },
      {
        en: "Grew the community to 5,000+ Instagram followers and converted engagement into hundreds of collection holders.",
        tr: "Topluluğu 5.000+ Instagram takipçisine ulaştırdım ve etkileşimi yüzlerce koleksiyon sahibine dönüştürdüm.",
      },
    ],
  },
];
