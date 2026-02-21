import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { name, email, phone, subject, message, submittedAt } = body;

    const subjectLabels: Record<string, string> = {
      general: "Γενική ερώτηση",
      adoption: "Υιοθεσία",
      foster: "Φιλοξενία",
      volunteer: "Εθελοντισμός",
      donation: "Δωρεά",
      other: "Άλλο",
    };

    const organizationEmail =
      process.env.ORGANIZATION_EMAIL ?? "info@enosi-ethelonton.gr";
    const fromEmail =
      process.env.NODE_ENV == "development"
        ? "Επικοινωνία <onboarding@resend.dev>"
        : "Επικοινωνία <contact@enosi-ethelonton.gr>";

    // Send email to organization
    await resend.emails.send({
      from: fromEmail,
      to: organizationEmail,
      subject: `Νέο Μήνυμα Επικοινωνίας - ${subjectLabels[subject]}`,
      html: `
        <h2>Νέο Μήνυμα από τη Φόρμα Επικοινωνίας</h2>
        
        <h3>Στοιχεία Αποστολέα</h3>
        <ul>
          <li><strong>Όνομα:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          ${phone ? `<li><strong>Τηλέφωνο:</strong> ${phone}</li>` : ""}
          <li><strong>Θέμα:</strong> ${subjectLabels[subject]}</li>
        </ul>
        
        <h3>Μήνυμα</h3>
        <p style="white-space: pre-wrap;">${message}</p>
        
        <p><small>Στάλθηκε στις: ${new Date(submittedAt).toLocaleString("el-GR")}</small></p>
      `,
      // Set reply-to so you can reply directly to the sender
      replyTo: email,
    });

    // Send confirmation email to sender
    await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: "Λάβαμε το μήνυμά σας",
      html: `
        <h2>Ευχαριστούμε για την επικοινωνία!</h2>
        
        <p>Αγαπητέ/ή ${name},</p>
        
        <p>Λάβαμε το μήνυμά σας σχετικά με: <strong>${subjectLabels[subject]}</strong></p>
        
        <p>Θα επικοινωνήσουμε μαζί σας το συντομότερο δυνατό.</p>
        
        <h3>Το μήνυμά σας:</h3>
        <div style="background-color: #f9fafb; padding: 1rem; border-radius: 0.5rem; border-left: 4px solid #ec4899;">
          <p style="white-space: pre-wrap; margin: 0;">${message}</p>
        </div>
        
        <p>Αν έχετε επείγον θέμα, μπορείτε να μας καλέσετε στο <strong>+30 210 210 2100</strong>.</p>
        
        <p>Με εκτίμηση,<br/>
        Ένωση Εθελοντών Αδέσποτων Χαλκίδας</p>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Contact message sent successfully",
    });
  } catch (error) {
    console.error("Contact submission error:", error);
    return NextResponse.json(
      { error: "Failed to send contact message" },
      { status: 500 },
    );
  }
}
