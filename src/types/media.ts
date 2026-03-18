export interface MediaItem {
    _type: "image" | "file";
    url: string;
    mimeType?: string;
}
