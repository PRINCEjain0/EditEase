import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Navbar from "@/components/Navbar.jsx";

export const metadata: Metadata = {
  title: "Edit Aura",
  description: "Edit your images with ease",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="bg-gray-100">
          <Navbar />

          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
