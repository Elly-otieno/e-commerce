import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getProductById } from "../utils/getProductById";
import { Product } from "../types/types";
import ProductDetails from "../components/general/ProductDetails";

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const findProduct = async () => {
      if (!id) return; // Ensure id exists before proceeding

      try {
        const productId = Number(id);
        if (isNaN(productId)) throw new Error("Invalid product ID");

        const data = await getProductById(productId);

        if (!data || typeof data !== "object" || data === null) {
          throw new Error("Invalid product data received.");
        }

        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };

    findProduct();
  }, [id]);

  return (
    <div>
      <ProductDetails product={product} />
    </div>
  );
};

export default SingleProduct;
