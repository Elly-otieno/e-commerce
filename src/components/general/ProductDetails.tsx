import { useCallback, useState, useEffect } from "react";
import Rating from "./Rating";
import Horizontal from "./Horizontal";
import { CartProductType } from "../../types/types";
import SetQuantity from "./SetQuantity";
import Button from "./Button";
import ProductImage from "./ProductImage";
import { useCart } from "../../hooks/useCart";
import { CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router";

interface ProductDetailProps {
  product: any;
}

const ProductDetails: React.FC<ProductDetailProps> = ({ product }) => {

    if (!product) {
        return <div>Loading...</div>; // Show a loading state instead of crashing
      }

    const navigate = useNavigate();

  const { handleAddProductToCart, cartProducts } = useCart();
  const [ isProductInCart, setIsProductInCart ] = useState(false);

  // Initialize with null and update when product is available
  const [cartProduct, setCartProduct] = useState<CartProductType | null>(null);

  useEffect(() => {
    if (product) {
      setCartProduct({
        id: product.id,
        name: product.title,
        description: product.description,
        image: product.image,
        category: product.category,
        quantity: 1,
        price: product.price,
      });
    }
  }, [product]); // Re-run when `product` changes

  useEffect(()=>{
    setIsProductInCart(false)

    if(cartProducts){
        const existingIndex = cartProducts.findIndex((item)=> item.id === product.id)

        console.log('index', existingIndex);
        
        if (existingIndex > -1) {
            setIsProductInCart(true)
        }
    }
  },[cartProducts])

//   console.log("cartproduct", cartProduct);

  const handleQtyDecrease = useCallback(() => {
    if (cartProduct && cartProduct.quantity > 1) {
      setCartProduct((prev) => prev ? { ...prev, quantity: prev.quantity - 1 } : prev);
    }
  }, [cartProduct]);

  const handleQtyIncrease = useCallback(() => {
    if (cartProduct && cartProduct.quantity < 20) {
      setCartProduct((prev) => prev ? { ...prev, quantity: prev.quantity + 1 } : prev);
    }
  }, [cartProduct]);

//   console.log("[DEBUG]Cart Products", cartProducts);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      {cartProduct && <ProductImage product={product} cartProduct={cartProduct} />}
      <div className="flex flex-col gap-1 text-slate-500 text-sm justify-center">
        <h2 className="text-3xl font-medium text-slate-700">{product?.title}</h2>
        <div className="flex items-center gap-2">
          <Rating number={product?.rating?.rate} />
          <div className="mt-2">{product?.rating?.count} reviews</div>
        </div>
        <Horizontal />
        <div className="text-justify">{product?.description}</div>
        <Horizontal />
        <div>
          <span className="font-semibold">CATEGORY:</span> {product?.category}
        </div>
        <div className="text-teal-400">In stock</div>
        <Horizontal />
        {isProductInCart ? <>
            <p className="mb-2 text-slate-500 flex items-center gap-1">
                <CheckCircle2 size={20} className="text-teal-500"/>
                <span>Product Added to cart</span>
            </p>
            <div className="max-w-[400px]">
                <Button label="View Cart" outline onclick={()=> {
                    navigate('/cart')
                }}/>
            </div>
        </> : <>
            {cartProduct && (
          <>
            <SetQuantity
              cartProduct={cartProduct}
              handleQtyDecrease={handleQtyDecrease}
              handleQtyIncrease={handleQtyIncrease}
            />
            <Horizontal />
            <div className="max-w-[400px]">
              <Button label="Add to Cart" onclick={() => handleAddProductToCart(cartProduct)} />
            </div>
          </>
        )}
        </>}
        
      </div>
    </div>
  );
};

export default ProductDetails;
