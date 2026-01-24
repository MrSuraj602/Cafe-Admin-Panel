import { useState, useEffect } from "react";
import api from "../api/api";

function FoodItemForm({ onFoodItemAdded, categoryId }) {
  const [formData, setFormData] = useState({
    foodName: "",
    description: "",
    price: "",
    imageUrl: "",
  });
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(categoryId || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await api.get("/category");
      setCategories(response.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError("Failed to fetch categories");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.foodName.trim() || !selectedCategory) {
      setError("Food name and category are required");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await api.post(`/food/category/${selectedCategory}`, {
        foodName: formData.foodName,
        description: formData.description,
        price: parseFloat(formData.price) || 0,
        imageUrl: formData.imageUrl,
      });
      setSuccess(true);
      setFormData({ foodName: "", description: "", price: "", imageUrl: "" });
      setTimeout(() => setSuccess(false), 3000);
      if (onFoodItemAdded) {
        onFoodItemAdded(response.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add food item");
      console.error("Error adding food item:", err);
    } finally {
      setLoading(false);
    }
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  };

  const headingStyle = {
    fontSize: "1.5rem",
    fontWeight: "800",
    color: "#1a3a52",
    marginBottom: "0.5rem",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "0.5rem",
    fontWeight: "700",
    color: "#1a3a52",
    fontSize: "0.95rem",
  };

  const inputStyle = {
    width: "100%",
    padding: "0.875rem",
    border: "2px solid #8eb3b5",
    borderRadius: "8px",
    fontSize: "1rem",
    transition: "all 0.3s ease",
    fontFamily: "inherit",
    backgroundColor: "#f5f3e6",
    color: "#1a3a52",
  };

  const textareaStyle = {
    ...inputStyle,
    minHeight: "100px",
    resize: "vertical",
  };

  const selectStyle = {
    ...inputStyle,
  };

  const buttonStyle = {
    padding: "0.875rem 1.5rem",
    background: "linear-gradient(135deg, #5a8a8c 0%, #4a7c7e 100%)",
    color: "#f5f3e6",
    border: "2px solid #5a8a8c",
    borderRadius: "8px",
    cursor: loading ? "not-allowed" : "pointer",
    fontSize: "1rem",
    fontWeight: "700",
    transition: "all 0.3s ease",
    opacity: loading ? 0.7 : 1,
    boxShadow: "0 6px 16px rgba(90, 138, 140, 0.25)",
  };

  const errorStyle = {
    padding: "1rem",
    backgroundColor: "#fee2e2",
    color: "#991b1b",
    borderRadius: "8px",
    fontSize: "0.95rem",
    border: "1px solid #fecaca",
  };

  const successStyle = {
    padding: "1rem",
    backgroundColor: "#dcfce7",
    color: "#166534",
    borderRadius: "8px",
    fontSize: "0.95rem",
    border: "1px solid #bbf7d0",
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2 style={headingStyle}>🍽️ Add New Food Item</h2>

      <div>
        <label style={labelStyle}>Category *</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={selectStyle}
          disabled={loading}
          required
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.categoryName}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label style={labelStyle}>Food Name *</label>
        <input
          type="text"
          name="foodName"
          placeholder="e.g., Espresso, Cappuccino"
          value={formData.foodName}
          onChange={handleChange}
          style={inputStyle}
          disabled={loading}
          required
        />
      </div>

      <div>
        <label style={labelStyle}>Description</label>
        <textarea
          name="description"
          placeholder="Describe the food item..."
          value={formData.description}
          onChange={handleChange}
          style={textareaStyle}
          disabled={loading}
        />
      </div>

      <div>
        <label style={labelStyle}>Price (₹)</label>
        <input
          type="number"
          name="price"
          placeholder="0.00"
          value={formData.price}
          onChange={handleChange}
          step="0.01"
          style={inputStyle}
          disabled={loading}
        />
      </div>

      <div>
        <label style={labelStyle}>Image URL</label>
        <input
          type="url"
          name="imageUrl"
          placeholder="https://example.com/image.jpg"
          value={formData.imageUrl}
          onChange={handleChange}
          style={inputStyle}
          disabled={loading}
        />
      </div>

      {error && <div style={errorStyle}>⚠️ {error}</div>}
      {success && <div style={successStyle}>✅ Food item added successfully!</div>}

      <button
        type="submit"
        disabled={loading}
        style={buttonStyle}
        onMouseEnter={(e) => {
          if (!loading) e.target.style.backgroundColor = "#15803d";
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = "#16a34a";
        }}
      >
        {loading ? "Adding..." : "Add Food Item"}
      </button>
    </form>
  );
}

export default FoodItemForm;
