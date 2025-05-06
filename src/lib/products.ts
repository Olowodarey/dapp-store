export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  discountedPrice?: number;
  quantity: number;
  imageUrl?: string;
};

// Initialize with some sample products
let products: Product[] = [
  {
    id: "1",
    name: "Premium T-Shirt",
    description: "High-quality cotton t-shirt available in multiple colors.",
    price: 29.99,
    quantity: 100,
    imageUrl: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "2",
    name: "Wireless Headphones",
    description:
      "Noise-cancelling wireless headphones with 20-hour battery life.",
    price: 149.99,
    discountedPrice: 129.99,
    quantity: 50,
    imageUrl: "/placeholder.svg?height=300&width=300",
  },
  {
    id: "3",
    name: "Leather Wallet",
    description: "Genuine leather wallet with RFID protection.",
    price: 49.99,
    quantity: 75,
    imageUrl: "/placeholder.svg?height=300&width=300",
  },
];

// Get all products
export async function getAllProducts(): Promise<Product[]> {
  return [...products];
}

// Get a single product by ID
export async function getProductById(id: string): Promise<Product | undefined> {
  return products.find((product) => product.id === id);
}

// Add a new product
export async function addProduct(
  product: Omit<Product, "id">
): Promise<Product> {
  const newProduct = {
    ...product,
    id: Date.now().toString(), // Simple ID generation
  };

  products.push(newProduct);
  return newProduct;
}

// Update a product
export async function updateProduct(
  id: string,
  updates: Partial<Product>
): Promise<Product | null> {
  const index = products.findIndex((product) => product.id === id);

  if (index === -1) {
    return null;
  }

  products[index] = { ...products[index], ...updates };
  return products[index];
}

// Delete a product
export async function deleteProduct(id: string): Promise<boolean> {
  const initialLength = products.length;
  products = products.filter((product) => product.id !== id);
  return products.length < initialLength;
}

// Apply discount to a product
export async function applyDiscount(
  id: string,
  discountedPrice: number
): Promise<Product | null> {
  return updateProduct(id, { discountedPrice });
}

// Remove discount from a product
export async function removeDiscount(id: string): Promise<Product | null> {
  const product = products.find((p) => p.id === id);
  if (!product) return null;

  const { discountedPrice, ...rest } = product;
  return updateProduct(id, rest as Product);
}

// Update product quantity (for inventory management)
export async function updateInventory(
  id: string,
  quantity: number
): Promise<Product | null> {
  return updateProduct(id, { quantity });
}
