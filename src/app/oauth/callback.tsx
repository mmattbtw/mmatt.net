"use client";

import { AUTH_AGENT } from "@/state/auth";
import {
    finalizeAuthorization,
    OAuthUserAgent,
} from "@atcute/oauth-browser-client";
import { useSetAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Callback() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const setAuthAgent = useSetAtom(AUTH_AGENT);

  useEffect(() => {
    const finalize = async () => {
      try {
        // Get params from hash
        const params = new URLSearchParams(window.location.hash.slice(1));

        // Clean up URL
        history.replaceState(null, "", location.pathname);

        // Finalize authorization
        const session = await finalizeAuthorization(params);

        // Create agent (you might want to store this in a global state management solution)
        const agent = new OAuthUserAgent(session);
        setAuthAgent(agent);

        // Redirect to dashboard or home
        router.push("/");
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "An error occurred during authorization"
        );
      }
    };

    finalize();
  }, [router]);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="text-red-500">
          <h2 className="text-xl font-bold mb-2">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="text-center">
        <h2 className="text-xl font-bold mb-2">Finalizing login...</h2>
        <p>Please wait while we complete your sign in.</p>
      </div>
    </div>
  );
}
