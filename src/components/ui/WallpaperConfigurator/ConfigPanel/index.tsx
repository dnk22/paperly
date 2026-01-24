"use client";

interface ConfigPanelProps {
  className?: string;
}

export default function ConfigPanel({ className = "" }: ConfigPanelProps) {
  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="pb-4 border-b border-white/10">
        <h2 className="text-2xl font-bold text-white">Wallpaper Settings</h2>
        <p className="text-sm text-neutral-400 mt-1">
          Customize your lock screen wallpaper
        </p>
      </div>

      {/* Style Section */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Style</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
            <span className="text-sm text-neutral-300">Gradient Type</span>
            <select className="bg-neutral-800 text-white px-3 py-1.5 rounded-lg text-sm border border-white/10">
              <option>Linear</option>
              <option>Radial</option>
              <option>Conic</option>
            </select>
          </div>
          
          <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
            <span className="text-sm text-neutral-300">Blur Effect</span>
            <input
              type="range"
              min="0"
              max="100"
              defaultValue="30"
              className="w-32"
            />
          </div>
        </div>
      </section>

      {/* Colors Section */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Colors</h3>
        <div className="grid grid-cols-2 gap-3">
          {["Primary", "Secondary", "Accent", "Background"].map((color) => (
            <div
              key={color}
              className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2"
            >
              <span className="text-xs text-neutral-400">{color}</span>
              <input
                type="color"
                defaultValue="#8b5cf6"
                className="w-full h-10 rounded-lg cursor-pointer"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Typography Section */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Typography</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
            <span className="text-sm text-neutral-300">Clock Font</span>
            <select className="bg-neutral-800 text-white px-3 py-1.5 rounded-lg text-sm border border-white/10">
              <option>SF Pro</option>
              <option>Inter</option>
              <option>Poppins</option>
            </select>
          </div>
          
          <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
            <span className="text-sm text-neutral-300">Font Weight</span>
            <select className="bg-neutral-800 text-white px-3 py-1.5 rounded-lg text-sm border border-white/10">
              <option>Light</option>
              <option>Regular</option>
              <option>Bold</option>
            </select>
          </div>
        </div>
      </section>

      {/* Widgets Section */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Widgets</h3>
        <div className="space-y-3">
          {["Weather", "Calendar", "Battery", "Activity Rings"].map((widget) => (
            <label
              key={widget}
              className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 cursor-pointer"
            >
              <span className="text-sm text-neutral-300">{widget}</span>
              <input
                type="checkbox"
                defaultChecked
                className="w-5 h-5 rounded accent-purple-500"
              />
            </label>
          ))}
        </div>
      </section>

      {/* Effects Section */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Effects</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
            <span className="text-sm text-neutral-300">Parallax</span>
            <input
              type="range"
              min="0"
              max="100"
              defaultValue="50"
              className="w-32"
            />
          </div>
          
          <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
            <span className="text-sm text-neutral-300">Depth</span>
            <input
              type="range"
              min="0"
              max="100"
              defaultValue="60"
              className="w-32"
            />
          </div>
          
          <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
            <span className="text-sm text-neutral-300">Vignette</span>
            <input
              type="range"
              min="0"
              max="100"
              defaultValue="40"
              className="w-32"
            />
          </div>
        </div>
      </section>

      {/* Advanced Section */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Advanced</h3>
        <div className="space-y-3">
          <label className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 cursor-pointer">
            <span className="text-sm text-neutral-300">Perspective Zoom</span>
            <input
              type="checkbox"
              className="w-5 h-5 rounded accent-purple-500"
            />
          </label>
          
          <label className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 cursor-pointer">
            <span className="text-sm text-neutral-300">Motion Effects</span>
            <input
              type="checkbox"
              defaultChecked
              className="w-5 h-5 rounded accent-purple-500"
            />
          </label>
        </div>
      </section>

      {/* Action Buttons */}
      <div className="pt-6 space-y-3">
        <button className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-medium transition-colors">
          Generate Wallpaper
        </button>
        <button className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium border border-white/10 transition-colors">
          Reset to Default
        </button>
      </div>
    </div>
  );
}
