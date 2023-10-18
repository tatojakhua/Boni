import React from "react";
import Restaurants from "./(pages)/restaurants/page";
import { Noto_Serif_Georgian } from "next/font/google";

const inter = Noto_Serif_Georgian({
  subsets: ["latin"],
  variable: "--font-note-serif-georgian",
  weight: "400",
});

export default function Home() {
  return (
    <main className={`${inter.variable} font-Noto_Serif_Georgian`}>
      <Restaurants />
    </main>
  );
}
