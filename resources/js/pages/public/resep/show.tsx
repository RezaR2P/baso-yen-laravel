import { Head, Link } from "@inertiajs/react";
import RecipeCard, { recipeMeta } from "@/components/recipe-card";
import type { Recipe } from "@/components/recipe-card";
import SafeImage from "@/components/safe-image";

// Memecah teks per baris menjadi daftar, mengabaikan baris kosong.
const toLines = (text: string) =>
    text
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);

export default function ResepShow({
    recipe,
    related,
}: {
    recipe: Recipe;
    related: Recipe[];
}) {
    return (
        <>
            <Head title={recipe.title} />

            <div className="mx-auto max-w-4xl px-5 py-10">
                <nav
                    aria-label="Jejak halaman"
                    className="text-sm text-cocoa/70"
                >
                    <Link href="/" className="hover:underline">
                        Beranda
                    </Link>
                    {" / "}
                    <Link href="/resep" className="hover:underline">
                        Resep
                    </Link>
                </nav>

                <h1 className="mt-4 text-3xl font-extrabold md:text-4xl">
                    {recipe.title}
                </h1>
                <p className="mt-2 text-cocoa/70">{recipeMeta(recipe)}</p>

                <SafeImage
                    src={recipe.image_url}
                    alt={recipe.title}
                    className="mt-6 aspect-[16/9] w-full rounded-3xl border border-sand object-cover"
                />

                <div className="mt-10 grid gap-10 md:grid-cols-3">
                    <section className="md:col-span-1">
                        <h2 className="text-xl font-extrabold">Bahan-bahan</h2>
                        <ul className="mt-3 list-disc space-y-2 pl-5">
                            {toLines(recipe.ingredients).map((line, i) => (
                                <li key={i}>{line}</li>
                            ))}
                        </ul>
                    </section>

                    <section className="md:col-span-2">
                        <h2 className="text-xl font-extrabold">Langkah</h2>
                        <ol className="mt-3 list-decimal space-y-3 pl-5">
                            {toLines(recipe.steps).map((line, i) => (
                                <li key={i}>{line}</li>
                            ))}
                        </ol>
                    </section>
                </div>

                {related.length > 0 && (
                    <section className="mt-16">
                        <h2 className="mb-4 text-2xl font-extrabold">
                            Resep Lainnya
                        </h2>
                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {related.map((item) => (
                                <RecipeCard key={item.id} recipe={item} />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </>
    );
}
