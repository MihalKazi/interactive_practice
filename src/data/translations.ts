import type { Language } from "@/types/report";

export const translations: Record<
  Language,
  {
    navigation: Record<string, string>;
    actions: Record<string, string>;
  }
> = {
  en: {
    navigation: {
      overview: "Overview",
      "triggering-event": "Triggering event",
      origins: "Origins",
      dataset: "Dataset",
      narratives: "Narratives",
      evidence: "Evidence",
      methodology: "Methodology",
      limitations: "Limitations",
      recommendations: "Recommendations",
      about: "About",
    },
    actions: {
      language: "Language",
      theme: "Theme",
      menu: "Open menu",
      close: "Close menu",
    },
  },
  bn: {
    navigation: {
      overview: "সারসংক্ষেপ",
      "triggering-event": "সূচনা ঘটনা",
      origins: "উৎপত্তি",
      dataset: "ডেটাসেট",
      narratives: "বয়ান",
      evidence: "প্রমাণ",
      methodology: "পদ্ধতি",
      limitations: "সীমাবদ্ধতা",
      recommendations: "সুপারিশ",
      about: "প্রতিবেদন সম্পর্কে",
    },
    actions: {
      language: "ভাষা",
      theme: "থিম",
      menu: "মেনু খুলুন",
      close: "মেনু বন্ধ করুন",
    },
  },
};
