import "./globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata = {
  title: "Altimetrik Career Path",
  description: "AI-Driven Career Path Navigator for Software Engineers",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-slate-50 font-sans text-black antialiased dark:bg-black dark:text-white",
          inter.variable,
        )}
      >
          {children}
      </body>
    </html>
  );
}
