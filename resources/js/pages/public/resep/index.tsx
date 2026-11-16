import { Head, Link } from "@inertiajs/react";
import RecipeCard from "@/components/recipe-card";
import type { Recipe } from "@/components/recipe-card";

type Paginated = {
    data: Recipe[];
    prev_page_url: string | null;
    next_page_url: string | null;
};

export default function ResepIndex({ recipes }: { recipes: Paginated }) {
    return (
        <>
            <Head title="Resep" />
            <div className="mx-auto max-w-6xl px-5 py-12">
                <h1 className="text-3xl font-extrabold md:text-4xl">Resep</h1>
                <p className="mt-2 text-cocoa/70">
                    Ide masakan dan cara membuatnya di rumah.
                </p>

                {recipes.data.length === 0 ? (
                    <p className="mt-10 text-cocoa/70">
                        Resep akan segera hadir.
                    </p>
                ) : (
                    <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {recipes.data.map((recipe) => (
                            <RecipeCard key={recipe.id} recipe={recipe} />
                        ))}
                    </div>
                )}

                {(recipes.prev_page_url || recipes.next_page_url) && (
                    <nav
                        aria-label="Halaman resep"
                        className="mt-10 flex justify-between gap-3"
                    >
                        {recipes.prev_page_url ? (
                            <Link
                                href={recipes.prev_page_url}
                                className="rounded-full border border-sand bg-white px-5 py-2 font-semibold hover:border-brand"
                            >
                                ← Sebelumnya
                            </Link>
                        ) : (
                            <span />
                        )}
                        {recipes.next_page_url && (
                            <Link
                                href={recipes.next_page_url}
                                className="rounded-full border border-sand bg-white px-5 py-2 font-semibold hover:border-brand"
                            >
                                Berikutnya →
                            </Link>
                        )}
                    </nav>
                )}
            </div>
        </>
    );
}
