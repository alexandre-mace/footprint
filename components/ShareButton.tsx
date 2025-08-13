"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Share2, Copy, Check, ExternalLink } from "lucide-react";
import { generateShareUrl, copyToClipboard } from "@/lib/urlSharing";
import { toast } from "sonner";

interface ShareButtonProps {
  emissions: Record<string, number>;
  className?: string;
}

export const ShareButton: React.FC<ShareButtonProps> = ({ emissions, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState<string>("");
  const [isCopied, setIsCopied] = useState(false);

  const handleGenerateUrl = () => {
    try {
      const url = generateShareUrl(emissions);
      setShareUrl(url);
      setIsOpen(true);
    } catch (error) {
      toast.error( "Erreur lors de la génération du lien");
    }
  };

  const handleCopyUrl = async () => {
    const success = await copyToClipboard(shareUrl);
    if (success) {
      setIsCopied(true);
      toast.success( "Lien copié dans le presse-papiers");
      setTimeout(() => setIsCopied(false), 2000);
    } else {
      toast.error( "Erreur lors de la copie du lien");
    }
  };

  const handleShareNative = async () => {
    if (typeof navigator !== 'undefined' && 'share' in navigator) {
      try {
        await navigator.share({
          title: "Mon comparateur d'empreinte carbone",
          text: "Découvrez mes émissions de CO₂",
          url: shareUrl,
        });
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          toast.error( "Erreur lors du partage");
        }
      }
    }
  };

  const getUrlPreview = (url: string): string => {
    if (url.length <= 60) return url;
    return url.substring(0, 30) + "..." + url.substring(url.length - 27);
  };

  const hasData = Object.values(emissions).some(quantity => quantity > 0);

  return (
    <>
      <Button 
        onClick={handleGenerateUrl}
        variant="outline" 
        size="icon"
        disabled={!hasData}
        className={className}
        title={hasData ? "Partager cette configuration" : "Ajoutez des émissions pour partager"}
      >
        <Share2 className="h-4 w-4" />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 font-medium">
              <Share2 className="h-5 w-5" />
              Partager votre configuration
            </DialogTitle>
            <DialogDescription>
              Partagez votre configuration d'émissions via ce lien unique.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Lien de partage</label>
              <div className="flex gap-2">
                <Input
                  readOnly
                  value={getUrlPreview(shareUrl)}
                  className="flex-1"
                />
                <Button
                  onClick={handleCopyUrl}
                  variant="outline"
                  size="icon"
                  className="shrink-0"
                >
                  {isCopied ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                onClick={handleCopyUrl}
                variant="default"
                className="flex-1"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copier le lien
              </Button>

              {typeof navigator !== 'undefined' && 'share' in navigator && (
                <Button
                  onClick={handleShareNative}
                  variant="outline"
                  className="flex-1"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Partager
                </Button>
              )}
            </div>

            <div className="text-xs text-muted-foreground p-3 bg-muted rounded-lg">
              <div className="font-medium mb-1">ℹ️ À propos du partage</div>
              <ul className="space-y-1">
                <li>• Le lien contient votre configuration actuelle</li>
                <li>• Aucune donnée n'est stockée sur nos serveurs</li>
                <li>• Le lien fonctionne tant que l'application existe</li>
              </ul>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Fermer</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};