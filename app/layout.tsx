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
          "https://em-content.zobj.net/source/apple/391/foot_1f9b6.png"
        }
      />
      <body
        className={`${mattone.variable} ${GeistSans.variable} overflow-x-hidden bg-[#F1EFED] font-sans antialiased`}
      >
        <Header />
        <section className={"container mx-auto max-w-3xl space-y-2 px-4"}>
          <h1 className={"mt-2 font-display text-2xl md:mt-0 md:text-4xl"}>
          Footprint
        </h1>
          <div className={"hidden max-w-3xl text-sm sm:block md:text-base"}>
            <span className={"text-project-main"}>Comprends</span> les ordres de
            grandeurs des émissions de gaz à effet de serre,{" "}
            <span className={"text-project-main"}>situe</span> ton empreinte et
            sache par où <span className={"text-project-main"}>agir</span>.
          </div>
          <div className={"text-sm sm:hidden"}>
            <span className={"text-project-main"}>Comprends</span> les ordres de
            grandeurs, <span className={"text-project-main"}>situe</span> ton
            empreinte, <span className={"text-project-main"}>agis</span>.
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
