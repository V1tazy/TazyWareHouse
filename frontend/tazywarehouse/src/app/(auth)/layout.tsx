
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";


export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <body>
        <Header/>
        {children}
        <Footer></Footer>
      </body>
  );
}
