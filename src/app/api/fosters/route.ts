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
            fosterDuration,
            preferredTypes,
            canHandleMedical,
            canTransport,
            hadPetsBefore,
            currentPets,
            fosteredBefore,
            workSchedule,
            whyFoster,
            animalId,
            animalName,
            submittedAt,
        } = body;

        const durationLabels: Record<string, string> = {
            "1-2weeks": "1-2 εβδομάδες",
            "1month": "1 μήνα",
            "2-3months": "2-3 μήνες",
            "3+months": "3+ μήνες",
            flexible: "Ευέλικτα",
        };

        const typeLabels: Record<string, string> = {
            puppies: "Κουτάβια",
            "adult-dogs": "Ενήλικοι σκύλοι",
            "senior-dogs": "Ηλικιωμένοι σκύλοι",
            kittens: "Γατάκια",
            "adult-cats": "Ενήλικες γάτες",
            "senior-cats": "Ηλικιωμένες γάτες",
            "special-needs": "Ειδικές ανάγκες",
        };

        const organizationEmail =
            process.env.ORGANIZATION_EMAIL ?? "info@enosi-ethelonton.gr";
        const fromEmail =
            process.env.NODE_ENV == "development"
                ? "Αιτήσεις Φιλοξενίας <onboarding@resend.dev>"
                : "Αιτήσεις Φιλοξενίας <fostering@enosi-ethelonton.gr>";

        // Send email to organization
        await resend.emails.send({
            from: fromEmail,
            to: organizationEmail,
            subject: `Νέα Αίτηση Φιλοξενίας${animalName ? ` - ${animalName}` : ""}`,
            html: `
        <h2>Νέα Αίτηση Φιλοξενίας</h2>
        
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
        
        <h3>Λεπτομέρειες Φιλοξενίας</h3>
        <ul>
          <li><strong>Διάρκεια:</strong> ${durationLabels[fosterDuration]}</li>
          <li><strong>Προτιμώμενοι τύποι:</strong> ${preferredTypes.map((t: string) => typeLabels[t]).join(", ")}</li>
          <li><strong>Ιατρικές ανάγκες:</strong> ${
              canHandleMedical === "yes"
                  ? "Ναι, άνετα"
                  : canHandleMedical === "depends"
                    ? "Εξαρτάται από την περίπτωση"
                    : "Όχι, προτιμώ υγιή ζώα"
          }</li>
          <li><strong>Μεταφορά:</strong> ${
              canTransport === "yes"
                  ? "Ναι, όποτε χρειαστεί"
                  : canTransport === "sometimes"
                    ? "Μερικές φορές"
                    : "Όχι, χρειάζομαι βοήθεια"
          }</li>
        </ul>
        
        <h3>Εμπειρία με Ζώα</h3>
        <ul>
          <li><strong>Είχε ζώα στο παρελθόν:</strong> ${hadPetsBefore === "yes" ? "Ναι" : "Όχι"}</li>
          <li><strong>Τρέχοντα κατοικίδια:</strong> ${currentPets || "Κανένα"}</li>
          <li><strong>Φιλοξένησε στο παρελθόν:</strong> ${fosteredBefore === "yes" ? "Ναι" : "Όχι, πρώτη φορά"}</li>
        </ul>
        
        <h3>Διαθεσιμότητα</h3>
        <ul>
          <li><strong>Πρόγραμμα εργασίας:</strong> ${workSchedule}</li>
        </ul>
        
        <h3>Κίνητρο</h3>
        <p>${whyFoster}</p>
        
        <p><small>Υποβλήθηκε στις: ${new Date(submittedAt).toLocaleString("el-GR")}</small></p>
      `,
        });

        // Send confirmation email to applicant
        await resend.emails.send({
            from: fromEmail,
            to: email,
            subject: `Λάβαμε την αίτησή σας για φιλοξενία${animalName ? ` - ${animalName}` : ""}`,
            html: `
        <h2>Ευχαριστούμε για την αίτηση φιλοξενίας!</h2>
        
        <p>Αγαπητέ/ή ${fullName},</p>
        
        <p>Λάβαμε την αίτησή σας για φιλοξενία${animalName ? ` του ${animalName}` : ""} και σας ευχαριστούμε πολύ για την προσφορά σας!</p>
        
        <h3>Τι είναι η φιλοξενία;</h3>
        <p>Η φιλοξενία είναι προσωρινή φροντίδα για ένα ζώο μέχρι να βρεθεί το μόνιμο σπίτι του. 
        Η οργάνωση μας καλύπτει:</p>
        <ul>
          <li>Όλα τα κτηνιατρικά έξοδα</li>
          <li>Τροφή και τροφοδοσία</li>
          <li>Οδηγίες και υποστήριξη</li>
        </ul>
        
        <h3>Επόμενα Βήματα:</h3>
        <ol>
          <li>Θα επικοινωνήσουμε μαζί σας εντός 1-2 εργάσιμων ημερών</li>
          <li>Θα συζητήσουμε τις ανάγκες του ζώου και τις δυνατότητές σας</li>
          <li>Θα κανονίσουμε την παράδοση του ζώου</li>
          <li>Θα είμαστε δίπλα σας καθ' όλη τη διάρκεια της φιλοξενίας!</li>
        </ol>
        
        <p>Μπορείτε να μας καλέσετε στο <strong>+30 210 210 2100</strong> για οποιαδήποτε ερώτηση.</p>
        
        <p>Με ευγνωμοσύνη,<br/>
        Ένωση Εθελοντών Αδέσποτων Χαλκίδας</p>
      `,
        });

        return NextResponse.json({
            success: true,
            message: "Foster application submitted successfully",
        });
    } catch (error) {
        console.error("Foster submission error:", error);
        return NextResponse.json(
            { error: "Failed to submit foster application" },
            { status: 500 },
        );
    }
}
