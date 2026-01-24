import FoodItemForm from "../components/FoodItemForm";
import FoodItemList from "../components/FoodItemList";

function FoodItems() {
  const containerStyle = {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "0",
    background: "linear-gradient(135deg, #f5f3e6 0%, #eff0eb 100%)",
    minHeight: "100vh",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 2fr",
    gap: "3rem",
    marginTop: "0",
    padding: "2rem",
  };

  const formContainerStyle = {
    background: "#ffffff",
    border: "2px solid #8eb3b5",
    borderRadius: "14px",
    padding: "1.25rem",
    boxShadow: "0 8px 20px rgba(90, 138, 140, 0.12)",
    height: "fit-content",
    maxHeight: "70vh",
    overflowY: "auto",
    position: "sticky",
    top: "120px",
  };

  const listContainerStyle = {
    background: "#ffffff",
    border: "2px solid #8eb3b5",
    borderRadius: "14px",
    padding: "2rem",
    boxShadow: "0 8px 20px rgba(90, 138, 140, 0.12)",
  };

  return (
    <div style={containerStyle}>
      <div>
        <h1>🍽️ Manage Food Items</h1>
        <p style={{ fontSize: "1.1rem", color: "#64748b", marginTop: "0.5rem" }}>
          Create and manage your cafe menu items
        </p>
      </div>

      <div style={gridStyle}>
        <div style={formContainerStyle}>
          <FoodItemForm />
        </div>
        <div style={listContainerStyle}>
          <FoodItemList />
        </div>
      </div>
    </div>
  );
}

export default FoodItems;
