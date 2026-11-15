import { Head, Link } from "@inertiajs/react";
import { formatPrice } from "@/lib/format";

type Product = {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    price: string | null;
    image_url: string | null;
};

export default function Home({ featured }: { featured: Product[] }) {
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
                            href="/menu"
                            className="inline-flex min-h-12 items-center rounded-full bg-brand px-7 font-bold text-white hover:bg-brand/90"
                        >
                            Lihat Menu
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
                <div className="mb-6 flex items-end justify-between gap-4">
                    <h2 className="text-2xl font-extrabold md:text-3xl">
                        Menu Pilihan
                    </h2>
                    <Link href="/menu" className="font-bold text-brand">
                        Lihat semua →
                    </Link>
                </div>

                {featured.length === 0 ? (
                    <p className="text-cocoa/70">Menu akan segera hadir.</p>
                ) : (
                    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                        {featured.map((product) => (
                            <article
                                key={product.id}
                                className="overflow-hidden rounded-2xl border border-sand bg-white"
                            >
                                {product.image_url ? (
                                    <img
                                        src={product.image_url}
                                        alt={product.name}
                                        className="aspect-square w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex aspect-square items-center justify-center bg-sand/40 text-sm text-cocoa/60">
                                        Tanpa foto
                                    </div>
                                )}
                                <div className="p-3">
                                    <h3 className="font-bold">
                                        {product.name}
                                    </h3>
                                    <p className="mt-1 font-semibold text-brand">
                                        {formatPrice(product.price)}
                                    </p>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </section>

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
