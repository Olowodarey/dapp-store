"use server";

import { revalidatePath } from "next/cache";
import { isStoreOwner } from "@/lib/auth";
import { updateInventory } from "@/lib/products";

export async function updateInventoryAction(formData: FormData) {
  // Verify user is store owner
  const isOwner = await isStoreOwner();
  if (!isOwner) {
    throw new Error("Unauthorized");
  }

  const productId = formData.get("productId") as string;
  const quantityStr = formData.get("quantity") as string;

  if (!productId || !quantityStr) {
    throw new Error("Product ID and quantity are required");
  }

  const quantity = Number.parseInt(quantityStr);

  if (isNaN(quantity) || quantity < 0) {
    throw new Error("Quantity must be a non-negative number");
  }

  await updateInventory(productId, quantity);

  revalidatePath("/dashboard/inventory");
  revalidatePath("/dashboard/products");
  revalidatePath("/shop");
}
