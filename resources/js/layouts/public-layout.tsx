import { Link, usePage } from "@inertiajs/react";
import { useState, type PropsWithChildren } from "react";

const nav = [
    { label: "Produk", href: "/produk" },
    { label: "Resep", href: "/resep" },
    { label: "Artikel", href: "/artikel" },
    { label: "Layanan", href: "/layanan" },
    { label: "Tentang Kami", href: "/tentang-kami" },
];

export default function PublicLayout({ children }: PropsWithChildren) {
    const { url } = usePage();
    const [open, setOpen] = useState(false);
    const path = url.split("?")[0];

    const isActive = (href: string) =>
        path === href || path.startsWith(href + "/");

    return (
        <div className="min-h-screen bg-cream font-sans text-cocoa">
            <header className="border-b border-sand bg-cream">
                <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 py-4 sm:px-8">
                    <Link
                        href="/"
                        className="text-2xl font-extrabold tracking-tight"
                    >
                        Baso Yen
                    </Link>

                    <nav
                        aria-label="Menu utama"
                        className="hidden items-center gap-8 font-semibold lg:flex"
                    >
                        {nav.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={
                                    isActive(item.href)
                                        ? "text-brand"
                                        : "hover:text-brand"
                                }
                            >
                                {item.label}
                            </Link>
                        ))}
                        <Link
                            href="/kontak"
                            className="rounded-full bg-brand px-6 py-2.5 font-bold text-white hover:bg-brand-dark"
                        >
                            Hubungi Kami
                        </Link>
                    </nav>

                    <button
                        type="button"
                        aria-label="Buka menu"
                        aria-expanded={open}
                        onClick={() => setOpen(!open)}
                        className="flex size-11 items-center justify-center rounded-xl border border-sand lg:hidden"
                    >
                        <svg
                            width="22"
                            height="22"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                        >
                            <path d="M4 7h16M4 12h16M4 17h16" />
                        </svg>
                    </button>
                </div>

                {open && (
                    <nav
                        aria-label="Menu seluler"
                        className="flex flex-col gap-1 border-t border-sand px-4 pb-4 pt-2 lg:hidden"
                    >
                        {nav.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setOpen(false)}
                                className={`flex min-h-12 items-center rounded-xl px-3 font-bold ${
                                    isActive(item.href)
                                        ? "bg-tan text-brand"
                                        : ""
                                }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                        <Link
                            href="/kontak"
                            onClick={() => setOpen(false)}
                            className="mt-2 flex min-h-12 items-center justify-center rounded-full bg-brand font-bold text-white"
                        >
                            Hubungi Kami
                        </Link>
                    </nav>
                )}
            </header>

            <main>{children}</main>

            <footer className="bg-cocoa text-sand">
                <div className="mx-auto grid max-w-[1280px] gap-10 px-4 py-14 sm:px-8 md:grid-cols-3">
                    <div className="space-y-3">
                        <p className="text-2xl font-extrabold text-cream">
                            Baso Yen
                        </p>
                        <p className="max-w-xs text-sm leading-relaxed">
                            [Tagline singkat Baso Yen]
                        </p>
                    </div>
                    <div className="space-y-3">
                        <p className="font-bold text-cream">Menu</p>
                        <ul className="space-y-2 text-sm">
                            {[...nav.slice(0, 4)].map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className="hover:text-white"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="space-y-3">
                        <p className="font-bold text-cream">Kontak</p>
                        <ul className="space-y-2 text-sm">
                            <li>[Alamat lengkap]</li>
                            <li>[email@contoh.com]</li>
                            <li>[No. telepon]</li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-cocoa-line">
                    <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-2 px-4 py-5 text-sm sm:px-8">
                        <p>
                            © {new Date().getFullYear()} Baso Yen. Hak cipta
                            dilindungi.
                        </p>
                        <Link href="/login" className="hover:text-white">
                            Masuk Admin
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
