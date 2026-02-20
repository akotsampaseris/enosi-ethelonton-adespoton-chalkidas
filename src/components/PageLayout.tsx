import { ReactNode } from "react";

interface PageLayoutProps {
    children: ReactNode;
    hasHero?: boolean; // Set to true for homepage with hero section
}

export default function PageLayout({
    children,
    hasHero = false,
}: PageLayoutProps) {
    return <div className={hasHero ? "" : "pt-25"}>{children}</div>;
}
