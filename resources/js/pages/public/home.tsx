import { Head, Link } from "@inertiajs/react";
import Photo from "@/components/photo";
import { formatDate } from "@/lib/format";

type Category = { id: number; name: string; slug: string };
type Featured = {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    image_url: string | null;
    category?: { name: string } | null;
};
type RecipeItem = {
    id: number;
    title: string;
    slug: string;
    cook_time: string | number | null;
    servings: string | number | null;
    image_url: string | null;
};
type ArticleItem = {
    id: number;
    title: string;
    slug: string;
    summary: string | null;
    image_url: string | null;
    published_at: string | null;
};

type Props = {
    categories: Category[];
    featured: Featured[];
    recipes: RecipeItem[];
    articles: ArticleItem[];
};

const container = "mx-auto max-w-[1280px] px-4 sm:px-8";
const pillRed =
    "inline-flex min-h-12 items-center rounded-full bg-brand px-7 font-bold text-white hover:bg-brand-dark";
const pillOutline =
    "inline-flex min-h-12 items-center rounded-full border-2 border-cocoa px-7 font-bold hover:bg-cocoa hover:text-cream";

const certs = ["Halal", "BPOM", "HACCP", "ISO 22000"];

export default function Home({
    categories,
    featured,
    recipes,
    articles,
}: Props) {
    return (
        <>
            <Head title="Beranda" />

            {/* Hero */}
            <section
                className={`${container} grid items-center gap-10 py-14 lg:grid-cols-2 lg:py-20`}
            >
                <div className="space-y-6">
                    <span className="inline-block rounded-full bg-tan px-4 py-1.5 text-sm font-bold text-brand">
                        Produk olahan berkualitas
                    </span>
                    <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-[56px]">
                        Cita rasa terbaik untuk meja makan keluarga Anda
                    </h1>
                    <p className="max-w-xl text-lg text-muted">
                        Baso Yen menghadirkan olahan pilihan yang dibuat dengan
                        bahan segar dan resep yang dijaga kualitasnya.
                    </p>
                    <div className="flex flex-wrap gap-3">
                        <Link href="/produk" className={pillRed}>
                            Lihat Produk
                        </Link>
                        <Link href="/resep" className={pillOutline}>
                            Jelajahi Resep
                        </Link>
                    </div>
                </div>
                <Photo className="min-h-[320px] w-full rounded-[32px] lg:min-h-[440px]" />
            </section>

            {/* Kategori */}
            {categories.length > 0 && (
                <section className={`${container} py-12`}>
                    <h2 className="mb-6 text-3xl font-extrabold">
                        Kategori Produk
                    </h2>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {categories.map((c) => (
                            <Link
                                key={c.id}
                                href="/produk"
                                className="flex min-h-[140px] flex-col justify-between rounded-3xl bg-tan p-6 transition hover:bg-peach"
                            >
                                <span className="text-xl font-extrabold">
                                    {c.name}
                                </span>
                                <span className="font-bold text-brand">
                                    Lihat semua →
                                </span>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {/* Produk unggulan */}
            <section className={`${container} py-12`}>
                <div className="mb-6 flex items-end justify-between gap-4">
                    <h2 className="text-3xl font-extrabold">Produk Unggulan</h2>
                    <Link href="/produk" className="font-bold text-brand">
                        Semua produk →
                    </Link>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {featured.map((p) => (
                        <Link
                            key={p.id}
                            href={`/produk/${p.slug}`}
                            className="group space-y-3"
                        >
                            <Photo
                                src={p.image_url}
                                alt={p.name}
                                className="aspect-[4/3] w-full rounded-[20px]"
                            />
                            {p.category?.name && (
                                <p className="text-xs font-bold uppercase tracking-wide text-brand">
                                    {p.category.name}
                                </p>
                            )}
                            <h3 className="text-lg font-extrabold group-hover:text-brand">
                                {p.name}
                            </h3>
                            {p.description && (
                                <p className="line-clamp-1 text-sm text-muted">
                                    {p.description}
                                </p>
                            )}
                        </Link>
                    ))}
                </div>
            </section>

            {/* Layanan */}
            <section className="bg-tan py-16">
                <div className={container}>
                    <h2 className="mb-8 text-3xl font-extrabold">
                        Layanan Kami
                    </h2>
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-4 rounded-[28px] bg-cream p-8">
                            <span className="text-sm font-bold text-brand">
                                B2C
                            </span>
                            <h3 className="text-2xl font-extrabold">
                                Untuk Keluarga
                            </h3>
                            <p className="text-muted">
                                Pesan produk untuk kebutuhan harian maupun acara
                                keluarga.
                            </p>
                            <Link
                                href="/layanan"
                                className="inline-block font-bold text-brand"
                            >
                                Pelajari layanan →
                            </Link>
                        </div>
                        <div className="space-y-4 rounded-[28px] bg-cocoa p-8 text-cream">
                            <span className="text-sm font-bold text-peach">
                                B2B
                            </span>
                            <h3 className="text-2xl font-extrabold">
                                Untuk Bisnis &amp; Mitra
                            </h3>
                            <p className="text-sand">
                                Kerja sama pasokan untuk restoran, toko, dan
                                reseller.
                            </p>
                            <Link
                                href="/layanan"
                                className="inline-block font-bold text-peach"
                            >
                                Pelajari kemitraan →
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Resep */}
            {recipes.length > 0 && (
                <section className={`${container} py-16`}>
                    <div className="mb-6 flex items-end justify-between gap-4">
                        <h2 className="text-3xl font-extrabold">
                            Resep Terbaru
                        </h2>
                        <Link href="/resep" className="font-bold text-brand">
                            Semua resep →
                        </Link>
                    </div>
                    <div className="grid gap-6 md:grid-cols-3">
                        {recipes.map((r) => (
                            <Link
                                key={r.id}
                                href={`/resep/${r.slug}`}
                                className="group space-y-3"
                            >
                                <Photo
                                    src={r.image_url}
                                    alt={r.title}
                                    className="aspect-[16/10] w-full rounded-[20px]"
                                />
                                <h3 className="text-xl font-extrabold group-hover:text-brand">
                                    {r.title}
                                </h3>
                                <p className="text-sm text-muted">
                                    {[
                                        r.cook_time
                                            ? `${r.cook_time} menit`
                                            : null,
                                        r.servings
                                            ? `${r.servings} porsi`
                                            : null,
                                    ]
                                        .filter(Boolean)
                                        .join(" · ")}
                                </p>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {/* Sertifikasi */}
            <section className="bg-tan py-12">
                <div
                    className={`${container} flex flex-wrap items-center justify-between gap-6`}
                >
                    <h2 className="text-2xl font-extrabold">
                        Terpercaya &amp; Tersertifikasi
                    </h2>
                    <div className="flex flex-wrap gap-3">
                        {certs.map((c) => (
                            <span
                                key={c}
                                className="rounded-full border border-sand bg-white px-5 py-2 font-bold"
                            >
                                {c}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Artikel */}
            {articles.length > 0 && (
                <section className={`${container} py-16`}>
                    <div className="mb-6 flex items-end justify-between gap-4">
                        <h2 className="text-3xl font-extrabold">
                            Artikel Terbaru
                        </h2>
                        <Link href="/artikel" className="font-bold text-brand">
                            Semua artikel →
                        </Link>
                    </div>
                    <div className="grid gap-6 md:grid-cols-3">
                        {articles.map((a) => (
                            <Link
                                key={a.id}
                                href={`/artikel/${a.slug}`}
                                className="group space-y-3"
                            >
                                <Photo
                                    src={a.image_url}
                                    alt={a.title}
                                    className="aspect-[16/10] w-full rounded-[20px]"
                                />
                                {a.published_at && (
                                    <p className="text-sm text-muted">
                                        {formatDate(a.published_at)}
                                    </p>
                                )}
                                <h3 className="text-xl font-extrabold group-hover:text-brand">
                                    {a.title}
                                </h3>
                                {a.summary && (
                                    <p className="line-clamp-2 text-muted">
                                        {a.summary}
                                    </p>
                                )}
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {/* CTA */}
            <section className={`${container} pb-20`}>
                <div className="flex flex-col items-start justify-between gap-6 rounded-[32px] bg-brand p-10 text-white md:flex-row md:items-center">
                    <h2 className="max-w-xl text-3xl font-extrabold">
                        Ada pertanyaan atau ingin bermitra?
                    </h2>
                    <Link
                        href="/kontak"
                        className="inline-flex min-h-12 items-center rounded-full bg-cream px-7 font-bold text-brand hover:bg-white"
                    >
                        Kirim Pesan
                    </Link>
                </div>
            </section>
        </>
    );
}
