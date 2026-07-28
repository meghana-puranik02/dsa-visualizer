import { Link } from "react-router-dom";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h3>DSA Visualizer</h3>

          <p>
            An interactive React application for learning data structures and
            algorithms through step-by-step animations.
          </p>
        </div>

        <div className="footer-links">
          <h4>Visualizers</h4>

          <Link to="/sorting">Sorting</Link>
          <Link to="/searching">Searching</Link>
          <Link to="/stack">Stack</Link>
          <Link to="/queue">Queue</Link>
        </div>

        <div className="footer-links">
          <h4>More Topics</h4>

          <Link to="/linked-list">Linked List</Link>
          <Link to="/binary-search-tree">BST</Link>
          <Link to="/graph">Graph</Link>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {currentYear} DSA Visualizer. Built with React and JavaScript.</p>
      </div>
    </footer>
  );
}

export default Footer;
