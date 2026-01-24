import ConfigPanel from "../ConfigPanel";
import PreviewPanel from "../PreviewPanel";

export default function DesktopConfigurator() {
  return (
    <div className="flex flex-col md:flex-row h-full w-full">
      <div className="w-full md:w-1/2 flex item-center justify-center p-8 border-b md:border-b-0 md:border-r border-white/10 relative overflow-hidden">
        <PreviewPanel />
      </div>
      <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto scrollbar-modern">
        <ConfigPanel />
      </div>
    </div>
  );
}
