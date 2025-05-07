
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Header_Auth from "@/components/Header_Auth";


export default function WorkLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <body>
        <Header_Auth/>
        {children}
        <Footer></Footer>
      </body>
  );
}
