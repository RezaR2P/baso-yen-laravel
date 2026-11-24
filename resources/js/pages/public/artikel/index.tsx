import { Head, Link } from "@inertiajs/react";
import ArticleCard from "@/components/article-card";
import type { ArticleSummary } from "@/components/article-card";
import Pagination from "@/components/pagination";
import type { PageLink } from "@/components/pagination";
import Photo from "@/components/photo";
import { formatDate } from "@/lib/format";

type Props = {
    featured: ArticleSummary | null;
    articles: { data: ArticleSummary[]; links: PageLink[] };
    categories: string[];
    activeCategory: string | null;
};

const pill =
    "inline-flex min-h-11 items-center rounded-full px-5 text-sm font-bold";
const pillOn = "bg-brand text-white";
const pillOff =
    "border-[1.5px] border-sand bg-white hover:border-brand hover:text-brand";

export default function ArtikelIndex({
    featured,
    articles,
    categories,
    activeCategory,
}: Props) {
    return (
        <>
            <Head title="Artikel" />

            <div className="mx-auto max-w-[1280px] px-4 py-10 sm:px-8 lg:py-14">
                <nav aria-label="Jejak halaman" className="text-sm text-muted">
                    <Link href="/" className="hover:text-brand">
                        Beranda
                    </Link>
                    {" / "}
                    <span className="text-cocoa">Artikel</span>
                </nav>

                <h1 className="mt-4 text-4xl font-extrabold tracking-tight lg:text-[44px]">
                    Artikel &amp; Blog
                </h1>
                <p className="mt-2 max-w-2xl text-lg text-muted">
                    Tips, berita, dan cerita dari dapur kami.
                </p>

                {categories.length > 0 && (
                    <div
                        className="mt-8 flex flex-wrap gap-2"
                        role="group"
                        aria-label="Filter kategori"
                    >
                        <Link
                            href="/artikel"
                            className={`${pill} ${!activeCategory ? pillOn : pillOff}`}
                        >
                            Semua
                        </Link>
                        {categories.map((c) => (
                            <Link
                                key={c}
                                href={`/artikel?kategori=${encodeURIComponent(c)}`}
                                className={`${pill} ${activeCategory === c ? pillOn : pillOff}`}
                            >
                                {c}
                            </Link>
                        ))}
                    </div>
                )}

                {featured && (
                    <Link
                        href={`/artikel/${featured.slug}`}
                        className="group mt-10 grid items-center gap-8 rounded-[28px] bg-tan p-5 sm:p-8 lg:grid-cols-2"
                    >
                        <Photo
                            src={featured.image_url}
                            alt={featured.title}
                            className="aspect-[16/10] w-full rounded-[20px]"
                        />
                        <div className="space-y-4">
                            <p className="text-xs font-bold uppercase tracking-wide text-brand">
                                Artikel Utama
                                {featured.published_at &&
                                    ` · ${formatDate(featured.published_at)}`}
                            </p>
                            <h2 className="text-3xl font-extrabold leading-tight group-hover:text-brand lg:text-[32px]">
                                {featured.title}
                            </h2>
                            {featured.summary && (
                                <p className="line-clamp-3 text-lg text-muted">
                                    {featured.summary}
                                </p>
                            )}
                            <span className="inline-block font-bold text-brand">
                                Baca selengkapnya →
                            </span>
                        </div>
                    </Link>
                )}

                {articles.data.length === 0 && !featured ? (
                    <p className="mt-12 text-muted">
                        Belum ada artikel di sini.
                    </p>
                ) : (
                    <div className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                        {articles.data.map((a) => (
                            <ArticleCard key={a.id} article={a} />
                        ))}
                    </div>
                )}

                <Pagination links={articles.links} />
            </div>
        </>
    );
}
