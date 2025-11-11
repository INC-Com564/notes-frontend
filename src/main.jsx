import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "react-oidc-context";
import { WebStorageStateStore } from "oidc-client-ts";

const cognitoAuthConfig = {
  authority: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_GCkIFj9j3",
  client_id: "3kgv6ai7hmnm8d3n7mlhit70u",
  redirect_uri: "http://localhost:5173/",
  post_logout_redirect_uri: "http://localhost:5173/",
  response_type: "code",
  scope: "openid email phone",
  metadata: {
    issuer: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_GCkIFj9j3",
    authorization_endpoint: "https://us-east-1gckifj9j3.auth.us-east-1.amazoncognito.com/oauth2/authorize",
    token_endpoint: "https://us-east-1gckifj9j3.auth.us-east-1.amazoncognito.com/oauth2/token",
    userinfo_endpoint: "https://us-east-1gckifj9j3.auth.us-east-1.amazoncognito.com/oauth2/userInfo",
    end_session_endpoint: "https://us-east-1gckifj9j3.auth.us-east-1.amazoncognito.com/logout",
  },
  userStore: new WebStorageStateStore({ store: window.localStorage }),
  
  onSigninCallback() {
    window.history.replaceState({}, document.title, "/");
  },
  
  onRemoveUser() {
    // Clear any stale auth state
    window.localStorage.clear();
  },
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider {...cognitoAuthConfig}>
    <App />
  </AuthProvider>
);