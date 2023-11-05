/* eslint-disable react/no-children-prop */
import React from "react";
import "./globals.css";
import type { Metadata } from "next";
import ContextProvider from "@/context/global/GlobalContextProvider";
import Home from "./page";
export const metadata: Metadata = {
  title: "ბონი",
  description: "შ.პ.ს ბონი CRM",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ContextProvider>
        <body className="bg-gradient-to-tl from-slate-800 via-black to-slate-900 min-h-screen bg-cover bg-no-repeat">
          <Home children={children} />
        </body>
      </ContextProvider>
    </html>
  );
}
