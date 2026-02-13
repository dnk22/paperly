import download from "downloadjs";
import { toPng } from "html-to-image";
import { Loader2, Download as DownloadIcon } from "lucide-react";
import { useState } from "react";

export default function Download({
  fileName,
  spec,
}: {
  fileName?: string;
  spec: { width: number; height: number };
}) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    const ref = document.getElementById("phone-frame-content");
    if (!ref) return;
    setIsDownloading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 100));

      const dataUrl = await toPng(ref, {
        cacheBust: true,
        pixelRatio: 3,
        width: spec.width,
        height: spec.height,
        filter: (node) => !node.classList?.contains("ui-overlay"),
      });

      download(dataUrl, fileName);
    } catch (err) {
    } finally {
      setIsDownloading(false);
    }
  };
  return (
    <button
      onClick={handleDownload}
      disabled={isDownloading}
      className="group flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-bold text-sm hover:bg-neutral-200 active:scale-95 transition-all disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
    >
      {isDownloading ? (
        <>
          <Loader2 size={18} className="animate-spin" />
          Đang xử lý...
        </>
      ) : (
        <>
          <DownloadIcon size={18} />
          Tải Hình Nền
        </>
      )}
    </button>
  );
}
