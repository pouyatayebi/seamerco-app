import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { readMarkdownContent } from "@/lib/content/read-markdown";
import { getMediaUrl, getPageMediaUrl } from "@/lib/media/media-url";
import { blogCardSchema } from "@/lib/validations/content/blog-card.schema";
import type { RelatedArticlesSectionContent } from "@/lib/validations/content/sections/related-articles.schema";

type RelatedArticlesSectionProps = {
  content?: RelatedArticlesSectionContent;
};

async function getArticle(slug: string) {
  const segments = ["blog", slug];
  const article = await readMarkdownContent(blogCardSchema, "fa", segments);

  const image = article.frontmatter.featuredImage
    ? getPageMediaUrl(segments, article.frontmatter.featuredImage)
    : getMediaUrl(["site", "defaults", "card.jpg"]);

  return {
    slug,
    href: `/blog/${slug}`,
    title: article.frontmatter.title,
    excerpt:
      article.frontmatter.excerpt ??
      article.frontmatter.description ??
      "مقاله‌ای کاربردی از دانش فنی سیمرکو در حوزه خطوط تولید صنایع غذایی.",
    image,
  };
}

export async function RelatedArticlesSection({
  content,
}: RelatedArticlesSectionProps) {
  if (!content?.items?.length) return null;

  const articles = await Promise.all(content.items.map(getArticle));

  return (
    <section className="section bg-background">
      <div className="container-content">
        <h2 className="section-title">{content.title}</h2>

        <Carousel
          opts={{
            align: "start",
            direction: "rtl",
          }}
          className="mt-10 overflow-visible"
        >
          <CarouselContent className="-ml-5">
            {articles.map((article) => (
              <CarouselItem
                key={article.slug}
                className="pl-5 basis-[82%] sm:basis-[48%] lg:basis-[32%]"
              >
                <article className="group h-full overflow-hidden rounded-xl border border-border bg-card shadow-[0_8px_24px_rgba(0,0,0,0.10)] transition hover:-translate-y-1 hover:shadow-[0_14px_34px_rgba(0,0,0,0.14)]">
                  <Link href={article.href} className="block h-full">
                    <div className="relative aspect-[1.55/1] overflow-hidden">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        sizes="(max-width: 768px) 82vw, (max-width: 1024px) 48vw, 32vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div className="p-5 text-right">
                      <h3 className="text-base font-black leading-7 text-foreground">
                        {article.title}
                      </h3>

                      <p className="mt-3 line-clamp-3 text-justify text-[0.82rem] leading-7 text-content-muted">
                        {article.excerpt}
                      </p>

                      <span className="mt-4 mr-auto inline-flex items-center gap-1 rounded-xl bg-muted px-4 py-2 text-[0.72rem] font-bold text-muted-foreground transition group-hover:bg-secondary group-hover:text-white">
                        {content.detailButtonLabel}
                        <ArrowLeft className="size-3.5" />
                      </span>
                    </div>
                  </Link>
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}