/* eslint-disable @next/next/no-img-element */
// app/api/og/blog/route.tsx
import { ImageResponse } from "next/og";
import { CategoryLabels } from "@/types/blogPost";

export const runtime = "edge";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const title = searchParams.get("title") || "Blog Post";
    const image = searchParams.get("image") || "https://eeach.gr/logo.png";
    const categories = searchParams.getAll("category") || "";
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
                    {/* Category Badge */}
                    {categories && categories.length && (
                        <div
                            style={{
                                display: "flex",
                                gap: "10px",
                            }}>
                            {categories.map((cat) => (
                                <div
                                    key={cat}
                                    style={{
                                        display: "flex",
                                        alignSelf: "flex-start",
                                        background: "rgba(236, 72, 153, 0.1)",
                                        color: "#ec4899",
                                        padding: "8px 20px",
                                        borderRadius: "999px",
                                        fontSize: "14px",
                                        fontWeight: "600",
                                        border: "2px solid rgba(236, 72, 153, 0.2)",
                                    }}>
                                    {CategoryLabels[cat] || cat}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Title */}
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
                        {title}
                    </div>
                </div>

                {/* Bottom - Author & Date */}
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
                            {date && (
                                <div
                                    style={{
                                        fontSize: "16px",
                                        color: "#6b7280",
                                    }}>
                                    {date}
                                </div>
                            )}
                        </div>
                    </div>
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
                        alt={title}
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
