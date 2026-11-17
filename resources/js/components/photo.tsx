import { useState } from "react";

type Props = {
    src?: string | null;
    alt?: string;
    className?: string;
};

export default function Photo({ src, alt = "", className = "" }: Props) {
    const [failed, setFailed] = useState(false);

    if (!src || failed) {
        return (
            <div
                aria-hidden="true"
                className={className}
                style={{
                    background:
                        "repeating-linear-gradient(135deg,#F5E6D6,#F5E6D6 12px,#EFDCC8 12px,#EFDCC8 24px)",
                }}
            />
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            loading="lazy"
            onError={() => setFailed(true)}
            className={`object-cover ${className}`}
        />
    );
}
