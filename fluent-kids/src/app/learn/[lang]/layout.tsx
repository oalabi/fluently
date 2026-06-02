import { notFound } from "next/navigation";
import { getLanguage } from "@/data/languages";
import { LearnShell } from "./LearnShell";

export default function LearnLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const pack = getLanguage(params.lang);
  if (!pack) notFound();

  return <LearnShell lang={params.lang} pack={pack}>{children}</LearnShell>;
}
