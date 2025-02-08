export type CartProductType = {
    id: number,
    name: string,
    description: string,
    image: string,
    category: string,
    quantity: number,
    price: number,
}


export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
      rate: number;
      count: number;
    };
    discountPercentage?: number;
  }


  export interface Order {
    id: number;
    customerName: string;
    totalPrice: number;
    status: "Processing" | "Shipped";
  }