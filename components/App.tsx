"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import EmissionsEditor from "@/components/EmissionsEditor";
import MainChart from "@/components/MainChart";
import Loader from "@/components/Loader";
import Link from "next/link";
import { ChartData } from "@/types/chart";
import ErrorBoundary from "@/components/ErrorBoundary";
import { Toaster } from "@/components/ui/sonner";
import { Versus } from "@/types/versus";

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [chartData, setChartData] = useState<ChartData>([]);
  const applyVersusRef = useRef<((versus: Versus) => void) | null>(null);
  const openVersusDialogRef = useRef<(() => void) | null>(null);

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

  return (
    <>
      <ErrorBoundary>
        <div className={`${!isLoaded ? "max-h-screen overflow-hidden" : ""}`}>
          {!isLoaded && <Loader />}
          {isLoaded && (
            <div className="flex flex-col-reverse gap-4 p-4 md:mt-10 md:flex-row">
              <div className="mt-12 md:mt-0 md:w-1/2">
                <ErrorBoundary>
                  <EmissionsEditor 
                    onChartDataChange={handleChartDataChange}
                    setApplyVersusRef={setApplyVersusRef}
                    setOpenVersusDialogRef={setOpenVersusDialogRef}
                  />
                </ErrorBoundary>
              </div>
              <div
                className={
                  "relative h-auto rounded-xl border border-dashed border-black p-4 hover:shadow-orange-light md:w-1/2"
                }
              >
                <div className={"sticky top-4"}>
                  <div className={"text-center mb-4"}>Le comparateur</div>
                  <ErrorBoundary>
                    <MainChart 
                      chartData={chartData}
                      onApplyVersus={handleApplyVersus}
                      onOpenVersusDialog={handleOpenVersusDialog}
                    />
                  </ErrorBoundary>
                  <div className={"text-end text-xs text-muted-foreground mt-4"}>
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
          )}
        </div>
      </ErrorBoundary>
      <Toaster />
    </>
  );
};

export default App;
