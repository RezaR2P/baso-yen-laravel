import { Head, Link } from "@inertiajs/react";
import Photo from "@/components/photo";
import RecipeCard from "@/components/recipe-card";
import type { Recipe } from "@/components/recipe-card";

// Memecah teks per baris menjadi daftar, lalu membuang penanda yang
// mungkin sudah diketik admin ("1. ", "- ", "• ") agar tidak dobel.
const toLines = (text: string, marker: RegExp) =>
    (text ?? "")
        .split("\n")
        .map((line) => line.trim().replace(marker, ""))
        .filter(Boolean);

export default function ResepShow({
    recipe,
    related,
}: {
    recipe: Recipe;
    related: Recipe[];
}) {
    const ingredients = toLines(recipe.ingredients, /^[-•*]\s*/);
    const steps = toLines(recipe.steps, /^\d+[.)]\s*/);

    const meta = [
        {
            label: "Waktu",
            value: recipe.cook_time ? `${recipe.cook_time} menit` : null,
        },
        {
            label: "Porsi",
            value: recipe.servings ? `${recipe.servings} porsi` : null,
        },
        { label: "Tingkat", value: recipe.difficulty || null },
    ].filter((m) => m.value);

    return (
        <>
            <Head title={recipe.title} />

            <div className="mx-auto max-w-[1280px] px-4 py-10 sm:px-8 lg:py-14">
                <nav aria-label="Jejak halaman" className="text-sm text-muted">
                    <Link href="/" className="hover:text-brand">
                        Beranda
                    </Link>
                    {" / "}
                    <Link href="/resep" className="hover:text-brand">
                        Resep
                    </Link>
                    {" / "}
                    <span className="text-cocoa">{recipe.title}</span>
                </nav>

                <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight lg:text-[44px]">
                    {recipe.title}
                </h1>

                {meta.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-3">
                        {meta.map((m) => (
                            <span
                                key={m.label}
                                className="rounded-full bg-tan px-4 py-1.5 text-sm font-bold"
                            >
                                <span className="font-semibold text-muted">
                                    {m.label}:{" "}
                                </span>
                                {m.value}
                            </span>
                        ))}
                    </div>
                )}

                <Photo
                    src={recipe.image_url}
                    alt={recipe.title}
                    className="mt-8 h-64 w-full rounded-[28px] sm:h-80 lg:h-[480px]"
                />

                <div className="mt-12 grid items-start gap-10 lg:grid-cols-[360px_1fr] lg:gap-14">
                    <aside className="rounded-3xl border border-sand bg-white p-6 lg:sticky lg:top-6">
                        <h2 className="text-2xl font-extrabold">Bahan-bahan</h2>
                        <ul className="mt-4 space-y-3">
                            {ingredients.map((line, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <span
                                        aria-hidden="true"
                                        className="mt-2 size-2 shrink-0 rounded-full bg-brand"
                                    />
                                    <span>{line}</span>
                                </li>
                            ))}
                        </ul>
                        <Link
                            href="/produk"
                            className="mt-6 inline-flex min-h-11 items-center font-bold text-brand"
                        >
                            Lihat produk yang dipakai →
                        </Link>
                    </aside>

                    <section>
                        <h2 className="text-2xl font-extrabold">
                            Langkah Pembuatan
                        </h2>
                        <ol className="mt-6 space-y-6">
                            {steps.map((line, i) => (
                                <li key={i} className="flex items-start gap-4">
                                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand font-extrabold text-white">
                                        {i + 1}
                                    </span>
                                    <p className="pt-1 text-lg leading-relaxed">
                                        {line}
                                    </p>
                                </li>
                            ))}
                        </ol>
                    </section>
                </div>
            </div>

            {related.length > 0 && (
                <section className="bg-tan py-14">
                    <div className="mx-auto max-w-[1280px] px-4 sm:px-8">
                        <h2 className="mb-8 text-3xl font-extrabold">
                            Resep Lainnya
                        </h2>
                        <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                            {related.map((r) => (
                                <RecipeCard key={r.id} recipe={r} />
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}
