export type Locale = "en" | "tr";
export type Localized = Record<Locale, string>;

export interface ContactLink {
  label: string;
  href: string;
}

export interface Profile {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  education: Localized;
  languages: Localized;
  positioning: string;
  positioningLocalized: Localized;
  links: ContactLink[];
}

export const profile: Profile = {
  name: "Faruk Selim Duman",
  title: "Industrial Engineer | Salesforce & Digital Transformation Consultant",
  location: "Istanbul, Türkiye",
  email: "farukselimduman8@gmail.com",
  phone: "+90 507 262 3879",
  linkedin: "linkedin.com/in/faruk-selim-duman",
  education: {
    en: "Pamukkale University — B.Sc. Industrial Engineering (2019–2024)",
    tr: "Pamukkale Üniversitesi — Endüstri Mühendisliği Lisans (2019–2024)",
  },
  languages: {
    en: "Turkish (native) · English (B2)",
    tr: "Türkçe (ana dil) · İngilizce (B2)",
  },
  positioning:
    "Digital transformation consultant specializing in the Salesforce ecosystem, with hands-on experience across the full project lifecycle — from requirements analysis to implementation and user adoption — at PwC and for international clients in the UK and Germany. Technology-agnostic in practice: delivers solutions combining Salesforce with n8n, MuleSoft, .NET, and AI-assisted development tools. Industrial engineering background in business process analysis and optimization.",
  positioningLocalized: {
    en: "Digital transformation consultant specializing in the Salesforce ecosystem, with hands-on experience across the full project lifecycle — from requirements analysis to implementation and user adoption — at PwC and for international clients in the UK and Germany. Technology-agnostic in practice: delivers solutions combining Salesforce with n8n, MuleSoft, .NET, and AI-assisted development tools. Industrial engineering background in business process analysis and optimization.",
    tr: "Salesforce ekosisteminde uzmanlaşmış bir dijital dönüşüm danışmanı; PwC’de ve İngiltere ile Almanya’daki uluslararası müşteriler için, gereksinim analizinden uygulamaya ve kullanıcı adaptasyonuna kadar tüm proje yaşam döngüsünde saha deneyimine sahip. Pratikte teknoloji-bağımsız: Salesforce’u n8n, MuleSoft, .NET ve yapay zeka destekli geliştirme araçlarıyla birleştiren çözümler üretir. İş süreç analizi ve optimizasyonu üzerine kurulu endüstri mühendisliği altyapısı.",
  },
  links: [
    { label: "LinkedIn", href: "https://linkedin.com/in/faruk-selim-duman" },
    { label: "Email", href: "mailto:farukselimduman8@gmail.com" },
    { label: "Phone", href: "tel:+905072623879" },
  ],
};
