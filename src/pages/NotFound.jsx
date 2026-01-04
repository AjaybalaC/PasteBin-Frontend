import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container">
      <div className="card" style={{ textAlign: "center" }}>
        <h1>404</h1>
        <p>Page not found</p>
        <Link to="/">← Go back to Home</Link>
      </div>
    </div>
  );
}
