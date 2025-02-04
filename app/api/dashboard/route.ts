// File: app/api/dashboard/route.ts
import { NextResponse } from "next/server";

export async function GET(request: Request): Promise<NextResponse> {
  try {
    // Extract query parameters from the request URL
    const { searchParams } = new URL(request.url);
    const walletAddress = searchParams.get("walletAddress");

    if (!walletAddress) {
      return NextResponse.json(
        { success: false, error: "Missing 'walletAddress' parameter" },
        { status: 400 }
      );
    }

    // Validate environment variable
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiBaseUrl) {
      console.error("Error: NEXT_PUBLIC_API_URL is not defined in environment variables.");
      return NextResponse.json(
        { success: false, error: "Server misconfiguration: API URL is missing" },
        { status: 500 }
      );
    }

    // Construct API endpoint
    const endpoint = `${apiBaseUrl}/api/publisher/dashboard?walletAddress=${walletAddress}`;

    // Make the server-to-server request
    const response = await fetch(endpoint, { method: "GET" });

    if (!response.ok) {
      console.error(`External API error: ${response.status} - ${response.statusText}`);
      return NextResponse.json(
        { success: false, error: `External API error: ${response.statusText}` },
        { status: response.status }
      );
    }

    // Parse and return the response data
    const data = await response.json();
    return NextResponse.json({ success: true, data });
  } catch (error: unknown) {
    console.error("Unexpected error in /api/dashboard:", error);

    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "An unknown error occurred" },
      { status: 500 }
    );
  }
}
