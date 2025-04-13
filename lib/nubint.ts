import buildUrl from "build-url-ts";

export type LanguageCode = "en" | "ko";

// 타입
export interface PopularBook {
  id: string;
  title: string;
  author: string;
  displayTitle: { [key: string]: string };
  displayAuthor: { [key: string]: string };
  summarySlug: { [key: string]: string };
}

export interface PopularAuthor {
  id: string;
  name: string;
  avatar: string;
  bio?: string;
}

export type fetchProps = {
  endpoint: string;
  queryParams?: Record<string, string | number>;
  serverSide?: boolean;
};

// 공통 fetch
async function fetchFromNubint<T>({
  endpoint,
  queryParams = {},
  serverSide = true,
}: fetchProps): Promise<T> {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const url = buildUrl(API_URL, {
    path: endpoint,
    queryParams,
  });

  console.log(url);

  const option = serverSide
    ? {
        next: {
          tags: ["bluesprint"],
          // revalidate: 3600,
          revalidate: 0,
        },
      }
    : {};

  const response = await fetch(url, option);

  if (!response.ok) {
    throw new Error(`Failed to fetch from Nubint API: ${response.statusText}`);
  }

  return response.json();
}

// popular books
export async function getAllBooks(): Promise<any[]> {
  return fetchFromNubint<any[]>({
    endpoint: "/books",
    queryParams: { limit: 1000 },
  });
}

// popular books
export async function getPopularBooks(): Promise<PopularBook[]> {
  return fetchFromNubint<PopularBook[]>({
    endpoint: "/books",
    queryParams: {
      limit: 4,
      sort_option: JSON.stringify([["popular", -1]]),
    },
  });
}

// popular books
export async function getAllAuthors(): Promise<any[]> {
  return fetchFromNubint<any[]>({
    endpoint: "/authors",
    queryParams: {
      limit: 1000,
    },
  });
}

// popular authors
export async function getPopularAuthors(
  locale: LanguageCode = "en"
): Promise<PopularAuthor[]> {
  return fetchFromNubint<PopularAuthor[]>({
    endpoint: "/authors",
    queryParams: {
      limit: 4,
      sort_option: JSON.stringify([["popular", -1]]),
    },
  });
}

export function createAuthorSlug(title: string, locale: string) {
  const base = title.trim().replace(/\s+/g, "-");
  return `/authors/${
    locale === "en" ? base.toLowerCase() + "-summary" : base + "-요약"
  }`;
}

export async function getBookByName(
  slug: string,
  locale: LanguageCode
): Promise<any> {
  const decodedSlug = decodeURIComponent(slug);
  const slugParts = decodedSlug.replace(/(-summary|-요약)$/, "");

  console.log(slugParts);
  const response = await fetchFromNubint<any>({
    endpoint: `/books/name/${slugParts}`,
    queryParams: {
      language: locale,
    },
    serverSide: false,
  });

  return response.item;
}

export async function getAuthorBySlug(
  slug: string,
  locale: LanguageCode
): Promise<any> {
  const decodedSlug = decodeURIComponent(slug);

  const response = await fetchFromNubint<any>({
    endpoint: `/authors/name/${decodedSlug}`,
    queryParams: {
      language: locale,
    },
    serverSide: false,
  });

  return response.item;
}
