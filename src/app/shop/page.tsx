import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { getAllProducts } from "@/lib/products";
import { ShoppingCart } from "./product/shopping-cart";

export default async function ShopPage() {
  const products = await getAllProducts();

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
      <main className="flex-1">
        <section className="py-12">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Our Products
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  Browse our selection of high-quality products.
                </p>
              </div>
            </div>

            {products.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <h3 className="mt-4 text-lg font-semibold">
                  No products available
                </h3>
                <p className="mb-4 mt-2 text-sm text-muted-foreground">
                  Check back later for new products.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {products.map((product) => (
                  <Card key={product.id} className="overflow-hidden">
                    <div className="aspect-square relative">
                      <Image
                        src={
                          product.imageUrl ||
                          "/placeholder.svg?height=400&width=400"
                        }
                        alt={product.name}
                        fill
                        className="object-cover transition-all hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="text-lg font-semibold">{product.name}</h3>
                      <div className="flex items-center gap-2 mt-2">
                        {product.discountedPrice ? (
                          <>
                            <span className="text-lg font-bold">
                              ${product.discountedPrice.toFixed(2)}
                            </span>
                            <span className="text-sm text-muted-foreground line-through">
                              ${product.price.toFixed(2)}
                            </span>
                          </>
                        ) : (
                          <span className="text-lg font-bold">
                            ${product.price.toFixed(2)}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                        {product.description || "No description available."}
                      </p>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Link
                        href={`/shop/product/${product.id}`}
                        className="w-full"
                      >
                        <Button className="w-full">View Details</Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
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
