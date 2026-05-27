import Link from "next/link";
import { ArrowRight, Clock, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { calculateReadingTime, formatDate, truncateText } from "@/lib/utils";

interface PostCardProps {
  post: {
    title: string;
    slug: string;
    excerpt: string | null;
    content?: string;
    coverImage: string | null;
    publishedAt: Date | null;
    createdAt: Date;
    category: {
      name: string;
      slug: string;
    } | null;
    author: {
      name: string;
    };
  };
  variant?: "default" | "featured";
}

export function PostCard({ post, variant = "default" }: PostCardProps) {
  const readingTime = post.content ? calculateReadingTime(post.content) : 3;
  const date = post.publishedAt || post.createdAt;
  const isFeatured = variant === "featured";

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={
        isFeatured
          ? "modern-card-hover group grid overflow-hidden rounded-2xl border border-border/80 bg-white shadow-sm hover:border-champagne/50 hover:shadow-premium sm:grid-cols-[0.92fr_1.08fr] lg:col-span-2"
          : "modern-card-hover group flex h-full flex-col overflow-hidden rounded-2xl border border-border/80 bg-white shadow-sm hover:border-champagne/50 hover:shadow-premium"
      }
    >
      <div className={isFeatured ? "relative min-h-72 bg-mist" : "relative h-48 bg-mist"}>
        {post.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.coverImage}
            alt=""
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-surface-soft to-white">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-navy text-champagne shadow-sm">
              <FileText className="size-6" />
            </div>
          </div>
        )}
      </div>

      <div className={isFeatured ? "flex flex-col p-7 sm:p-8" : "flex flex-1 flex-col p-5"}>
        <div className="mb-4 flex flex-wrap items-center gap-3">
          {post.category && (
            <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs font-medium">
              {post.category.name}
            </Badge>
          )}
          <span className="text-xs font-medium text-muted-foreground">
            {formatDate(date)}
          </span>
        </div>

        <h2
          className={
            isFeatured
              ? "text-2xl font-semibold leading-tight tracking-tight text-navy transition-colors sm:text-3xl"
              : "text-lg font-semibold leading-tight tracking-tight text-navy transition-colors"
          }
        >
          {post.title}
        </h2>

        {post.excerpt && (
          <p
            className={
              isFeatured
                ? "mt-3 line-clamp-4 text-base leading-relaxed text-muted-foreground"
                : "mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground"
            }
          >
            {truncateText(post.excerpt, isFeatured ? 260 : 170)}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between gap-4 border-t border-border/60 pt-4">
          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <Clock className="size-3.5" />
            <span>{readingTime} min de leitura</span>
          </div>
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-navy">
            Ler artigo
            <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}
