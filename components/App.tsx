"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import EmissionsEditor from "@/components/EmissionsEditor";
import MainChart, { MainChartRef } from "@/components/MainChart";
import Loader from "@/components/Loader";
import Link from "next/link";
import { ChartData } from "@/types/chart";
import { Toaster } from "@/components/ui/sonner";
import { Versus } from "@/types/versus";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [chartData, setChartData] = useState<ChartData>([]);
  const applyVersusRef = useRef<((versus: Versus) => void) | null>(null);
  const openVersusDialogRef = useRef<(() => void) | null>(null);
  const mainChartRef = useRef<MainChartRef>(null);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 500);
  }, []);

  const handleChartDataChange = useCallback((data: ChartData) => {
    setChartData(data);
  }, []);

  const setApplyVersusRef = useCallback((applyVersus: (versus: Versus) => void) => {
    applyVersusRef.current = applyVersus;
  }, []);

  const setOpenVersusDialogRef = useCallback((openDialog: () => void) => {
    openVersusDialogRef.current = openDialog;
  }, []);

  const handleApplyVersus = useCallback((versus: Versus) => {
    if (applyVersusRef.current) {
      applyVersusRef.current(versus);
    }
  }, []);

  const handleOpenVersusDialog = useCallback(() => {
    if (openVersusDialogRef.current) {
      openVersusDialogRef.current();
    }
  }, []);

  const handleExportToPNG = useCallback(() => {
    if (mainChartRef.current) {
      mainChartRef.current.exportToPNG();
    }
  }, []);

  return (
    <>
      <div className={`${!isLoaded ? "max-h-screen overflow-hidden" : ""}`}>
        {!isLoaded && <Loader />}
        {isLoaded && (
          <div className="flex flex-col-reverse gap-4 p-4 md:mt-10 md:flex-row">
            <div className="mt-12 md:mt-0 md:w-1/2">
              <EmissionsEditor 
                onChartDataChange={handleChartDataChange}
                setApplyVersusRef={setApplyVersusRef}
                setOpenVersusDialogRef={setOpenVersusDialogRef}
              />
            </div>
            <div
              className={
                "relative h-auto rounded-xl border border-dashed border-black p-4 hover:shadow-orange-light md:w-1/2"
              }
            >
              <div className={"sticky top-4"}>
                <div className={"text-center mb-4"}>Le comparateur</div>
                <MainChart 
                  ref={mainChartRef}
                  chartData={chartData}
                  onApplyVersus={handleApplyVersus}
                  onOpenVersusDialog={handleOpenVersusDialog}
                />
                <div className={"flex gap-4 items-center justify-between mt-4"}>
                    {chartData.length > 0 && (
                        <Button
                            variant="outline"
                            size="sm"
                            className="h-7 text-xs px-2"
                            onClick={handleExportToPNG}
                            title="Exporter en PNG"
                        >
                            <Download className="h-3 w-3 mr-1" />
                            Exporter
                        </Button>
                    )}
                    <div className={"text-xs text-muted-foreground"}>
                    Source :{" "}
                    <Link
                      className={"underline"}
                      href={"https://base-empreinte.ademe.fr"}
                      target={"_blank"}
                    >
                      Base Carbone® Ademe
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Toaster />
    </>
  );
};

export default App;
