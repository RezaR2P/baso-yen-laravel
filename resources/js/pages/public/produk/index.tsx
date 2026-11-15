import { Head } from "@inertiajs/react";
import ProductCard from "@/components/product-card";
import type { Product } from "@/components/product-card";

type Category = {
    id: number;
    name: string;
    slug: string;
    products: Product[];
};

export default function ProdukIndex({
    categories,
    others,
}: {
    categories: Category[];
    others: Product[];
}) {
    const sections = [
        ...categories
            .filter((category) => category.products.length > 0)
            .map((category) => ({
                key: category.slug,
                title: category.name,
                products: category.products,
            })),
        ...(others.length > 0
            ? [{ key: "lainnya", title: "Lainnya", products: others }]
            : []),
    ];

    return (
        <>
            <Head title="Produk" />
            <div className="mx-auto max-w-6xl px-5 py-12">
                <h1 className="text-3xl font-extrabold md:text-4xl">
                    Produk Kami
                </h1>
                <p className="mt-2 text-cocoa/70">Pilih menu favorit Anda.</p>

                {sections.length > 1 && (
                    <nav
                        aria-label="Kategori produk"
                        className="mt-6 flex flex-wrap gap-2"
                    >
                        {sections.map((section) => (
                            <a
                                key={section.key}
                                href={`#${section.key}`}
                                className="rounded-full border border-sand bg-white px-4 py-2 text-sm font-semibold hover:border-brand hover:text-brand"
                            >
                                {section.title}
                            </a>
                        ))}
                    </nav>
                )}

                {sections.length === 0 && (
                    <p className="mt-10 text-cocoa/70">
                        Produk akan segera hadir.
                    </p>
                )}

                {sections.map((section) => (
                    <section
                        key={section.key}
                        id={section.key}
                        className="mt-12 scroll-mt-24"
                    >
                        <h2 className="mb-4 text-2xl font-extrabold">
                            {section.title}
                        </h2>
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                            {section.products.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                />
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </>
    );
}
