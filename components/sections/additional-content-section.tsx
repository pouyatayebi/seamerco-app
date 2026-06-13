import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Container } from "@/components/shared/container";
import { AdditionalContentPattern } from "@/components/svg/patterns/additional-content-pattern";

type AdditionalContentSectionProps = {
  content?: string | null;
};

export function AdditionalContentSection({
  content,
}: AdditionalContentSectionProps) {
  if (!content?.trim()) return null;

  return (
    <section className="section bg-[linear-gradient(180deg,var(--background)_0%,var(--surface)_46%,var(--background)_100%)] py-16 md:py-20">
      <Container size="header">
        <article className="relative mx-auto max-w-6xl overflow-hidden rounded-[1.8rem] border border-border/70 bg-card text-right shadow-[0_18px_55px_rgb(0_0_0/0.06)]">
          {/* <AdditionalContentPattern
  className="hidden lg:block pointer-events-none absolute inset-0 h-full w-full [--pattern-accent:var(--primary)]"
  cornerOpacity={0.07}
  triangleOpacity={0.2}
/> */}

          <div className="relative px-7 py-9 md:px-12 md:py-12 lg:px-16 lg:py-14">
            <div className="prose-additional">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content}
              </ReactMarkdown>
            </div>
          </div>
        </article>
      </Container>
    </section>
  );
}