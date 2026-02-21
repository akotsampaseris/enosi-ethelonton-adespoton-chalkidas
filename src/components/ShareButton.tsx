"use client";

import { useState } from "react";
import { Share2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ShareButtonProps {
  title: string;
  text?: string;
  url?: string;
  className?: string;
  showLabel?: boolean;
  variant?:
    | "default"
    | "outline"
    | "ghost"
    | "link"
    | "destructive"
    | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
}

export default function ShareButton({
  title,
  text,
  url,
  className = "",
  showLabel = true,
  variant = "default",
  size = "default",
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareUrl = url || window.location.href;
    const shareData = {
      title,
      text: text || title,
      url: shareUrl,
    };

    // Check if Web Share API is supported
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // User cancelled or error - fall back to copy
        if (err instanceof Error && err.name !== "AbortError") {
          copyToClipboard(shareUrl);
        }
      }
    } else {
      // Fallback: copy to clipboard
      copyToClipboard(shareUrl);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <Button
      onClick={handleShare}
      variant={variant}
      size={size}
      className={cn(className)}
    >
      {copied ? (
        <>
          <Check className={showLabel ? "mr-2" : ""} size={20} />
          {showLabel && <span>Αντιγράφηκε!</span>}
        </>
      ) : (
        <>
          <Share2 className={showLabel ? "mr-2" : ""} size={20} />
          {showLabel && <span>Κοινοποίηση</span>}
        </>
      )}
    </Button>
  );
}
