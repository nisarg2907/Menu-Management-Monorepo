"use client";
import React from "react";
import { SidebarProvider, useSidebar } from "../context/SidebarContext";
import Sidebar from "../components/Sidebar";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SidebarProvider>
          <ContentWrapper>{children}</ContentWrapper>
        </SidebarProvider>
      </body>
    </html>
  );
}

const ContentWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // const { isSidebarOpen } = useSidebar();

  return (
    <div className="flex max-h-screen">
      <Sidebar />
      <main
        className={`overflow-y-auto flex-1`}
      >
        {children}
      </main>
    </div>
  );
};
