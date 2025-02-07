import { Product } from "../types/types";

export async function getProducts(): Promise<Product[]> {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }
    const data: Product[] = await response.json(); 
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}