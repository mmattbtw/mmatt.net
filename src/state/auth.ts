import { OAuthUserAgent } from "@atcute/oauth-browser-client";
import { atom } from "jotai";

export const AUTH_AGENT = atom(null as OAuthUserAgent | null);
