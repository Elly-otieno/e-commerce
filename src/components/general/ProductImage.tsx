import { CartProductType } from "../../types/types";

interface ProductImageProduct {
    cartProduct: CartProductType,
    product: any,
}

const ProductImage: React.FC<ProductImageProduct> = ({
    cartProduct,
    // product
}) => {

    console.log('[DEBUG;;;;] Product', cartProduct)
    return ( 
        <div className="grid grid-cols-8 gap-2 h-full max-h-[500px] min-h-[300px]
        sm:min-h-[400px]">
            <div className="flex flex-col items-center justify-center border h-full max-h-[500px] min-h-[300px]
        sm:min-h-[400px]"></div>
            <div className="col-span-5 relative aspect-square">
                <img src={cartProduct?.image} alt={cartProduct?.image}  className="object-contain h-full w-full max-h-[500px] min-h-[300px]  sm:min-h-[400px]"/>
            </div>

        </div>
     );
}
 
export default ProductImage;