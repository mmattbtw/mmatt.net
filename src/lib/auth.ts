// app/lib/auth.ts
import { NodeOAuthClient, NodeSavedSession } from "@atproto/oauth-client-node";

// In-memory stores for demo purposes
// In production, use Redis, database, or other persistent storage
const stateStore = new Map();
const sessionStore = new Map();

export const oauthClient = new NodeOAuthClient({
  clientMetadata: {
    client_id:
      "https://mmatt-net-git-atproto-time-mmatt.vercel.app/api/client-metadata",
    client_name: "mmatt.net",
    client_uri: "https://mmatt-net-git-atproto-time-mmatt.vercel.app",
    logo_uri: "https://mmatt-net-git-atproto-time-mmatt.vercel.app/matt.jpg",
    redirect_uris: [
      "https://mmatt.net/api/callback",
      "https://mmatt-net-git-atproto-time-mmatt.vercel.app/api/callback",
    ],
    grant_types: ["authorization_code", "refresh_token"],
    response_types: ["code"],
    application_type: "web",
    token_endpoint_auth_method: "none",
    dpop_bound_access_tokens: true,
    scope: "atproto transition:generic",
  },
  stateStore: {
    async set(key: string, state: unknown) {
      stateStore.set(key, state);
    },
    async get(key: string) {
      return stateStore.get(key);
    },
    async del(key: string) {
      stateStore.delete(key);
    },
  },
  sessionStore: {
    async set(sub: string, session: NodeSavedSession) {
      sessionStore.set(sub, session);
    },
    async get(sub: string) {
      return sessionStore.get(sub);
    },
    async del(sub: string) {
      sessionStore.delete(sub);
    },
  },
});
