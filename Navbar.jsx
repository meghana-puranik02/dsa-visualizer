import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("dsa-theme");

    if (savedTheme === "light") {
      return false;
    }

    return true;
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("light-theme", !isDarkMode);

    localStorage.setItem(
      "dsa-theme",
      isDarkMode ? "dark" : "light"
    );
  }, [isDarkMode]);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  function toggleTheme() {
    setIsDarkMode((previousMode) => !previousMode);
  }

  return (
    <nav className="navbar">
      <Link className="logo" to="/" onClick={closeMenu}>
        DSA Visualizer
      </Link>

      <button
        type="button"
        className="menu-button"
        onClick={() => {
          setIsMenuOpen((previousMenuState) => !previousMenuState);
        }}
        aria-label="Toggle navigation menu"
        aria-expanded={isMenuOpen}
      >
        {isMenuOpen ? "✕" : "☰"}
      </button>

      <div className={`nav-links ${isMenuOpen ? "nav-links-open" : ""}`}>
        <Link to="/" onClick={closeMenu}>
          Home
        </Link>

        <Link to="/sorting" onClick={closeMenu}>
          Sorting
        </Link>

        <Link to="/searching" onClick={closeMenu}>
          Searching
        </Link>

        <Link to="/stack" onClick={closeMenu}>
          Stack
        </Link>

        <Link to="/queue" onClick={closeMenu}>
          Queue
        </Link>

        <Link to="/linked-list" onClick={closeMenu}>
          Linked List
        </Link>

        <Link to="/binary-search-tree" onClick={closeMenu}>
          BST
        </Link>

        <Link to="/graph" onClick={closeMenu}>
          Graph
        </Link>

        <button
          type="button"
          className="theme-button"
          onClick={toggleTheme}
        >
          {isDarkMode ? "☀ Light" : "🌙 Dark"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
