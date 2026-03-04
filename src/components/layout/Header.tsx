"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();

    const isHomepage = pathname === "/";

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Σχετικά με εμάς", href: "/about" },
        { name: "Τα ζώα μας", href: "/animals" },
        { name: "Υιοθέτησε", href: "/adopt" },
        { name: "Φιλοξένησε", href: "/foster" },
        { name: "Εθελοντισμός", href: "/volunteer" },
        { name: "Blog", href: "/blog" },
        { name: "Επικοινωνία", href: "/contact" },
    ];

    // On homepage: transparent until scroll, then white
    // On other pages: always white
    const isTransparent = isHomepage && !isScrolled;

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isTransparent ? "bg-transparent" : "bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm"
            }`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-28">
                    <div className="flex-shrink-0">
                        <Link href="/" className="flex items-center">
                            <Image
                                src="/logo.png"
                                alt="Ένωση Εθελοντών Αδέσποτων Χαλκίδας"
                                width={180}
                                height={60}
                                className="h-24 w-auto"
                                priority
                                quality={80}
                                placeholder="blur"
                                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCACCAIIDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDs6KKKACmmnU00AIaSlNNoKCikooGOopKWgBaWkpaBC0UlLQIKKKKBBRRRQAtFFJQAGkNFIaBiGkoNIaBhSZpM0ZoGOzRmm5ozQMfmlzTM0uaBD80U3NLmgQ7NGabmlzQIXNFJmigB1JRRQAU00pppoGIaaaU000DDNJmgmm5oGOzRmm5ozQMfmlzUeaXNAEmaXNMBpc0Ej80ZpuaXNAhc0UmaKBElJRRQMQ0004000DGmmmnGmmgY00hpTTTQMM0ZpKKChc0oNNpRSEPBpQaaKUUCY6lpKKZI6ikooES0UtJQAhpppxppoAaaaacaaaBjTTTTjTTQUhtFLRQUJThSUopCFFOFIKUUCYopaBS0yQooooETUUtFAhpppp5ppoAYaaaeaaaChhppp5FJigYzFGKdijFAxuKcBRinAUAIBTgKAKcBQSxMUuKXFGKCRKKXFFAE1FFFAhDTTT6aaAGGmmnmmmgoYaTFPpMUDG4oxS4pcUDExSgUuKXFAriAUuKXFLigkTFLilxRigQmKKXFFAD6KKKACkNLSGgBppppxppoGJSUtFAxKKWigAxTsUlOoEFFLRQIKKWigQUUUUALRRRQMKQ0UUANNIaKKBjaKKKACloooGLS0UUCFpaKKBBRRRQIKKKKAP/Z"
                            />
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex lg:items-center lg:gap-8">
                        {navLinks.map((link) => (
                            <Link key={link.name} href={link.href} className="text-sm font-semibold transition-colors text-gray-800 hover:text-pink-600">
                                {link.name}
                            </Link>
                        ))}

                        <Button asChild className="bg-[#9D2364] hover:bg-pink-600 text-white font-bold">
                            <Link href="/donate">Δωρεά</Link>
                        </Button>
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
                                <Button asChild className="w-full bg-[#9D2364] hover:bg-pink-600 text-white" onClick={() => setIsOpen(false)}>
                                    <Link href="/donate">Δωρεά</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
