"use client";

import React, { useState, useCallback } from "react";
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
import { Card } from "@/components/ui/card";
import { Swords, Mail, Car, Smartphone, Zap, Beef, Train, Plane, Flame, MonitorSpeaker } from "lucide-react";
import { Versus, VersusRaw } from "@/types/versus";
import versusData from "@/data/versus.json";
import { toast } from "sonner";

interface PresetSelectorProps {
  onApplyVersus: (versus: Versus) => void;
  setOpenDialogRef?: (openDialog: () => void) => void;
}

export const PresetSelector: React.FC<PresetSelectorProps> = ({ onApplyVersus, setOpenDialogRef }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = useCallback(() => {
    setIsOpen(true);
  }, []);

  React.useEffect(() => {
    if (setOpenDialogRef) {
      setOpenDialogRef(openDialog);
    }
  }, [setOpenDialogRef, openDialog]);

  // Fonction pour obtenir l'icône appropriée selon l'activité
  const getActivityIcon = (label: string) => {
    const lowerLabel = label.toLowerCase();
    
    if (lowerLabel.includes('mail') || lowerLabel.includes('email')) {
      return <Mail className="h-3 w-3 text-blue-500" />;
    } else if (lowerLabel.includes('repas') || lowerLabel.includes('boeuf') || lowerLabel.includes('viande')) {
      return <Beef className="h-3 w-3 text-red-500" />;
    } else if (lowerLabel.includes('train') || lowerLabel.includes('tgv')) {
      return <Train className="h-3 w-3 text-green-500" />;
    } else if (lowerLabel.includes('avion')) {
      return <Plane className="h-3 w-3 text-blue-400" />;
    } else if (lowerLabel.includes('smartphone')) {
      return <Smartphone className="h-3 w-3 text-purple-500" />;
    } else if (lowerLabel.includes('chauffage')) {
      return <Flame className="h-3 w-3 text-orange-500" />;
    } else if (lowerLabel.includes('streaming') || lowerLabel.includes('vidéo')) {
      return <MonitorSpeaker className="h-3 w-3 text-pink-500" />;
    } else if (lowerLabel.includes('voiture')) {
      return <Car className="h-3 w-3 text-gray-600" />;
    } else {
      return <Zap className="h-3 w-3 text-yellow-500" />;
    }
  };

  // Convertir les données JSON en objets Versus
  const versus: Versus[] = (versusData as VersusRaw[]).map((v: VersusRaw) => ({
    id: v.id,
    name: v.name,
    description: v.description,
    sideA: {
      label: v.sideA.label,
      emissions: Object.fromEntries(
        Object.entries(v.sideA.emissions).filter(([_, value]) => value !== undefined)
      ) as Record<string, number>
    },
    sideB: {
      label: v.sideB.label,
      emissions: Object.fromEntries(
        Object.entries(v.sideB.emissions).filter(([_, value]) => value !== undefined)
      ) as Record<string, number>
    },
    sideC: v.sideC ? {
      label: v.sideC.label,
      emissions: Object.fromEntries(
        Object.entries(v.sideC.emissions).filter(([_, value]) => value !== undefined)
      ) as Record<string, number>
    } : undefined
  }));

  const handleApplyVersus = (versusItem: Versus) => {
    onApplyVersus(versusItem);
    toast.success(`Versus "${versusItem.name}" appliqué`);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Swords className="h-4 w-4 mr-2" />
          Versus
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="font-normal">Versus prédéfinis</DialogTitle>
          <DialogDescription>
            Comparez différentes activités avec des versus typiques.
          </DialogDescription>
        </DialogHeader>

        {/* Liste des versus */}
        <div className="grid gap-3 max-h-96 overflow-y-auto pr-2">
          {versus.map(versusItem => (
            <Card 
              key={versusItem.id} 
              className="p-3 cursor-pointer hover:bg-muted/30 transition-colors"
              onClick={() => handleApplyVersus(versusItem)}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 flex-1 text-xs flex-wrap">
                  <div className="flex items-center gap-1 bg-blue-50 px-2 py-1.5 rounded-md">
                    {getActivityIcon(versusItem.sideA.label)}
                    <span>{versusItem.sideA.label}</span>
                  </div>
                  
                  <div className="flex items-center justify-center px-1">
                    <span className="font-bold text-orange-500 text-xs">VS</span>
                  </div>
                  
                  <div className="flex items-center gap-1 bg-red-50 px-2 py-1.5 rounded-md">
                    {getActivityIcon(versusItem.sideB.label)}
                    <span>{versusItem.sideB.label}</span>
                  </div>
                  
                  {versusItem.sideC && (
                    <>
                      <div className="flex items-center justify-center px-1">
                        <span className="font-bold text-orange-500 text-xs">VS</span>
                      </div>
                      <div className="flex items-center gap-1 bg-green-50 px-2 py-1.5 rounded-md">
                        {getActivityIcon(versusItem.sideC.label)}
                        <span>{versusItem.sideC.label}</span>
                      </div>
                    </>
                  )}
                </div>
                
                <Button size="sm" variant="ghost" className="shrink-0 h-7 px-2">
                  <Swords className="h-3 w-3" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Fermer</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};