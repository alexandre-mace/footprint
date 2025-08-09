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
import { Swords, Zap, ArrowRight } from "lucide-react";
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
              className="p-4 cursor-pointer"
              onClick={() => handleApplyVersus(versusItem)}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <Swords className="h-4 w-4 text-orange-500" />
                    <h3 className="font-medium text-sm">{versusItem.name}</h3>
                  </div>
                  {versusItem.description && (
                    <p className="text-xs text-muted-foreground mb-3">{versusItem.description}</p>
                  )}
                  <div className="flex items-center gap-2 text-xs">
                    <div className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded">
                      <Zap className="h-3 w-3 text-blue-500" />
                      <span>{versusItem.sideA.label}</span>
                    </div>
                    <ArrowRight className="h-3 w-3 text-muted-foreground" />
                    <div className="flex items-center gap-1 bg-red-50 px-2 py-1 rounded">
                      <Zap className="h-3 w-3 text-red-500" />
                      <span>{versusItem.sideB.label}</span>
                    </div>
                    {versusItem.sideC && (
                      <>
                        <ArrowRight className="h-3 w-3 text-muted-foreground" />
                        <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded">
                          <Zap className="h-3 w-3 text-green-500" />
                          <span>{versusItem.sideC.label}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <Button size="sm" variant="ghost">
                  Comparer
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