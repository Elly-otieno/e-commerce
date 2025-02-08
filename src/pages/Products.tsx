import { useState, useEffect } from "react";
import { getProducts } from "../utils/getProducts";
import ProductCard from "../components/general/ProductCard";
import { Product } from "../types/types";


const Products = () => {
  const [products, setProducts] = useState<Product[] | null>(
    JSON.parse(localStorage.getItem("products") || "null")
  );

  useEffect(() => {
    const fetchProducts = async () => {
      if (products) return; // If products exist, don't fetch again

      try {
        const data = await getProducts();

        if (!data || !Array.isArray(data)) {
          console.error("Invalid data received from getProducts():", data);
          return;
        }

        setProducts(data);
        localStorage.setItem("products", JSON.stringify(data)); // Save in localStorage
      } catch (error) {
        console.error("Error fetching product images:", error);
      }
    };

    fetchProducts();
  }, [products]); // Depend on products to prevent refetching

  return (
    <div className="grid grid-cols-2 my-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
      {products && products.length > 0 ? (
        products.map((product) => (
          <div key={product.id}>
            <ProductCard product={product} />
          </div>
        ))
      ) : (
        <div>Loading products...</div>
      )}
    </div>
  );
};

export default Products;


