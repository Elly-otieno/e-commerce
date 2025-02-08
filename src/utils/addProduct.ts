import { Product } from "../types/types";

export async function addProduct(product: Omit<Product, "id">): Promise<Product> {
    try {
      const response = await fetch('https://fakestoreapi.com/products', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to add product. Status: ${response.status}, Message: ${errorText}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error adding product:", error);
      throw error;
    }
  }