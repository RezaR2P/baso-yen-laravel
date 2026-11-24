import { Head, Link } from "@inertiajs/react";
import { useState } from "react";
import ArticleCard from "@/components/article-card";
import type { ArticleSummary } from "@/components/article-card";
import Photo from "@/components/photo";
import { formatDate } from "@/lib/format";

type Article = ArticleSummary & { content: string };

const shareBtn =
    "inline-flex min-h-11 items-center rounded-full border-[1.5px] border-sand bg-white px-5 text-sm font-bold hover:border-brand hover:text-brand";

export default function ArtikelShow({
    article,
    related,
}: {
    article: Article;
    related: ArticleSummary[];
}) {
    const [copied, setCopied] = useState(false);

    // Baris kosong memisahkan blok. "## " = subjudul, "> " = kutipan.
    const blocks = (article.content ?? "")
        .split(/\n{2,}/)
        .map((b) => b.trim())
        .filter(Boolean);

    // Perkiraan waktu baca: 200 kata per menit.
    const words = (article.content ?? "").split(/\s+/).filter(Boolean).length;
    const readMinutes = Math.max(1, Math.ceil(words / 200));

    const shareWhatsApp = () => {
        const text = `${article.title} ${window.location.href}`;
        window.open(
            `https://wa.me/?text=${encodeURIComponent(text)}`,
            "_blank",
            "noopener",
        );
    };

    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Browser menolak akses clipboard; abaikan saja.
        }
    };

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

            <article className="mx-auto max-w-[800px] px-4 py-10 sm:px-8 lg:py-14">
                <nav aria-label="Jejak halaman" className="text-sm text-muted">
                    <Link href="/" className="hover:text-brand">
                        Beranda
                    </Link>
                    {" / "}
                    <Link href="/artikel" className="hover:text-brand">
                        Artikel
                    </Link>
                </nav>

                {article.category && (
                    <p className="mt-6 text-xs font-bold uppercase tracking-wide text-brand">
                        {article.category}
                    </p>
                )}
                <h1 className="mt-2 text-4xl font-extrabold leading-tight tracking-tight lg:text-[44px]">
                    {article.title}
                </h1>
                <p className="mt-3 text-muted">
                    {[
                        article.published_at
                            ? formatDate(article.published_at)
                            : null,
                        `${readMinutes} menit baca`,
                    ]
                        .filter(Boolean)
                        .join(" · ")}
                </p>

                <Photo
                    src={article.image_url}
                    alt={article.title}
                    className="mt-8 aspect-video w-full rounded-3xl"
                />

                <div className="mt-10 space-y-6 text-lg leading-relaxed">
                    {blocks.map((block, i) => {
                        if (block.startsWith("## ")) {
                            return (
                                <h2
                                    key={i}
                                    className="pt-4 text-[28px] font-extrabold leading-tight"
                                >
                                    {block.slice(3)}
                                </h2>
                            );
                        }
                        if (block.startsWith("> ")) {
                            return (
                                <blockquote
                                    key={i}
                                    className="whitespace-pre-line rounded-[20px] bg-tan p-6 font-semibold"
                                >
                                    {block.replace(/^>\s?/gm, "")}
                                </blockquote>
                            );
                        }
                        return (
                            <p key={i} className="whitespace-pre-line">
                                {block}
                            </p>
                        );
                    })}
                </div>

                <div className="mt-12 flex flex-wrap items-center gap-3 border-t border-sand pt-6">
                    <span className="font-bold">Bagikan:</span>
                    <button
                        type="button"
                        onClick={shareWhatsApp}
                        className={shareBtn}
                    >
                        WhatsApp
                    </button>
                    <button
                        type="button"
                        onClick={copyLink}
                        className={shareBtn}
                    >
                        {copied ? "Tersalin!" : "Salin tautan"}
                    </button>
                </div>
            </article>

            {related.length > 0 && (
                <section className="bg-tan py-14">
                    <div className="mx-auto max-w-[1280px] px-4 sm:px-8">
                        <h2 className="mb-8 text-3xl font-extrabold">
                            Artikel Lainnya
                        </h2>
                        <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                            {related.map((a) => (
                                <ArticleCard key={a.id} article={a} />
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}
