import { useState } from "react";
import Button from "./Button";

const categories = ["electronics","jewelery","men's clothing","women's clothing"];

const AddProduct = () => {
  const [product, setProduct] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
    category: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    
    // Validation
    if (!product.title || !product.price || !product.description || !product.image || !product.category) {
      setMessage("All fields are required.");
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch("https://fakestoreapi.com/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: product.title,
          price: parseFloat(product.price),
          description: product.description,
          image: product.image,
          category: product.category,
        }),
      });

      const data = await response.json();
      console.log("Product added:", data);

      setMessage("Product added successfully!");
      setProduct({ title: "", price: "", description: "", image: "", category: "" });

    } catch (error) {
      setMessage("Error adding product. Try again.");
    }

    setLoading(false);
  };

    return ( 
        <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6 mt-8">
            <h1 className="text-slate-500 font-bold text-3xl text-center mt-8 mb-4">
        Add New Product
      </h1>
      {message && <p className="text-center text-sm mb-4 text-red-500">{message}</p>}

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
        
        <select
          name="category"
          value={product.category}
          onChange={handleChange}
          className="border p-2 rounded bg-white"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <Button 
          label={loading ? "Adding..." : "Add Product"}
          disabled={loading}
          onclick={handleSubmit}
        />
      </form>
    </div>
     );
}
 
export default AddProduct;