import { Link } from "@inertiajs/react";
import SafeImage from "@/components/safe-image";
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
            className="group block overflow-hidden rounded-2xl border border-sand bg-white transition hover:shadow-md"
        >
            <SafeImage
                src={article.image_url}
                alt={article.title}
                className="aspect-[16/10] w-full object-cover"
            />
            <div className="p-4">
                <p className="text-xs font-semibold text-cocoa/60">
                    {[article.category, formatDate(article.published_at)]
                        .filter(Boolean)
                        .join(" · ")}
                </p>
                <h3 className="mt-1 font-bold group-hover:text-brand">
                    {article.title}
                </h3>
                {article.summary && (
                    <p className="mt-1 line-clamp-2 text-sm text-cocoa/70">
                        {article.summary}
                    </p>
                )}
            </div>
        </Link>
    );
}
