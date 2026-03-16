/* eslint-disable @next/next/no-img-element */
// app/api/og/animal/route.tsx
import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const name = searchParams.get("name") || "Animal";
    const gender = searchParams.get("gender") || "";
    const age = searchParams.get("age") || "";
    const weight = searchParams.get("weight") || "";
    const image = searchParams.get("image") || "https://eeach.gr/logo.png";

    return new ImageResponse(
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                background: "white",
                fontFamily: "system-ui, -apple-system, sans-serif",
            }}>
            {/* Left Column - Content */}
            <div
                style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    padding: "60px 70px",
                    justifyContent: "space-between",
                    background: "linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%)",
                }}>
                {/* Top - Logo */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                    }}>
                    <img src="https://eeach.gr/logo.png" alt="Logo" width="120" height="120" />
                </div>

                {/* Middle - Content */}
                <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                    <div
                        style={{
                            display: "flex",
                            alignSelf: "flex-start",
                            background: "rgba(236, 72, 153, 0.1)",
                            color: "#ec4899",
                            padding: "10px 24px",
                            borderRadius: "999px",
                            fontSize: "18px",
                            fontWeight: "600",
                            border: "2px solid rgba(236, 72, 153, 0.2)",
                        }}>
                        Προς Υιοθεσία
                    </div>

                    {/* Name */}
                    <div
                        style={{
                            fontSize: "64px",
                            fontWeight: "900",
                            color: "#881337",
                            lineHeight: 1.1,
                            display: "flex",
                            maxWidth: "500px",
                            letterSpacing: "-0.02em",
                            textShadow: "0 2px 12px rgba(136, 19, 55, 0.1)",
                        }}>
                        {name}
                    </div>
                </div>

                {/* Bottom - Details */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "16px",
                        background: "rgba(255, 255, 255, 0.6)",
                        padding: "28px",
                        borderRadius: "20px",
                        border: "1px solid rgba(236, 72, 153, 0.1)",
                    }}>
                    {gender && (
                        <div
                            style={{
                                display: "flex",
                                fontSize: "22px",
                                color: "#4b5563",
                                fontWeight: "500",
                                alignItems: "center",
                                gap: "12px",
                            }}>
                            <span style={{ color: "#ec4899", fontSize: "28px" }}>•</span>
                            <span style={{ color: "#111827", fontWeight: "600" }}>Φύλο:</span> {gender}
                        </div>
                    )}
                    {age && (
                        <div
                            style={{
                                display: "flex",
                                fontSize: "22px",
                                color: "#4b5563",
                                fontWeight: "500",
                                alignItems: "center",
                                gap: "12px",
                            }}>
                            <span style={{ color: "#ec4899", fontSize: "28px" }}>•</span>
                            <span style={{ color: "#111827", fontWeight: "600" }}>Ηλικία:</span> {age}
                        </div>
                    )}
                    {weight && (
                        <div
                            style={{
                                display: "flex",
                                fontSize: "22px",
                                color: "#4b5563",
                                fontWeight: "500",
                                alignItems: "center",
                                gap: "12px",
                            }}>
                            <span style={{ color: "#ec4899", fontSize: "28px" }}>•</span>
                            <span style={{ color: "#111827", fontWeight: "600" }}>Βάρος:</span> {weight}
                        </div>
                    )}
                </div>
            </div>

            {/* Right Column - Image */}
            {image && (
                <div
                    style={{
                        width: "480px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                        overflow: "hidden",
                    }}>
                    <img
                        src={image}
                        alt={name}
                        width={480}
                        height={630}
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                        }}
                    />
                </div>
            )}
        </div>,
        {
            width: 1200,
            height: 630,
        },
    );
}
