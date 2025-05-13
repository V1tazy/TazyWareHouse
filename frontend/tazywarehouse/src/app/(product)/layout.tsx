
import React from "react";
import Footer from "@/components/Footer";
import { Header } from "@/components/Header";
import { Providers } from "@/components/Providers";


export default function WorkLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <Providers>
        <Header></Header>
        {children}
        <Footer></Footer>
        </Providers>
  );
}
