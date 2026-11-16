import { Link } from "@inertiajs/react";
import SafeImage from "@/components/safe-image";

export type Recipe = {
    id: number;
    title: string;
    slug: string;
    cook_time: number | null;
    servings: number | null;
    difficulty: string;
    ingredients: string;
    steps: string;
    image_url: string | null;
};

export function recipeMeta(recipe: Recipe): string {
    return [
        recipe.cook_time ? `${recipe.cook_time} menit` : null,
        recipe.servings ? `${recipe.servings} porsi` : null,
        recipe.difficulty,
    ]
        .filter(Boolean)
        .join(" · ");
}

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
    return (
        <Link
            href={`/resep/${recipe.slug}`}
            className="group block overflow-hidden rounded-2xl border border-sand bg-white transition hover:shadow-md"
        >
            <SafeImage
                src={recipe.image_url}
                alt={recipe.title}
                className="aspect-[4/3] w-full object-cover"
            />
            <div className="p-4">
                <h3 className="font-bold group-hover:text-brand">
                    {recipe.title}
                </h3>
                <p className="mt-1 text-sm text-cocoa/70">
                    {recipeMeta(recipe)}
                </p>
            </div>
        </Link>
    );
}
