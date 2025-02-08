import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getProductById } from "../utils/getProductById";
import { Product } from "../types/types";
import ProductDetails from "../components/general/ProductDetails";

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true); 

  useEffect(() => {
    const findProduct = async () => {
      if (!id) return;

      const productId = Number(id);
      if (isNaN(productId)) {
        console.error("Invalid product ID");
        setLoading(false);
        return;
      }

      try {
        setLoading(true); 
        const data = await getProductById(productId);
        if (data && typeof data === "object") {
          setProduct(data);
        } else {
          throw new Error("Invalid product data received.");
        }
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false); 
      }
    };

    findProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold">Loading product...</p>
      </div>
    );
  }

  return (
    <div>
      {product ? (
        <ProductDetails product={product} />
      ) : (
        <p className="text-center text-red-500">Product not found.</p>
      )}
    </div>
  );
};

export default SingleProduct;
