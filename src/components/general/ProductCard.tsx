import React from "react";
import { truncateText } from "../../utils/truncateText";
import { formatPrice } from "../../utils/formatPrice";
import { Link } from "react-router";
import Rating from "./Rating";

interface ProductCardProps {
  product: any;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="col-span-1 cursor-pointer border-[1.2px] border-slate-200 bg-slate-50 rounded-sm p-2 transition hover:scale-105 text-center text-sm">
        <Link to={`/products/${product.id}`}>
            <div className="flex flex-col items-center w-full gap-1">
            <div className="aspect-square overflow-hidden relative w-full">
              <img
                src={product.image}
                alt={product.name}
                className="object-contain w-full h-full"
              />
            </div>
            <div className="mt-4">{truncateText(product.title)}</div>
            <Rating number={product.rating.rate}/> {/* Display stars */}
            <div>{product.rating.count} reviews</div>
            <div className="font-semibold">{formatPrice(product.price)}</div>
          </div>
        </Link>
    </div>
  );
};

export default ProductCard;
