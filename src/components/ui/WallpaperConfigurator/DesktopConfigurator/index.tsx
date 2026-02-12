import ConfigPanel from "../ConfigPanel";
import PreviewPanel from "../PreviewPanel";

export default function DesktopConfigurator() {
  return (
    <div className="flex flex-col lg:flex-row h-full w-full min-h-0">
      <main className="flex-1 relative flex flex-col items-center justify-center p-8 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-200 via-gray-100 to-gray-200 dark:from-[#1C1F26] dark:via-[#0F1115] dark:to-[#000000] overflow-hidden">
        <div
          className="absolute inset-0 z-0 opacity-[0.4] dark:opacity-[0.1]"
          style={{
            backgroundImage:
              "linear-gradient(#9ca3af 1px, transparent 1px), linear-gradient(90deg, #9ca3af 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        ></div>
        <div className="absolute top-6 right-8 flex space-x-4 z-20">
          <button className="bg-surface-light dark:bg-surface-dark px-4 py-2 rounded-lg border border-border-light dark:border-border-dark shadow-sm text-sm font-medium text-text-main-light dark:text-white flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition cursor-pointer">
            <span className="material-icons-round text-lg">share</span>
            Share Preview
          </button>
        </div>
        <div className="relative z-10 transform transition-transform duration-500 hover:scale-[1.02]">
          <PreviewPanel />
          <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-tr from-white/0 via-white/5 to-white/0 pointer-events-none z-40"></div>
        </div>
      </main>
      <ConfigPanel className="scrollbar-modern" />
    </div>
  );
}
