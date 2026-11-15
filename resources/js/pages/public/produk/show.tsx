import { Head, Link } from "@inertiajs/react";
import ProductCard, { ProductImage } from "@/components/product-card";
import type { Product } from "@/components/product-card";
import { formatPrice } from "@/lib/format";

type Detail = Product & {
    category: { id: number; name: string; slug: string } | null;
};

export default function ProdukShow({
    product,
    related,
}: {
    product: Detail;
    related: Product[];
}) {
    return (
        <>
            <Head title={product.name}>
                {product.description && (
                    <meta
                        name="description"
                        content={product.description.slice(0, 150)}
                    />
                )}
            </Head>

            <div className="mx-auto max-w-6xl px-5 py-10">
                <nav
                    aria-label="Jejak halaman"
                    className="text-sm text-cocoa/70"
                >
                    <Link href="/" className="hover:underline">
                        Beranda
                    </Link>
                    {" / "}
                    <Link href="/produk" className="hover:underline">
                        Produk
                    </Link>
                    {product.category && (
                        <>
                            {" / "}
                            <Link
                                href={`/produk#${product.category.slug}`}
                                className="hover:underline"
                            >
                                {product.category.name}
                            </Link>
                        </>
                    )}
                </nav>

                <div className="mt-6 grid gap-8 md:grid-cols-2">
                    <div className="overflow-hidden rounded-3xl border border-sand bg-white">
                        <ProductImage
                            product={product}
                            className="aspect-square w-full object-cover"
                        />
                    </div>

                    <div className="flex flex-col gap-4">
                        {product.category && (
                            <span className="w-fit rounded-full bg-sand px-3 py-1 text-sm font-semibold">
                                {product.category.name}
                            </span>
                        )}
                        <h1 className="text-3xl font-extrabold md:text-4xl">
                            {product.name}
                        </h1>
                        <p className="text-2xl font-bold text-brand">
                            {formatPrice(product.price)}
                        </p>
                        {product.description && (
                            <p className="whitespace-pre-line text-cocoa/80">
                                {product.description}
                            </p>
                        )}
                        <div className="mt-2 flex flex-wrap gap-3">
                            <Link
                                href="/kontak"
                                className="inline-flex min-h-12 items-center rounded-full bg-brand px-7 font-bold text-white hover:bg-brand/90"
                            >
                                Tanya atau Pesan
                            </Link>
                            <Link
                                href="/produk"
                                className="inline-flex min-h-12 items-center rounded-full border-2 border-cocoa px-7 font-bold hover:bg-cocoa hover:text-cream"
                            >
                                Kembali ke Produk
                            </Link>
                        </div>
                    </div>
                </div>

                {related.length > 0 && (
                    <section className="mt-16">
                        <h2 className="mb-4 text-2xl font-extrabold">
                            Produk Lainnya
                        </h2>
                        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                            {related.map((item) => (
                                <ProductCard key={item.id} product={item} />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </>
    );
}
