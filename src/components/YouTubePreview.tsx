function getYouTubeId(url: string) {
  try {
    const u = new URL(url);

    // youtu.be/VIDEO_ID
    if (u.hostname.includes("youtu.be")) return u.pathname.slice(1);

    // youtube.com/watch?v=VIDEO_ID
    if (u.searchParams.get("v")) return u.searchParams.get("v");

    // youtube.com/shorts/VIDEO_ID or /embed/VIDEO_ID
    const parts = u.pathname.split("/").filter(Boolean);
    const idx = parts.findIndex((p) => p === "shorts" || p === "embed");
    if (idx !== -1 && parts[idx + 1]) return parts[idx + 1];

    return null;
  } catch {
    return null;
  }
}

interface YouTubePreviewProps {
  url: string;
  className?: string;
}

export function YouTubePreview({ url, className = "" }: YouTubePreviewProps) {
  const id = getYouTubeId(url);
  if (!id) return null;

  const thumbMax = `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
  const thumbHQ = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

  return (
    <img
      src={thumbMax}
      alt="YouTube preview"
      loading="lazy"
      onError={(e) => {
        (e.currentTarget as HTMLImageElement).src = thumbHQ;
      }}
      className={className}
    />
  );
}

export function getYouTubeThumbnail(url: string): string | null {
  const id = getYouTubeId(url);
  if (!id) return null;
  return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
}

export default YouTubePreview;
