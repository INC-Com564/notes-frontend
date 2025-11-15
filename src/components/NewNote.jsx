import { useState } from "react";
import { useAuth } from "react-oidc-context";

export default function NewNote({ onCreated }) {
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const auth = useAuth();
  const userId = auth.user?.profile?.sub; // Cognito user id

  async function handleAdd() {
    if (!userId) return auth.signinRedirect();
    if (!text.trim()) return;

    setBusy(true);
    try {
      const res = await fetch("https://alt0qkuhsl.execute-api.us-east-1.amazonaws.com/default/notes", {
        method: "POST",
        body: JSON.stringify({ text: text.trim(), userId })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create note");
      onCreated?.(data);
      setText("");
    } catch (e) {
      alert(e.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div style={{ display: "flex", gap: 8 }}>
      <input
        placeholder="Enter a note"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleAdd} disabled={busy}>
        {busy ? "Adding..." : "Add Note"}
      </button>
    </div>
  );
}
