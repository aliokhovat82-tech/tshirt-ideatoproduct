"use client";

import { useState } from "react";

export const PANEL_TABS = ["Layers", "Properties", "Garment"] as const;
export type PanelTab = (typeof PANEL_TABS)[number];

function PanelTabs({
  activeTab,
  onChange,
}: {
  activeTab: PanelTab;
  onChange: (tab: PanelTab) => void;
}) {
  return (
    <div className="flex border-b border-black/[.08] dark:border-white/[.1]">
      {PANEL_TABS.map((tab) => (
        <button
          key={tab}
          type="button"
          onClick={() => onChange(tab)}
          className={`flex-1 px-3 py-2 text-sm font-medium ${
            activeTab === tab
              ? "border-b-2 border-foreground text-foreground"
              : "text-zinc-500 dark:text-zinc-400"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

export function DesignerLayout({
  toolbar,
  canvas,
  panels,
}: {
  toolbar: React.ReactNode;
  canvas: React.ReactNode;
  panels: Record<PanelTab, React.ReactNode>;
}) {
  const [activeTab, setActiveTab] = useState<PanelTab>("Layers");
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <div className="flex h-screen flex-col lg:flex-row">
      <div className="hidden w-60 shrink-0 border-r border-black/[.08] lg:block dark:border-white/[.1]">
        {toolbar}
      </div>

      <div className="flex flex-1 flex-col overflow-hidden">{canvas}</div>

      <div className="hidden w-80 shrink-0 flex-col border-l border-black/[.08] lg:flex dark:border-white/[.1]">
        <PanelTabs activeTab={activeTab} onChange={setActiveTab} />
        <div className="p-4">{panels[activeTab]}</div>
      </div>

      <div className="flex border-t border-black/[.08] lg:hidden dark:border-white/[.1]">
        {PANEL_TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => {
              setActiveTab(tab);
              setSheetOpen(true);
            }}
            className="flex-1 px-3 py-3 text-sm font-medium text-zinc-600 dark:text-zinc-400"
          >
            {tab}
          </button>
        ))}
      </div>

      {sheetOpen && (
        <div className="fixed inset-0 z-20 lg:hidden">
          <button
            type="button"
            aria-label="Close panel"
            className="absolute inset-0 bg-black/30"
            onClick={() => setSheetOpen(false)}
          />
          <div className="bg-background absolute inset-x-0 bottom-0 rounded-t-2xl shadow-lg">
            <PanelTabs activeTab={activeTab} onChange={setActiveTab} />
            <div className="p-4">{panels[activeTab]}</div>
          </div>
        </div>
      )}
    </div>
  );
}
