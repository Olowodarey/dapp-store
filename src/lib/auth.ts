import { cookies } from "next/headers";

// In a real app, you would use a proper auth library and database
// This is a simplified example for demonstration purposes

type User = {
  id: string;
  email: string;
  name: string;
  role: "owner" | "customer";
};

// Mock store owner for demo purposes
const STORE_OWNER: User = {
  id: "1",
  email: "owner@example.com",
  name: "Store Owner",
  role: "owner",
};

export async function login(email: string, password: string) {
  // In a real app, you would verify credentials against a database
  // For demo purposes, we'll accept a specific email/password
  if (email === "owner@example.com" && password === "password") {
    // Set a cookie to maintain the session
    cookies().set("auth-token", "owner-session-token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });
    return STORE_OWNER;
  }

  return null;
}

export async function logout() {
  cookies().delete("auth-token");
}

export async function getUser(): Promise<User | null> {
  const token = cookies().get("auth-token");

  // In a real app, you would verify the token and fetch the user
  // For demo purposes, we'll return the mock owner if the token exists
  if (token && token.value === "owner-session-token") {
    return STORE_OWNER;
  }

  return null;
}

export async function isStoreOwner() {
  const user = await getUser();
  return user?.role === "owner";
}
