import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/app/_provider/theme-provider";
import { CartProvider } from "@/components/cart-provider";
import { StarknetProvider } from "@/app/_provider/starknet-provider";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-Commerce Store",
  description: "A complete e-commerce solution",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StarknetProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <CartProvider>
              <Navbar />
              {children}
            </CartProvider>
          </ThemeProvider>
        </StarknetProvider>
      </body>
    </html>
  );
}
