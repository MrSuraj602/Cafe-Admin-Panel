import { useState, useEffect } from "react";
import api from "../api/api";
import CategoryForm from "../components/CategoryForm";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingData, setEditingData] = useState({ categoryName: "" });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await api.get("/category");
      setCategories(response.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch categories");
      console.error("Error fetching categories:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryAdded = (newCategory) => {
    setCategories([...categories, newCategory]);
  };

  const handleDelete = async (categoryId) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await api.delete(`/category/${categoryId}`);
        setCategories(categories.filter((cat) => cat.id !== categoryId));
      } catch (err) {
        alert("Failed to delete category: " + (err.response?.data?.message || err.message));
        console.error("Error deleting category:", err);
      }
    }
  };

  const handleEditStart = (category) => {
    setEditingId(category.id);
    setEditingData({ categoryName: category.categoryName, imageUrl: category.imageUrl || "" });
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditingData({ categoryName: "", imageUrl: "" });
  };

  const handleEditSave = async (categoryId) => {
    if (!editingData.categoryName.trim()) {
      alert("Category name cannot be empty");
      return;
    }

    try {
      const response = await api.put(`/category/${categoryId}`, {
        categoryName: editingData.categoryName,
        imageUrl: editingData.imageUrl,
      });
      setCategories(
        categories.map((cat) =>
          cat.id === categoryId ? response.data : cat
        )
      );
      setEditingId(null);
      setEditingData({ categoryName: "", imageUrl: "" });
    } catch (err) {
      alert("Failed to update category: " + (err.response?.data?.message || err.message));
      console.error("Error updating category:", err);
    }
  };

  const filteredCategories = categories.filter((cat) =>
    cat.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const containerStyle = {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "0",
    background: "linear-gradient(135deg, #f5f3e6 0%, #eff0eb 100%)",
    minHeight: "100vh",
  };

  const headerStyle = {
    marginBottom: "3rem",
    background: "linear-gradient(135deg, #1a3a52 0%, #0f2438 100%)",
    padding: "3rem 2rem",
    borderRadius: "20px",
    border: "2px solid #5a8a8c",
    boxShadow: "0 10px 30px rgba(15, 36, 56, 0.3)",
  };

  const titleStyle = {
    fontSize: "2.5rem",
    fontWeight: "900",
    color: "#ffffff",
    marginBottom: "0.5rem",
    letterSpacing: "-0.5px",
  };

  const subtitleStyle = {
    fontSize: "1rem",
    color: "#8eb3b5",
    marginTop: "0.5rem",
    fontWeight: "500",
  };

  const mainGridStyle = {
    display: "grid",
    gridTemplateColumns: "380px 1fr",
    gap: "2rem",
    marginTop: "0",
    padding: "2rem",
  };

  const formContainerStyle = {
    background: "#ffffff",
    border: "2px solid #8eb3b5",
    borderRadius: "16px",
    padding: "2rem",
    boxShadow: "0 8px 20px rgba(90, 138, 140, 0.12)",
    height: "fit-content",
    position: "sticky",
    top: "120px",
  };

  const listContainerStyle = {
    background: "#ffffff",
    borderRadius: "16px",
    padding: "2.5rem",
    boxShadow: "0 8px 20px rgba(90, 138, 140, 0.12)",
    border: "2px solid #8eb3b5",
  };

  const listHeaderStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "2rem",
    paddingBottom: "1rem",
    borderBottom: "2px solid #8eb3b5",
  };

  const listTitleStyle = {
    fontSize: "1.5rem",
    fontWeight: "800",
    color: "#1a3a52",
  };

  const statsStyle = {
    fontSize: "0.9rem",
    color: "#f5f3e6",
    backgroundColor: "#5a8a8c",
    padding: "0.6rem 1rem",
    borderRadius: "12px",
    fontWeight: "700",
    border: "1px solid #7eb3b5",
  };

  const searchContainerStyle = {
    marginBottom: "2rem",
  };

  const searchStyle = {
    width: "100%",
    padding: "0.875rem 1.25rem",
    border: "2px solid #8eb3b5",
    borderRadius: "12px",
    fontSize: "1rem",
    backgroundColor: "#f5f3e6",
    transition: "all 0.3s ease",
    color: "#1a3a52",
    fontWeight: "500",
  };

  const cardsGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "1.5rem",
  };

  const cardStyle = {
    background: "#fff",
    border: "2px solid #8eb3b5",
    borderRadius: "14px",
    padding: "1.5rem",
    transition: "all 0.3s ease",
    cursor: "pointer",
    position: "relative",
    overflow: "hidden",
    boxShadow: "0 4px 12px rgba(90, 138, 140, 0.12)",
  };

  const emptyStateStyle = {
    textAlign: "center",
    padding: "4rem 2rem",
    color: "#4a7c7e",
  };

  const emptyStateIconStyle = {
    fontSize: "3rem",
    marginBottom: "1rem",
  };

  const categoryCardHeaderStyle = {
    marginBottom: "1.5rem",
  };

  const categoryImageStyle = {
    width: "100%",
    height: "160px",
    background: "linear-gradient(135deg, #5a8a8c 0%, #4a7c7e 100%)",
    borderRadius: "10px",
    marginBottom: "1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#f5f3e6",
    fontSize: "3rem",
    backgroundImage: null,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const categoryNameStyle = {
    fontSize: "1.25rem",
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: "0.5rem",
  };

  const categoryIdStyle = {
    fontSize: "0.85rem",
    color: "#94a3b8",
    fontWeight: "500",
  };

  const categoryActionsStyle = {
    display: "flex",
    gap: "0.75rem",
    marginTop: "1.5rem",
  };

  const actionButtonStyle = {
    flex: 1,
    padding: "0.75rem",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "0.85rem",
    fontWeight: "600",
    transition: "all 0.3s ease",
  };

  const editButtonStyle = {
    ...actionButtonStyle,
    backgroundColor: "#3b82f6",
    color: "#fff",
  };

  const deleteButtonStyle = {
    ...actionButtonStyle,
    backgroundColor: "#ef4444",
    color: "#fff",
  };

  const saveButtonStyle = {
    ...actionButtonStyle,
    backgroundColor: "#22c55e",
    color: "#fff",
  };

  const cancelButtonStyle = {
    ...actionButtonStyle,
    backgroundColor: "#6b7280",
    color: "#fff",
  };

  const inputStyle = {
    width: "100%",
    padding: "0.75rem",
    border: "2px solid #e2e8f0",
    borderRadius: "8px",
    fontSize: "0.95rem",
    marginBottom: "0.75rem",
    transition: "all 0.3s ease",
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>🏷️ Manage Categories</h1>
        <p style={subtitleStyle}>Create and organize your food categories</p>
      </div>

      <div style={mainGridStyle}>
        {/* Form Section */}
        <div style={formContainerStyle}>
          <CategoryForm onCategoryAdded={handleCategoryAdded} />
        </div>

        {/* Categories List Section */}
        <div style={listContainerStyle}>
          <div style={listHeaderStyle}>
            <h2 style={listTitleStyle}>Categories</h2>
            <span style={statsStyle}>
              {filteredCategories.length} {filteredCategories.length === 1 ? "category" : "categories"}
            </span>
          </div>

          {loading ? (
            <div style={emptyStateStyle}>
              <div style={emptyStateIconStyle}>⏳</div>
              <p style={{ fontSize: "1.1rem" }}>Loading categories...</p>
            </div>
          ) : error ? (
            <div style={{ ...emptyStateStyle, color: "#dc2626" }}>
              <div style={emptyStateIconStyle}>⚠️</div>
              <p style={{ fontSize: "1.1rem" }}>{error}</p>
            </div>
          ) : categories.length === 0 ? (
            <div style={emptyStateStyle}>
              <div style={emptyStateIconStyle}>📭</div>
              <p style={{ fontSize: "1.1rem" }}>No categories found</p>
              <p style={{ fontSize: "0.95rem", marginTop: "0.5rem" }}>Create one to get started!</p>
            </div>
          ) : (
            <>
              <div style={searchContainerStyle}>
                <input
                  type="text"
                  placeholder="🔍 Search categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={searchStyle}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#2563eb";
                    e.target.style.boxShadow = "0 0 0 3px rgba(37, 99, 235, 0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#e2e8f0";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>

              {filteredCategories.length === 0 ? (
                <div style={emptyStateStyle}>
                  <div style={emptyStateIconStyle}>🔍</div>
                  <p style={{ fontSize: "1.1rem" }}>No categories found</p>
                  <p style={{ fontSize: "0.95rem", marginTop: "0.5rem" }}>Try adjusting your search</p>
                </div>
              ) : (
                <div style={cardsGridStyle}>
                  {filteredCategories.map((category) => (
                    <div
                      key={category.id}
                      style={cardStyle}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = "0 12px 24px -5px rgba(0, 0, 0, 0.1)";
                        e.currentTarget.style.transform = "translateY(-4px)";
                        e.currentTarget.style.borderColor = "#2563eb";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.08)";
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.borderColor = "#e2e8f0";
                      }}
                    >
                      {editingId === category.id ? (
                        // Edit Mode
                        <div>
                          <label style={{ fontSize: "0.85rem", fontWeight: "600", color: "#1e293b", display: "block", marginBottom: "0.5rem" }}>
                            Category Name
                          </label>
                          <input
                            type="text"
                            style={inputStyle}
                            value={editingData.categoryName}
                            onChange={(e) =>
                              setEditingData({
                                ...editingData,
                                categoryName: e.target.value,
                              })
                            }
                            autoFocus
                          />
                          <label style={{ fontSize: "0.85rem", fontWeight: "600", color: "#1e293b", display: "block", marginBottom: "0.5rem" }}>
                            Image URL
                          </label>
                          <input
                            type="url"
                            style={inputStyle}
                            placeholder="https://example.com/image.jpg"
                            value={editingData.imageUrl}
                            onChange={(e) =>
                              setEditingData({
                                ...editingData,
                                imageUrl: e.target.value,
                              })
                            }
                          />
                          <div style={categoryActionsStyle}>
                            <button
                              style={saveButtonStyle}
                              onClick={() => handleEditSave(category.id)}
                            >
                              ✓ Save
                            </button>
                            <button
                              style={cancelButtonStyle}
                              onClick={handleEditCancel}
                            >
                              ✕ Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        // View Mode
                        <div>
                          <div style={categoryCardHeaderStyle}>
                            <div style={{
                              width: "100%",
                              height: "160px",
                              borderRadius: "10px",
                              marginBottom: "1rem",
                              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              overflow: "hidden",
                            }}>
                              {category.imageUrl ? (
                                <img
                                  src={category.imageUrl}
                                  alt={category.categoryName}
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    objectPosition: "center",
                                  }}
                                />
                              ) : (
                                <span style={{ fontSize: "3rem", color: "#f5f3e6" }}>🏷️</span>
                              )}
                            </div>
                            <h3 style={categoryNameStyle}>{category.categoryName}</h3>
                            <p style={categoryIdStyle}>ID: #{category.id}</p>
                          </div>

                          {category.imageUrl && (
                            <div style={{ marginBottom: "1rem" }}>
                              <a
                                href={category.imageUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  fontSize: "0.85rem",
                                  color: "#2563eb",
                                  textDecoration: "none",
                                  display: "inline-block",
                                  padding: "0.5rem 0.75rem",
                                  backgroundColor: "#dbeafe",
                                  borderRadius: "6px",
                                  fontWeight: "500",
                                }}
                              >
                                🔗 View Image
                              </a>
                            </div>
                          )}

                          <div style={categoryActionsStyle}>
                            <button
                              style={editButtonStyle}
                              onClick={() => handleEditStart(category)}
                              onMouseEnter={(e) => (e.target.style.backgroundColor = "#2563eb")}
                              onMouseLeave={(e) => (e.target.style.backgroundColor = "#3b82f6")}
                            >
                              ✏️ Edit
                            </button>
                            <button
                              style={deleteButtonStyle}
                              onClick={() => handleDelete(category.id)}
                              onMouseEnter={(e) => (e.target.style.backgroundColor = "#dc2626")}
                              onMouseLeave={(e) => (e.target.style.backgroundColor = "#ef4444")}
                            >
                              🗑️ Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Categories;
