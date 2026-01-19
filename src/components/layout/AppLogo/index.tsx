interface AppIconProps {
  size?: number;
  className?: string;
}

export default function AppLogo({ size = 36, className = "" }: AppIconProps) {
  return (
    <div
      className={`rounded-[25%] bg-gradient-to-br from-neutral-800 to-neutral-950 border border-white/5 shadow-2xl relative flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <div className="absolute left-[15%] top-[15%] w-[55%] h-[55%] bg-brand rounded-[22%] shadow-sm animate-pulse" />
      <div className="absolute right-[15%] bottom-[15%] w-[55%] h-[55%] bg-white/20 backdrop-blur-[1px] border border-white/20 rounded-[22%] shadow-sm z-10" />
    </div>
  );
}
