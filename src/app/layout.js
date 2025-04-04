import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Devstore",
  default: "Devstore",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt" className={inter.variable}>
      <body
        className={`
          ${geistMono.variable} 
          antialiased 
          bg-zinc-950 
          text-zinc-50
        `}
      >
        {children}
      </body>
    </html>
  );
}
