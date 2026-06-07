"use client";

import { useMemo, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Clipboard,
  Factory,
  Gauge,
  MessageCircle,
  Sparkles,
  X,
} from "lucide-react";
import { motion } from "framer-motion";

import { Container } from "@/components/shared/container";
import { cn } from "@/lib/utils";
import type { LineAdvisorSectionContent } from "@/lib/validations/content/sections/line-advisor.schema";

type LineAdvisorSectionProps = {
  content: LineAdvisorSectionContent;
  whatsappHref?: string;
};

function getWhatsappNumber(whatsappHref?: string) {
  if (!whatsappHref) return "";

  return whatsappHref
    .replace("https://wa.me/", "")
    .replace("http://wa.me/", "")
    .replace("wa.me/", "")
    .replace(/[^\d]/g, "");
}

export function LineAdvisorSection({
  content,
  whatsappHref,
}: LineAdvisorSectionProps) {
  const [lineId, setLineId] = useState(content.lines[0]?.id);
  const [investmentId, setInvestmentId] = useState(content.investments[1]?.id);
  const [modalOpen, setModalOpen] = useState(false);

  const selectedLine = useMemo(
    () => content.lines.find((item) => item.id === lineId),
    [content.lines, lineId]
  );

  const selectedInvestment = useMemo(
    () => content.investments.find((item) => item.id === investmentId),
    [content.investments, investmentId]
  );

  const recommendation = useMemo(() => {
    if (!lineId || !investmentId) return null;
    return content.recommendations[lineId]?.[investmentId] ?? null;
  }, [content.recommendations, investmentId, lineId]);

  const message = useMemo(() => {
    return [
      "سلام، برای دریافت پیش‌فاکتور اولیه از سایت سیمرکو پیام می‌دهم.",
      "",
      `خط تولید انتخابی: ${selectedLine?.label ?? "-"}`,
      `سطح سرمایه‌گذاری: ${selectedInvestment?.label ?? "-"}`,
      `پیشنهاد اولیه: ${recommendation?.title ?? "-"}`,
      `ظرفیت پیشنهادی: ${recommendation?.capacity ?? "-"}`,
      `پیکربندی پیشنهادی: ${recommendation?.configuration ?? "-"}`,
      "",
      "لطفا برای بررسی فنی و اعلام حدود قیمت با من تماس بگیرید.",
    ].join("\n");
  }, [recommendation, selectedInvestment, selectedLine]);

  const whatsappNumber = getWhatsappNumber(whatsappHref ?? content.cta.href);
  const whatsappUrl = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    : content.cta.href;

  return (
    <section className="relative overflow-hidden bg-background py-14 md:py-18">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_18%,rgba(216,74,43,0.08),transparent_24rem),radial-gradient(circle_at_88%_18%,rgba(0,59,112,0.10),transparent_28rem),linear-gradient(180deg,#fff,#f8fafc_48%,#fff)]" />

      <Container size="content" className="relative">
        <div className="grid gap-7 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <div>
            {content.eyebrow ? (
              <p className="eyebrow">{content.eyebrow}</p>
            ) : null}

            <h2 className="section-title mt-3 max-w-xl">{content.title}</h2>

            <p className="lead mt-6 max-w-xl text-justify">
              {content.description}
            </p>

            <div className="mt-7 grid max-w-md gap-2.5 text-sm text-content-muted">
              {[
                content.steps.line,
                content.steps.investment,
                content.steps.result,
              ].map((step, index) => (
                <div
                  key={step}
                  className="flex items-center gap-3 rounded-xl border bg-white/70 px-3 py-2.5 shadow-sm"
                >
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-black text-primary">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[1.75rem] border border-secondary/10 bg-white/88 p-3 shadow-[0_26px_90px_rgba(0,0,0,0.13)] backdrop-blur md:p-4">
            <span className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-l from-transparent via-primary/35 to-transparent" />

            <div className="grid gap-3 md:grid-cols-[1fr_0.86fr]">
              <div className="rounded-2xl border border-border/70 bg-surface/80 p-3.5">
                <div className="mb-3 flex items-center gap-2">
                  <Factory className="size-4.5 text-primary" />
                  <h3 className="text-sm font-black">{content.steps.line}</h3>
                </div>

                <div className="grid gap-2">
                  {content.lines.map((line) => {
                    const active = line.id === lineId;

                    return (
                      <button
                        key={line.id}
                        type="button"
                        onClick={() => setLineId(line.id)}
                        className={cn(
                          "rounded-xl border px-3 py-2.5 text-right transition",
                          active
                            ? "border-primary bg-primary/10 shadow-sm"
                            : "border-border bg-white hover:border-primary/50"
                        )}
                      >
                        <span className="block text-[0.84rem] font-bold">
                          {line.label}
                        </span>
                        <span className="mt-1 block text-[0.72rem] leading-5 text-muted-foreground">
                          {line.subtitle}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-2xl bg-[radial-gradient(circle_at_top_right,rgba(216,74,43,0.18),transparent_16rem),linear-gradient(145deg,#06213b,#003b70)] p-3.5 text-white">
                <div className="mb-3 flex items-center gap-2">
                  <Gauge className="size-4.5 text-primary" />
                  <h3 className="text-sm font-black text-white">
                    {content.steps.investment}
                  </h3>
                </div>

                <div className="grid gap-2">
                  {content.investments.map((item) => {
                    const active = item.id === investmentId;

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setInvestmentId(item.id)}
                        className={cn(
                          "rounded-xl border px-3 py-2.5 text-right transition",
                          active
                            ? "border-primary bg-primary/22"
                            : "border-white/15 bg-white/6 hover:border-primary/60"
                        )}
                      >
                        <span className="block text-[0.84rem] font-bold text-white">
                          {item.label}
                        </span>
                        <span className="mt-1 block text-[0.72rem] leading-5 text-white/65">
                          {item.rangeLabel}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <motion.div
              key={`${lineId}-${investmentId}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="mt-3 overflow-hidden rounded-2xl border border-secondary/10 bg-[radial-gradient(circle_at_top_left,rgba(216,74,43,0.12),transparent_18rem),linear-gradient(135deg,#f8fafc,#ffffff)] p-4"
            >
              <div className="flex items-start gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md">
                  <Sparkles className="size-4.5" />
                </span>

                <div className="min-w-0 flex-1">
                  <p className="text-[0.72rem] font-bold text-primary">
                    {content.steps.result}
                  </p>

                  <h3 className="mt-1 text-lg font-black leading-8">
                    {recommendation?.title}
                  </h3>

                  <div className="mt-3 grid gap-2 md:grid-cols-2">
                    <div className="rounded-xl border bg-white p-3">
                      <p className="text-[0.72rem] font-bold text-muted-foreground">
                        ظرفیت پیشنهادی
                      </p>
                      <p className="mt-1 text-[0.82rem] font-bold">
                        {recommendation?.capacity}
                      </p>
                    </div>

                    <div className="rounded-xl border bg-white p-3">
                      <p className="text-[0.72rem] font-bold text-muted-foreground">
                        پیکربندی خط
                      </p>
                      <p className="mt-1 text-[0.82rem] leading-6">
                        {recommendation?.configuration}
                      </p>
                    </div>
                  </div>

                  <p className="mt-3 flex gap-2 text-justify text-[0.82rem] leading-7 text-content-muted">
                    <CheckCircle2 className="mt-1 size-4 shrink-0 text-primary" />
                    {recommendation?.note}
                  </p>

                  <button
                    type="button"
                    onClick={() => setModalOpen(true)}
                    className="mt-4 inline-flex items-center gap-2 rounded-xl bg-secondary px-4 py-2.5 text-[0.82rem] font-bold text-secondary-foreground shadow-md transition hover:-translate-y-0.5 hover:bg-secondary/90"
                  >
                    {content.cta.label}
                    <ArrowLeft className="size-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>

      {modalOpen ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/55 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/20 bg-white shadow-[0_30px_120px_rgba(0,0,0,0.35)]">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              aria-label="بستن"
              className="absolute left-4 top-4 z-10 rounded-full bg-muted p-2 text-muted-foreground transition hover:text-foreground"
            >
              <X className="size-4" />
            </button>

            <div className="bg-[radial-gradient(circle_at_top_right,rgba(216,74,43,0.20),transparent_18rem),linear-gradient(135deg,#06213b,#003b70)] px-6 py-6 text-white">
              <div className="flex items-center gap-3">
                <span className="flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <MessageCircle className="size-5" />
                </span>

                <div>
                  <p className="text-xs text-white/70">ارسال از طریق واتس‌اپ</p>
                  <h3 className="text-lg font-black text-white">
                    درخواست پیش‌فاکتور اولیه
                  </h3>
                </div>
              </div>
            </div>

            <div className="p-5">
              <p className="text-sm leading-7 text-content-muted">
                پیام زیر بر اساس انتخاب‌های شما آماده شده و با کلیک روی دکمه،
                در واتس‌اپ برای تیم مشاوره سیمرکو ارسال می‌شود.
              </p>

              <div className="mt-4 rounded-2xl border bg-surface p-4">
                <div className="mb-2 flex items-center gap-2 text-xs font-bold text-primary">
                  <Clipboard className="size-4" />
                  متن آماده ارسال
                </div>

                <pre className="max-h-56 overflow-auto whitespace-pre-wrap rounded-xl bg-white p-3 text-right text-xs leading-6 text-foreground">
                  {message}
                </pre>
              </div>

              <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground transition hover:bg-primary/90"
                >
                  ارسال در واتس‌اپ
                  <MessageCircle className="size-4" />
                </a>

                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="inline-flex flex-1 items-center justify-center rounded-xl border px-4 py-3 text-sm font-bold text-foreground transition hover:bg-muted"
                >
                  بازگشت و ویرایش انتخاب‌ها
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}