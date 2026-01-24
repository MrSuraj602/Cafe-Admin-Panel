import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;

  const navStyle = {
    background: "linear-gradient(135deg, #1a3a52 0%, #0f2438 100%)",
    padding: "1.2rem 2rem",
    boxShadow: "0 8px 16px -2px rgba(15, 36, 56, 0.25)",
    position: "sticky",
    top: 0,
    zIndex: 100,
    borderBottom: "2px solid #5a8a8c",
  };

  const containerStyle = {
    maxWidth: "1400px",
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    gap: "3rem",
  };

  const logoStyle = {
    fontSize: "1.6rem",
    fontWeight: "800",
    color: "#fff",
    textDecoration: "none",
    marginRight: "2rem",
    borderRight: "2px solid #5a8a8c",
    paddingRight: "2rem",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    letterSpacing: "-0.5px",
  };

  const navLinkStyle = (path) => ({
    color: isActive(path) ? "#fff" : "#b0c4c7",
    textDecoration: "none",
    fontWeight: 600,
    padding: "0.7rem 1.2rem",
    borderRadius: "8px",
    transition: "all 0.3s ease",
    backgroundColor: isActive(path) ? "#5a8a8c" : "transparent",
    borderBottom: isActive(path) ? "3px solid #8eb3b5" : "3px solid transparent",
    fontSize: "0.95rem",
  });

  return (
    <nav style={navStyle}>
      <div style={containerStyle}>
        <Link to="/" style={logoStyle}>
          <span style={{ fontSize: "1.8rem" }}>🏢</span> Admin Panel
        </Link>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <Link to="/" style={navLinkStyle("/")}>
            📊 Dashboard
          </Link>
          <Link to="/categories" style={navLinkStyle("/categories")}>
            📑 Categories
          </Link>
          <Link to="/food-items" style={navLinkStyle("/food-items")}>
            🍜 Food Items
          </Link>
          <Link to="/gallery" style={navLinkStyle("/gallery")}>
            🎬 Gallery
          </Link>
          <Link to="/orders" style={navLinkStyle("/orders")}>
            📦 Orders
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
