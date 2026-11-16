import { useEffect, useRef, useState } from "react";

export default function SafeImage({
    src,
    alt,
    className = "",
}: {
    src: string | null;
    alt: string;
    className?: string;
}) {
    const [failed, setFailed] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const img = imgRef.current;

        if (img && img.complete && img.naturalWidth === 0) {
            setFailed(true);
        }
    }, []);

    if (!src || failed) {
        return (
            <div
                className={`flex items-center justify-center bg-sand/40 text-sm text-cocoa/60 ${className}`}
            >
                Tanpa foto
            </div>
        );
    }

    return (
        <img
            ref={imgRef}
            src={src}
            alt={alt}
            className={className}
            onError={() => setFailed(true)}
        />
    );
}
