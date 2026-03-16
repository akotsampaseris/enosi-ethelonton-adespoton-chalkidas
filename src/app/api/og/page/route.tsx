/* eslint-disable @next/next/no-img-element */
// app/api/og/animal/route.tsx
import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const title = searchParams.get("title") || "";
    const description = searchParams.get("description") || "";

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
                    gap: "24px",
                    padding: "60px 70px",
                    justifyContent: "center",
                    background: "linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%)",
                }}>
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
                    {description && (
                        <div
                            style={{
                                display: "flex",
                                fontSize: "22px",
                                color: "#4b5563",
                                fontWeight: "500",
                                alignItems: "center",
                                gap: "12px",
                            }}>
                            {description}
                        </div>
                    )}
                </div>
            </div>

            {/* Right Column - Image */}
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
                    src={"https://eeach.gr/logo.png"}
                    alt={"Ένωση Εθελοντών Αδέσποτων Χαλκίδας Logo"}
                    width={480}
                    height={630}
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                    }}
                />
            </div>
        </div>,
        {
            width: 1200,
            height: 630,
        },
    );
}
