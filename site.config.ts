type SiteConfig = {
  site_domain: string;
  site_name: { [key: string]: string };
  site_description: { [key: string]: string };
};

export const siteConfig: SiteConfig = {
  site_name: { en: "BlueSprint", ko: "블루스프린트" },
  site_description: {
    en: "AI-Powered Building Code Search Platform",
    ko: "AI 건축 법규 검토 플랫폼",
  },
  site_domain: "https://bluesprint.ai",
};
