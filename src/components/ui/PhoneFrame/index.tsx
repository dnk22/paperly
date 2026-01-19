"use client";

import React, { useRef, useState } from "react";
import { toPng } from "html-to-image";
import download from "downloadjs";
import { Loader2, Download } from "lucide-react";

interface PhoneFrameProps {
  children: React.ReactNode;
}

// Kích thước chuẩn iPhone 14/15/16 Pro Max (Logic pixels)
const REAL_WIDTH = 430;
const REAL_HEIGHT = 932;
// (Lưu ý: Khi xuất ảnh ta sẽ nhân pixelRatio lên 3 để được ~1290x2796)

export default function PhoneFrame({ children }: PhoneFrameProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  // Tính toán tỷ lệ Scale để vừa với khung nhìn của Modal
  // Giả sử chiều cao hiển thị mong muốn khoảng 550px - 600px
  const SCALE = 0.6;

  const handleDownload = async () => {
    if (ref.current === null) return;
    setIsDownloading(true);

    try {
      // Chờ 1 chút để UI ổn định (nếu có animation)
      await new Promise((resolve) => setTimeout(resolve, 100));

      const dataUrl = await toPng(ref.current, {
        cacheBust: true,
        pixelRatio: 3, // QUAN TRỌNG: Nhân 3 để ra độ phân giải Retina (Super HD)
        width: REAL_WIDTH,
        height: REAL_HEIGHT,
      });

      download(dataUrl, "my-paperly-wallpaper.png");
    } catch (err) {
      console.error("Lỗi xuất ảnh:", err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* --- PHONE MOCKUP CONTAINER --- */}
      <div
        className="relative bg-black rounded-[50px] shadow-2xl border-[8px] border-neutral-800 ring-1 ring-white/20 overflow-hidden select-none"
        style={{
          width: `${REAL_WIDTH * SCALE}px`, // Chiều rộng hiển thị
          height: `${REAL_HEIGHT * SCALE}px`, // Chiều cao hiển thị
        }}
      >
        {/* Dynamic Island */}
        <div className="absolute top-[18px] left-1/2 -translate-x-1/2 w-[100px] h-[28px] bg-black rounded-full z-50 pointer-events-none" />
        {/* Nút Vật Lý (Trang trí cho đẹp) */}
        <div className="absolute top-24 -left-[10px] w-[3px] h-8 bg-neutral-700 rounded-l-md" />{" "}
        {/* Mute */}
        <div className="absolute top-36 -left-[10px] w-[3px] h-14 bg-neutral-700 rounded-l-md" />{" "}
        {/* Vol Up */}
        <div className="absolute top-52 -left-[10px] w-[3px] h-14 bg-neutral-700 rounded-l-md" />{" "}
        {/* Vol Down */}
        <div className="absolute top-40 -right-[10px] w-[3px] h-20 bg-neutral-700 rounded-r-md" />{" "}
        {/* Power */}
        {/* --- CONTENT SCALER --- */}
        {/* Đây là nơi chứa nội dung thật. Chúng ta dùng transform để thu nhỏ nó lại vừa khung */}
        <div
          style={{
            width: REAL_WIDTH,
            height: REAL_HEIGHT,
            transform: `scale(${SCALE})`,
            transformOrigin: "top left",
          }}
          className="bg-black relative"
        >
          {/* Vùng cần chụp ảnh nằm ở đây */}
          <div
            ref={ref}
            className="w-full h-full relative overflow-hidden bg-black"
          >
            {children}

            {/* Watermark ẩn hoặc nhỏ nếu cần */}
            {/* <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/10 text-[10px]">paperly.app</div> */}
          </div>
        </div>
      </div>

      {/* --- DOWNLOAD BUTTON --- */}
      <button
        onClick={handleDownload}
        disabled={isDownloading}
        className="
          group flex items-center gap-2 px-6 py-3 rounded-full 
          bg-white text-black font-bold text-sm
          hover:bg-neutral-200 active:scale-95 transition-all
          disabled:opacity-70 disabled:cursor-not-allowed
        "
      >
        {isDownloading ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Đang xuất ảnh...
          </>
        ) : (
          <>
            <Download size={18} />
            Tải Hình Nền
          </>
        )}
      </button>

      <p className="text-neutral-500 text-xs">
        Ảnh chất lượng cao (1290 x 2796 px)
      </p>
    </div>
  );
}
