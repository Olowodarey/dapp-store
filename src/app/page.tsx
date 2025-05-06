"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingBag, LayoutDashboard } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { useConnect, useContract, useReadContract } from "@starknet-react/core";
import { TODO_ABI } from "@/constants/abi";
import { STORE_CONTRACT_ADDRESS } from "@/constants";
import { shortString } from "starknet";
import ProductCard, { Product } from "@/components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Connect to the contract
  const { contract } = useContract({
    abi: TODO_ABI as any,
    address: STORE_CONTRACT_ADDRESS,
  });

  // Fetch all items from the contract
  const { data, isLoading, isError } = useReadContract({
    functionName: "get_all_items",
    // @ts-ignore - Ignoring type error for now
    args: [],
    contract,
  });

  useEffect(() => {
    if (data && !isLoading) {
      try {
        // Process the data from the contract
        const processedProducts = (data as any[]).map((item: any) => {
          return {
            productname: shortString.decodeShortString(
              item.productname.toString()
            ),
            price: Number(item.price),
            quantity: Number(item.quantity),
          };
        });
        setProducts(processedProducts);
        setLoading(false);
      } catch (err) {
        console.error("Error processing product data:", err);
        setError("Failed to process product data");
        setLoading(false);
      }
    } else if (isError) {
      setError("Failed to fetch products from the contract");
      setLoading(false);
    }
  }, [data, isLoading, isError]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 w-full">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Welcome to Our E-Commerce Store
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  Shop our latest products and manage your store all in one
                  place.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/shop">
                  <Button size="lg">
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Browse Products
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button variant="outline" size="lg">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Store Dashboard
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
