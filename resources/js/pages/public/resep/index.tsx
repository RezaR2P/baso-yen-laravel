import { Head, Link } from "@inertiajs/react";
import Pagination from "@/components/pagination";
import type { PageLink } from "@/components/pagination";
import RecipeCard from "@/components/recipe-card";
import type { Recipe } from "@/components/recipe-card";

type Props = {
    recipes: { data: Recipe[]; links: PageLink[] };
};

export default function ResepIndex({ recipes }: Props) {
    return (
        <>
            <Head title="Resep" />

            <div className="mx-auto max-w-[1280px] px-4 py-10 sm:px-8 lg:py-14">
                <nav aria-label="Jejak halaman" className="text-sm text-muted">
                    <Link href="/" className="hover:text-brand">
                        Beranda
                    </Link>
                    {" / "}
                    <span className="text-cocoa">Resep</span>
                </nav>

                <h1 className="mt-4 text-4xl font-extrabold tracking-tight lg:text-[44px]">
                    Resep Masakan
                </h1>
                <p className="mt-2 max-w-2xl text-lg text-muted">
                    Ide masakan dan cara membuatnya di rumah.
                </p>

                {recipes.data.length === 0 ? (
                    <p className="mt-12 text-muted">Resep akan segera hadir.</p>
                ) : (
                    <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                        {recipes.data.map((r) => (
                            <RecipeCard key={r.id} recipe={r} />
                        ))}
                    </div>
                )}

                <Pagination links={recipes.links} />
            </div>
        </>
    );
}
