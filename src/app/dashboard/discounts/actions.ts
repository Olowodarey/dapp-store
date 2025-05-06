"use server";

import { revalidatePath } from "next/cache";
import { isStoreOwner } from "@/lib/auth";
import { applyDiscount, removeDiscount } from "@/lib/products";

export async function applyDiscountAction(formData: FormData) {
  // Verify user is store owner
  const isOwner = await isStoreOwner();
  if (!isOwner) {
    throw new Error("Unauthorized");
  }

  const productId = formData.get("productId") as string;
  const discountedPriceStr = formData.get("discountedPrice") as string;

  if (!productId || !discountedPriceStr) {
    throw new Error("Product ID and discounted price are required");
  }

  const discountedPrice = Number.parseFloat(discountedPriceStr);

  if (isNaN(discountedPrice) || discountedPrice <= 0) {
    throw new Error("Discounted price must be a positive number");
  }

  await applyDiscount(productId, discountedPrice);

  revalidatePath("/dashboard/discounts");
  revalidatePath("/dashboard/products");
  revalidatePath("/shop");
}

export async function removeDiscountAction(formData: FormData) {
  // Verify user is store owner
  const isOwner = await isStoreOwner();
  if (!isOwner) {
    throw new Error("Unauthorized");
  }

  const productId = formData.get("productId") as string;

  if (!productId) {
    throw new Error("Product ID is required");
  }

  await removeDiscount(productId);

  revalidatePath("/dashboard/discounts");
  revalidatePath("/dashboard/products");
  revalidatePath("/shop");
}
