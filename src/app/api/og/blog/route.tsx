/* eslint-disable @next/next/no-img-element */
// app/api/og/blog/route.tsx
import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const title = searchParams.get("title") || "Blog Post";
    const image = searchParams.get("image") || "";
    const category = searchParams.get("category") || "";
    const date = searchParams.get("date") || "";

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
                    padding: "80px",
                    justifyContent: "space-between",
                }}>
                {/* Top - Logo */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                    }}>
                    <img src="https://eeach.gr/logo.png" alt="Logo" width="150" height="150" />
                </div>

                {/* Middle - Content */}
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    {/* Category Badge */}
                    {category && (
                        <div
                            style={{
                                display: "flex",
                                alignSelf: "flex-start",
                                background: "#f3f4f6",
                                color: "#6b7280",
                                padding: "8px 20px",
                                borderRadius: "999px",
                                fontSize: "16px",
                                fontWeight: "500",
                            }}>
                            {category}
                        </div>
                    )}

                    {/* Title */}
                    <div
                        style={{
                            fontSize: "52px",
                            fontWeight: "bold",
                            color: "#111827",
                            lineHeight: 1.2,
                            display: "flex",
                            maxWidth: "600px",
                        }}>
                        {title}
                    </div>
                </div>

                {/* Bottom - Author & Date */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                    }}>
                    {/* Avatar */}
                    <div
                        style={{
                            width: "48px",
                            height: "48px",
                            background: "#fce7f3",
                            borderRadius: "999px",
                            border: "2px solid #ec4899",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "24px",
                        }}>
                        🐕
                    </div>

                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <div
                            style={{
                                fontSize: "18px",
                                fontWeight: "600",
                                color: "#111827",
                            }}>
                            Ένωση Εθελοντών Αδέσποτων Χαλκίδας
                        </div>
                        <div
                            style={{
                                fontSize: "16px",
                                color: "#6b7280",
                            }}>
                            {date}
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column - Visual */}
            {image && (
                <div
                    style={{
                        width: "480px",
                        background: "#fafafa",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                    }}>
                    <img
                        src={image}
                        alt={title}
                        width={480}
                        height={630}
                        style={{
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
