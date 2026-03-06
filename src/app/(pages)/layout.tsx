import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { defaultMetadata } from "@/assets/metadata";

export const revalidate = 0;

export const metadata = defaultMetadata;

export default function PagesLayout({ children }: { children: React.ReactNode }) {
    const includeProdOnlyScripts = () => {
        if (process.env.NODE_ENV === "production") {
            return (
                <>
                    <Analytics />
                    <SpeedInsights />
                </>
            );
        }
    };

    return (
        <>
            <Header />
            {children}
            <Footer />
            {includeProdOnlyScripts()}
        </>
    );
}
