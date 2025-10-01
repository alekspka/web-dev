import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProductPage = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Electronics");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [supplierName, setSupplierName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [rating, setRating] = useState("");

  const navigate = useNavigate();
 
  const addProduct = async (newProduct) => {
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });
      if (!res.ok) {
        throw new Error("Failed to add Product");
      }
    } catch (error) {
      console.error(error);
      return false;
    }
    return true;
  };

  const submitForm = (e) => {
    e.preventDefault();

    const newProduct = {
      title,
      category,
      description,
      price: parseFloat(price),
      stockQuantity: parseInt(stockQuantity),
      supplier: {
        name: supplierName,
        contactEmail,
        contactPhone,
        rating: parseFloat(rating),
      },
    };

    addProduct(newProduct);
    return navigate("/");
  };

  return (
    <div className="create">
      <h2>Add a New Product</h2>
      <form onSubmit={submitForm}>
        <label>Product title:</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Product category:</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Furniture">Furniture</option>
          <option value="Books">Books</option>
          <option value="Sports">Sports</option>
        </select>

        <label>Product Description:</label>
        <textarea
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <label>Price:</label>
        <input
          type="number"
          step="0.01"
          required
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <label>Stock Quantity:</label>
        <input
          type="number"
          required
          value={stockQuantity}
          onChange={(e) => setStockQuantity(e.target.value)}
        />
        <label>Supplier Name:</label>
        <input
          type="text"
          required
          value={supplierName}
          onChange={(e) => setSupplierName(e.target.value)}
        />
        <label>Contact Email:</label>
        <input
          type="email"
          required
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
        />
        <label>Contact Phone:</label>
        <input
          type="tel"
          required
          value={contactPhone}
          onChange={(e) => setContactPhone(e.target.value)}
        />
        <label>Supplier Rating (1-5):</label>
        <input
          type="number"
          min="1"
          max="5"
          step="0.1"
          required
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
        <button>Add Product</button>
      </form>
    </div>
  );
};

export default AddProductPage;