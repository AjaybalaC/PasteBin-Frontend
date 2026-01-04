import { useState } from "react";
import { createPaste } from "../service/pasteApi";

export default function CreatePaste() {
  const [content, setContent] = useState("");
  const [ttl, setTtl] = useState("");
  const [views, setViews] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    setResult(null);

    if (!content.trim()) {
      setError("Content is required");
      return;
    }

    const payload = { content };
    if (ttl) payload.ttl_seconds = Number(ttl);
    if (views) payload.max_views = Number(views);

    try {
      const res = await createPaste(payload);
      setResult(res.data);
      setContent("");
      setTtl("");
      setViews("");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create paste");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Create Paste</h1>

        <textarea
          rows={8}
          placeholder="Paste your text here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className="row">
          <input
            type="number"
            placeholder="TTL (seconds)"
            value={ttl}
            onChange={(e) => setTtl(e.target.value)}
          />
          <input
            type="number"
            placeholder="Max views"
            value={views}
            onChange={(e) => setViews(e.target.value)}
          />
        </div>

        <button onClick={handleSubmit}>Create Paste</button>

        {result && (
          <div className="link-box">
            Share URL: <a href={result.url}>{result.url}</a>
          </div>
        )}

        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}
