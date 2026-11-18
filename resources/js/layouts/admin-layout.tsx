import { Link, usePage } from "@inertiajs/react";
import { useState, type PropsWithChildren } from "react";

const items = [
    { label: "Dashboard", href: "/dashboard", exact: true },
    { label: "Kelola Produk", href: "/admin/products" },
    { label: "Kelola Kategori", href: "/admin/categories" },
    { label: "Kelola Resep", href: "/admin/recipes" },
    { label: "Kelola Artikel", href: "/admin/articles" },
    { label: "Pesan Masuk", href: "/admin/contacts" },
];

export default function AdminLayout({ children }: PropsWithChildren) {
    const page = usePage<{ auth?: { user?: { name: string } } }>();
    const path = page.url.split("?")[0];
    const name = page.props.auth?.user?.name;
    const [open, setOpen] = useState(false);

    const isActive = (item: (typeof items)[number]) =>
        item.exact
            ? path === item.href
            : path === item.href || path.startsWith(item.href + "/");

    return (
        <div className="min-h-screen bg-cream font-sans text-cocoa lg:flex">
            {/* Sidebar laptop */}
            <aside className="hidden shrink-0 flex-col gap-7 bg-cocoa px-4 py-7 text-sand lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-[260px]">
                <Link
                    href="/dashboard"
                    className="flex items-center gap-2.5 px-2 text-xl font-extrabold text-cream"
                >
                    <span
                        aria-hidden="true"
                        className="size-8 rounded-[9px] bg-brand"
                    />
                    Baso Yen
                </Link>

                <nav
                    aria-label="Menu admin"
                    className="flex flex-1 flex-col gap-1 font-semibold"
                >
                    {items.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`rounded-xl px-4 py-3 ${
                                isActive(item)
                                    ? "bg-brand text-white"
                                    : "hover:bg-cocoa-line"
                            }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="space-y-1 border-t border-cocoa-line pt-3">
                    {name && (
                        <p className="px-4 pb-1 text-sm text-sand/80">{name}</p>
                    )}
                    <Link
                        href="/logout"
                        method="post"
                        as="button"
                        className="w-full rounded-xl px-4 py-3 text-left font-semibold hover:bg-cocoa-line"
                    >
                        Keluar
                    </Link>
                </div>
            </aside>

            {/* Header HP */}
            <div className="lg:hidden">
                <header className="flex items-center justify-between bg-cocoa px-4 py-3">
                    <Link
                        href="/dashboard"
                        className="flex items-center gap-2 text-lg font-extrabold text-cream"
                    >
                        <span
                            aria-hidden="true"
                            className="size-7 rounded-lg bg-brand"
                        />
                        Admin
                    </Link>
                    <button
                        type="button"
                        aria-label="Buka menu admin"
                        aria-expanded={open}
                        onClick={() => setOpen(!open)}
                        className="flex size-11 items-center justify-center rounded-xl bg-cocoa-line"
                    >
                        <svg
                            width="22"
                            height="22"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#FFF8F0"
                            strokeWidth="2"
                            strokeLinecap="round"
                        >
                            <path d="M4 7h16M4 12h16M4 17h16" />
                        </svg>
                    </button>
                </header>

                {open && (
                    <nav
                        aria-label="Menu admin"
                        className="flex flex-col gap-0.5 bg-[#3d2c23] px-4 pb-4 pt-2"
                    >
                        {items.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setOpen(false)}
                                className={`flex min-h-12 items-center rounded-[10px] px-3 font-bold ${
                                    isActive(item)
                                        ? "bg-brand text-white"
                                        : "text-cream"
                                }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                        <Link
                            href="/logout"
                            method="post"
                            as="button"
                            className="mt-1.5 flex min-h-12 items-center rounded-[10px] border-t border-cocoa-line px-3 text-left font-semibold text-sand"
                        >
                            Keluar
                        </Link>
                    </nav>
                )}
            </div>

            <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
                {children}
            </main>
        </div>
    );
}
