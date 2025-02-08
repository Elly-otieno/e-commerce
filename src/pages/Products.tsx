import { useState, useEffect } from "react";
import { getProducts } from "../utils/getProducts";
import ProductCard from "../components/general/ProductCard";
import { Product } from "../types/types";

const categories = [
  "All",
  "Electronics",
  "Jewelery",
  "Men's clothing",
  "Women's clothing",
];

const Products = () => {
  const [products, setProducts] = useState<Product[] | null>(
    JSON.parse(localStorage.getItem("products") || "null")
  );
  const [filteredProducts, setFilteredProducts] = useState<Product[] | null>(
    products
  );
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    const fetchProducts = async () => {
      if (products) return;

      try {
        const data = await getProducts();
        if (!data || !Array.isArray(data)) {
          console.error("Invalid data received from getProducts():", data);
          return;
        }

        setProducts(data);
        setFilteredProducts(data);
        localStorage.setItem("products", JSON.stringify(data));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [products]);

  useEffect(() => {
    if (!products) return;

    if (selectedCategory === "All") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) =>
          product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
      setFilteredProducts(filtered);
    }
  }, [selectedCategory, products]);

  return (
    <div className="p-4">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-4 justify-center mb-6" data-aos="fade-in">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-md text-sm sm:text-base transition ${
              selectedCategory === category
                ? "bg-slate-800 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6" data-aos="zoom-in">
        {filteredProducts && filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No products found.
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
