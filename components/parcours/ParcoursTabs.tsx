"use client";

import { useEffect, useState } from "react";
import App from "@/components/App";
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
  }, []);

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
      <nav className="sticky top-0 z-20 flex justify-center gap-2 border-b bg-white/90 p-3 backdrop-blur">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
              activeTab === tab.id
                ? "border-black bg-black text-white"
                : "border-input text-muted-foreground hover:bg-accent"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>
      {activeTab === "comprendre" && <App />}
      {activeTab === "situer" && (
        <SimulatorTab state={simulation} onChange={handleSimulationChange} />
      )}
      {activeTab === "agir" && <ActionsTab state={simulation} />}
    </div>
  );
}
