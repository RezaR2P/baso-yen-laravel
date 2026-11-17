import { Head } from "@inertiajs/react";

type Milestone = { year: string; text: string };
type Certificate = { name: string; number: string };

// Ganti dengan sejarah Baso Yen yang sebenarnya.
const milestones: Milestone[] = [
    { year: "[Tahun]", text: "[Awal mula Baso Yen dimulai]" },
    { year: "[Tahun]", text: "[Pencapaian atau perkembangan penting]" },
    { year: "[Tahun]", text: "[Pencapaian atau perkembangan penting]" },
];

// Isi hanya sertifikasi yang benar-benar dimiliki.
const certificates: Certificate[] = [
    { name: "[Nama sertifikasi]", number: "[Nomor sertifikat]" },
    { name: "[Nama sertifikasi]", number: "[Nomor sertifikat]" },
];

export default function Tentang() {
    return (
        <>
            <Head title="Tentang Kami" />
            <div className="mx-auto max-w-4xl px-5 py-12">
                <h1 className="text-3xl font-extrabold md:text-4xl">
                    Tentang Kami
                </h1>

                <section className="mt-8" aria-labelledby="cerita">
                    <h2 id="cerita" className="text-2xl font-extrabold">
                        Cerita Kami
                    </h2>
                    <div className="mt-3 space-y-4 text-lg leading-relaxed text-cocoa/80">
                        <p>
                            [Ceritakan latar belakang Baso Yen: siapa
                            pendirinya, dari mana asal resepnya, dan apa yang
                            membuatnya berbeda.]
                        </p>
                        <p>
                            [Paragraf kedua: nilai dan komitmen terhadap
                            kualitas.]
                        </p>
                    </div>
                </section>

                <section className="mt-14" aria-labelledby="sejarah">
                    <h2 id="sejarah" className="text-2xl font-extrabold">
                        Perjalanan Kami
                    </h2>
                    <ol className="mt-6 space-y-5 border-l-2 border-sand pl-6">
                        {milestones.map((item, i) => (
                            <li key={i} className="relative">
                                <span
                                    aria-hidden="true"
                                    className="absolute top-1.5 -left-[31px] size-3 rounded-full bg-brand"
                                />
                                <p className="font-bold text-brand">
                                    {item.year}
                                </p>
                                <p className="text-cocoa/80">{item.text}</p>
                            </li>
                        ))}
                    </ol>
                </section>

                <section className="mt-14" aria-labelledby="sertifikasi">
                    <h2 id="sertifikasi" className="text-2xl font-extrabold">
                        Sertifikasi
                    </h2>
                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                        {certificates.map((item, i) => (
                            <article
                                key={i}
                                className="rounded-2xl border border-sand bg-white p-5"
                            >
                                <h3 className="font-bold">{item.name}</h3>
                                <p className="mt-1 text-sm text-cocoa/70">
                                    No. {item.number}
                                </p>
                            </article>
                        ))}
                    </div>
                </section>
            </div>
        </>
    );
}
