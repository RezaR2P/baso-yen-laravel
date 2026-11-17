import { Head, Link } from "@inertiajs/react";
import ArticleCard from "@/components/article-card";
import type { ArticleSummary } from "@/components/article-card";

type Paginated = {
    data: ArticleSummary[];
    prev_page_url: string | null;
    next_page_url: string | null;
};

const chipClass = (active: boolean) =>
    `rounded-full border px-4 py-2 text-sm font-semibold ${
        active
            ? "border-brand bg-brand text-white"
            : "border-sand bg-white hover:border-brand hover:text-brand"
    }`;

export default function ArtikelIndex({
    articles,
    categories,
    activeCategory,
}: {
    articles: Paginated;
    categories: string[];
    activeCategory: string | null;
}) {
    return (
        <>
            <Head title="Artikel" />
            <div className="mx-auto max-w-6xl px-5 py-12">
                <h1 className="text-3xl font-extrabold md:text-4xl">Artikel</h1>
                <p className="mt-2 text-cocoa/70">
                    Tips, berita, dan cerita dari dapur kami.
                </p>

                {categories.length > 0 && (
                    <nav
                        aria-label="Kategori artikel"
                        className="mt-6 flex flex-wrap gap-2"
                    >
                        <Link
                            href="/artikel"
                            className={chipClass(!activeCategory)}
                        >
                            Semua
                        </Link>
                        {categories.map((category) => (
                            <Link
                                key={category}
                                href={`/artikel?kategori=${encodeURIComponent(category)}`}
                                className={chipClass(
                                    activeCategory === category,
                                )}
                            >
                                {category}
                            </Link>
                        ))}
                    </nav>
                )}

                {articles.data.length === 0 ? (
                    <p className="mt-10 text-cocoa/70">
                        Belum ada artikel di sini.
                    </p>
                ) : (
                    <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {articles.data.map((article) => (
                            <ArticleCard key={article.id} article={article} />
                        ))}
                    </div>
                )}

                {(articles.prev_page_url || articles.next_page_url) && (
                    <nav
                        aria-label="Halaman artikel"
                        className="mt-10 flex justify-between gap-3"
                    >
                        {articles.prev_page_url ? (
                            <Link
                                href={articles.prev_page_url}
                                className="rounded-full border border-sand bg-white px-5 py-2 font-semibold hover:border-brand"
                            >
                                ← Sebelumnya
                            </Link>
                        ) : (
                            <span />
                        )}
                        {articles.next_page_url && (
                            <Link
                                href={articles.next_page_url}
                                className="rounded-full border border-sand bg-white px-5 py-2 font-semibold hover:border-brand"
                            >
                                Berikutnya →
                            </Link>
                        )}
                    </nav>
                )}
            </div>
        </>
    );
}
