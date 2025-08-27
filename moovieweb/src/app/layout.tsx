import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ContextProvider from './ContextProvider';
import TestEnv from './test-env'; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Movie App",
  description: "A dynamic movie website using TMDB API",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geistSans.variable}>
      <body>
        <ContextProvider>
          {children}
          <TestEnv /> 
        </ContextProvider>
      </body>
    </html>
  );
}