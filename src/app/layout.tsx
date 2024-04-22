import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google"
import "./globals.css";
 
import { cn } from "@/lib/utils"
 
const fontSans = FontSans
({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = 
{
  title: "The Artwork of Reuban Hale",
  description: "Artwork Management System for The Artwork of Reuban Hale, Inc.",
  icons: {
    icon: "./favicon.ico",
  },
};

export default function RootLayout
({children,}: Readonly<{children: React.ReactNode;}>) 
{
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        ...
      </body>
    </html>
  )
}