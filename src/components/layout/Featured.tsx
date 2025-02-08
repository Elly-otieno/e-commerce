import { useState, useEffect } from "react";
import { getProducts } from "../../utils/getProducts";
import ProductCard from "../general/ProductCard";
import { Product } from "../../types/types";
import { useNavigate } from "react-router";
import Button from "../general/Button";
import { ArrowRight } from "lucide-react";

const INITIAL_COUNTDOWN = 14 * 24 * 3600 + 23 * 3600 + 19 * 60 + 56;

const Featured = () => {
  const [products, setProducts] = useState<Product[] | null>(
    JSON.parse(localStorage.getItem("products") || "null")
  );
  const [randomProducts, setRandomProducts] = useState<Product[]>([]);
  const [countdown, setCountdown] = useState<number>(() => {
    const storedTime = localStorage.getItem("flashSaleEndTime");
    if (storedTime) {
      const remainingTime = Math.floor(
        (parseInt(storedTime) - Date.now()) / 1000
      );
      return remainingTime > 0 ? remainingTime : INITIAL_COUNTDOWN;
    }
    return INITIAL_COUNTDOWN;
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      if (!products) {
        try {
          const data = await getProducts();

          if (!data || !Array.isArray(data)) {
            console.error("Invalid data received:", data);
            return;
          }

          setProducts(data);
          localStorage.setItem("products", JSON.stringify(data));
          updateRandomProducts(data);
        } catch (error) {
          console.error("Error fetching product images:", error);
        }
      } else {
        updateRandomProducts(products);
      }
    };

    fetchProducts();
  }, [products]);

  const updateRandomProducts = (allProducts: Product[]) => {
    const shuffled = allProducts.sort(() => 0.5 - Math.random()); // Shuffle the array
    setRandomProducts(shuffled.slice(0, 6)); // Pick first 6 items
  };

  const formatCountdown = (seconds: number) => {
    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${days.toString().padStart(2, "0")}d ${hours
      .toString()
      .padStart(2, "0")}h ${minutes
      .toString()
      .padStart(2, "0")}m ${remainingSeconds.toString().padStart(2, "0")}s`;
  };

  useEffect(() => {
    if (countdown <= 0) return;

    const interval = setInterval(() => {
      setCountdown((prevCountdown) => {
        const newCountdown = prevCountdown - 1;
        if (newCountdown <= 0) {
          clearInterval(interval);
          localStorage.removeItem("flashSaleEndTime");
        }
        return newCountdown;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [countdown]);

  useEffect(() => {
    if (countdown > 0) {
      localStorage.setItem(
        "flashSaleEndTime",
        (Date.now() + countdown * 1000).toString()
      );
    }
  }, [countdown]);

  return (
    <div  data-aos="fade-up">
      <div className="flex justify-between items-center my-8">
        <h2 className="text-2xl font-semibold">
          <span className="bg-red-500 text-white px-2 py-1 rounded-md mr-2">
            Today's
          </span>{" "}
          Flash Sales
        </h2>
        <div className="text-lg font-medium">
          {formatCountdown(countdown > 0 ? countdown : 0)}
        </div>
      </div>
      <div className="grid grid-cols-2 my-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {randomProducts.length > 0 ? (
          randomProducts.map((product) => (
            <div key={product.id}>
              <ProductCard product={product} />
            </div>
          ))
        ) : (
          <div className="flex text-center justify-center text-slate-800">Loading products...</div>
        )}
      </div>
      <div className="flex justify-center mt-6">
        <Button
          label="View more products"
          onclick={() => navigate("/products")}
          custom="max-w-[300px] mb-6 cursor-pointer"
          icon={ArrowRight}
        />
      </div>
    </div>
  );
};

export default Featured;
