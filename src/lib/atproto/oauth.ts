// src/lib/atproto/oauth.ts
import { OAuthClient } from "@atproto/oauth-client-node";

// Create OAuth client
export const oauthClient = new OAuthClient({
  callbackUri: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback`,
  clientId: "https://your-client-metadata-url.com/client-metadata.json",
  // For development, you can use the localhost exception
  // clientId: 'http://localhost',
  debug: process.env.NODE_ENV === "development",
});
