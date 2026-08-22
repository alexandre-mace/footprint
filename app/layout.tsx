import type { Metadata } from "next";
import localFont from "next/font/local";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const mattone = localFont({
  src: [
    {
      path: "./fonts/Mattone-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Mattone-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/Mattone-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-mattone",
});

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
        className={`${mattone.variable} ${GeistSans.variable} overflow-x-hidden bg-background font-sans antialiased`}
      >
        <Header />
        <section className={"container mx-auto max-w-3xl space-y-2 px-4"}>
          <h1 className={"mt-2 font-display text-2xl md:mt-0 md:text-4xl"}>
          Footprint
        </h1>
          <div className={"hidden max-w-3xl text-sm text-muted-foreground sm:block md:text-base"}>
            <span className={"text-primary"}>Comprends</span> les ordres de
            grandeurs des émissions de gaz à effet de serre,{" "}
            <span className={"text-primary"}>situe</span> ton empreinte et
            sache par où <span className={"text-primary"}>agir</span>.
          </div>
          <div className={"text-sm text-muted-foreground sm:hidden"}>
            <span className={"text-primary"}>Comprends</span> les ordres de
            grandeurs, <span className={"text-primary"}>situe</span> ton
            empreinte, <span className={"text-primary"}>agis</span>.
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
