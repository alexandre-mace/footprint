import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import Header from "@/components/Header";
import { PageHero } from "@/components/page-hero";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://footprint.climatelab.fr"),
  title: "Footprint",
  description:
    "Comprends les ordres de grandeur des émissions de gaz à effet de serre, situe ton empreinte et sache par où agir.",
  openGraph: {
    title: "Footprint",
    description:
      "Comprends les ordres de grandeur des émissions de gaz à effet de serre, situe ton empreinte et sache par où agir.",
    url: "https://footprint.climatelab.fr",
    siteName: "Footprint",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} flex min-h-dvh flex-col overflow-x-hidden bg-background font-sans antialiased`}
      >
        <Header />
        <PageHero
          size="compact"
          width="3xl"
          title="Footprint"
          className="container mx-auto px-4"
        >
          <span className={"hidden sm:inline"}>
            <span className={"font-medium text-foreground"}>Comprends</span> les
            ordres de grandeur des émissions de gaz à effet de serre,{" "}
            <span className={"font-medium text-foreground"}>situe</span> ton
            empreinte et sache par où{" "}
            <span className={"font-medium text-foreground"}>agir</span>.
          </span>
          <span className={"sm:hidden"}>
            <span className={"font-medium text-foreground"}>Comprends</span> les
            ordres de grandeur,{" "}
            <span className={"font-medium text-foreground"}>situe</span> ton
            empreinte, <span className={"font-medium text-foreground"}>agis</span>.
          </span>
        </PageHero>
        <main>
        {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
