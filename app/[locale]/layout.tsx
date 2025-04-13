import "../globals.css";

import { Container, Main, Section } from "@/components/craft";
import { MobileNav } from "@/components/nav/mobile-nav";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Button } from "@/components/ui/button";
import { mainMenu } from "@/menu.config";
import { siteConfig } from "@/site.config";
import { Analytics } from "@vercel/analytics/react";

import LangSwitcher from "@/components/lang-switcher/LangSwitcher";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import Logo from "@/public/logo.png";
import { hasLocale, NextIntlClientProvider } from "next-intl";

import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import Balancer from "react-wrap-balancer";

import ReactQueryProvider from "@/components/providers/react-query-provider";
import { Instagram, Twitter, Youtube } from "lucide-react";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return [{ locale: "ko" }, { locale: "en" }];
}

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params; // ✅ 이렇게 안전하게 접근
  const t = await getTranslations();

  return {
    title: {
      default: t("common.meta.title"), // 예: "인문 고전 쉽게 읽기 - AI 독서 플랫폼 | 누빈트"
      template: `%s | ${t("common.meta.brand")}`, // 예: "페이지 제목 | 누빈트"
    },
    description: t("common.meta.description"),
    metadataBase: new URL(siteConfig.site_domain),

    keywords: t("common.meta.keywords")?.split(",") ?? [],

    alternates: {
      canonical: `/${locale}`,
      languages: {
        ko: "/ko",
        en: "/en",
      },
    },

    openGraph: {
      title: t("common.meta.title"),
      description: t("common.meta.description"),
      url: new URL(siteConfig.site_domain),
      siteName: t("common.meta.brand"),
      locale,
      type: "website",
      images: [
        {
          url: `${siteConfig.site_domain}/og-default.jpg`,
          width: 1200,
          height: 630,
          alt: t("common.meta.title"),
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: t("common.meta.title"),
      description: t("common.meta.description"),
    },
  };
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <div>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem={false}
        disableTransitionOnChange
      >
        <Nav locale={locale} />
        <Main>
          <NextIntlClientProvider>
            <ReactQueryProvider>{children}</ReactQueryProvider>
          </NextIntlClientProvider>
        </Main>
        <Footer locale={locale} />
      </ThemeProvider>
      <Analytics />
    </div>
  );
}

const Nav = ({ className, children, id, locale }: NavProps) => {
  return (
    <nav
      className={cn("sticky z-50 top-0 bg-background", "border-b", className)}
      id={id}
    >
      <div
        id="nav-container"
        className="max-w-5xl mx-auto py-4 px-6 sm:px-8 flex justify-between items-center"
      >
        <Link
          className="hover:opacity-75 transition-all flex gap-4 items-center"
          href="/"
        >
          <Image
            src={Logo}
            alt="Logo"
            loading="eager"
            className="dark:invert"
            width={30}
            height={30}
          />
          <h2 className="text-sm">{siteConfig.site_name?.["en"]}</h2>
        </Link>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
        <div className="flex items-center gap-2">
          <div className="mx-2 hidden md:flex">
            {Object.entries(mainMenu).map(([key, href]) => (
              <Button key={href} asChild variant="ghost" size="sm">
                <Link href={href}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </Link>
              </Button>
            ))}
            <NextIntlClientProvider>
              <LangSwitcher locale={locale} />
            </NextIntlClientProvider>
          </div>
          <NextIntlClientProvider>
            <MobileNav locale={locale} />
          </NextIntlClientProvider>
        </div>
      </div>
    </nav>
  );
};

const Footer = ({ locale }: any) => {
  const socialLinks: Record<
    string,
    { name: string; href: string; icon: JSX.Element }[]
  > = {
    ko: [
      {
        name: "Threads",
        href: "https://www.threads.net/@bluesprint_kr",
        icon: <Instagram className="w-4 h-4" />,
      },
      {
        name: "Instagram",
        href: "https://instagram.com/bluesprint_kr",
        icon: <Instagram className="w-4 h-4" />,
      },
      // {
      //   name: "TikTok",
      //   href: "https://www.tiktok.com/@your_ko_account",
      //   icon: <Video className="w-4 h-4" />, // 대체 아이콘
      // },
      // {
      //   name: "Naver Blog",
      //   href: "https://blog.naver.com/your_ko_account",
      //   icon: <Book className="w-4 h-4" />, // 대체 아이콘
      // },
      {
        name: "X",
        href: "https://x.com/bluesprint_kr",
        icon: <Twitter className="w-4 h-4" />,
      },
      {
        name: "YouTube",
        href: "https://youtube.com/@bluesprint_kr",
        icon: <Youtube className="w-4 h-4" />,
      },
    ],
    en: [
      {
        name: "X",
        href: "https://twitter.com/nubint_kr",
        icon: <Twitter className="w-4 h-4" />,
      },
      {
        name: "YouTube",
        href: "https://youtube.com/@nubint_kr",
        icon: <Youtube className="w-4 h-4" />,
      },
      // {
      //   name: "LinkedIn",
      //   href: "https://linkedin.com/company/your_en_account",
      //   icon: <Linkedin className="w-4 h-4" />,
      // },
    ],
  };

  return (
    <footer>
      <Section>
        <Container className="grid md:grid-cols-[1.5fr_0.5fr_0.5fr] gap-12">
          <div className="flex flex-col gap-6 not-prose">
            <Link href="/">
              <h3 className="sr-only">{siteConfig.site_name[locale]}</h3>
              <Image
                src={Logo}
                alt="Logo"
                className="dark:invert"
                width={30}
                height={30}
              ></Image>
            </Link>
            <p>
              <Balancer>{siteConfig.site_description[locale]}</Balancer>
            </p>
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <h5 className="font-medium text-base">Website</h5>
            {Object.entries(mainMenu).map(([key, href]) => (
              <Link
                className="hover:underline underline-offset-4"
                key={href}
                href={href}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Link>
            ))}
          </div>
          {/* Social Links */}
          <div className="flex flex-col items-start gap-4 flex-wrap text-sm text-primary/80">
            <h5 className="font-medium text-base">Social Media</h5>
            {socialLinks[locale]?.map((social) => (
              <Link
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-secondary transition-colors"
              >
                {social.icon}
                <span>{social.name}</span>
              </Link>
            ))}
          </div>

          {/* <div className="flex flex-col gap-2 text-sm">
            <h5 className="font-medium text-base">Blog</h5>
            {Object.entries(contentMenu).map(([key, href]) => (
              <Link
                className="hover:underline underline-offset-4"
                key={href}
                href={href}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Link>
            ))}
          </div> */}
        </Container>
        <Container className="border-t not-prose flex flex-col md:flex-row md:gap-2 gap-6 justify-between md:items-center">
          {locale === "ko" && (
            <div className="text-sm text-muted-foreground flex flex-col gap-1 leading-relaxed">
              <p>
                <strong>회사명:</strong> (주)비욘드시티
              </p>
              <p>
                <strong>대표자명:</strong> 하승현
              </p>
              <p>
                <strong>사업자 등록번호:</strong> 447-81-03108
              </p>
              <p>
                <strong>본사 주소:</strong> 경기도 김포시 김포한강10로 133번길
                107, 438호 (디원시티 시그니처)
              </p>
              <p>
                <strong>미국 지사:</strong> 2108 N ST STE N SACRAMENTO, CA 95816
              </p>
            </div>
          )}

          {/* <ThemeToggle /> */}
          <p className="text-muted-foreground">
            &copy; <a href="https://beyondcity.co.kr">BeyondCity Inc.</a> All
            rights reserved. 2025-present.
          </p>
        </Container>
      </Section>
    </footer>
  );
};
