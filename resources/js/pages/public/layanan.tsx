import { Head, Link } from "@inertiajs/react";

type Service = { title: string; description: string };

// Contoh isi. Ganti dengan layanan Baso Yen yang sebenarnya.
const b2c: Service[] = [
    {
        title: "Pesan Antar",
        description: "Pesan baso favorit Anda dan kami antar ke rumah.",
    },
    {
        title: "Pesanan Acara",
        description: "Porsi besar untuk arisan, syukuran, atau acara keluarga.",
    },
    {
        title: "Paket Beku",
        description:
            "Baso dalam kemasan beku, praktis disimpan dan dimasak sendiri.",
    },
];

const b2b: Service[] = [
    {
        title: "Katering Kantor",
        description:
            "Pasokan makanan rutin untuk karyawan dan acara perusahaan.",
    },
    {
        title: "Reseller dan Distributor",
        description: "Harga khusus dan pasokan stabil untuk usaha Anda.",
    },
    {
        title: "Pasokan Restoran dan Kafe",
        description: "Bahan olahan siap pakai untuk menu usaha Anda.",
    },
];

function ServiceGrid({ items }: { items: Service[] }) {
    return (
        <div className="mt-6 grid gap-4 md:grid-cols-3">
            {items.map((item) => (
                <article
                    key={item.title}
                    className="rounded-2xl border border-sand bg-white p-6"
                >
                    <h3 className="text-lg font-bold">{item.title}</h3>
                    <p className="mt-2 text-cocoa/70">{item.description}</p>
                </article>
            ))}
        </div>
    );
}

export default function Layanan() {
    return (
        <>
            <Head title="Layanan" />
            <div className="mx-auto max-w-6xl px-5 py-12">
                <h1 className="text-3xl font-extrabold md:text-4xl">Layanan</h1>
                <p className="mt-2 max-w-2xl text-cocoa/70">
                    Dari pesanan rumahan sampai kebutuhan usaha, kami siap
                    melayani.
                </p>

                <section className="mt-12" aria-labelledby="b2c">
                    <h2 id="b2c" className="text-2xl font-extrabold">
                        Untuk Pelanggan
                    </h2>
                    <ServiceGrid items={b2c} />
                </section>

                <section className="mt-14" aria-labelledby="b2b">
                    <h2 id="b2b" className="text-2xl font-extrabold">
                        Untuk Bisnis
                    </h2>
                    <ServiceGrid items={b2b} />
                </section>

                <section className="mt-16 rounded-3xl bg-brand p-8 text-white md:p-10">
                    <h2 className="text-2xl font-extrabold">
                        Punya kebutuhan khusus?
                    </h2>
                    <p className="mt-1 text-white/80">
                        Ceritakan kebutuhan Anda, kami buatkan penawarannya.
                    </p>
                    <Link
                        href="/kontak"
                        className="mt-5 inline-flex min-h-12 items-center rounded-full bg-white px-7 font-bold text-brand hover:bg-cream"
                    >
                        Hubungi Kami
                    </Link>
                </section>
            </div>
        </>
    );
}
