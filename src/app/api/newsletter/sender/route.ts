import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Μη έγκυρη διεύθυνση email" },
        { status: 400 },
      );
    }

    const senderApiUrl = process.env.SENDER_API_URL;
    const senderApiToken = process.env.SENDER_API_TOKEN;
    const senderGroupId = process.env.SENDER_GROUP_ID;

    if (!senderApiToken || !senderGroupId) {
      console.error("Missing Sender.net credentials");
      return NextResponse.json(
        { error: "Η υπηρεσία newsletter δεν είναι διαθέσιμη αυτή τη στιγμή" },
        { status: 500 },
      );
    }

    // Subscribe to Sender.net
    const response = await fetch(`${senderApiUrl}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${senderApiToken}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email,
        groups: [senderGroupId],
        trigger_automation: false, // Set to true if you want to send welcome email
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 422 && data.message?.includes("already exists")) {
        return NextResponse.json(
          { error: "Αυτή η διεύθυνση email είναι ήδη εγγεγραμμένη" },
          { status: 400 },
        );
      }

      console.error("Sender.net API error:", data);
      return NextResponse.json(
        { error: "Αποτυχία εγγραφής. Παρακαλώ δοκιμάστε ξανά." },
        { status: response.status },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Επιτυχής εγγραφή στο newsletter!",
    });
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { error: "Κάτι πήγε στραβά. Παρακαλώ δοκιμάστε ξανά." },
      { status: 500 },
    );
  }
}
