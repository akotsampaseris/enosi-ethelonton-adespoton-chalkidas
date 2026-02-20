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
            address,
            city,
            housingType,
            hasYard,
            hadPetsBefore,
            currentPets,
            workSchedule,
            whoWillCare,
            whyAdopt,
            animalId,
            animalName,
            submittedAt,
        } = body;

        // Send email to organization
        const { data: orgEmail, error: orgError } = await resend.emails.send({
            // from: "Αιτήσεις Υιοθεσίας <adoptions@enosi-ethelonton.gr>",
            from: "onboarding@resend.dev",
            to: process.env.ORGANIZATION_EMAIL || "info@animalrescue.gr",
            subject: `Νέα Αίτηση Υιοθεσίας${animalName ? ` - ${animalName}` : ""}`,
            html: `
        <h2>Νέα Αίτηση Υιοθεσίας</h2>
        
        ${animalName ? `<p><strong>Ζώο:</strong> ${animalName} (ID: ${animalId})</p>` : ""}
        
        <h3>Προσωπικές Πληροφορίες</h3>
        <ul>
          <li><strong>Όνομα:</strong> ${fullName}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Τηλέφωνο:</strong> ${phone}</li>
          <li><strong>Διεύθυνση:</strong> ${address}, ${city}</li>
        </ul>
        
        <h3>Συνθήκες Διαβίωσης</h3>
        <ul>
          <li><strong>Τύπος κατοικίας:</strong> ${housingType === "apartment" ? "Διαμέρισμα" : housingType === "house" ? "Μονοκατοικία" : "Άλλο"}</li>
          <li><strong>Αυλή/Κήπος:</strong> ${hasYard === "yes" ? "Ναι" : "Όχι"}</li>
        </ul>
        
        <h3>Εμπειρία με Ζώα</h3>
        <ul>
          <li><strong>Είχε ζώα στο παρελθόν:</strong> ${hadPetsBefore === "yes" ? "Ναι" : "Όχι"}</li>
          <li><strong>Τρέχοντα κατοικίδια:</strong> ${currentPets || "Κανένα"}</li>
        </ul>
        
        <h3>Διαθεσιμότητα</h3>
        <ul>
          <li><strong>Πρόγραμμα εργασίας:</strong> ${workSchedule}</li>
          <li><strong>Υπεύθυνος φροντίδας:</strong> ${whoWillCare}</li>
        </ul>
        
        <h3>Κίνητρο</h3>
        <p>${whyAdopt}</p>
        
        <p><small>Υποβλήθηκε στις: ${new Date(submittedAt).toLocaleString("el-GR")}</small></p>
      `,
        });

        if (orgError) {
            console.error("Error sending email to organization:", orgError);
            throw orgError;
        }

        // Send confirmation email to applicant
        const { data: confirmEmail, error: confirmError } =
            await resend.emails.send({
                // from: "Ένωση Εθελοντών Αδέσποτων <noreply@enosi-ethelonton.gr>",
                from: "onboarding@resend.dev",
                to: email,
                subject: `Λάβαμε την αίτησή σας για υιοθεσία${animalName ? ` - ${animalName}` : ""}`,
                html: `
        <h2>Ευχαριστούμε για την αίτηση υιοθεσίας!</h2>
        
        <p>Αγαπητέ/ή ${fullName},</p>
        
        <p>Λάβαμε την αίτησή σας για υιοθεσία${animalName ? ` του ${animalName}` : ""} και σας ευχαριστούμε για το ενδιαφέρον σας!</p>
        
        <h3>Επόμενα Βήματα:</h3>
        <ol>
          <li>Θα επικοινωνήσουμε μαζί σας εντός 2-3 εργάσιμων ημερών</li>
          <li>Θα κανονίσουμε μια επίσκεψη στο σπίτι σας</li>
          <li>Θα συζητήσουμε τις ανάγκες του ζώου και τις συνθήκες διαβίωσης</li>
          <li>Αν όλα πάνε καλά, θα προχωρήσουμε στην υιοθεσία!</li>
        </ol>
        
        <p>Μπορείτε να μας καλέσετε στο <strong>+30 210 210 2100</strong> για οποιαδήποτε ερώτηση.</p>
        
        <p>Με αγάπη για τα ζώα,<br/>
        Ένωση Εθελοντών Αδέσποτων Χαλκίδας</p>
      `,
            });

        if (confirmError) {
            console.error("Error sending confirmation email:", confirmError);
            // Don't throw here - org email was sent successfully
        }

        return NextResponse.json({
            success: true,
            message: "Adoption application submitted successfully",
        });
    } catch (error) {
        console.error("Adoption submission error:", error);
        return NextResponse.json(
            { error: "Failed to submit adoption application" },
            { status: 500 },
        );
    }
}
