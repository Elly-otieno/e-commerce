import { Link } from "react-router";
import { useCart } from "../../hooks/useCart";
import { ArrowLeftSquare } from "lucide-react";
import Button from "./Button";
import ItemContent from "./ItemContent";
import { formatPrice } from "../../utils/formatPrice";

const CartClient = () => {
  const { cartProducts, handleClearCart, cartTotalAmount } = useCart();

  if (!cartProducts || cartProducts.length === 0) {
    return (
      <div className="flex flex-col items-center w-full">
        <div className="text-3xl">Your cart is empty</div>
        <div className="flex ">
          <Link
            to={"/"}
            className="flex text-slate-500 items-center gap-1 mt-2"
          >
            <ArrowLeftSquare className="text-teal-500" size={24} />
            <span>Start Shopping</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h1 className="text-slate-500 font-bold text-3xl text-center mt-8 mb-4">
        Shopping Cart
      </h1>
      <div className="grid grid-cols-5 gap-4 pb-2 items-center">
        <div className="col-span-2 justify-self-start">PRODUCT</div>
        <div className="justify-self-start">PRICE</div>
        <div className="justify-self-start">QUANTITY</div>
        <div className="justify-self-end">TOTAL</div>
      </div>
      <div>
        {cartProducts &&
          cartProducts.map((item) => {
            return <ItemContent key={item.id} item={item} />;
          })}
      </div>
      <div className="border-t-[1.5px] border-slate-200 py-4 flex justify-between gap-4">
        <div className="w-[90px]">
          <Button label="Clear Cart" custom="cursor-pointer" onclick={() => {     
            handleClearCart();
          }} small outline />
        </div>
        <div className="text-sm flex flex-col gap-1 items-start">
          <div className="flex justify-between w-full text-base font-semibold">
            <span>Subtotal</span>
            <span>{formatPrice(cartTotalAmount)}</span>
          </div>
          <p className="text-slate-500">
            Taxes and shipping calculated at checkout
          </p>
          <Button
            label="Checkout"
            onclick={() => {
                
            }}
          />
          <Link
            to={"/"}
            className="flex text-slate-500 items-center gap-1 mt-2"
          >
            <ArrowLeftSquare className="text-teal-500" size={24} />
            <span>Continue Shopping</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartClient;
