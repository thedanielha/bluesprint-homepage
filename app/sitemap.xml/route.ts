import { getAllPosts } from "@/lib/wordpress";

export async function GET() {
  const baseUrl = "https://bluepsprint.ai";
  const locales = ["ko"];
  // , "en"

  // 1️⃣ 데이터 가져오기
  const rawPosts = await getAllPosts();

  // 3️⃣ posts → 언어 필드 추출
  const posts = (rawPosts || []).map((post: any) => ({
    ...post,
    locale: post?.language || post?.lang || post?.locale || "en",
  }));

  const staticPages = ["", "blog"];
  const urls: string[] = [];
  // 4️⃣ 허브 페이지 (static)
  staticPages.forEach((page) => {
    const isRoot = page === "";
    locales.forEach((locale) => {
      const path = isRoot ? `/${locale}` : `/${locale}/${page}`;
      const loc = `${baseUrl}${path}`;

      const alternates = locales
        .map(
          (altLocale) =>
            `<xhtml:link rel="alternate" hreflang="${altLocale}" href="${baseUrl}/${altLocale}${
              isRoot ? "" : `/${page}`
            }" />`
        )
        .join("\n");

      const canonical = `<xhtml:link rel="canonical" href="${loc}" />`;

      const priority = isRoot ? "1.0" : "0.8";

      urls.push(`
      <url>
        <loc>${loc}</loc>
        ${alternates}
        ${canonical}
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>${priority}</priority>
      </url>
    `);
    });
  });

  // 5️⃣ 블로그 포스트 (중복 없음)
  posts.forEach((post) => {
    const loc = `${baseUrl}/${post?.locale}/blog/${post.slug}`;
    urls.push(`
      <url>
        <loc>${loc}</loc>
        <lastmod>${new Date(post.modified).toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.7</priority>
      </url>
    `);
  });

  // 6️⃣ 공통 함수: groupId 기반 hreflang + canonical
  function generateGroupedEntries(items: any[], type: "books" | "authors") {
    const grouped = new Map<string, any[]>();
    items.forEach((item) => {
      if (!grouped.has(item?.groupId)) grouped.set(item?.groupId, []);
      grouped.get(item?.groupId)!.push(item);
    });

    grouped.forEach((groupItems) => {
      groupItems.forEach((entry) => {
        const loc = `${baseUrl}/${entry?.locale}/${type}/${entry.slug}`;

        const alternates = groupItems
          .map(
            (g) =>
              `<xhtml:link rel="alternate" hreflang="${g?.locale}" href="${baseUrl}/${g?.locale}/${type}/${g.slug}" />`
          )
          .join("\n");

        const canonical = `<xhtml:link rel="canonical" href="${loc}" />`;

        const priority = type === "books" ? "0.9" : "0.5";

        urls.push(`
          <url>
            <loc>${loc}</loc>
            ${alternates}
            ${canonical}
            <lastmod>${new Date(entry.modified).toISOString()}</lastmod>
            <changefreq>weekly</changefreq>
            <priority>${priority}</priority>
          </url>
        `);
      });
    });
  }

  // 8️⃣ 최종 XML 생성
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml">
  ${urls.join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
