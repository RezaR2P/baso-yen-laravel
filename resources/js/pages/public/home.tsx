import { Head, Link } from "@inertiajs/react";
import ArticleCard from "@/components/article-card";
import type { ArticleSummary } from "@/components/article-card";
import ProductCard from "@/components/product-card";
import type { Product } from "@/components/product-card";
import RecipeCard from "@/components/recipe-card";
import type { Recipe } from "@/components/recipe-card";

function SectionHeading({ title, href }: { title: string; href: string }) {
    return (
        <div className="mb-6 flex items-end justify-between gap-4">
            <h2 className="text-2xl font-extrabold md:text-3xl">{title}</h2>
            <Link
                href={href}
                className="font-bold whitespace-nowrap text-brand"
            >
                Lihat semua →
            </Link>
        </div>
    );
}

export default function Home({
    featured,
    recipes,
    articles,
}: {
    featured: Product[];
    recipes: Recipe[];
    articles: ArticleSummary[];
}) {
    return (
        <>
            <Head title="Beranda" />

            {/* Hero */}
            <section className="border-b border-sand">
                <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
                    <p className="text-sm font-bold tracking-wide text-brand uppercase">
                        Baso Yen
                    </p>
                    <h1 className="mt-3 max-w-2xl text-4xl leading-tight font-extrabold md:text-6xl">
                        Hangat di mangkuk, enak di setiap suapan.
                    </h1>
                    <p className="mt-4 max-w-xl text-lg text-cocoa/70">
                        Baso dan olahan pilihan yang dibuat segar setiap hari.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                        <Link
                            href="/produk"
                            className="inline-flex min-h-12 items-center rounded-full bg-brand px-7 font-bold text-white hover:bg-brand/90"
                        >
                            Lihat Produk
                        </Link>
                        <Link
                            href="/kontak"
                            className="inline-flex min-h-12 items-center rounded-full border-2 border-cocoa px-7 font-bold hover:bg-cocoa hover:text-cream"
                        >
                            Hubungi Kami
                        </Link>
                    </div>
                </div>
            </section>

            {/* Produk unggulan */}
            <section className="mx-auto max-w-6xl px-5 py-14">
                <SectionHeading title="Menu Pilihan" href="/produk" />

                {featured.length === 0 ? (
                    <p className="text-cocoa/70">Menu akan segera hadir.</p>
                ) : (
                    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                        {featured.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </section>

            {/* Resep terbaru */}
            {recipes.length > 0 && (
                <section className="border-y border-sand bg-white/50">
                    <div className="mx-auto max-w-6xl px-5 py-14">
                        <SectionHeading title="Resep Terbaru" href="/resep" />
                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {recipes.map((recipe) => (
                                <RecipeCard key={recipe.id} recipe={recipe} />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Artikel terbaru */}
            {articles.length > 0 && (
                <section className="mx-auto max-w-6xl px-5 py-14">
                    <SectionHeading title="Artikel Terbaru" href="/artikel" />
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {articles.map((article) => (
                            <ArticleCard key={article.id} article={article} />
                        ))}
                    </div>
                </section>
            )}

            {/* Ajakan menghubungi */}
            <section className="bg-brand text-white">
                <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-12 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h2 className="text-2xl font-extrabold">
                            Ada pertanyaan atau pesanan khusus?
                        </h2>
                        <p className="text-white/80">
                            Tulis pesan Anda, kami balas lewat email.
                        </p>
                    </div>
                    <Link
                        href="/kontak"
                        className="inline-flex min-h-12 w-fit items-center rounded-full bg-white px-7 font-bold text-brand hover:bg-cream"
                    >
                        Kirim Pesan
                    </Link>
                </div>
            </section>
        </>
    );
}
