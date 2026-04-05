"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { ChevronDown } from "lucide-react";

const localeLabels: Record<string, { short: string; long: string }> = {
    el: { short: "ΕΛ", long: "Ελληνικά" },
    en: { short: "EN", long: "English" },
};

const locales = ["el", "en"] as const;

export default function LanguageSwitcher() {
    const [isOpen, setIsOpen] = useState(false);
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const ref = useRef<HTMLDivElement>(null);

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const switchTo = (next: string) => {
        router.replace(pathname, { locale: next });
        setIsOpen(false);
    };

    return (
        <div ref={ref} className="relative">
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="flex items-center gap-1 text-sm font-semibold text-gray-600 hover:text-pink-600 transition-colors border border-gray-300 hover:border-pink-400 rounded-md px-2 py-1">
                {localeLabels[locale].short}
                <ChevronDown size={14} className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-50">
                    {locales.map((l) => (
                        <button
                            key={l}
                            onClick={() => switchTo(l)}
                            className={`w-full text-left px-4 py-2 text-sm transition-colors
                ${l === locale ? "bg-pink-50 text-pink-600 font-semibold" : "text-gray-700 hover:bg-gray-50 hover:text-pink-600"}`}>
                            <span className="font-mono text-xs text-gray-400 mr-2">{localeLabels[l].short}</span>
                            {localeLabels[l].long}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
