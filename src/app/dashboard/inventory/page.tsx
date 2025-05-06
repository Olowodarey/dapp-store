import Image from "next/image";
import Link from "next/link";
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
import { updateInventoryAction } from "./actions";

export default async function InventoryPage() {
  const products = await getAllProducts();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          Inventory Management
        </h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Stock Levels</CardTitle>
          <CardDescription>
            Update inventory quantities for your products
          </CardDescription>
        </CardHeader>
        <CardContent>
          {products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <h3 className="mt-4 text-lg font-semibold">No products yet</h3>
              <p className="mb-4 mt-2 text-sm text-muted-foreground">
                Add products before managing inventory.
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
                  <TableHead>Current Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Update Quantity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => {
                  let stockStatus = "In Stock";
                  let statusColor = "text-green-600";

                  if (product.quantity === 0) {
                    stockStatus = "Out of Stock";
                    statusColor = "text-red-600";
                  } else if (product.quantity < 10) {
                    stockStatus = "Low Stock";
                    statusColor = "text-amber-600";
                  }

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
                      <TableCell>{product.quantity}</TableCell>
                      <TableCell className={statusColor}>
                        {stockStatus}
                      </TableCell>
                      <TableCell>
                        <form
                          action={updateInventoryAction}
                          className="flex items-center gap-2"
                        >
                          <input
                            type="hidden"
                            name="productId"
                            value={product.id}
                          />
                          <input
                            type="number"
                            name="quantity"
                            className="w-20 h-9 rounded-md border border-input bg-background px-3 py-1 text-sm"
                            min="0"
                            step="1"
                            placeholder="Qty"
                            defaultValue={product.quantity}
                            required
                          />
                          <Button variant="outline" size="sm" type="submit">
                            Update
                          </Button>
                        </form>
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
