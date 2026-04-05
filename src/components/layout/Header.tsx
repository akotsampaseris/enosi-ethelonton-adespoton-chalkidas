"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import LogoLink from "@/components/ui/LogoLink";
import { Link } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();
    const locale = useLocale();
    const t = useTranslations("nav");

    const isHomepage = pathname === "/" || pathname === `/${locale}`;
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: t("about"), href: "/about" },
        { name: t("animals"), href: "/animals" },
        { name: t("adopt"), href: "/adopt" },
        { name: t("foster"), href: "/foster" },
        { name: t("volunteer"), href: "/volunteer" },
        { name: t("blog"), href: "/blog" },
        { name: t("gallery"), href: "/gallery" },
        { name: t("contact"), href: "/contact" },
    ];

    const isTransparent = isHomepage && !isScrolled;

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isTransparent ? "bg-transparent" : "bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm"
            }`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-28">
                    <div className="flex-shrink-0">
                        <LogoLink />
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex lg:items-center lg:gap-8">
                        {navLinks.map((link) => (
                            <Link key={link.name} href={link.href} className="text-sm font-semibold transition-colors text-gray-800 hover:text-pink-600">
                                {link.name}
                            </Link>
                        ))}

                        <Button asChild className="bg-pink-700 hover:bg-pink-600 text-white font-bold">
                            <Link href="/donate">{t("donate")}</Link>
                        </Button>

                        <LanguageSwitcher />
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={`lg:hidden p-2 rounded-lg transition-colors ${isTransparent ? "text-pink-500 hover:bg-white/10" : "text-gray-700 hover:bg-gray-100"}`}
                        aria-label="Toggle menu">
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isOpen && (
                    <div className="lg:hidden bg-white border-t border-gray-200 shadow-2xl rounded-xl">
                        <div className="flex flex-col space-y-1 py-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="px-4 py-3 text-base font-medium text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors"
                                    onClick={() => setIsOpen(false)}>
                                    {link.name}
                                </Link>
                            ))}
                            <div className="px-4 pt-2">
                                <Button asChild className="w-full bg-pink-700 hover:bg-pink-600 text-white" onClick={() => setIsOpen(false)}>
                                    <Link href="/donate">{t("donate")}</Link>
                                </Button>
                            </div>
                            <div className="px-4 pt-1 pb-2">
                                <LanguageSwitcher />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
