import { Head, Link } from "@inertiajs/react";
import ProductCard, { ProductImage } from "@/components/product-card";
import type { Product } from "@/components/product-card";

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

            <div className="mx-auto max-w-[1280px] px-4 py-10 sm:px-8 lg:py-14">
                <nav aria-label="Jejak halaman" className="text-sm text-muted">
                    <Link href="/" className="hover:text-brand">
                        Beranda
                    </Link>
                    {" / "}
                    <Link href="/produk" className="hover:text-brand">
                        Produk
                    </Link>
                    {product.category && (
                        <>
                            {" / "}
                            <Link
                                href={`/produk?kategori=${product.category.slug}`}
                                className="hover:text-brand"
                            >
                                {product.category.name}
                            </Link>
                        </>
                    )}
                </nav>

                <div className="mt-8 grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
                    <ProductImage
                        product={product}
                        className="aspect-square w-full rounded-[28px]"
                    />

                    <div className="flex flex-col gap-5">
                        {product.category && (
                            <span className="w-fit rounded-full bg-tan px-4 py-1.5 text-sm font-bold text-brand">
                                {product.category.name}
                            </span>
                        )}
                        <h1 className="text-4xl font-extrabold leading-tight tracking-tight lg:text-[44px]">
                            {product.name}
                        </h1>
                        {product.description && (
                            <p className="whitespace-pre-line text-lg leading-relaxed text-muted">
                                {product.description}
                            </p>
                        )}
                        <div className="mt-2 flex flex-wrap gap-3">
                            <Link
                                href="/kontak"
                                className="inline-flex min-h-12 items-center rounded-full bg-brand px-7 font-bold text-white hover:bg-brand-dark"
                            >
                                Tanya Produk Ini
                            </Link>
                            <Link
                                href="/resep"
                                className="inline-flex min-h-12 items-center rounded-full border-2 border-cocoa px-7 font-bold hover:bg-cocoa hover:text-cream"
                            >
                                Lihat Resep Terkait
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {related.length > 0 && (
                <section className="bg-tan py-14">
                    <div className="mx-auto max-w-[1280px] px-4 sm:px-8">
                        <h2 className="mb-8 text-3xl font-extrabold">
                            Produk Terkait
                        </h2>
                        <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
                            {related.map((item) => (
                                <ProductCard key={item.id} product={item} />
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}
