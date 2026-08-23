"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function MethodologyDialog() {
  return (
    <DialogTrigger>
      <Button
        variant="link"
        className="h-auto p-0 text-[11px] font-normal text-muted-foreground underline underline-offset-2 hover:text-foreground"
      >
        Comment c&apos;est calculé ?
      </Button>
      <Dialog>
        <DialogHeader>
          <DialogTitle>Comment c&apos;est calculé ?</DialogTitle>
          <DialogDescription>
            Les chiffres du simulateur sont des estimations qui illustrent les
            ordres de grandeur, pas un bilan carbone personnel.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
          <p>
            Les valeurs initiales des postes (l&apos;empreinte moyenne
            française et sa répartition) proviennent du{" "}
            <a
              className="underline"
              href="https://www.carbone4.com/files/graphique_final.png"
              target="_blank"
              rel="noreferrer"
            >
              graphique Carbone 4 / MyCO2
            </a>
            . Chaque curseur applique une règle simple à ces valeurs (par
            exemple, les kilomètres en voiture proratisent le poste voiture).
          </p>
          <p>
            Les activités du comparateur (étape 1) s&apos;appuient sur la{" "}
            <a
              className="underline"
              href="https://base-empreinte.ademe.fr/"
              target="_blank"
              rel="noreferrer"
            >
              Base Empreinte® de l&apos;Ademe
            </a>
            .
          </p>
          <p>
            Le simulateur démarre volontairement sur un profil chargé (voiture,
            avion, viande, chauffage au gaz) plutôt que sur la moyenne : la
            moyenne avion est trompeuse (
            <a
              className="underline"
              href="https://www.jean-jaures.org/publication/les-francais-les-voyages-et-lavion/"
              target="_blank"
              rel="noreferrer"
            >
              11 % seulement des Français disent prendre régulièrement
              l&apos;avion
            </a>
            ) et gommerait la réalité de ces postes. La moyenne française reste
            affichée comme repère ; ajuste les curseurs pour te situer vraiment.
          </p>
          <p>
            L&apos;objectif de 2 tonnes par personne et par an découle de
            l&apos;Accord de Paris. Pour comprendre ce qu&apos;il recouvre (et
            ses limites), lis{" "}
            <a
              className="underline"
              href="https://bonpote.com/objectif-2-tonnes-vrai-defi-ou-mauvaise-cible/"
              target="_blank"
              rel="noreferrer"
            >
              cet article de Bon Pote
            </a>
            .
          </p>
          <p>
            Le carbone n&apos;est pas tout : le climat est l&apos;une des{" "}
            <a
              className="underline"
              href="https://bonpote.com/la-6e-limite-planetaire-est-franchie-le-cycle-de-leau-douce/"
              target="_blank"
              rel="noreferrer"
            >
              9 limites planétaires
            </a>
            , et les efforts à déployer doivent répondre à toutes.
          </p>
          <p>
            Pour une estimation précise et personnalisée de ton empreinte,
            utilise{" "}
            <a
              className="underline"
              href="https://nosgestesclimat.fr"
              target="_blank"
              rel="noreferrer"
            >
              Nos Gestes Climat
            </a>
            .
          </p>
        </div>
      </Dialog>
    </DialogTrigger>
  );
}
