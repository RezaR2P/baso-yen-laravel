import { Head, Link } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";

type Product = {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    price: string | null;
    image_url: string | null;
    is_featured: boolean;
};

type Category = {
    id: number;
    name: string;
    slug: string;
    products: Product[];
};

type Props = {
    categories: Category[];
};

function formatPrice(price: string | null): string {
    if (price === null) {
        return "Hubungi kami";
    }

    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    }).format(Number(price));
}

function ProductImage({ product }: { product: Product }) {
    const [failed, setFailed] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const img = imgRef.current;

        if (img && img.complete && img.naturalWidth === 0) {
            setFailed(true);
        }
    }, []);

    if (!product.image_url || failed) {
        return (
            <div className="flex aspect-square items-center justify-center bg-muted text-sm text-muted-foreground">
                Tanpa foto
            </div>
        );
    }

    return (
        <img
            ref={imgRef}
            src={product.image_url}
            alt={product.name}
            className="aspect-square w-full object-cover"
            onError={() => setFailed(true)}
        />
    );
}
export default function Menu({ categories }: Props) {
    return (
        <>
            <Head title="Menu" />

            <div className="min-h-screen bg-background text-foreground">
                <header className="border-b border-border">
                    <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                        <Link href="/" className="text-lg font-semibold">
                            Baso Yen
                        </Link>
                        <span className="text-sm text-muted-foreground">
                            Menu
                        </span>
                    </div>
                </header>

                <main className="mx-auto max-w-6xl px-6 py-10">
                    <h1 className="mb-8 text-3xl font-bold">Menu Kami</h1>

                    {categories.map((category) => (
                        <section key={category.id} className="mb-12">
                            <h2 className="mb-4 text-xl font-semibold">
                                {category.name}
                            </h2>

                            {category.products.length === 0 ? (
                                <p className="text-sm text-muted-foreground">
                                    Belum ada produk di kategori ini.
                                </p>
                            ) : (
                                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                                    {category.products.map((product) => (
                                        <article
                                            key={product.id}
                                            className="overflow-hidden rounded-lg border border-border"
                                        >
                                            <ProductImage product={product} />
                                            <div className="p-3">
                                                <h3 className="font-medium">
                                                    {product.name}
                                                </h3>
                                                {product.description && (
                                                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                                                        {product.description}
                                                    </p>
                                                )}
                                                <p className="mt-2 font-semibold">
                                                    {formatPrice(product.price)}
                                                </p>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            )}
                        </section>
                    ))}
                </main>
            </div>
        </>
    );
}
