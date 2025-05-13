
import React from "react";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import { Providers } from "@/components/Providers";


export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
          <Header/>
              {children}
          <Footer></Footer>
    </Providers>
  );
}
