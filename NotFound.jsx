import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="not-found-page">
      <div className="not-found-card">
        <p>404 Error</p>

        <h1>Page Not Found</h1>

        <span>
          The page you are trying to open does not exist.
        </span>

        <Link to="/" className="start-button">
          Return Home
        </Link>
      </div>
    </main>
  );
}

export default NotFound;
