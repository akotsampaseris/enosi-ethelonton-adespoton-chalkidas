import { Analytics } from "@vercel/analytics/next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const includeAnalyticsOnlyInProduction = () => {
    if (process.env.NODE_ENV === "production") {
      return <Analytics />;
    }
  };

  return (
    <>
      <Header />
      {children}
      <Footer />
      {includeAnalyticsOnlyInProduction()}
    </>
  );
}
