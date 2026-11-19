import { Link } from "@inertiajs/react";

export type PageLink = { url: string | null; label: string; active: boolean };

const box =
    "flex size-11 items-center justify-center rounded-xl border border-sand bg-white font-bold";

export default function Pagination({ links }: { links: PageLink[] }) {
    // Laravel mengirim: [sebelumnya, 1, 2, ..., berikutnya]
    if (links.length <= 3) return null;

    const prev = links[0];
    const next = links[links.length - 1];
    const pages = links.slice(1, -1);

    return (
        <nav
            aria-label="Halaman"
            className="mt-12 flex flex-wrap justify-center gap-2"
        >
            {prev.url ? (
                <Link
                    href={prev.url}
                    aria-label="Halaman sebelumnya"
                    className={`${box} hover:border-brand hover:text-brand`}
                >
                    ←
                </Link>
            ) : (
                <span className={`${box} opacity-40`}>←</span>
            )}

            {pages.map((p, i) =>
                p.url ? (
                    <Link
                        key={i}
                        href={p.url}
                        aria-current={p.active ? "page" : undefined}
                        className={`${box} ${
                            p.active
                                ? "border-brand bg-brand text-white"
                                : "hover:border-brand hover:text-brand"
                        }`}
                    >
                        {p.label}
                    </Link>
                ) : (
                    <span
                        key={i}
                        className={`${box} border-transparent bg-transparent`}
                    >
                        {p.label}
                    </span>
                ),
            )}

            {next.url ? (
                <Link
                    href={next.url}
                    aria-label="Halaman berikutnya"
                    className={`${box} hover:border-brand hover:text-brand`}
                >
                    →
                </Link>
            ) : (
                <span className={`${box} opacity-40`}>→</span>
            )}
        </nav>
    );
}
