import { useState } from "react";
import Button from "./Button";
import { addProduct } from "../../utils/addProduct";
import toast from "react-hot-toast";

const categories = [
  "electronics",
  "jewelery",
  "men's clothing",
  "women's clothing",
];

const AddProduct = () => {
  const [product, setProduct] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
    category: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (
      !product.title ||
      !product.price ||
      !product.description ||
      !product.image ||
      !product.category
    ) {
      toast.error("All fields are required.");
      return;
    }

    setLoading(true);

    const newProduct = {
      title: product.title,
      price: parseFloat(product.price),
      description: product.description,
      image: product.image,
      category: product.category,
      rating: {
        rate: 0,
        count: 0
      },
    };

    try {
      const response = await addProduct(newProduct);

      console.log("Product added:", response);

      toast.success("Product added successfully!");
      setProduct({
        title: "",
        price: "",
        description: "",
        image: "",
        category: "",
      });
    } catch (error) {
      toast.error("Error adding product. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto   p-6">
      <h1 className="text-slate-500 font-bold text-3xl text-center  mb-4">
        Add New Product
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          type="text"
          name="title"
          value={product.title}
          onChange={handleChange}
          placeholder="Product Title"
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="price"
          value={product.price}
          min={1}
          onChange={handleChange}
          placeholder="Price"
          className="border p-2 rounded"
        />

        <select
          name="category"
          value={product.category}
          onChange={handleChange}
          className="border p-2 rounded bg-white"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          placeholder="Description"
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="image"
          value={product.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="border p-2 rounded"
        />

        <Button
          label={loading ? "Adding..." : "Add Product"}
          disabled={loading}
          onclick={handleSubmit}
        />
      </form>
    </div>
  );
};

export default AddProduct;
