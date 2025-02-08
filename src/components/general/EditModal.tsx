import { useState } from "react";
import { Product } from "../../types/types";

interface EditProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedProduct: Product) => void;
}

const EditModal: React.FC<EditProductModalProps> = ({
  product,
  isOpen,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<Product>({
    id: product?.id || 0,
    title: product?.title || "",
    price: product?.price || 0,
    category: product?.category || "",
    description: product?.description || "",
    image: product?.image || "",
    rating: {
        count: product?.rating?.count || 0,
        rate: product?.rating?.rate || 0,
    }
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-180">
        <h2 className="text-xl font-bold mb-4">Edit Product</h2>
        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <label className="block mb-2">Name:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-4"
          />

          <label className="block mb-2">Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-4"
          />

          <label className="block mb-2">Category:</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-4"
          />

          <label className="block mb-2">Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-4"
          />

          <label className="block mb-2">Image URL:</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-4"
          />

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-slate-800 text-white rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
