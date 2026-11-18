import { Head, Link, usePage } from "@inertiajs/react";
import { formatDate } from "@/lib/format";

type Message = {
    id: number;
    name: string;
    email: string;
    subject: string | null;
    replied_at: string | null;
    created_at: string;
};

type Props = {
    stats: {
        products: number;
        categories: number;
        recipes: number;
        articles: number;
        newMessages: number;
    };
    messages: Message[];
};

function Status({ replied }: { replied: boolean }) {
    return (
        <span
            className={`inline-block rounded-full px-3 py-0.5 text-xs font-bold md:text-[13px] ${
                replied
                    ? "bg-[#DDF0E5] text-[#1B5E3B]"
                    : "bg-[#FBE3E0] text-brand-dark"
            }`}
        >
            {replied ? "Dibalas" : "Baru"}
        </span>
    );
}

export default function Dashboard({ stats, messages }: Props) {
    const { auth } = usePage<{ auth?: { user?: { name: string } } }>().props;

    const cards = [
        { label: "Produk", value: stats.products, href: "/admin/products" },
        {
            label: "Kategori",
            value: stats.categories,
            href: "/admin/categories",
        },
        { label: "Resep", value: stats.recipes, href: "/admin/recipes" },
        { label: "Artikel", value: stats.articles, href: "/admin/articles" },
        {
            label: "Pesan Baru",
            value: stats.newMessages,
            href: "/admin/contacts",
        },
    ];

    const outline =
        "flex min-h-11 items-center justify-center rounded-full border-[1.5px] border-cocoa px-6 font-bold hover:bg-cocoa hover:text-cream";

    return (
        <>
            <Head title="Dashboard" />

            <div className="flex flex-col gap-6 lg:gap-8">
                <div>
                    <h1 className="text-[26px] font-extrabold tracking-tight lg:text-3xl">
                        Dashboard
                    </h1>
                    <p className="text-muted">
                        {auth?.user?.name
                            ? `Halo, ${auth.user.name}.`
                            : "Ringkasan data website Anda."}
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:gap-4 xl:grid-cols-5">
                    {cards.map((c) => (
                        <div
                            key={c.label}
                            className="flex flex-col gap-0.5 rounded-2xl border border-sand bg-white p-4 lg:rounded-[20px] lg:p-5"
                        >
                            <span className="text-[13px] font-semibold text-muted lg:text-sm">
                                {c.label}
                            </span>
                            <span className="text-[28px] font-extrabold leading-tight lg:text-[34px]">
                                {c.value}
                            </span>
                            <Link
                                href={c.href}
                                className="text-[13px] font-bold text-brand lg:text-sm"
                            >
                                Kelola →
                            </Link>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-3">
                    <Link
                        href="/admin/products"
                        className="flex min-h-11 items-center justify-center rounded-full bg-brand px-6 font-bold text-white hover:bg-brand-dark"
                    >
                        + Tambah Produk
                    </Link>
                    <Link href="/admin/recipes" className={outline}>
                        + Tambah Resep
                    </Link>
                    <Link href="/admin/articles" className={outline}>
                        + Tulis Artikel
                    </Link>
                </div>

                <section className="flex flex-col gap-4 lg:rounded-3xl lg:border lg:border-sand lg:bg-white lg:p-6">
                    <div className="flex items-center justify-between gap-2">
                        <h2 className="text-xl font-extrabold">
                            Pesan Masuk Terbaru
                        </h2>
                        <Link
                            href="/admin/contacts"
                            className="text-sm font-bold text-brand lg:text-base"
                        >
                            Lihat semua →
                        </Link>
                    </div>

                    {messages.length === 0 && (
                        <p className="text-muted">Belum ada pesan masuk.</p>
                    )}

                    {/* Tabel (laptop) */}
                    {messages.length > 0 && (
                        <div className="hidden overflow-x-auto md:block">
                            <table className="w-full min-w-[640px] border-collapse text-sm">
                                <thead>
                                    <tr className="text-left text-muted">
                                        {[
                                            "Nama",
                                            "Email",
                                            "Subjek",
                                            "Tanggal",
                                            "Status",
                                            "Aksi",
                                        ].map((h) => (
                                            <th
                                                key={h}
                                                scope="col"
                                                className="border-b border-sand px-3 py-2.5 font-bold"
                                            >
                                                {h}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {messages.map((m) => (
                                        <tr key={m.id}>
                                            <td className="border-b border-[#F1E4D6] p-3">
                                                {m.name}
                                            </td>
                                            <td className="border-b border-[#F1E4D6] p-3 text-muted">
                                                {m.email}
                                            </td>
                                            <td className="border-b border-[#F1E4D6] p-3">
                                                {m.subject}
                                            </td>
                                            <td className="border-b border-[#F1E4D6] p-3 text-muted">
                                                {formatDate(m.created_at)}
                                            </td>
                                            <td className="border-b border-[#F1E4D6] p-3">
                                                <Status
                                                    replied={!!m.replied_at}
                                                />
                                            </td>
                                            <td className="border-b border-[#F1E4D6] p-3">
                                                <Link
                                                    href="/admin/contacts"
                                                    className="font-bold text-brand"
                                                >
                                                    Balas
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Kartu (HP) */}
                    <div className="flex flex-col gap-3 md:hidden">
                        {messages.map((m) => (
                            <div
                                key={m.id}
                                className="flex flex-col gap-1.5 rounded-2xl border border-sand bg-white p-4"
                            >
                                <div className="flex items-center justify-between gap-2">
                                    <span className="font-bold">{m.name}</span>
                                    <Status replied={!!m.replied_at} />
                                </div>
                                <span className="text-sm">{m.subject}</span>
                                <span className="text-[13px] text-muted">
                                    {m.email} · {formatDate(m.created_at)}
                                </span>
                                <Link
                                    href="/admin/contacts"
                                    className="flex min-h-11 items-center text-sm font-bold text-brand"
                                >
                                    Balas pesan →
                                </Link>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </>
    );
}
