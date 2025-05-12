"use client";
import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { ShoppingBag, LayoutDashboard } from "lucide-react";
import Account from "@/components/connectwallet/Account";
import WalletConnectDialog from "@/components/connectwallet/WalletConnectDialog";

import { useState } from "react";
import { useAccount } from "@starknet-react/core";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isOpen, setIsOpen] = useState(false);

  const { account, isConnected } = useAccount();

  return (
    <header className="border-b w-full">
      <div className="container mx-auto flex items-center justify-between h-16 px-4 md:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold"
        >
          <ShoppingBag className="h-6 w-6" />
          <span>E-Commerce Store</span>
        </Link>
        <nav className="flex gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              <LayoutDashboard className="h-4 w-4 mr-2" />
              Dashboard
            </Button>
          </Link>

          <Link href="/product">
            <Button variant="ghost" size="sm">
              <ShoppingBag className="h-4 w-4 mr-2" />
              Products
            </Button>
          </Link>

          <div className="flex justify-center items-center">
            {isConnected && account ? (
              <Account />
            ) : (
              <button
                onClick={() => setIsOpen(true)}
                className="px-4 md:px-4 py-1 text-base md:text-lg font-bold bg-blue-600 rounded-full hover:opacity-90 transition-all duration-200"
              >
                Connect Wallet
              </button>
            )}
          </div>

          <WalletConnectDialog isOpen={isOpen} setIsOpen={setIsOpen} />
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
