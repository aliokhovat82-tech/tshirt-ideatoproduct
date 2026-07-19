"use client";

import { useState } from "react";

export const PANEL_TABS = ["Layers", "Properties", "Garment"] as const;
export type PanelTab = (typeof PANEL_TABS)[number];

type MobileExtraTab = { label: string; content: React.ReactNode };

type MobileSheet =
  { kind: "tab"; tab: PanelTab } | { kind: "extra"; index: number } | null;

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
  mobileExtraTabs = [],
}: {
  toolbar: React.ReactNode;
  canvas: React.ReactNode;
  panels: Record<PanelTab, React.ReactNode>;
  // Content that only lives in the desktop Toolbar column (hidden below
  // lg) needs a way to stay reachable on mobile/tablet. These render as
  // extra buttons in the mobile bottom bar, opening the same bottom
  // sheet, without adding a 4th tab to the desktop panel.
  mobileExtraTabs?: MobileExtraTab[];
}) {
  const [activeTab, setActiveTab] = useState<PanelTab>("Layers");
  const [mobileSheet, setMobileSheet] = useState<MobileSheet>(null);

  const mobileSheetContent =
    mobileSheet?.kind === "tab"
      ? panels[mobileSheet.tab]
      : mobileSheet?.kind === "extra"
        ? mobileExtraTabs[mobileSheet.index]?.content
        : null;

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
        {mobileExtraTabs.map((extra, index) => (
          <button
            key={extra.label}
            type="button"
            onClick={() => setMobileSheet({ kind: "extra", index })}
            className="flex-1 px-3 py-3 text-sm font-medium text-zinc-600 dark:text-zinc-400"
          >
            {extra.label}
          </button>
        ))}
        {PANEL_TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => {
              setActiveTab(tab);
              setMobileSheet({ kind: "tab", tab });
            }}
            className="flex-1 px-3 py-3 text-sm font-medium text-zinc-600 dark:text-zinc-400"
          >
            {tab}
          </button>
        ))}
      </div>

      {mobileSheet && (
        <div className="fixed inset-0 z-20 lg:hidden">
          <button
            type="button"
            aria-label="Close panel"
            className="absolute inset-0 bg-black/30"
            onClick={() => setMobileSheet(null)}
          />
          <div className="bg-background absolute inset-x-0 bottom-0 max-h-[70vh] overflow-y-auto rounded-t-2xl shadow-lg">
            {mobileSheet.kind === "tab" && (
              <PanelTabs
                activeTab={activeTab}
                onChange={(tab) => {
                  setActiveTab(tab);
                  setMobileSheet({ kind: "tab", tab });
                }}
              />
            )}
            <div className="p-4">{mobileSheetContent}</div>
          </div>
        </div>
      )}
    </div>
  );
}
