import { CredentialManager, XRPC } from "@atcute/client";

import { MY_PDS } from "./config";

const handler = new CredentialManager({ service: `${MY_PDS}`, fetch });
export const atproto = new XRPC({ handler });
