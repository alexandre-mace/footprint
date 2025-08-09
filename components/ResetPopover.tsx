"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RotateCcw, Trash2 } from "lucide-react";

interface ResetPopoverProps {
  onResetValues: () => void;
  onResetAll: () => void;
}

export const ResetPopover: React.FC<ResetPopoverProps> = ({
  onResetValues,
  onResetAll,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleResetValues = () => {
    onResetValues();
    setIsOpen(false);
  };

  const handleResetAll = () => {
    onResetAll();
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon">
          <RotateCcw className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit max-w-sm p-3" align="end">
        <div className="space-y-3">
          <div className="text-sm font-medium text-center">
            Réinitialiser
          </div>
          
          <div className="space-y-2">
            <Button
              onClick={handleResetValues}
              variant="outline"
              className="w-full justify-start text-sm h-auto py-3 px-3 min-w-0"
            >
              <RotateCcw className="h-4 w-4 mr-3 text-blue-500 flex-shrink-0" />
              <div className="text-left flex-1 min-w-0">
                <div className="font-medium max-w-40 truncate">Valeurs seulement</div>
                <div className="text-xs text-muted-foreground mt-1 max-w-40 leading-tight">
                  Quantités à zéro, conserve activités
                </div>
              </div>
            </Button>

            <Button
              onClick={handleResetAll}
              variant="outline"
              className="w-full justify-start text-sm h-auto py-3 px-3 min-w-0"
            >
              <Trash2 className="h-4 w-4 mr-3 text-red-500 flex-shrink-0" />
              <div className="text-left flex-1 min-w-0">
                <div className="font-medium max-w-40 truncate">Tout réinitialiser</div>
                <div className="text-xs text-muted-foreground mt-1 max-w-40 leading-tight">
                  Remet tout à zéro
                </div>
              </div>
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};