"use client"
import { SidebarProvider } from "../context/SidebarContext";
import Sidebar from "../components/Sidebar";
import "./globals.css";
// import { cn } from "../lib/utils";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
<html lang="en">
      <body>
        <SidebarProvider>
          <div className="flex p-4 max-h-screen">
            <Sidebar />
            <main className="flex-1 max-h-screen">
              {children}
            </main>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
