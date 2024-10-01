import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Image from "next/image";
import Logo from "@/public/images/logo.png";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const consolas = localFont({
  src: "@/public/fonts/Consolas-Regular.ttf",
  variable: "--font-consolas",
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Cyber Sense",
  description:
    "Uncover, Analyze, Secure: AI-driven insights from audit reports in real time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/images/favicon.ico" />
      </head>
      <body
        className={`${consolas.className} ${inter.variable} antialiased h-screen flex flex-col overflow-hidden`}
      >
        <header>
          <nav>
            <div className="border-b border-indigo-300 h-20 max-sm:h-16 max-md:h-[72px] flex justify-center items-center">
              <Image
                src={Logo}
                alt={"logo"}
                width={52}
                height={52}
                className="max-sm:w-[38px] max-md:w-[46px]"
              />
            </div>
          </nav>
        </header>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
