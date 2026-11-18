/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Le site n'affiche que des emojis et un logo de 16 à 40 px : rien à optimiser.
    // `domains` laissait transformer n'importe quelle image d'em-content.zobj.net
    // (des milliers d'emojis × 15 largeurs) sur le quota Hobby de 5 000 par mois.
    // Servies telles quelles, zéro transformation, et Vercel n'expose plus /_next/image.
    unoptimized: true,
  },
  // Anciennes adresses de top-actions et de plume, dont les projets Vercel ne
  // faisaient plus que rediriger : toute page renvoie à l'accueil, comme avant.
  async redirects() {
    return ["top-actions.climatelab.fr", "plume.climatelab.fr"].map((host) => ({
      source: "/:path*",
      has: [{ type: "host", value: host }],
      destination: "https://footprint.climatelab.fr/",
      permanent: true,
    }));
  },
};

export default nextConfig;
