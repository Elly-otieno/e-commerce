import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { CartProductType } from "../types/types";
import { toast } from "react-hot-toast";

export type CartContextType = {
  cartTotalQty: number;
  cartTotalAmount: number;
  cartProducts: CartProductType[ ] | null;
  handleAddProductToCart: (product: CartProductType) => void;
  handleRemoveProductFromCart: (product: CartProductType) => void;
  handleCartQtyIncrease: (product: CartProductType) => void;
  handleCartQtyDecrease: (product: CartProductType) => void;
  handleClearCart: ()=> void;
};

export const CartContext = createContext<CartContextType | null>(null);

interface Props {
  [propName: string]: any;
}

export const CartContextProvider = (props: Props) => {
  const [cartTotalQty, setCartTotalQty] = useState(0);
  const [cartProducts, setCartProducts] = useState<CartProductType[]>([]);
  const [ cartTotalAmount, setCartTotalAmount ] = useState(0)


  console.log('[DEBUG] Qty', cartTotalQty);
  console.log('[DEBUG] Amount', cartTotalAmount);

  
  useEffect(() => {
    const cartItems = localStorage.getItem("eShopCartItems");
    const cProducts: CartProductType[] = cartItems ? JSON.parse(cartItems) : [];
    setCartProducts(cProducts);
  }, []);
  

  useEffect(()=>{
    const getTotals =() => {

        if (cartProducts) {
            const { total, qty } = cartProducts?.reduce((acc, item)=>{
                const itemTotal = item.price * item.quantity
    
                acc.total += itemTotal
                acc.qty +=item.quantity
    
                return acc
            },
             {
                total: 0,
                qty: 0
            })

            setCartTotalQty(qty)
            setCartTotalAmount(total)
        }
        
    }

    getTotals()
  },[cartProducts])

  const handleAddProductToCart = useCallback((product: CartProductType)=>{
    setCartProducts((prev) =>{
        let updatedCart;

        if(prev){
            updatedCart = [...prev, product]
        } else {
            updatedCart = [product]
        }
        toast.success('Product Added to cart')
        localStorage.setItem('eShopCartItems', JSON.stringify(updatedCart))
        return updatedCart;
    })
  },[])

  const handleRemoveProductFromCart = useCallback((
    product: CartProductType
  )=>{
    if (cartProducts) {
        const filteredProducts = cartProducts.filter((item)=>{
            return item.id !== product.id
        })

        setCartProducts(filteredProducts)

        toast.success('Product removed')
        localStorage.setItem('eShopCartItems', JSON.stringify(filteredProducts))
    }
  },[])

  const handleCartQtyIncrease = useCallback((product: CartProductType) => {
    setCartProducts((prevCart) => {
      if (!prevCart) return [];
  
      const updatedCart = [...prevCart];
      const existingIndex = updatedCart.findIndex((item) => item.id === product.id);
  
      if (existingIndex > -1) {
        if (updatedCart[existingIndex].quantity >= 20) {
          toast.error("Ooops! Maximum reached");
          return prevCart;
        }
        updatedCart[existingIndex] = {
          ...updatedCart[existingIndex],
          quantity: updatedCart[existingIndex].quantity + 1,
        };
      }
  
      localStorage.setItem("eShopCartItems", JSON.stringify(updatedCart));
      return updatedCart;
    });
  }, []);

  const handleCartQtyDecrease = useCallback((product: CartProductType) => {
    setCartProducts((prevCart) => {
      if (!prevCart) return []; // Prevents null errors
  
      const updatedCart = [...prevCart];
      const existingIndex = updatedCart.findIndex((item) => item.id === product.id);
  
      if (existingIndex > -1) {
        if (updatedCart[existingIndex].quantity === 1) {
          // Remove item from cart instead of clearing the cart
          const filteredCart = updatedCart.filter((item) => item.id !== product.id);
          localStorage.setItem("eShopCartItems", JSON.stringify(filteredCart));
          toast.success("Product removed from cart");
          return filteredCart;
        }
  
        updatedCart[existingIndex] = {
          ...updatedCart[existingIndex],
          quantity: updatedCart[existingIndex].quantity - 1,
        };
      }
  
      localStorage.setItem("eShopCartItems", JSON.stringify(updatedCart));
      return updatedCart;
    });
  }, []);
  

  const handleClearCart = useCallback(() => {
    setCartProducts([]);
    setCartTotalQty(0);
    setCartTotalAmount(0);
    localStorage.setItem("eShopCartItems", JSON.stringify([]));
  }, []);
  

  const value = {
    cartTotalQty,
    cartTotalAmount,
    cartProducts,
    handleAddProductToCart,
    handleRemoveProductFromCart,
    handleCartQtyIncrease,
    handleCartQtyDecrease,
    handleClearCart
  };

  return <CartContext.Provider value={value} {...props} />;
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (context === null) {
    throw new Error(" useCart must be used within a CartContextProvider");
  }

  return context;
};
