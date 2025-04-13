// app/layout.tsx
import { cn } from "@/lib/utils";
import Script from "next/script";
import { ReactNode } from "react";

const isProd = process.env.NODE_ENV === "production";

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700;800;&display=swap"
          rel="stylesheet"
        />
        {/* Google Tag Manager */}
        {isProd ? (
          <Script
            id="gtm-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                      })(window,document,'script','dataLayer','GTM-KVWQ4NMM');
                    `,
            }}
          />
        ) : null}
      </head>
      <body className={cn("min-h-screen font-sans antialiased")}>
        {/* GTM noscript fallback */}
        {isProd ? (
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-KVWQ4NMM"
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            ></iframe>
          </noscript>
        ) : null}
        {/* 메인 콘텐츠 영역 */}
        <main>{children}</main>
      </body>
    </html>
  );
}
