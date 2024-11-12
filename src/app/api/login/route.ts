import { oauthClient } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const handle = searchParams.get("handle");

    if (!handle) {
      return NextResponse.json(
        { error: "Handle parameter is required" },
        { status: 400 }
      );
    }

    const state = crypto.randomUUID();

    const url = await oauthClient.authorize(handle, {
      state,
    });

    return NextResponse.redirect(url);
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Failed to initiate login" },
      { status: 500 }
    );
  }
}
