// File: app/api/dashboard/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // Extract the walletAddress query parameter from the request URL.
  const { searchParams } = new URL(request.url);
  const walletAddress = searchParams.get('walletAddress');

  if (!walletAddress) {
    return NextResponse.json(
      { success: false, error: 'Missing walletAddress parameter' },
      { status: 400 }
    );
  }

  // Use the API base URL from your environment variables.
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiBaseUrl) {
    return NextResponse.json(
      { success: false, error: 'API_URL is not defined in environment variables.' },
      { status: 500 }
    );
  }

  // Construct the external API endpoint URL.
  const endpoint = `${apiBaseUrl}/api/publisher/dashboard?walletAddress=${walletAddress}`;

  try {
    // Make the server-to-server call (CORS does not apply here).
    const res = await fetch(endpoint, { method: 'GET' });
    if (!res.ok) {
      return NextResponse.json(
        { success: false, error: `External API error: ${res.statusText}` },
        { status: res.status }
      );
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: unknown) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : " Routing Error " },
      { status: 500 }
    );
  }
}
