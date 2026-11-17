import { Head, Link } from "@inertiajs/react";
import ArticleCard from "@/components/article-card";
import type { ArticleSummary } from "@/components/article-card";
import SafeImage from "@/components/safe-image";
import { formatDate } from "@/lib/format";

type Article = ArticleSummary & { content: string };

export default function ArtikelShow({
    article,
    related,
}: {
    article: Article;
    related: ArticleSummary[];
}) {
    // Baris kosong memisahkan paragraf; baris tunggal tetap jadi baris baru.
    const paragraphs = article.content
        .split(/\n{2,}/)
        .map((p) => p.trim())
        .filter(Boolean);

    return (
        <>
            <Head title={article.title}>
                {article.summary && (
                    <meta
                        name="description"
                        content={article.summary.slice(0, 150)}
                    />
                )}
            </Head>

            <article className="mx-auto max-w-3xl px-5 py-10">
                <nav
                    aria-label="Jejak halaman"
                    className="text-sm text-cocoa/70"
                >
                    <Link href="/" className="hover:underline">
                        Beranda
                    </Link>
                    {" / "}
                    <Link href="/artikel" className="hover:underline">
                        Artikel
                    </Link>
                </nav>

                <p className="mt-4 text-sm font-semibold text-brand">
                    {[article.category, formatDate(article.published_at)]
                        .filter(Boolean)
                        .join(" · ")}
                </p>
                <h1 className="mt-1 text-3xl leading-tight font-extrabold md:text-4xl">
                    {article.title}
                </h1>
                {article.summary && (
                    <p className="mt-3 text-lg text-cocoa/70">
                        {article.summary}
                    </p>
                )}

                <SafeImage
                    src={article.image_url}
                    alt={article.title}
                    className="mt-6 aspect-[16/9] w-full rounded-3xl border border-sand object-cover"
                />

                <div className="mt-8 space-y-4 text-lg leading-relaxed">
                    {paragraphs.map((paragraph, i) => (
                        <p key={i} className="whitespace-pre-line">
                            {paragraph}
                        </p>
                    ))}
                </div>
            </article>

            {related.length > 0 && (
                <section className="mx-auto max-w-6xl px-5 pb-16">
                    <h2 className="mb-4 text-2xl font-extrabold">
                        Artikel Lainnya
                    </h2>
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {related.map((item) => (
                            <ArticleCard key={item.id} article={item} />
                        ))}
                    </div>
                </section>
            )}
        </>
    );
}
