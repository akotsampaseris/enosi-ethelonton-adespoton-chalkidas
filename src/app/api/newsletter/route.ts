import { NextRequest, NextResponse } from "next/server";

// Main newsletter endpoint that delegates to the active provider
export async function POST(request: NextRequest) {
    const provider = process.env.NEWSLETTER_PROVIDER;

    try {
        const body = await request.json();
        const isDev = process.env.NODE_ENV === "development";

        // Dev mode: simulate success if credentials are missing
        if (isDev && !provider) {
            console.log("📧 DEV MODE: Simulating newsletter subscription for:", body?.email);
            return NextResponse.json({
                success: true,
                message: "Επιτυχής εγγραφή στο newsletter! (DEV MODE)",
                dev: true,
                emai: body?.email,
            });
        }

        // Delegate to the active provider
        const providerResponse = await fetch(`${request.nextUrl.origin}/api/newsletter/${provider}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        const data = await providerResponse.json();

        return NextResponse.json(data, { status: providerResponse.status });
    } catch (error) {
        console.error("Newsletter subscription error:", error);
        return NextResponse.json({ error: "Κάτι πήγε στραβά. Παρακαλώ δοκιμάστε ξανά." }, { status: 500 });
    }
}
