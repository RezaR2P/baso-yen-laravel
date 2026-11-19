import { Head, Link } from "@inertiajs/react";
import Pagination from "@/components/pagination";
import type { PageLink } from "@/components/pagination";
import ProductCard from "@/components/product-card";
import type { Product } from "@/components/product-card";

type Category = { id: number; name: string; slug: string };

type Props = {
    categories: Category[];
    products: { data: Product[]; links: PageLink[] };
    activeCategory: string | null;
};

const pill =
    "inline-flex min-h-11 items-center rounded-full px-5 text-sm font-bold";

export default function ProdukIndex({
    categories,
    products,
    activeCategory,
}: Props) {
    return (
        <>
            <Head title="Produk" />

            <div className="mx-auto max-w-[1280px] px-4 py-10 sm:px-8 lg:py-14">
                <nav aria-label="Jejak halaman" className="text-sm text-muted">
                    <Link href="/" className="hover:text-brand">
                        Beranda
                    </Link>
                    {" / "}
                    <span className="text-cocoa">Produk</span>
                </nav>

                <h1 className="mt-4 text-4xl font-extrabold tracking-tight lg:text-[44px]">
                    Produk Kami
                </h1>
                <p className="mt-2 max-w-2xl text-lg text-muted">
                    Pilih produk favorit Anda dari berbagai kategori.
                </p>

                <div
                    className="mt-8 flex flex-wrap gap-2"
                    role="group"
                    aria-label="Filter kategori"
                >
                    <Link
                        href="/produk"
                        className={`${pill} ${
                            !activeCategory
                                ? "bg-brand text-white"
                                : "border-[1.5px] border-sand bg-white hover:border-brand hover:text-brand"
                        }`}
                    >
                        Semua
                    </Link>
                    {categories.map((c) => (
                        <Link
                            key={c.id}
                            href={`/produk?kategori=${c.slug}`}
                            className={`${pill} ${
                                activeCategory === c.slug
                                    ? "bg-brand text-white"
                                    : "border-[1.5px] border-sand bg-white hover:border-brand hover:text-brand"
                            }`}
                        >
                            {c.name}
                        </Link>
                    ))}
                </div>

                {products.data.length === 0 ? (
                    <p className="mt-12 text-muted">
                        Belum ada produk di kategori ini.
                    </p>
                ) : (
                    <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
                        {products.data.map((p) => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>
                )}

                <Pagination links={products.links} />
            </div>
        </>
    );
}
