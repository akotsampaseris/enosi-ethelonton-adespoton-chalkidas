/* eslint-disable @next/next/no-img-element */
// app/api/og/route.tsx
import { ImageResponse } from "next/og";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get("name") || "Animal";
    const formattedAge = searchParams.get("formattedAge") || "?";
    const image = searchParams.get("image");

    return new ImageResponse(
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                background: "linear-gradient(to bottom right, #fecac8, #ff8f8b)",
                color: "white",
                padding: "60px",
            }}>
            {/* Animal Image */}
            {image && (
                <img
                    src={image}
                    alt={name}
                    style={{
                        width: 500,
                        height: 500,
                        objectFit: "cover",
                        borderRadius: 24,
                    }}
                />
            )}

            {/* Text Content */}
            <div style={{ marginLeft: 60, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <h1 style={{ fontSize: 72, fontWeight: "bold", margin: 0 }}>{name}</h1>
                <p style={{ fontSize: 36, opacity: 0.9 }}>{formattedAge}</p>
                <p style={{ fontSize: 28, marginTop: 20 }}>Διαθέσιμο για Υιοθεσία</p>
            </div>

            {/* Logo */}
            <div style={{ position: "absolute", bottom: 60, right: 60, fontSize: 32 }}>🐾 eeach.gr</div>
        </div>,
        {
            width: 1200,
            height: 630,
        },
    );
}
