import { oauthClient } from "@/lib/auth";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const { session } = await oauthClient.callback(searchParams);

    // Store the DID in a cookie for client-side access
    (await cookies()).set("userDid", session.did, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    // Redirect to home page or dashboard
    return NextResponse.redirect(new URL("/", request.url));
  } catch (error) {
    console.error("Callback error:", error);
    return NextResponse.redirect(
      new URL("/login?error=auth_failed", request.url)
    );
  }
}
