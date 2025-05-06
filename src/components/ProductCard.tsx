"use client";
import React from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { ShoppingCart, Eye } from "lucide-react";
import Link from "next/link";

export interface Product {
  productname: string;
  price: number;
  quantity: number;
}

interface ProductCardProps {
  product: Product;
  onAddToCart?: () => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  // Convert felt252 productname to readable string
  const productName = product.productname.toString();
  
  return (
    <div className="group relative overflow-hidden rounded-lg border bg-background shadow-md transition-all hover:shadow-lg">
      <div className="aspect-square overflow-hidden bg-muted">
        {/* Placeholder image - replace with actual product images when available */}
        <div className="h-full w-full bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center">
          <span className="text-4xl font-bold text-indigo-500 opacity-30">
            {productName.substring(0, 2).toUpperCase()}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-medium text-lg truncate">{productName}</h3>
        <div className="mt-1 flex items-center justify-between">
          <p className="font-semibold text-primary">{product.price} ETH</p>
          <p className="text-sm text-muted-foreground">
            Stock: {product.quantity}
          </p>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <Link href={`/product/${encodeURIComponent(product.productname)}`} passHref>
            <Button variant="outline" className="w-full">
              <Eye className="mr-2 h-4 w-4" />
              See Details
            </Button>
          </Link>
          <Button
            onClick={onAddToCart}
            className="w-full"
            disabled={product.quantity <= 0}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
