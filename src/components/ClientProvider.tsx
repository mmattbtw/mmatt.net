"use client";

import { configureOAuth } from "@atcute/oauth-browser-client";
import { useEffect } from "react";

export function ClientProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    configureOAuth({
      metadata: {
        client_id: process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID!,
        redirect_uri: process.env.NEXT_PUBLIC_OAUTH_REDIRECT_URI!,
      },
    });
  }, []);

  return <>{children}</>;
}
