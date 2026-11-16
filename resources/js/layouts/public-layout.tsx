import { Link, usePage } from "@inertiajs/react";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import type { ReactNode } from "react";

const navItems = [
    { label: "Beranda", href: "/" },
    { label: "Produk", href: "/produk" },
    { label: "Kontak", href: "/kontak" },
    { label: "Resep", href: "/resep" },
];

export default function PublicLayout({ children }: { children: ReactNode }) {
    const { url } = usePage();
    const [open, setOpen] = useState(false);

    const isActive = (href: string) =>
        href === "/" ? url === "/" : url.startsWith(href);

    return (
        <div className="flex min-h-screen flex-col bg-cream text-cocoa">
            <header className="sticky top-0 z-40 border-b border-sand bg-cream/95 backdrop-blur">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-xl font-extrabold"
                    >
                        <span
                            aria-hidden="true"
                            className="size-8 rounded-lg bg-brand"
                        />
                        Baso Yen
                    </Link>

                    {/* Menu laptop */}
                    <nav
                        aria-label="Menu utama"
                        className="hidden items-center gap-1 md:flex"
                    >
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`rounded-full px-4 py-2 text-sm font-semibold ${
                                    isActive(item.href)
                                        ? "bg-brand text-white"
                                        : "hover:bg-sand/60"
                                }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Tombol hamburger HP */}
                    <button
                        type="button"
                        aria-label={open ? "Tutup menu" : "Buka menu"}
                        aria-expanded={open}
                        onClick={() => setOpen((v) => !v)}
                        className="flex size-11 items-center justify-center rounded-xl border border-sand md:hidden"
                    >
                        {open ? (
                            <X className="size-5" />
                        ) : (
                            <Menu className="size-5" />
                        )}
                    </button>
                </div>

                {/* Panel menu HP */}
                {open && (
                    <nav
                        aria-label="Menu utama"
                        className="flex flex-col gap-1 border-t border-sand px-5 py-3 md:hidden"
                    >
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setOpen(false)}
                                className={`flex min-h-11 items-center rounded-xl px-4 font-semibold ${
                                    isActive(item.href)
                                        ? "bg-brand text-white"
                                        : "hover:bg-sand/60"
                                }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                )}
            </header>

            <main className="flex-1">{children}</main>

            <footer className="bg-cocoa text-sand">
                <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 text-sm sm:flex-row sm:items-center sm:justify-between">
                    <p>
                        © {new Date().getFullYear()} Baso Yen. Semua hak
                        dilindungi.
                    </p>
                    <Link
                        href="/login"
                        className="underline-offset-4 hover:underline"
                    >
                        Masuk Admin
                    </Link>
                </div>
            </footer>
        </div>
    );
}
