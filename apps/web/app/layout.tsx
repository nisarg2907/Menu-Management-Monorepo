"use client";
import React from "react";
import { SidebarProvider } from "../context/SidebarContext";
import Sidebar from "../components/Sidebar";
import "./globals.css";
import { Toaster } from 'react-hot-toast';
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SidebarProvider>
          <Toaster  position="top-right" 
          reverseOrder={false} />
          <ContentWrapper>{children}</ContentWrapper>
        </SidebarProvider>
      </body>
    </html>
  );
}

const ContentWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
