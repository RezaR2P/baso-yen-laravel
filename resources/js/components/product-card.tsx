import { Link } from "@inertiajs/react";
import Photo from "@/components/photo";

export type Product = {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    price?: string | null;
    image_url: string | null;
    category?: { id?: number; name: string } | null;
};

export function ProductImage({
    product,
    className = "aspect-square w-full rounded-[28px]",
}: {
    product: Product;
    className?: string;
}) {
    return (
        <Photo
            src={product.image_url}
            alt={product.name}
            className={className}
        />
    );
}

export default function ProductCard({ product }: { product: Product }) {
    return (
        <Link
            href={`/produk/${product.slug}`}
            className="group block space-y-3"
        >
            <Photo
                src={product.image_url}
                alt={product.name}
                className="aspect-[4/3] w-full rounded-[20px]"
            />
            <div className="space-y-1">
                {product.category?.name && (
                    <p className="text-xs font-bold uppercase tracking-wide text-brand">
                        {product.category.name}
                    </p>
                )}
                <h3 className="text-lg font-extrabold group-hover:text-brand">
                    {product.name}
                </h3>
                {product.description && (
                    <p className="line-clamp-1 text-sm text-muted">
                        {product.description}
                    </p>
                )}
            </div>
        </Link>
    );
}
