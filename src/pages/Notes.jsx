import { useEffect, useState } from "react";
import { useAuth } from "react-oidc-context";
import NewNote from "../components/NewNote";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = useAuth();
  const userId = auth.user?.profile?.sub;

  useEffect(() => {
    if (!userId) return;
    (async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://alt0qkuhsl.execute-api.us-east-1.amazonaws.com/default/notes?userId=${encodeURIComponent(userId)}`
        );
        const data = await res.json();
        setNotes(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [userId]);

  function handleCreated(newNote) {
    setNotes((prev) => [newNote, ...prev]);
  }

  if (!userId) return <p>Please sign in to view your notes.</p>;
  if (loading) return <p>Loading your notes...</p>;

  return (
    <div style={{ padding: 24 }}>
      <h2>Your Notes</h2>
      <NewNote onCreated={handleCreated} />
      <ul style={{ marginTop: 16 }}>
        {notes.map((n) => (
          <li key={n.id}>{n.text}</li>
        ))}
      </ul>
    </div>
  );
}
