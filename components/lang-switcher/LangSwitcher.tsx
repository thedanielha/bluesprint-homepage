"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter } from "@/i18n/navigation";
import { locales } from "@/lib/i18n";
import { Globe } from "lucide-react";

export default function LangSwitcher({ locale }: any) {
  const router = useRouter();
  const pathname = usePathname();

  function onChange(locale: string) {
    // 현재 경로를 그대로 유지하며 locale 변경
    router.replace(pathname, { locale });
  }

  return (
    <Select onValueChange={onChange} defaultValue={locale}>
      <SelectTrigger className="h-9 text-sm border border-primary/20 bg-background hover:border-primary focus:ring-1 focus:ring-primary/40 transition-all px-3 flex items-center gap-2">
        <Globe className="w-4 h-4 text-secondary" />
        <SelectValue placeholder="Lang" />
      </SelectTrigger>
      <SelectContent className="text-sm">
        {locales.map((locale) => (
          <SelectItem
            key={locale}
            value={locale}
            className="hover:bg-primary/5 hover:text-primary cursor-pointer transition-colors"
          >
            {locale.toUpperCase()}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
