import { Product } from "../types/types";

export async function getProductById(id: number): Promise<Product | null> {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      if (!response.ok) {
        if (response.status === 404) {
          return null; // Return null if product not found (404)
        } else {
          const errorText = await response.text();
          throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }
      }
      const data: Product = await response.json(); 
      return data;
    } catch (error) {
      console.error("Error fetching product:", error);
      throw error; 
    }
  }