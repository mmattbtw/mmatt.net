import { oauthClient } from "@/lib/auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const userDid = (await cookies()).get("userDid")?.value;

    if (userDid) {
      const session = await oauthClient.restore(userDid);
      await session.signOut();
      (await cookies()).delete("userDid");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json({ error: "Failed to logout" }, { status: 500 });
  }
}
