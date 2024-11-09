import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Info } from "lucide-react";

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
  title: "Footprint",
  description:
    "Apprivoisez les ordres de grandeurs des émissions de gaz à effet de serre relatifs à nos activités quotidiennes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <link
        sizes="any"
        rel={"icon"}
        href={
          "https://em-content.zobj.net/source/apple/391/flashlight_1f526.png"
        }
      />
      <body
        className={`${mattone.variable} overflow-x-hidden bg-[#F1EFED] font-sans antialiased`}
      >
        <Header />
        <section className={"container mx-auto max-w-3xl space-y-2 px-4"}>
          <h1 className={"mt-2 text-2xl md:mt-0 md:text-4xl"}>Footprint</h1>
          <div className={"max-w-3xl text-sm md:text-base"}>
            Apprivoisez les{" "}
            <span className={"text-project-main"}>ordres de grandeurs</span> des
            émissions de gaz à effet de serre relatifs à nos activités
            quotidiennes.
          </div>
          <div className={"max-w-3xl text-xs text-muted-foreground md:text-xs"}>
            <Info className={"inline-block h-4 w-4 -translate-y-0.5"} /> Cet
            outil s&#39;utilise comme un comparateur, il existe également des{" "}
            <Link
              href={"https://nosgestesclimat.fr"}
              target={"_blank"}
              className={"underline"}
            >
              calculateurs d&#39;empreinte carbone
            </Link>
            .
          </div>
        </section>
        {children}
        <Footer />
      </body>
    </html>
  );
}
