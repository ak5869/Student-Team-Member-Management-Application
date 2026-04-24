import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../ThemeContext";

export default function Navbar() {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      {/* Brand / Logo */}
      <Link to="/" className="navbar-brand">
        <span className="logo-icon">4X</span>
        <span>Team FourX</span>
      </Link>

      {/* Right side: Links + Theme toggle */}
      <div className="navbar-right">
        <div className="navbar-links">
          <Link to="/" className={isActive("/") ? "active" : ""}>
            Home
          </Link>
          <Link to="/add" className={isActive("/add") ? "active" : ""}>
            Add Member
          </Link>
          <Link to="/members" className={isActive("/members") ? "active" : ""}>
            View Members
          </Link>
        </div>

        {/* Theme Toggle Button */}
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          {theme === "dark" ? "☀" : "☽"}
        </button>
      </div>
    </nav>
  );
}