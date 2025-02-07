// import React, { useState, useEffect } from "react";
// import { Link } from "react-router";
// import { Heart, Eye, ShoppingCart } from "lucide-react";

// // Define the Product interface
// interface Product {
//   id: number;
//   title: string;
//   price: number;
//   description: string;
//   category: string;
//   image: string;
//   rating: {
//     rate: number;
//     count: number;
//   };
//   discountPercentage?: number; // Make discountPercentage optional
// }

// const Featured: React.FC = () => {
//   // Use React.FC for type safety
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<Error | null>(null);
//   const [countdown, setCountdown] = useState<number>(
//     3 * 24 * 3600 + 23 * 3600 + 19 * 60 + 56
//   );

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await fetch("https://fakestoreapi.com/products");
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data: Product[] = await response.json(); // Type the response data

//         // Simulate discounts (with type safety)
//         const discountedProducts = data.map(
//           (product): Product => ({
//             ...product,
//             discountPercentage: Math.floor(Math.random() * 40) + 10,
//           })
//         );

//         setProducts(discountedProducts);
//       } catch (err: any) {
//         setError(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const formatCountdown = (seconds: number) => {
//     const days = Math.floor(seconds / (3600 * 24));
//     const hours = Math.floor((seconds % (3600 * 24)) / 3600);
//     const minutes = Math.floor((seconds % 3600) / 60);
//     const remainingSeconds = seconds % 60;
//     return `${days.toString().padStart(2, "0")}d ${hours
//       .toString()
//       .padStart(2, "0")}h ${minutes
//       .toString()
//       .padStart(2, "0")}m ${remainingSeconds.toString().padStart(2, "0")}s`;
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCountdown((prevCountdown) => prevCountdown - 1);
//       if (countdown <= 0) {
//         clearInterval(interval);
//         // Handle countdown end (e.g., refresh products)
//       }
//     }, 1000);

//     return () => clearInterval(interval); // Clean up on unmount
//   }, [countdown]);

//   if (loading) {
//     return <div className="text-center py-8">Loading Flash Sales...</div>;
//   }

//   if (error) {
//     return (
//       <div className="text-center py-8 text-red-500">
//         Error: {error.message}
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto py-12">
//       <div className="flex justify-between items-center mb-8">
//         <h2 className="text-2xl font-semibold">
//           <span className="bg-red-500 text-white px-2 py-1 rounded-md mr-2">
//             Today's
//           </span>{" "}
//           Flash Sales
//         </h2>
//         <div className="text-lg font-medium">
//           {formatCountdown(countdown > 0 ? countdown : 0)}
//         </div>
//       </div>

//       <div className="flex flex-wrap -mx-4">
//         {products.map((product: Product) => (
//           <div
//             key={product.id}
//             className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 mb-8"
//           >
//             <div className="bg-white rounded-lg shadow-md relative">
//               {product.discountPercentage && ( // Only render if discountPercentage exists
//                 <span className="absolute top-4 left-4 bg-red-500 text-white text-sm px-2 py-1 rounded-md">
//                   -{product.discountPercentage}%
//                 </span>
//               )}

//               <Link to={`/product/${product.id}`}>
//                 {" "}
//                 {/* Link to product details */}
//                 <img
//                   src={product.image}
//                   alt={product.title}
//                   className="w-full h-48 object-contain rounded-t-lg p-4"
//                 />
//               </Link>

//               <div className="p-6">
//                 <h3 className="text-lg font-medium mb-2 line-clamp-2">
//                   {product.title}
//                 </h3>

//                 <div className="flex items-center justify-between mb-4">
//                   <div>
//                     <span className="text-gray-600 line-through mr-2">
//                       $
//                       {
//                         product.discountPercentage
//                           ? (
//                               product.price *
//                               (100 / (100 - product.discountPercentage))
//                             ).toFixed(2)
//                           : product.price.toFixed(2) // Original price if no discount
//                       }
//                     </span>
//                     <span className="text-lg font-semibold">
//                       ${product.price.toFixed(2)}
//                     </span>
//                   </div>

//                   <button className="text-gray-600 hover:text-gray-900 focus:outline-none">
//                     <Eye className="h-6 w-6" /> {/* Use Eye icon from Lucide */}
//                   </button>
//                   <button className="text-gray-600 hover:text-gray-900 focus:outline-none">
//                     <Heart className="h-6 w-6" />{" "}
//                     {/* Use Heart icon from Lucide */}
//                   </button>
//                 </div>
//                 <button className="bg-red-500 text-white px-4 py-2 rounded-md w-full hover:bg-red-600 focus:outline-none flex items-center justify-center">
//                   <ShoppingCart className="h-5 w-5 mr-2" />{" "}
//                   {/* Use ShoppingCart icon */}
//                   Add To Cart
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="text-center mt-8">
//         <button className="bg-gray-200 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-300 focus:outline-none">
//           View All Products
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Featured;

import React, { useState, useEffect } from "react";
import { getProducts } from "../../utils/getProducts";
import ProductCard from "../general/ProductCard";
import { Product } from "../../types/types";


const Featured = () => {
  const [products, setProducts] = useState<Product[] | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();

        if (!data || !Array.isArray(data)) {
          console.error("Invalid data received from getProducts():", data);
          return;
        }

        setProducts(data);
        console.log('111111111', products);
        
      } catch (error) {
        console.error("Error fetching product images:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="grid grid-cols-2 my-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {products && products.length > 0 ? (
        products.map((product) => (
          <div key={product.id}>
            <ProductCard product={product}/>
          </div>
        ))
      ) : (
        <div>Loading products...</div> 
      )}
    </div>
  );
};

export default Featured;

