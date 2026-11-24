import { Link } from "@inertiajs/react";
import Photo from "@/components/photo";
import { formatDate } from "@/lib/format";

export type ArticleSummary = {
    id: number;
    title: string;
    slug: string;
    category: string | null;
    summary: string | null;
    image_url: string | null;
    published_at: string | null;
};

export default function ArticleCard({ article }: { article: ArticleSummary }) {
    return (
        <Link
            href={`/artikel/${article.slug}`}
            className="group block space-y-3"
        >
            <Photo
                src={article.image_url}
                alt={article.title}
                className="aspect-[16/10] w-full rounded-[20px]"
            />
            <div className="space-y-1">
                <p className="text-sm text-muted">
                    {[article.category, formatDate(article.published_at)]
                        .filter(Boolean)
                        .join(" · ")}
                </p>
                <h3 className="text-xl font-extrabold group-hover:text-brand">
                    {article.title}
                </h3>
                {article.summary && (
                    <p className="line-clamp-2 text-muted">{article.summary}</p>
                )}
            </div>
        </Link>
    );
}
