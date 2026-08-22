"use client";

import { useEffect, useState } from "react";
import App from "@/components/App";
import Loader from "@/components/Loader";
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

// L'animation de bienvenue couvre toute la page (header et onglets compris)
// et ne joue qu'une fois par chargement
let hasShownWelcomeLoader = false;

export default function ParcoursTabs() {
  const [activeTab, setActiveTab] = useState<TabId>("comprendre");
  const [showLoader, setShowLoader] = useState(!hasShownWelcomeLoader);
  const [simulation, setSimulation] = useState<SimulationState>(
    defaultSimulationState,
  );

  useEffect(() => {
    if (!showLoader) return;
    const timer = setTimeout(() => {
      hasShownWelcomeLoader = true;
      setShowLoader(false);
    }, 250);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        // Hydratation localStorage après montage : l'état initial doit rester
        // identique au rendu serveur, d'où le setState volontaire en effet
        // eslint-disable-next-line react-hooks/set-state-in-effect
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
      {showLoader && <Loader />}
      <Toaster position="bottom-right" />
      <nav
        role="tablist"
        aria-label="Étapes du parcours"
        className="sticky top-0 z-20 mt-5 flex justify-center gap-1.5 bg-project-bg/90 px-3 py-3 backdrop-blur-sm sm:gap-2"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => goTo(tab.id)}
            className={`whitespace-nowrap rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors sm:px-4 sm:text-sm ${
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
              className="rounded-lg border border-black bg-black px-5 py-2 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
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
