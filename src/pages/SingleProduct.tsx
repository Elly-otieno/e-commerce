import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getProductById } from "../utils/getProductById";
import { Product } from "../types/types";
import ProductDetails from "../components/general/ProductDetails";

const SingleProduct = () => {
  const { id } = useParams()
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const findProduct = async () => {
      try {
        const data = await getProductById(id);

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

  console.log(product);
  
  return <div>
    <ProductDetails product={product}/>
    {/* <div className="flex flex-col mt-20 gap-4">
        <div>Add Rating</div>
        <div>List</div>
    </div> */}
  </div>;
};

export default SingleProduct;
