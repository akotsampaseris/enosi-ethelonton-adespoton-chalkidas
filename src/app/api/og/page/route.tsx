/* eslint-disable @next/next/no-img-element */
// app/api/og/page/route.tsx
import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const title = searchParams.get("title") || "Ένωση Εθελοντών Αδέσποτων Χαλκίδας";
    const description = searchParams.get("description") || "";

    return new ImageResponse(
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignContent: "center",
                position: "relative",
            }}>
            <img
                src="https://eeach.gr/paw-pattern.jpg"
                alt="Background"
                width="1200"
                height="630"
                style={{
                    position: "absolute",
                    objectFit: "contain",
                    opacity: 0.15,
                }}
            />
            <div
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    background: "radial-gradient(circle at center, #fecac8 0%, rgb(253, 218, 216) 50%, rgb(253, 216, 214) 100%)",
                }}
            />

            {/* Content Layer */}
            <div
                style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "20px",
                }}>
                <div style={{ display: "flex" }}>
                    <img src="https://eeach.gr/logo.png" alt="Logo" width="150" height="150" />
                </div>
                {/* Content */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "0",
                    }}>
                    {/* Title */}
                    <div
                        style={{
                            fontSize: "58px",
                            fontWeight: "900",
                            color: "#881337",
                            lineHeight: 1.05,
                            display: "flex",
                            maxWidth: "900px",
                            letterSpacing: "-0.02em",
                            textShadow: "0 2px 20px rgba(136, 19, 55, 0.15)",
                        }}>
                        {title}
                    </div>

                    {/* Description */}
                    {description && (
                        <div
                            style={{
                                fontSize: "40px",
                                fontWeight: "500",
                                color: "#be185d",
                                lineHeight: 1.3,
                                display: "flex",
                                maxWidth: "820px",
                                letterSpacing: "-0.01em",
                            }}>
                            {description}
                        </div>
                    )}
                </div>
            </div>
        </div>,
        {
            width: 1200,
            height: 630,
        },
    );
}
