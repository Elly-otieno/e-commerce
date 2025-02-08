import { Link } from "react-router";
import { CartProductType } from "../../types/types";
import { formatPrice } from "../../utils/formatPrice";
import { truncateText } from "../../utils/truncateText";
import SetQuantity from "./SetQuantity";
import { useCart } from "../../hooks/useCart";

interface ItemContentProps {
  item: CartProductType;
}

const ItemContent: React.FC<ItemContentProps> = ({ item }) => {
    const { handleRemoveProductFromCart, handleCartQtyIncrease, handleCartQtyDecrease } = useCart()
  return (
    <div className="grid grid-cols-5 text-xs md:text-sm gap-4 border-t-[1.5px] py-4 items-center">
      <div className="col-span-2 justify-self-start flex gap-2 md:gap-4">
        <Link to={`/products/${item.id}`}>
          <div className="relative w-[70px] aspect-square">
            <img src={item.image} alt={item.name} className="object-contain"/>
          </div>
        </Link>
        <div className="flex flex-col justify-center">
          <Link to={`/products/${item.id}`}>{truncateText(item.name)}</Link>
          <div className="w-[70px]">
            <button className="underline text-slate-500" onClick={()=>handleRemoveProductFromCart(item)}>
                Remove
            </button>
          </div>
        </div>
      </div>
      <div className="font-semibold">{formatPrice(item.price)}</div>
      <div className="">
        <SetQuantity cartCounter={true} cartProduct={item} handleQtyDecrease={()=>{handleCartQtyDecrease(item)}} handleQtyIncrease={()=>{handleCartQtyIncrease(item)}} />
      </div>
      <div className="justify-self-end">
        {formatPrice(item.price * item.quantity)}
      </div>
    </div>
  );
};

export default ItemContent;
