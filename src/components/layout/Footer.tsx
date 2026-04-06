import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Facebook, Instagram, Linkedin, Twitter, Mail, MapPin, Heart } from "lucide-react";
import LogoLink from "@/components/ui/LogoLink";

export default function Footer() {
    const t = useTranslations("footer");

    const navigation = {
        adopt: [
            { name: t("nav.adopt.navItems.animals"), href: "/animals" },
            { name: t("nav.adopt.navItems.adoptionProcess"), href: "/adopt/process" },
            { name: t("nav.adopt.navItems.successStories"), href: "/stories" },
        ],
        support: [
            { name: t("nav.support.navItems.donate"), href: "/donate" },
            { name: t("nav.support.navItems.volunteer"), href: "/volunteer" },
            { name: t("nav.support.navItems.foster"), href: "/foster" },
        ],
        about: [
            { name: t("nav.about.navItems.ourMission"), href: "/about" },
            { name: t("nav.about.navItems.blog"), href: "/blog" },
            { name: t("nav.about.navItems.social"), href: "/social" },
        ],
        help: [
            { name: t("nav.usefulLinks.navItems.faq"), href: "/faq" },
            { name: t("nav.usefulLinks.navItems.contact"), href: "/contact" },
            { name: t("nav.usefulLinks.navItems.terms"), href: "/terms" },
        ],
    };

    return (
        <footer className="bg-gray-900" aria-labelledby="footer-heading">
            <h2 id="footer-heading" className="sr-only">
                Footer
            </h2>

            <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8">
                <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                    {/* Brand column */}
                    <div className="space-y-4">
                        <LogoLink />
                        <div className="space-y-2">
                            <h3 className="text-xl text-white font-semibold leading-7 sm:text-inde">{t("groupName")}</h3>
                            <p className="text-sm leading-6 text-gray-300">{t("tagline")}</p>
                        </div>

                        {/* Contact info */}
                        <div className="space-y-2 text-sm text-gray-300">
                            <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4" />
                                <a href="mailto:info@eeach.gr" className="hover:text-white transition">
                                    info@eeach.gr
                                </a>
                            </div>
                            <div className="flex items-start gap-2">
                                <MapPin className="h-4 w-4 mt-0.5" />
                                <span>{t("location")}</span>
                            </div>
                        </div>

                        {/* Social links */}
                        <div className="flex-wrap gap-16">
                            <h4 className="py-2 text-lg text-white font-bold">{t("socialLinks.title")}</h4>
                            <div className="flex gap-4">
                                <a href="https://facebook.com/ethelontesadespotwnchalkidas" className="text-gray-400 hover:text-pink-500 transition">
                                    <span className="sr-only">Facebook</span>
                                    <Facebook className="h-6 w-6" />
                                </a>
                                <a href="https://instagram.com/enosi_ethel_adespoton_chalkida" className="text-gray-400 hover:text-pink-500 transition">
                                    <span className="sr-only">Instagram</span>
                                    <Instagram className="h-6 w-6" />
                                </a>
                                <a href="https://x.com/enethadchal" className="text-gray-400 hover:text-pink-500 transition">
                                    <span className="sr-only">X (Twitter)</span>
                                    <Twitter className="h-6 w-6" />
                                </a>
                                <a href="https://linkedin.com/in/eeach" className="text-gray-400 hover:text-pink-500 transition">
                                    <span className="sr-only">LinkedIn</span>
                                    <Linkedin className="h-6 w-6" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Navigation columns */}
                    <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold leading-6 text-white">{t("nav.adopt.title")}</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    {navigation.adopt.map((item) => (
                                        <li key={item.name}>
                                            <Link href={item.href} className="text-sm leading-6 text-gray-300 hover:text-white transition">
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-10 md:mt-0">
                                <h3 className="text-sm font-semibold leading-6 text-white">{t("nav.support.title")}</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    {navigation.support.map((item) => (
                                        <li key={item.name}>
                                            <Link href={item.href} className="text-sm leading-6 text-gray-300 hover:text-white transition">
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold leading-6 text-white">{t("nav.about.title")}</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    {navigation.about.map((item) => (
                                        <li key={item.name}>
                                            <Link href={item.href} className="text-sm leading-6 text-gray-300 hover:text-white transition">
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-10 md:mt-0">
                                <h3 className="text-sm font-semibold leading-6 text-white">{t("nav.usefulLinks.title")}</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    {navigation.help.map((item) => (
                                        <li key={item.name}>
                                            <Link href={item.href} className="text-sm leading-6 text-gray-300 hover:text-white transition">
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom section */}
                <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
                    <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
                        <p className="text-xs leading-5 text-gray-400">
                            © 2025 - {new Date().getFullYear()} {t("copyright")}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                            Made with <Heart className="h-3 w-3 fill-pink-500 text-pink-500" /> for animals by
                            <Link href="https://negativeentropy.me" target="_blank" className="text-blue-500 hover:text-pink-500">
                                negativeentropy.me
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
