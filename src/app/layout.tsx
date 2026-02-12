import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { LanguageProvider } from "@/context/LanguageContext";

export const metadata: Metadata = {
  title: "Paperly",
  description:
    "Ứng dụng tạo và tùy chỉnh hình nền độc đáo cho thiết bị của bạn. Dễ sử dụng, không cần cài đặt, hoàn toàn miễn phí.",
  keywords: "hình nền, wallpaper, tùy chỉnh, cá nhân hóa, thiết kế, background",
  authors: [{ name: "Paperly Team" }],
  creator: "Paperly",
  publisher: "Paperly",
  robots: "index, follow",
  openGraph: {
    title: "Paperly - Tùy chỉnh hình nền cá nhân",
    description:
      "Tạo hình nền độc đáo cho thiết bị của bạn với Paperly. Dễ sử dụng, không cần cài đặt.",
    type: "website",
    locale: "vi_VN",
    siteName: "Paperly",
  },
  twitter: {
    card: "summary_large_image",
    title: "Paperly - Tùy chỉnh hình nền cá nhân",
    description: "Tạo hình nền độc đáo cho thiết bị của bạn với Paperly",
    creator: "@paperly_app",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="bg-background antialiased overflow-hidden">
        <LanguageProvider>
          <Header />
          <main className="bg-background scrollbar-modern overflow-y-auto h-[100vh]">
            <div className="pt-20 pb-20">{children}</div>
            <Footer />
          </main>
        </LanguageProvider>
      </body>
    </html>
  );
}
