"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useContract } from "@starknet-react/core";
import { STORE_ABI } from "@/constants/abi";
import { STORE_CONTRACT_ADDRESS } from "@/constants";
import { useSendTransaction } from "@starknet-react/core";

type Item = {
  productname: string;
  price: number;
  quantity: number;
  // imageUrl?: string;
};

export default function NewProductPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const { sendAsync } = useSendTransaction({ calls: [] });

  const { contract } = useContract({
    abi: STORE_ABI,
    address: STORE_CONTRACT_ADDRESS,
  });

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    imageUrl: "/placeholder.svg?height=300&width=300",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // Validate form
      if (!formData.name || !formData.price || !formData.quantity) {
        throw new Error("Please fill in all required fields");
      }

      // Convert price and quantity to numbers
      const price = Number.parseFloat(formData.price);
      const quantity = Number.parseInt(formData.quantity);

      if (isNaN(price) || price <= 0) {
        throw new Error("Price must be a positive number");
      }

      if (isNaN(quantity) || quantity < 0) {
        throw new Error("Quantity must be a non-negative number");
      }

      // Prepare data for Starknet contract
      if (!contract) {
        throw new Error("Contract not initialized");
      }

      try {
        // Create the transaction call
        const call = contract.populate("add_item", [
          formData.name,  // productname
          price, // price as number
          quantity // quantity as number
        ]);

        // Send the transaction
        const response = await sendAsync([call]);

        console.log("Transaction submitted:", response);
        
        // Wait for transaction confirmation
        // Note: In a production app, you might want to implement a more robust transaction tracking system
        
        // Redirect to products page on success
        router.push("/product");
      } catch (txError) {
        console.error("Transaction error:", txError);
        throw new Error("Failed to add product to blockchain");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Add New Product</CardTitle>
          <CardDescription>
            Add a new product to your store catalog
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="name">Product Name *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price ($) *</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  min="0.01"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity *</Label>
                <Input
                  id="quantity"
                  name="quantity"
                  type="number"
                  min="0"
                  step="1"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="/placeholder.svg?height=300&width=300"
              />
              <p className="text-xs text-muted-foreground">
                Leave blank to use a placeholder image
              </p>
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Adding..." : "Add Product"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
