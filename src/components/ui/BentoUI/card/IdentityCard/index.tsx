import SpotlightCard from "@/components/ui/SpotlightCard";
import { Fingerprint } from "lucide-react";

interface IdentityCardProps {
  onWidgetClick: (widgetType: string) => void;
}

function IdentityCard({ onWidgetClick }: IdentityCardProps) {
  return (
    <SpotlightCard className="col-span-2 flex justify-between items-center pr-0" onClick={() => onWidgetClick("identity")}> 
      <div className="z-10 max-w-[50%]">
        <div className="w-12 h-12 rounded-2xl bg-pink-500/10 flex items-center justify-center mb-4 text-pink-500">
          <Fingerprint size={24} />
        </div>
        <h3 className="text-3xl font-bold mb-1">Định Danh</h3>
        <p className="text-neutral-400">
          Viết tên bạn. Khẳng định phong cách riêng.
        </p>
      </div>

      {/* Visual Typography */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 text-right opacity-40 group-hover:opacity-100 transition-opacity duration-500">
        <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-neutral-600 to-white">
          FOCUS
        </div>
        <div className="text-4xl font-black text-neutral-800">MANTRA</div>
      </div>
    </SpotlightCard>
  );
}

export default IdentityCard;
