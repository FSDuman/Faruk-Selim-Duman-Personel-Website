import type { Locale, Localized } from "@/data/profile";

export const locales: Locale[] = ["en", "tr"];
export const defaultLocale: Locale = "en";

// Resolve a Localized value for the active locale.
export function t(value: Localized, locale: Locale): string {
  return value[locale];
}

// UI chrome + hero strings (nav, controls, footer, hero). Page/CV copy lives in data/*.
export const ui: Record<string, Localized> = {
  navAbout: { en: "About", tr: "Hakkımda" },
  navExperience: { en: "Experience", tr: "Deneyim" },
  navWork: { en: "Case Studies", tr: "Projeler" },
  navContact: { en: "Contact", tr: "İletişim" },
  ctaProjects: { en: "View projects", tr: "Projeleri gör" },
  ctaContact: { en: "Get in touch", tr: "İletişime geç" },
  langLabel: { en: "Switch language", tr: "Dili değiştir" },
  skipToContent: { en: "Skip to content", tr: "İçeriğe geç" },
  footerNote: {
    en: "Istanbul, Türkiye · Built with care",
    tr: "İstanbul, Türkiye · Özenle hazırlandı",
  },

  heroBadge: {
    en: "Available for consulting engagements",
    tr: "Danışmanlık projelerine açık",
  },
  heroTitle: {
    en: "Industrial Engineer · Salesforce & Digital Transformation",
    tr: "Endüstri Mühendisi · Salesforce & Dijital Dönüşüm",
  },
  heroIntro1: {
    en: "I lead Salesforce and digital-transformation projects end to end —",
    tr: "Salesforce ve dijital dönüşüm projelerini uçtan uca yönetiyorum —",
  },
  heroIntro2: {
    en: "from requirements analysis to implementation and user adoption.",
    tr: "gereksinim analizinden uygulamaya ve kullanıcı adaptasyonuna kadar.",
  },
  heroHint: {
    en: "Move your cursor to reveal the network",
    tr: "Ağı ortaya çıkarmak için imleci hareket ettir",
  },

  // About Section
  aboutKicker: { en: "About", tr: "Hakkımda" },
  aboutTitle: {
    en: "A consultant who turns business processes into working Salesforce solutions.",
    tr: "İş süreçlerini çalışan Salesforce çözümlerine dönüştüren bir danışman.",
  },
  aboutP1: {
    en: "Digital transformation consultant specializing in the Salesforce ecosystem, with hands-on experience across the full project lifecycle — from requirements analysis to implementation and user adoption — at PwC and for international clients in the UK and Germany.",
    tr: "Salesforce ekosisteminde uzmanlaşmış bir dijital dönüşüm danışmanıyım; PwC’de ve İngiltere ile Almanya’daki uluslararası müşteriler için, gereksinim analizinden uygulamaya ve kullanıcı adaptasyonuna kadar tüm proje yaşam döngüsünde saha deneyimine sahibim.",
  },
  aboutP2: {
    en: "Technology-agnostic in practice: I deliver solutions combining Salesforce with n8n, MuleSoft, .NET and AI-assisted development tools, grounded in an industrial-engineering background in business process analysis and optimization.",
    tr: "Pratikte teknoloji-bağımsızım: Salesforce’u n8n, MuleSoft, .NET ve yapay zeka destekli geliştirme araçlarıyla birleştiren çözümler üretiyorum; tüm bunları iş süreç analizi ve optimizasyonu üzerine kurulu bir endüstri mühendisliği altyapısıyla destekliyorum.",
  },
  skillsLabel: { en: "Areas of expertise", tr: "Uzmanlık alanları" },

  // Experience Section
  expKicker: { en: "Career", tr: "Kariyer" },
  expTitle: { en: "Where I’ve worked", tr: "Nerelerde çalıştım" },

  // Work Section
  workKicker: { en: "Selected work", tr: "Seçili çalışmalar" },
  workTitle: { en: "Case studies", tr: "Örnek projeler" },
  workBlurb: {
    en: "A few representative outcomes from my consulting work — measurable results, delivered end to end.",
    tr: "Danışmanlık çalışmalarımdan öne çıkan birkaç sonuç — uçtan uca teslim edilmiş, ölçülebilir çıktılar.",
  },

  // Contact Section
  contactKicker: { en: "Contact", tr: "İletişim" },
  contactTitle: { en: "Let’s build something that ships.", tr: "Hayata geçecek bir şey inşa edelim." },
  contactBlurb: {
    en: "Open to consulting, freelance and full-time opportunities in the Salesforce and digital-transformation space.",
    tr: "Salesforce ve dijital dönüşüm alanında danışmanlık, serbest çalışma ve tam zamanlı fırsatlara açığım.",
  },
};
