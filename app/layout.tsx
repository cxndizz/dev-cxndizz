import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chakkria | Full Stack Developer Portfolio",
  description:
    "พอร์ตโฟลิโอ Full Stack Developer ที่เน้นการพัฒนาเว็บแอป ระบบ backend และ product engineering ที่ใช้งานได้จริง",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className={`${inter.variable} bg-void font-sans text-white`}>
        {children}
      </body>
    </html>
  );
}
