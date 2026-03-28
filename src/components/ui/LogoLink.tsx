"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function LogoLink() {
    const pathname = usePathname();
    const logoPath = "/logo.png";

    const handleClick = (e: React.MouseEvent) => {
        if (pathname === "/") {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    return (
        <Link href="/" onClick={handleClick}>
            <Image src={logoPath} alt="Logo Ένωσης Εθελοντών Αδέσποτων Χαλκίδας" width={180} height={60} className="h-24 w-auto" priority />
        </Link>
    );
}
