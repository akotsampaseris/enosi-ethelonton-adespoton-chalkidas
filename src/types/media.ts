export interface MediaItem {
    _type: "image" | "video";
    url: string;
    mimeType?: string;
}
