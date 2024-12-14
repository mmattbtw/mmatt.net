import type { APIRoute } from "astro";
export const prerender = true;

export const GET: APIRoute = async function GET() {
  return Response.json({
    "@context": [
      "https://www.w3.org/ns/did/v1",
      "https://w3id.org/security/multikey/v1",
      "https://w3id.org/security/suites/secp256k1-2019/v1",
    ],
    id: "did:web:mmatt.net",
    alsoKnownAs: ["at://web.pds.mmatt.net", "at://web.mmatt.net"],
    verificationMethod: [
      {
        id: "did:web:mmatt.net#atproto",
        type: "Multikey",
        controller: "did:web:mmatt.net",
        publicKeyMultibase: "zQ3shWNbpx1wssQoKcRKAwzLZ6EZ223X6NRS5Cbe6waGVCtFS",
      },
    ],
    service: [
      {
        id: "#atproto_pds",
        type: "AtprotoPersonalDataServer",
        serviceEndpoint: "https://pds.mmatt.net",
      },
    ],
  });
};
