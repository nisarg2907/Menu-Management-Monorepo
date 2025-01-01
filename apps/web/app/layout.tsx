"use client";
import React from "react";
import { SidebarProvider, useSidebar } from "../context/SidebarContext";
import Sidebar from "../components/Sidebar";
import "./globals.css";
import { Toaster } from 'react-hot-toast';
import useIsMobile from "../hooks/useMobile";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex-1 h-screen max-h-screen p-4">
        <SidebarProvider>
          <Toaster position="top-right" reverseOrder={false} />
          <ContentWrapper>{children}</ContentWrapper>
        </SidebarProvider>
      </body>
    </html>
  );
}

const ContentWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isSidebarOpen } = useSidebar();
  const isMobile = useIsMobile();

  const sidebarWidth = isSidebarOpen ? (isMobile ? '180px' : '240px') : '48px';
  const marginLeft = isSidebarOpen ? '0px' : '8px';

  return (
    <div className="flex flex-row h-full max-h-full">
      <div style={{ width: sidebarWidth }}>
        <Sidebar />
      </div>
      <main className="overflow-y-auto flex-1 " style={{ marginLeft }}>
        {children}
      </main>
    </div>
  );
};
