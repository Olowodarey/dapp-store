import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getProductById } from "@/lib/products";
import { ShoppingCart } from "../shopping-cart";
import { AddToCartButton } from "./add-to-cart-button";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProductById(params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex items-center justify-between h-16 px-4 md:px-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-semibold"
          >
            <ShoppingBag className="h-6 w-6" />
            <span>E-Commerce Store</span>
          </Link>
          <nav className="flex gap-4 items-center">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                <LayoutDashboard className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
            </Link>
            <ShoppingCart />
          </nav>
        </div>
      </header>
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16">
            <div className="flex flex-col gap-4 md:gap-10">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 text-sm font-medium hover:underline"
              >
                <ShoppingBag className="h-4 w-4" />
                Back to Products
              </Link>
              <div className="aspect-square overflow-hidden rounded-lg border bg-muted relative">
                <Image
                  src={
                    product.imageUrl || "/placeholder.svg?height=600&width=600"
                  }
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="flex flex-col gap-4 md:gap-8 lg:gap-10">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold">{product.name}</h1>
                <div className="flex items-center gap-2">
                  {product.discountedPrice ? (
                    <>
                      <span className="text-2xl font-bold">
                        ${product.discountedPrice.toFixed(2)}
                      </span>
                      <span className="text-sm text-muted-foreground line-through">
                        ${product.price.toFixed(2)}
                      </span>
                    </>
                  ) : (
                    <span className="text-2xl font-bold">
                      ${product.price.toFixed(2)}
                    </span>
                  )}
                </div>
                <div className="text-sm text-muted-foreground">
                  {product.quantity > 0 ? (
                    <span className="text-green-600">In Stock</span>
                  ) : (
                    <span className="text-red-600">Out of Stock</span>
                  )}
                </div>
                <div className="prose max-w-none">
                  <p>{product.description || "No description available."}</p>
                </div>
              </div>
              <div className="space-y-4">
                <AddToCartButton product={product} />
                <Link href="/shop/checkout">
                  <Button variant="outline" className="w-full">
                    Proceed to Checkout
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} E-Commerce Store. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
