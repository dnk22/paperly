import Image from "next/image";

export default function VisionBoard() {
  return (
    <div className="absolute inset-0 p-2 grid grid-cols-2 grid-rows-3 gap-2 opacity-60 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105 gallery overflow-y-auto max-h-[320px] scroll-smooth scrollbar-thin scrollbar-thumb-pink-400/40 scrollbar-track-transparent">
      <div className="col-span-2 row-span-2 rounded-2xl bg-gradient-to-br from-neutral-800 to-neutral-900 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
        <Image
          src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=500&q=80"
          alt="Travel"
          width={300}
          height={200}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-3 left-3 z-20">
          <span className="text-[10px] font-bold tracking-widest text-white uppercase bg-black/30 px-2 py-1 rounded backdrop-blur-md border border-white/10">
            Travel
          </span>
        </div>
      </div>

      <div className="col-span-1 row-span-1 rounded-2xl bg-neutral-800 overflow-hidden relative">
        <Image
          src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=300&q=80"
          alt="Gym"
          width={300}
          height={400}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
        />
      </div>

      <div className="col-span-1 row-span-1 rounded-2xl bg-neutral-800 overflow-hidden relative">
        <Image
          src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300&q=80"
          alt="Work"
          width={300}
          height={400}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
        />
      </div>
    </div>
  );
}
