import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatDate(date: string) {
    return new Date(date).toLocaleDateString("el-GR", {
        year: "numeric",
        month: "long",
    });
}

export function formatAge(age: number, unit: "Χρόνια" | "Μήνες" = "Χρόνια"): string {
    if (unit === "Μήνες") {
        if (age === 1) {
            return "1 μήνα";
        }
        return `${age} μηνών`;
    }

    // years
    if (age === 1) {
        return "1 έτους";
    }
    return `${age} χρονών`;
}
