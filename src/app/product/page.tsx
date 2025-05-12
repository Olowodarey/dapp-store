"use client";

import React from "react";
import { STORE_ABI } from "@/constants/abi";
import { STORE_CONTRACT_ADDRESS } from "@/constants";
import { useReadContract } from "@starknet-react/core";
import { useContract } from "@starknet-react/core";
import { shortString } from "starknet";
import { useEffect, useState } from "react";
import ItemCard from "@/components/ItemsCard";

type Item = {
  productname: string;
  price: number;
  quantity: number;
  // imageUrl?: string;
};

const Page = () => {
  const [items, setItems] = useState<Item[]>([]);

  const { contract } = useContract({
    abi: STORE_ABI,
    address: STORE_CONTRACT_ADDRESS,
  });

  const { data, isFetching, error } = useReadContract({
    abi: STORE_ABI,
    address: STORE_CONTRACT_ADDRESS,
    functionName: "get_all_items",
    args: [],
  });

  useEffect(() => {
    if (data && Array.isArray(data)) {
      const result = data.map((item) => ({
        productname: shortString.decodeShortString(item.productname.toString()),
        price: Number(item.price),
        quantity: Number(item.quantity),
        // imageUrl:
      }));

      setItems(result);
    }
  }, [data]);

  return (
    <div className="bg-gray-900 min-h-screen p-5 text-white">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-3">Our Products</h1>
        <p className="text-lg text-gray-400">
          Browse our selection of high-quality products.
        </p>
      </div>

      <div className="flex justify-center flex-wrap gap-5">
        {isFetching ? (
          <div className="w-full text-center py-10">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-2"></div>
            <p className="text-gray-400">Loading products...</p>
          </div>
        ) : error ? (
          <div className="w-full text-center py-10 text-red-500">
            <p className="text-xl mb-2">Error</p>
            <p>{error.message}</p>
          </div>
        ) : (
          items.map((item, index) => <ItemCard key={index} item={item} />)
        )}
      </div>
    </div>
  );
};

export default Page;
