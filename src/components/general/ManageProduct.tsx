import { useState, useEffect } from "react";
import { deleteProduct } from "../../utils/deleteProduct";
import { getProducts } from "../../utils/getProducts";
import { Product } from "../../types/types";
import { toast } from "react-hot-toast";
import { formatPrice } from "../../utils/formatPrice";
import { Plus, Trash2 } from "lucide-react";
import EditModal from "./EditModal";
import Button from "./Button";
import { useNavigate } from "react-router";

const ManageProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else {
      fetchProducts();
    }
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
      localStorage.setItem("products", JSON.stringify(data)); // Save to local storage
    } catch (error) {
      toast.error("Failed to fetch products");
    }
  };

  const handleDeleteProduct = async (id: number) => {
    try {
      await deleteProduct(id);
      const updatedProducts = products.filter((product) => product.id !== id);
      setProducts(updatedProducts);
      localStorage.setItem("products", JSON.stringify(updatedProducts)); // Update local storage
      toast.success("Product deleted successfully");
    } catch (error) {
      toast.error("Failed to delete product");
    }
  };

  const handleEditClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleSaveProduct = (updatedProduct: Product) => {
    setProducts((prevProducts) =>
      prevProducts.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
    toast.success("Product updated successfully");
    setIsModalOpen(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Manage Products</h2>
        <Button
          custom="max-w-[100px]"
          icon={Plus}
          label="Add"
          onclick={() => {
            navigate("/dashboard/add-products");
          }}
        />
      </div>
      {isModalOpen && selectedProduct && (
        <EditModal
          product={selectedProduct}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveProduct}
          isOpen={isModalOpen}
        />
      )}

      <table className="w-full">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-3">Title</th>
            <th className="p-3">Price</th>
            <th className="p-3">Category</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product.id} className="border-b last:border-b-0">
                <td className="p-3">{product.title}</td>
                <td className="p-3">{formatPrice(product.price)}</td>
                <td className="p-3">{product.category}</td>
                <td className="p-3">
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="text-red-500 cursor-pointer p-1 rounded"
                  >
                    <Trash2 size={20} />
                  </button>

                  <button
                    onClick={() => handleEditClick(product)}
                    className="text-slate-500 cursor-pointer p-1 rounded"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center p-4">
                No products available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageProduct;
