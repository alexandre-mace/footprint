"use client";

import { useEffect, useState } from "react";
import App from "@/components/App";
import { Toaster } from "@/components/ui/sonner";
import SimulatorTab from "@/components/parcours/SimulatorTab";
import ActionsTab from "@/components/parcours/ActionsTab";
import {
  SimulationState,
  defaultSimulationState,
} from "@/lib/simulation";

type TabId = "comprendre" | "situer" | "agir";

const tabs: { id: TabId; label: string }[] = [
  { id: "comprendre", label: "1 · Comprendre" },
  { id: "situer", label: "2 · Me situer" },
  { id: "agir", label: "3 · Agir" },
];

const isTabId = (value: string): value is TabId =>
  tabs.some((tab) => tab.id === value);

const STORAGE_KEY = "footprint-simulation-v2";

export default function ParcoursTabs() {
  const [activeTab, setActiveTab] = useState<TabId>("comprendre");
  const [simulation, setSimulation] = useState<SimulationState>(
    defaultSimulationState,
  );

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setSimulation({ ...defaultSimulationState, ...JSON.parse(stored) });
      }
    } catch {
      // ignore corrupted storage
    }
    const syncFromHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (isTabId(hash)) {
        setActiveTab(hash);
      }
    };
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  const goTo = (tab: TabId) => {
    setActiveTab(tab);
    window.history.replaceState(null, "", `#${tab}`);
    window.scrollTo({ top: 0 });
  };

  const handleSimulationChange = (state: SimulationState) => {
    setSimulation(state);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // storage unavailable
    }
  };

  return (
    <div>
      <Toaster position="bottom-right" />
      <nav
        role="tablist"
        aria-label="Étapes du parcours"
        className="sticky top-0 z-20 mt-5 flex justify-center gap-1.5 bg-[#F1EFED]/90 px-3 py-3 backdrop-blur sm:gap-2"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => goTo(tab.id)}
            className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs transition-colors sm:px-4 sm:text-sm ${
              activeTab === tab.id
                ? "border-black bg-black text-white"
                : "border-input text-muted-foreground hover:bg-accent"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>
      {activeTab === "comprendre" && (
        <>
          <App />
          <div className="mb-10 mt-2 flex justify-center">
            <button
              type="button"
              onClick={() => goTo("situer")}
              className="rounded-full border border-black bg-black px-5 py-2 text-sm text-white transition-transform hover:-translate-y-0.5"
            >
              Étape suivante : Me situer →
            </button>
          </div>
        </>
      )}
      {activeTab === "situer" && (
        <SimulatorTab
          state={simulation}
          onChange={handleSimulationChange}
          onNextStep={() => goTo("agir")}
        />
      )}
      {activeTab === "agir" && (
        <ActionsTab state={simulation} onGoToSimulator={() => goTo("situer")} />
      )}
    </div>
  );
}
