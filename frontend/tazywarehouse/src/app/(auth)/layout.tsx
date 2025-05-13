
import React from "react";
import Footer from "@/components/Footer";
import { Providers } from "@/components/Providers";


export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
              {children}
          <Footer></Footer>
    </Providers>
  );
}
