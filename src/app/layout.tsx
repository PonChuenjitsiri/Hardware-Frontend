import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://your-domain.example"),
  title: {
    default: "Hardware Portal",
    template: "%s · Hardware Portal",
  },
  description: "Factory/MES dashboard and tools.",
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "light dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-900`}>
        <div className="min-h-dvh">{children}</div>
      </body>
    </html>
  );
}
