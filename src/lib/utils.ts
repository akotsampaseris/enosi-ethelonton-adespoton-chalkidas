import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { PortableTextBlock } from "next-sanity";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatDate(date: string, format: "full" | "short" = "full") {
    if (format === "full") {
        return new Date(date).toLocaleDateString("el-GR", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    }

    return new Date(date).toLocaleDateString("el-GR");
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

export function formatWeight(weight: number): string {
    if (weight < 1) {
        return `${weight * 100} γραμμάρια`;
    }

    if (weight == 1) {
        return "1 κιλό";
    }
    return `${weight} κιλά`;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function portableToPlainText(blocks: PortableTextBlock[]): string {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return blocks.map((block) => block.children?.map((c: any) => c.text).join("") ?? "").join(" ");
}
