import { useAuth } from "react-oidc-context";
import Notes from "./pages/Notes";

export default function App() {
  const auth = useAuth();

  if (auth.isLoading) return <p>Loading auth...</p>;
  if (auth.error)    return <p style={{color:"red"}}>Auth error: {String(auth.error)}</p>;

  if (!auth.isAuthenticated) {
    return (
      <div style={{padding: 24}}>
        <h1>Notes App</h1>
        <button onClick={() => auth.signinRedirect()}>Sign In</button>
      </div>
    );
  }

  return (
    <div style={{padding: 24}}>
      <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16}}>
        <p>Hello, {auth.user?.profile?.email || "user"}</p>
        <button onClick={() => auth.signoutRedirect()}>Sign Out</button>
      </div>
      <Notes />
    </div>
  );
}