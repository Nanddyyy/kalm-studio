import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KALM Studio - Premium Boxy Fit Fashion",
  description: "Heavyweight Cotton Combed 20s - Premium 200+ GSM. Potongan boxy fit yang kokoh, tidak menerawang, tebal, namun tetap dingin dan sangat nyaman dipakai seharian.",
  keywords: ["KALM", "boxy fit", "cotton combed", "premium fashion", "heavyweight tee", "kaos premium"],
  authors: [{ name: "KALM Studio" }],
  creator: "KALM Studio",
  publisher: "KALM Studio",
  openGraph: {
    title: "KALM Studio - Premium Boxy Fit Fashion",
    description: "Heavyweight Cotton Combed 20s - Premium 200+ GSM. Potongan boxy fit yang kokoh.",
    url: "https://kalm-studio.vercel.app",
    siteName: "KALM Studio",
    images: [
      {
        url: "/images/kaos_hitam.jpg",
        width: 1200,
        height: 1600,
        alt: "KALM Studio Premium Boxy Tee",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KALM Studio - Premium Boxy Fit Fashion",
    description: "Heavyweight Cotton Combed 20s - Premium 200+ GSM",
    images: ["/images/kaos_hitam.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
