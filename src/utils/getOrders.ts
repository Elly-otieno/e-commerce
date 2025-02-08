import { Order } from "../types/types";

export async function getOrders(): Promise<Order[]> {
  try {
    const response = await fetch("https://fakestoreapi.com/carts");
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }
    const data: Order[] = await response.json(); 
    return data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
}