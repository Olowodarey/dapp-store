import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAllProducts } from "@/lib/products";
import { applyDiscountAction, removeDiscountAction } from "./actions";

export default async function DiscountsPage() {
  const products = await getAllProducts();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          Discount Management
        </h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product Discounts</CardTitle>
          <CardDescription>
            Apply or remove discounts for your products
          </CardDescription>
        </CardHeader>
        <CardContent>
          {products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <h3 className="mt-4 text-lg font-semibold">No products yet</h3>
              <p className="mb-4 mt-2 text-sm text-muted-foreground">
                Add products before managing discounts.
              </p>
              <Link href="/dashboard/products/new">
                <Button>Add Product</Button>
              </Link>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Regular Price</TableHead>
                  <TableHead>Discounted Price</TableHead>
                  <TableHead>Discount</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => {
                  const hasDiscount = !!product.discountedPrice;
                  const discountPercentage = hasDiscount
                    ? Math.round(
                        ((product.price - product.discountedPrice!) /
                          product.price) *
                          100
                      )
                    : 0;

                  return (
                    <TableRow key={product.id}>
                      <TableCell className="flex items-center gap-3">
                        <div className="h-10 w-10 relative overflow-hidden rounded-md">
                          <Image
                            src={
                              product.imageUrl ||
                              "/placeholder.svg?height=40&width=40"
                            }
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span className="font-medium">{product.name}</span>
                      </TableCell>
                      <TableCell>${product.price.toFixed(2)}</TableCell>
                      <TableCell>
                        {hasDiscount
                          ? `$${product.discountedPrice!.toFixed(2)}`
                          : "No discount"}
                      </TableCell>
                      <TableCell>
                        {hasDiscount ? `${discountPercentage}% off` : "—"}
                      </TableCell>
                      <TableCell>
                        {hasDiscount ? (
                          <form action={removeDiscountAction}>
                            <input
                              type="hidden"
                              name="productId"
                              value={product.id}
                            />
                            <Button variant="outline" size="sm" type="submit">
                              Remove Discount
                            </Button>
                          </form>
                        ) : (
                          <form
                            action={applyDiscountAction}
                            className="flex items-center gap-2"
                          >
                            <input
                              type="hidden"
                              name="productId"
                              value={product.id}
                            />
                            <input
                              type="number"
                              name="discountedPrice"
                              className="w-20 h-9 rounded-md border border-input bg-background px-3 py-1 text-sm"
                              min="0.01"
                              max={product.price - 0.01}
                              step="0.01"
                              placeholder="Price"
                              required
                            />
                            <Button variant="outline" size="sm" type="submit">
                              Apply
                            </Button>
                          </form>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
