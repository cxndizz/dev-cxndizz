import type { Metadata } from "next";
import { Inter, Noto_Sans_Thai, Prompt } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoThai = Noto_Sans_Thai({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-thai",
  display: "swap",
});

const prompt = Prompt({
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chakkria | Full Stack Developer",
  description:
    "พอร์ตโฟลิโอ Full Stack Developer ที่เน้นเขียนเว็บแอป Backend และระบบ Database ที่ใช้งานได้จริง",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={`${inter.variable} ${notoThai.variable} ${prompt.variable}`}>
      <body className="bg-void font-sans text-white">{children}</body>
    </html>
  );
}
