import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      fullName,
      email,
      phone,
      age,
      city,
      availability,
      hoursPerWeek,
      interests,
      hasExperience,
      experience,
      whyVolunteer,
      skills,
      submittedAt,
    } = body;

    const ageLabels: Record<string, string> = {
      "under-18": "Κάτω από 18",
      "18-25": "18-25",
      "26-35": "26-35",
      "36-50": "36-50",
      "50+": "50+",
    };

    const hoursLabels: Record<string, string> = {
      "1-2": "1-2 ώρες",
      "3-5": "3-5 ώρες",
      "6-10": "6-10 ώρες",
      "10+": "10+ ώρες",
    };

    const dayLabels: Record<string, string> = {
      monday: "Δευτέρα",
      tuesday: "Τρίτη",
      wednesday: "Τετάρτη",
      thursday: "Πέμπτη",
      friday: "Παρασκευή",
      saturday: "Σάββατο",
      sunday: "Κυριακή",
    };

    const roleLabels: Record<string, string> = {
      fostering: "Φιλοξενία ζώων",
      "vet-support": "Κτηνιατρική υποστήριξη",
      events: "Εκδηλώσεις & Υιοθεσίες",
      photography: "Φωτογραφία & Media",
      "social-media": "Social Media & Marketing",
      admin: "Διοικητική υποστήριξη",
      fundraising: "Συλλογή χρημάτων",
      other: "Άλλο",
    };

    const organizationEmail =
      process.env.ORGANIZATION_EMAIL ?? "info@enosi-ethelonton.gr";
    const fromEmail =
      process.env.NODE_ENV == "development"
        ? "onboarding@resend.dev"
        : "volunteers@enosi-ethelonton.gr";

    // Send email to organization
    await resend.emails.send({
      from: `Αιτήσεις Εθελοντισμού <${fromEmail}>`,
      to: organizationEmail,
      subject: `Νέα Αίτηση Εθελοντισμού - ${fullName}`,
      html: `
        <h2>Νέα Αίτηση Εθελοντισμού</h2>
        
        <h3>Προσωπικές Πληροφορίες</h3>
        <ul>
          <li><strong>Όνομα:</strong> ${fullName}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Τηλέφωνο:</strong> ${phone}</li>
          <li><strong>Ηλικία:</strong> ${ageLabels[age]}</li>
          <li><strong>Πόλη:</strong> ${city}</li>
        </ul>
        
        <h3>Διαθεσιμότητα</h3>
        <ul>
          <li><strong>Μέρες:</strong> ${availability.map((d: string) => dayLabels[d]).join(", ")}</li>
          <li><strong>Ώρες/εβδομάδα:</strong> ${hoursLabels[hoursPerWeek]}</li>
        </ul>
        
        <h3>Τομείς Ενδιαφέροντος</h3>
        <ul>
          ${interests.map((i: string) => `<li>${roleLabels[i]}</li>`).join("")}
        </ul>
        
        <h3>Εμπειρία</h3>
        <ul>
          <li><strong>Έχει εμπειρία:</strong> ${hasExperience === "yes" ? "Ναι" : "Όχι"}</li>
          ${experience ? `<li><strong>Περιγραφή:</strong> ${experience}</li>` : ""}
        </ul>
        
        <h3>Κίνητρο</h3>
        <p>${whyVolunteer}</p>
        
        ${
          skills
            ? `
          <h3>Δεξιότητες</h3>
          <p>${skills}</p>
        `
            : ""
        }
        
        <p><small>Υποβλήθηκε στις: ${new Date(submittedAt).toLocaleString("el-GR")}</small></p>
      `,
    });

    // Send confirmation email to applicant
    await resend.emails.send({
      from: `Αιτήσεις Εθελοντισμού <${fromEmail}>`,
      to: email,
      subject: "Λάβαμε την αίτησή σου για εθελοντισμό",
      html: `
        <h2>Ευχαριστούμε για την αίτησή σου!</h2>
        
        <p>Αγαπητέ/ή ${fullName},</p>
        
        <p>Λάβαμε την αίτησή σας για εθελοντισμό και σας ευχαριστούμε πολύ για το ενδιαφέρον σας!</p>
        
        <h3>Επόμενα Βήματα:</h3>
        <ol>
          <li>Θα επικοινωνήσουμε μαζί σας εντός 3-5 εργάσιμων ημερών</li>
          <li>Θα κανονίσουμε μια συνάντηση γνωριμίας</li>
          <li>Θα σας εκπαιδεύσουμε στον ρόλο που σας ενδιαφέρει</li>
          <li>Θα ξεκινήσετε να κάνετε τη διαφορά!</li>
        </ol>
        
        <h3>Οι τομείς που επιλέξατε:</h3>
        <ul>
          ${interests.map((i: string) => `<li>${roleLabels[i]}</li>`).join("")}
        </ul>
        
        <p>Αν έχετε οποιεσδήποτε ερωτήσεις, μπορείτε να μας καλέσετε στο <strong>+30 210 210 2100</strong>.</p>
        
        <p>Ανυπομονούμε να σας γνωρίσουμε!<br/>
        Ένωση Εθελοντών Αδέσποτων Χαλκίδας</p>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Volunteer application submitted successfully",
    });
  } catch (error) {
    console.error("Volunteer submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit volunteer application" },
      { status: 500 },
    );
  }
}
