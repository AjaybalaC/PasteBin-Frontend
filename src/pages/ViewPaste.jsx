import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPaste } from "../service/pasteApi";

export default function ViewPaste() {
  const { id } = useParams();
  const [paste, setPaste] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPaste = async () => {
      try {
        const res = await getPaste(id);
        setPaste(res.data);
      } catch {
        setError("Paste not found or expired");
      }
    };
    fetchPaste();
  }, [id]);

  if (error) {
    return (
      <div className="container">
        <div className="card">
          <h2 className="error">{error}</h2>
        </div>
      </div>
    );
  }

  if (!paste) {
    return (
      <div className="container">
        <div className="card">
          <h2>Loading...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card">
        <h2>View Paste</h2>

        <pre>{paste.content}</pre>

        <div className="meta">
          {paste.remaining_views !== null && (
            <p>Remaining views: {paste.remaining_views}</p>
          )}
          {paste.expires_at && (
            <p>
              Expires at:{" "}
              {new Date(paste.expires_at).toLocaleString()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
