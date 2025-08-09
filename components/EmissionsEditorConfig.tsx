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
import { CirclePlus } from "lucide-react";
import Image from "next/image";
import React from "react";
import Category from "@/types/category";
import { Switch } from "@/components/ui/switch";

export function EmissionsEditorConfig({
  emissions,
  onToggleVisibility,
}: {
  emissions: Category[];
  onToggleVisibility: (emissionId: string) => void;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"}>
          <CirclePlus className={"h-4 w-4 mr-2"} />
          Autres activités
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px] md:max-w-[725px] xl:max-w-[925px]">
        <DialogHeader>
          <DialogTitle className={"font-normal"}>
            Ajoutez des émissions
          </DialogTitle>
          <DialogDescription>
            Activez des émissions qui seront affichées dans l&#39;outil.
          </DialogDescription>
        </DialogHeader>
        <div className="grid max-h-[80vh] gap-2 overflow-y-scroll">
          {emissions.map((category) => (
            <div
              className={
                "space-y-2 rounded-xl border bg-white p-4"
              }
              key={category.label}
            >
              <div className={"flex items-center gap-2"}>
                <Image
                  className={"h-4 w-4"}
                  src={category.img}
                  alt={category.label}
                  height={32}
                  width={32}
                />
                <div className={"text-xs font-medium text-muted-foreground"}>
                  {category.label}
                </div>
              </div>
              <div
                className={
                  "grid items-center gap-4 sm:grid-cols-2 md:grid-cols-3"
                }
              >
                {category.emissions.map((emission) => (
                  <div
                    key={emission.label}
                    className={
                      "flex h-full items-center justify-between gap-4 rounded-lg border border-dashed border-black p-4"
                    }
                  >
                    <div className={"space-y-1"}>
                      <div className={"text-xs font-medium"}>
                        {emission.label}
                      </div>
                      <div className={"text-xs text-muted-foreground"}>
                        {emission.value}kco2eq
                      </div>
                    </div>
                    <div className={"flex shrink-0 items-center gap-2"}>
                      <Switch
                        checked={emission.isVisible}
                        onCheckedChange={() => onToggleVisibility(emission.id)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button>Fermer</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
