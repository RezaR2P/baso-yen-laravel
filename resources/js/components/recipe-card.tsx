import { Link } from "@inertiajs/react";
import Photo from "@/components/photo";

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
        <Link href={`/resep/${recipe.slug}`} className="group block space-y-3">
            <Photo
                src={recipe.image_url}
                alt={recipe.title}
                className="aspect-[16/10] w-full rounded-[20px]"
            />
            <div className="space-y-1">
                <h3 className="text-xl font-extrabold group-hover:text-brand">
                    {recipe.title}
                </h3>
                <p className="text-sm text-muted">{recipeMeta(recipe)}</p>
            </div>
        </Link>
    );
}
