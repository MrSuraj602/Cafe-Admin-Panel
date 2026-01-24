import { useState, useEffect } from "react";
import api from "../api/api";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterStatus, setFilterStatus] = useState("PENDING");
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, [filterStatus]);

  // Auto-refresh orders every 25 seconds for live updates
  useEffect(() => {
    const interval = setInterval(() => {
      fetchOrders();
    }, 25000);

    return () => clearInterval(interval);
  }, [filterStatus]);

  // Sort orders by createdAt (oldest first - FIFO queue)
  const sortedOrders = [...orders].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

  const fetchOrders = async () => {
    setLoading(true);
    try {
      let response;
      console.log(`Fetching orders with filter: ${filterStatus}`);
      if (filterStatus === "ALL") {
        response = await api.get("/order");
      } else {
        response = await api.get(`/order/status/${filterStatus}`);
      }
      console.log("Orders received:", response.data);
      setOrders(response.data);
      setError("");
    } catch (err) {
      const errorMessage = "Failed to fetch orders";
      setError(errorMessage);
      console.error("Error fetching orders:", err);
      console.error("Error details:", {
        message: err.message,
        status: err.response?.status,
        statusText: err.response?.statusText,
        data: err.response?.data,
      });
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await api.put(`/order/${orderId}/status/${newStatus}`);
      fetchOrders();
      setSelectedOrder(null);
      alert("Order status updated successfully!");
    } catch (err) {
      alert("Failed to update order status");
      console.error("Error updating order:", err);
    }
  };

  const completeOrder = async (orderId) => {
    try {
      await api.put(`/order/${orderId}/status/DELIVERED`);
      // Remove the order from UI by filtering it out
      setOrders(orders.filter(order => order.id !== orderId));
      setSelectedOrder(null);
      alert("Order completed successfully!");
    } catch (err) {
      alert("Failed to complete order");
      console.error("Error completing order:", err);
    }
  };

  const deleteOrder = async (orderId) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await api.delete(`/order/${orderId}`);
        fetchOrders();
        setSelectedOrder(null);
        alert("Order deleted successfully!");
      } catch (err) {
        alert("Failed to delete order");
        console.error("Error deleting order:", err);
      }
    }
  };

  const containerStyle = {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "0",
    background: "linear-gradient(135deg, #f5f3e6 0%, #eff0eb 100%)",
    minHeight: "100vh",
  };

  const headerStyle = {
    background: "linear-gradient(135deg, #1a3a52 0%, #0f2438 100%)",
    padding: "3rem 2rem",
    borderRadius: "20px",
    border: "2px solid #5a8a8c",
    boxShadow: "0 10px 30px rgba(15, 36, 56, 0.3)",
    margin: "2rem",
    marginBottom: "1rem",
  };

  const titleStyle = {
    fontSize: "2rem",
    fontWeight: "900",
    color: "#ffffff",
    marginBottom: "0.5rem",
    letterSpacing: "-0.3px",
  };

  const subtitleStyle = {
    fontSize: "1rem",
    color: "#8eb3b5",
    fontWeight: "500",
  };

  const filterContainerStyle = {
    display: "flex",
    gap: "1rem",
    marginBottom: "2rem",
    flexWrap: "wrap",
    padding: "0 2rem",
  };

  const filterButtonStyle = (isActive) => ({
    padding: "0.75rem 1.5rem",
    border: isActive ? "2px solid #5a8a8c" : "2px solid #8eb3b5",
    backgroundColor: isActive ? "#5a8a8c" : "#ffffff",
    color: isActive ? "#f5f3e6" : "#4a7c7e",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: isActive ? "700" : "600",
    transition: "all 0.3s ease",
    boxShadow: isActive ? "0 4px 12px rgba(90, 138, 140, 0.3)" : "0 2px 6px rgba(90, 138, 140, 0.1)",
  });

  const gridStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    padding: "2rem",
    paddingTop: "0",
  };

  const cardStyle = {
    border: "2px solid #8eb3b5",
    borderRadius: "14px",
    padding: "1.5rem",
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 12px rgba(90, 138, 140, 0.12)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    transition: "all 0.3s ease",
  };

  const cardHoverStyle = {
    ...cardStyle,
    boxShadow: "0 4px 12px 0 rgba(0, 0, 0, 0.15)",
  };

  const statusBadgeStyle = (status) => {
    const statusColors = {
      PENDING: { bg: "#7eb3b5", color: "#ffffff" },
      CONFIRMED: { bg: "#5a8a8c", color: "#ffffff" },
      PREPARING: { bg: "#4a7c7e", color: "#f5f3e6" },
      DELIVERED: { bg: "#1a3a52", color: "#8eb3b5" },
      CANCELLED: { bg: "#8b5a5a", color: "#f5f3e6" },
    };
    const colors = statusColors[status] || statusColors.PENDING;
    return {
      display: "inline-block",
      padding: "0.5rem 1rem",
      backgroundColor: colors.bg,
      color: colors.color,
      borderRadius: "6px",
      fontWeight: "600",
      fontSize: "0.875rem",
    };
  };

  const emptyStateStyle = {
    textAlign: "center",
    padding: "3rem 2rem",
    color: "#64748b",
  };

  const modalOverlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  };

  const modalStyle = {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "2rem",
    maxWidth: "600px",
    maxHeight: "90vh",
    overflowY: "auto",
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
  };

  const buttonGroupStyle = {
    display: "flex",
    gap: "1rem",
    marginTop: "2rem",
  };

  const buttonStyle = (type = "primary") => ({
    padding: "0.75rem 1.5rem",
    backgroundColor: type === "primary" ? "#2563eb" : type === "danger" ? "#dc3545" : "#6c757d",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    flex: 1,
  });

  if (loading) {
    return (
      <div style={containerStyle}>
        <p style={{ textAlign: "center", color: "#64748b" }}>Loading orders...</p>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>📦 Orders Management</h1>
        <p style={subtitleStyle}>Track and manage customer orders</p>
      </div>

      <div style={filterContainerStyle}>
        <button
          onClick={() => setFilterStatus("ALL")}
          style={filterButtonStyle(filterStatus === "ALL")}
        >
          All Orders
        </button>
        <button
          onClick={() => setFilterStatus("PENDING")}
          style={filterButtonStyle(filterStatus === "PENDING")}
        >
          Pending
        </button>
        <button
          onClick={() => setFilterStatus("DELIVERED")}
          style={filterButtonStyle(filterStatus === "DELIVERED")}
        >
          Delivered
        </button>
      </div>

      {error && <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>}

      {orders.length === 0 ? (
        <div style={emptyStateStyle}>
          <p style={{ fontSize: "1.1rem" }}>📭 No orders found for this filter</p>
        </div>
      ) : (
        <div style={gridStyle}>
          {sortedOrders.map((order) => (
            <div
              key={order.id}
              style={{ ...cardStyle, cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1.5rem" }}
              onMouseEnter={(e) => Object.assign(e.currentTarget.style, { ...cardHoverStyle, display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1.5rem" })}
              onMouseLeave={(e) => Object.assign(e.currentTarget.style, { ...cardStyle, cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1.5rem" })}
              onClick={() => setSelectedOrder(order)}
            >
              <div style={{ display: "flex", gap: "2rem", alignItems: "center", flex: 1 }}>
                <div style={statusBadgeStyle(order.status)}>{order.status}</div>

                <div>
                  <p style={{ margin: "0", color: "#64748b", fontSize: "0.85rem" }}>
                    Customer
                  </p>
                  <p style={{ margin: "0.25rem 0 0 0", color: "#1e293b", fontWeight: "600", fontSize: "0.95rem" }}>
                    {order.customerName}
                  </p>
                </div>

                <div>
                  <p style={{ margin: "0", color: "#64748b", fontSize: "0.85rem" }}>
                    Order Time
                  </p>
                  <p style={{ margin: "0.25rem 0 0 0", color: "#1e293b", fontWeight: "600", fontSize: "0.95rem" }}>
                    {new Date(order.createdAt).toLocaleTimeString()}
                  </p>
                </div>

                <div>
                  <p style={{ margin: "0", color: "#64748b", fontSize: "0.85rem" }}>
                    Amount
                  </p>
                  <p style={{ margin: "0.25rem 0 0 0", color: "#1e293b", fontWeight: "600", fontSize: "0.95rem" }}>
                    ₹{order.totalPrice?.toFixed(2) || "0.00"}
                  </p>
                </div>
              </div>

              {filterStatus === "PENDING" && (
              <div style={{ display: "flex", gap: "0.75rem" }}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteOrder(order.id);
                  }}
                  style={{
                    padding: "0.5rem 1rem",
                    backgroundColor: "#dc3545",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontWeight: "600",
                    fontSize: "0.85rem",
                    whiteSpace: "nowrap",
                  }}
                >
                  ✕ Cancel
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    completeOrder(order.id);
                  }}
                  style={{
                    padding: "0.5rem 1rem",
                    backgroundColor: "#16a34a",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontWeight: "600",
                    fontSize: "0.85rem",
                    whiteSpace: "nowrap",
                  }}
                >
                  ✓ Complete
                </button>
              </div>
              )}
            </div>
          ))}
        </div>
      )}

      {selectedOrder && (
        <div style={modalOverlayStyle} onClick={() => setSelectedOrder(null)}>
          <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <h2 style={{ margin: "0", color: "#1e293b", fontSize: "1.5rem" }}>
                Order Details
              </h2>
              <button
                onClick={() => setSelectedOrder(null)}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "1.5rem",
                  cursor: "pointer",
                  color: "#64748b",
                }}
              >
                ✕
              </button>
            </div>

            <div style={{ marginBottom: "2rem" }}>
              <p style={{ margin: "0 0 0.5rem 0", color: "#64748b", fontSize: "0.9rem" }}>
                Customer Name
              </p>
              <p style={{ margin: "0", color: "#1e293b", fontWeight: "600", fontSize: "1.1rem" }}>
                {selectedOrder.customerName}
              </p>
            </div>

            <div style={{ marginBottom: "2rem" }}>
              <h3 style={{ margin: "0 0 1rem 0", color: "#1e293b", fontSize: "1rem", fontWeight: "600" }}>
                Order Items
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {selectedOrder.items?.map((item, index) => (
                  <div key={index} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "0.75rem", borderBottom: "1px solid #e2e8f0" }}>
                    <div>
                      <p style={{ margin: "0 0 0.25rem 0", color: "#1e293b", fontWeight: "500" }}>
                        {item.foodName}
                      </p>
                      <p style={{ margin: "0", color: "#94a3b8", fontSize: "0.85rem" }}>
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <p style={{ margin: "0 0 0.25rem 0", color: "#64748b", fontSize: "0.85rem" }}>
                        ₹{item.price?.toFixed(2)} each
                      </p>
                      <p style={{ margin: "0", color: "#1e293b", fontWeight: "600" }}>
                        ₹{item.subtotal?.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ padding: "1rem", backgroundColor: "#f8fafc", borderRadius: "8px", marginBottom: "1.5rem", borderLeft: "4px solid #2563eb" }}>
              <p style={{ margin: "0", color: "#64748b", fontSize: "0.9rem", marginBottom: "0.25rem" }}>
                Total Bill
              </p>
              <p style={{ margin: "0", color: "#1e293b", fontSize: "1.3rem", fontWeight: "700" }}>
                ₹{selectedOrder.totalPrice?.toFixed(2) || "0.00"}
              </p>
            </div>

            <button
              style={{
                width: "100%",
                padding: "0.75rem",
                backgroundColor: "#f1f5f9",
                color: "#64748b",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "0.95rem",
                transition: "all 0.3s ease",
              }}
              onClick={() => setSelectedOrder(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Orders;
