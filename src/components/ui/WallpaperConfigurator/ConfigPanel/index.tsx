"use client";

import { useState } from "react";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import { useLanguage } from "@/context/LanguageContext";
import {
  selectResetConfig,
  useConfiguratorStore,
} from "@/stores/useConfiguratorStore";
import AppearanceSection from "./components/AppearanceSection";
import ConfigFooter from "./components/ConfigFooter";
import ConfigHeader from "./components/ConfigHeader";
import DisplayOptionsSection from "./components/DisplayOptionsSection";
import MainContentSection from "./components/MainContentSection";
import ResetSection from "./components/ResetSection";

interface ConfigPanelProps {
  className?: string;
  variant?: "aside" | "embedded";
}

export default function ConfigPanel({
  className = "",
  variant = "aside",
}: ConfigPanelProps) {
  const isAside = variant === "aside";
  const resetConfig = useConfiguratorStore(selectResetConfig);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <aside
      className={`flex w-full flex-col ${
        isAside
          ? "h-full flex-shrink-0 lg:w-[480px] xl:w-[520px] border-l border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark overflow-y-auto shadow-lg"
          : ""
      } ${className}`}
    >
      {isAside && <ConfigHeader onReset={() => setIsConfirmOpen(true)} />}

      <div className={`${isAside ? "p-6" : ""} space-y-10`}>
        <MainContentSection />
        <hr className="border-border-light dark:border-border-dark" />
        <DisplayOptionsSection />
        <hr className="border-border-light dark:border-border-dark" />
        <AppearanceSection />
        <ResetSection />
      </div>

      {isAside && <ConfigFooter />}

      <ConfirmDialog
        open={isConfirmOpen}
        title={t.configPanel.dialog.title}
        description={t.configPanel.dialog.description}
        confirmLabel={t.configPanel.dialog.confirm}
        cancelLabel={t.configPanel.dialog.cancel}
        onCancel={() => setIsConfirmOpen(false)}
        onConfirm={() => {
          setIsConfirmOpen(false);
          resetConfig();
        }}
      />
    </aside>
  );
}
