import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Header from "@/components/Header";
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
        className={`${GeistSans.variable} overflow-x-hidden bg-background font-sans antialiased`}
      >
        <Header />
        <section className={"container mx-auto max-w-3xl space-y-2 px-4"}>
          <h1 className={"mt-2 text-2xl font-semibold tracking-tight md:mt-0 md:text-4xl"}>
          Footprint
        </h1>
          <div className={"hidden max-w-3xl text-sm text-pretty text-muted-foreground sm:block md:text-base"}>
            <span className={"font-medium text-foreground"}>Comprends</span> les ordres de
            grandeur des émissions de gaz à effet de serre,{" "}
            <span className={"font-medium text-foreground"}>situe</span> ton empreinte et
            sache par où <span className={"font-medium text-foreground"}>agir</span>.
          </div>
          <div className={"text-sm text-pretty text-muted-foreground sm:hidden"}>
            <span className={"font-medium text-foreground"}>Comprends</span> les ordres de
            grandeur, <span className={"font-medium text-foreground"}>situe</span> ton
            empreinte, <span className={"font-medium text-foreground"}>agis</span>.
          </div>
        </section>
        <main>
        {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
