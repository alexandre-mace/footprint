"use client";

import React, { useEffect, useRef, useState } from "react";
import EmissionsEditor from "@/components/EmissionsEditor";
import EmissionsChart from "@/components/EmissionsChart";
import Loader from "@/components/Loader";
import { Chart as ChartJS } from "chart.js";
import Link from "next/link";

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const chartRef = useRef<ChartJS | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 500);
  }, []);

  return (
    <div className={`${!isLoaded ? "max-h-screen overflow-hidden" : ""}`}>
      {!isLoaded && <Loader />}
      {isLoaded && (
        <div className={"flex flex-col-reverse gap-4 p-4 md:mt-10 md:flex-row"}>
          <div className={"mt-12 md:mt-0 md:w-1/2"}>
            <EmissionsEditor chartRef={chartRef} />
          </div>
          <div
            className={
              "relative h-auto rounded-xl border border-dashed border-black p-4 hover:shadow-orange-light md:w-1/2"
            }
          >
            <div className={"sticky top-4"}>
              <div className={"text-center"}>Le comparateur</div>
              <EmissionsChart chartRef={chartRef} datasets={[]} />
              <div className={"text-end text-xs text-muted-foreground"}>
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
  );
};

export default App;
