import { Link } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";
import { formatPrice } from "@/lib/format";

export type Product = {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    price: string | null;
    image_url: string | null;
};

export function ProductImage({
    product,
    className = "aspect-square w-full object-cover",
}: {
    product: Product;
    className?: string;
}) {
    const [failed, setFailed] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);

    // Menangkap gambar yang sudah gagal dimuat sebelum React siap.
    useEffect(() => {
        const img = imgRef.current;

        if (img && img.complete && img.naturalWidth === 0) {
            setFailed(true);
        }
    }, []);

    if (!product.image_url || failed) {
        return (
            <div className="flex aspect-square w-full items-center justify-center bg-sand/40 text-sm text-cocoa/60">
                Tanpa foto
            </div>
        );
    }

    return (
        <img
            ref={imgRef}
            src={product.image_url}
            alt={product.name}
            className={className}
            onError={() => setFailed(true)}
        />
    );
}

export default function ProductCard({ product }: { product: Product }) {
    return (
        <Link
            href={`/produk/${product.slug}`}
            className="group block overflow-hidden rounded-2xl border border-sand bg-white transition hover:shadow-md"
        >
            <ProductImage product={product} />
            <div className="p-3">
                <h3 className="font-bold group-hover:text-brand">
                    {product.name}
                </h3>
                {product.description && (
                    <p className="mt-1 line-clamp-2 text-sm text-cocoa/70">
                        {product.description}
                    </p>
                )}
                <p className="mt-2 font-semibold text-brand">
                    {formatPrice(product.price)}
                </p>
            </div>
        </Link>
    );
}
