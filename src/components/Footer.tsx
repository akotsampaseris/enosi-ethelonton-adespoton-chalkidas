import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Mail, Phone, MapPin, Heart } from "lucide-react";

const navigation = {
    adopt: [
        { name: "Available Animals", href: "/animals" },
        { name: "Adoption Process", href: "/adopt/process" },
        { name: "Adoption FAQ", href: "/adopt/faq" },
        { name: "Success Stories", href: "/stories" },
    ],
    support: [
        { name: "Donate", href: "/donate" },
        { name: "Volunteer", href: "/volunteer" },
        { name: "Foster Program", href: "/foster" },
        { name: "Sponsor an Animal", href: "/sponsor" },
    ],
    about: [
        { name: "Our Mission", href: "/about" },
        { name: "Our Team", href: "/team" },
        { name: "Blog", href: "/blog" },
        { name: "Contact Us", href: "/contact" },
    ],
};

export function Footer() {
    return (
        <footer className="bg-gray-900" aria-labelledby="footer-heading">
            <h2 id="footer-heading" className="sr-only">
                Footer
            </h2>

            <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8">
                <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                    {/* Brand column */}
                    <div className="space-y-8">
                        <Image
                            src="/logo.png"
                            alt="Animal Rights Volunteer Group"
                            width={150}
                            height={150}
                            className="h-24 w-auto brightness-0 invert"
                        />
                        <p className="text-sm leading-6 text-gray-300">
                            Rescuing, caring for, and rehoming stray animals in
                            our community. Every animal deserves a loving home.
                        </p>

                        {/* Contact info */}
                        <div className="space-y-2 text-sm text-gray-300">
                            <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4" />
                                <a
                                    href="tel:+302101234567"
                                    className="hover:text-white transition"
                                >
                                    +30 210 123 4567
                                </a>
                            </div>
                            <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4" />
                                <a
                                    href="mailto:info@animalrescue.gr"
                                    className="hover:text-white transition"
                                >
                                    info@animalrescue.gr
                                </a>
                            </div>
                            <div className="flex items-start gap-2">
                                <MapPin className="h-4 w-4 mt-0.5" />
                                <span>Athens, Greece</span>
                            </div>
                        </div>

                        {/* Social links */}
                        <div className="flex gap-4">
                            <a
                                href="#"
                                className="text-gray-400 hover:text-pink-500 transition"
                            >
                                <span className="sr-only">Facebook</span>
                                <Facebook className="h-6 w-6" />
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-pink-500 transition"
                            >
                                <span className="sr-only">Instagram</span>
                                <Instagram className="h-6 w-6" />
                            </a>
                        </div>
                    </div>

                    {/* Navigation columns */}
                    <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold leading-6 text-white">
                                    Adopt
                                </h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    {navigation.adopt.map((item) => (
                                        <li key={item.name}>
                                            <Link
                                                href={item.href}
                                                className="text-sm leading-6 text-gray-300 hover:text-white transition"
                                            >
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-10 md:mt-0">
                                <h3 className="text-sm font-semibold leading-6 text-white">
                                    Support Us
                                </h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    {navigation.support.map((item) => (
                                        <li key={item.name}>
                                            <Link
                                                href={item.href}
                                                className="text-sm leading-6 text-gray-300 hover:text-white transition"
                                            >
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold leading-6 text-white">
                                About
                            </h3>
                            <ul role="list" className="mt-6 space-y-4">
                                {navigation.about.map((item) => (
                                    <li key={item.name}>
                                        <Link
                                            href={item.href}
                                            className="text-sm leading-6 text-gray-300 hover:text-white transition"
                                        >
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom section */}
                <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
                    <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
                        <p className="text-xs leading-5 text-gray-400">
                            © {new Date().getFullYear()} Animal Rights Volunteer
                            Group. All rights reserved.
                        </p>
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                            Made with{" "}
                            <Heart className="h-3 w-3 fill-pink-500 text-pink-500" />{" "}
                            for animals
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
