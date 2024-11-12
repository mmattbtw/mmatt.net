// app/api/client-metadata/route.ts
import { oauthClient } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(oauthClient.clientMetadata);
}
