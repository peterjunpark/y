import React from "react";
import { Header } from "@/components/layout/header";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header title="Home" />
      {children}
    </>
  );
}
