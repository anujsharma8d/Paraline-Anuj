import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Simulate backend connection and package preparation delay (optional, for UX)
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Fetch the latest release from the actual GitHub repository
    const response = await fetch("https://api.github.com/repos/SamXop123/Paraline/releases/latest", {
      next: { revalidate: 3600 } // Cache for 1 hour to avoid rate limits
    });
    
    if (!response.ok) {
      throw new Error("Failed to fetch GitHub releases");
    }

    const data = await response.json();
    
    // Find the actual .exe asset
    const exeAsset = data.assets.find((asset: any) => asset.name.endsWith('.exe'));
    
    if (!exeAsset) {
      throw new Error("No executable found in the latest release");
    }

    return NextResponse.json({
      success: true,
      url: exeAsset.browser_download_url,
      version: data.tag_name,
      filename: exeAsset.name,
      message: "Download ready!"
    });
  } catch (error) {
    console.error("Download API Error:", error);
    // Fallback to the releases page if API fails
    return NextResponse.json({
      success: true,
      url: "https://github.com/SamXop123/Paraline/releases/latest",
      version: "latest",
      filename: "Paraline-Setup.exe",
      message: "Redirecting to releases..."
    });
  }
}
