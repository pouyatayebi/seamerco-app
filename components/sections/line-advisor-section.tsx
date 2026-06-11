"use client";

import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
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
import { LineAdvisorIndustrialPattern } from "@/components/svg/patterns/line-advisor-industrial-pattern";
import { cn } from "@/lib/utils";
import type { LineAdvisorSectionContent } from "@/lib/validations/content/sections/line-advisor.schema";

type LineAdvisorSectionProps = {
  content: LineAdvisorSectionContent;
  whatsappHref?: string;
};

type StepId = "line" | "investment" | "result";

type Recommendation = {
  title: string;
  capacity: string;
  configuration: string;
  note: string;
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
  const [activeStep, setActiveStep] = useState<StepId>("line");
  const [modalOpen, setModalOpen] = useState(false);

  const selectedLine = useMemo(
    () => content.lines.find((item) => item.id === lineId),
    [content.lines, lineId],
  );

  const selectedInvestment = useMemo(
    () => content.investments.find((item) => item.id === investmentId),
    [content.investments, investmentId],
  );

  const recommendation = useMemo(() => {
    if (!lineId || !investmentId) return null;
    return content.recommendations[lineId]?.[investmentId] ?? null;
  }, [content.recommendations, investmentId, lineId]);

  const message = useMemo(() => {
    const labels = content.ui.whatsappMessageLines;

    return [
      labels.greeting,
      "",
      `${labels.line}: ${selectedLine?.label ?? "-"}`,
      `${labels.investment}: ${selectedInvestment?.label ?? "-"}`,
      `${labels.recommendation}: ${recommendation?.title ?? "-"}`,
      `${labels.capacity}: ${recommendation?.capacity ?? "-"}`,
      `${labels.configuration}: ${recommendation?.configuration ?? "-"}`,
      "",
      labels.request,
    ].join("\n");
  }, [content.ui.whatsappMessageLines, recommendation, selectedInvestment, selectedLine]);

  const whatsappNumber = getWhatsappNumber(whatsappHref ?? content.cta.href);
  const whatsappUrl = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    : content.cta.href;

  const steps = [
    {
      id: "line" as const,
      label: content.steps.line,
      number: content.ui.stepNumbers.line,
    },
    {
      id: "investment" as const,
      label: content.steps.investment,
      number: content.ui.stepNumbers.investment,
    },
    {
      id: "result" as const,
      label: content.steps.result,
      number: content.ui.stepNumbers.result,
    },
  ];

  return (
    <section className="section relative overflow-hidden bg-[linear-gradient(135deg,var(--background)_0%,var(--surface)_48%,var(--background)_100%)]">
      <LineAdvisorIndustrialPattern
        className="hidden lg:block pointer-events-none absolute inset-0 h-full w-full text-secondary/18 [--pattern-accent:var(--primary)]"
        accentOpacity={0.24}
        shapeOpacity={0.12}
        lineOpacity={0.08}
      />

      <Container size="content" className="relative z-10">
        <div className="mb-8 max-w-3xl text-right md:mb-10">
          {content.eyebrow ? (
            <p className="eyebrow justify-start">{content.eyebrow}</p>
          ) : null}

          <h2 className="mt-3 text-2xl font-semibold leading-[1.7] text-foreground md:text-[2.05rem]">
            {content.title}
          </h2>

          <p className="lead mt-5 max-w-2xl text-justify">
            {content.description}
          </p>
        </div>

        <div className="lg:hidden">
          <MobileStepper
            steps={steps}
            activeStep={activeStep}
            onStepChange={setActiveStep}
          />

          <div className="rounded-[1.6rem] border border-border/70 bg-white/88 p-3 shadow-[0_18px_55px_rgb(0_0_0/0.10)] backdrop-blur-xl">
            {activeStep === "line" ? (
              <MobileLineStep
                content={content}
                lineId={lineId}
                onSelect={setLineId}
                onNext={() => setActiveStep("investment")}
              />
            ) : null}

            {activeStep === "investment" ? (
              <MobileInvestmentStep
                content={content}
                investmentId={investmentId}
                onSelect={setInvestmentId}
                onBack={() => setActiveStep("line")}
                onNext={() => setActiveStep("result")}
              />
            ) : null}

            {activeStep === "result" ? (
              <div>
                <AdvisorResultCard
                  content={content}
                  recommendation={recommendation}
                  onOpen={() => setModalOpen(true)}
                />

                <button
                  type="button"
                  onClick={() => setActiveStep("investment")}
                  className="mt-3 inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-bold text-secondary transition hover:bg-surface"
                >
                  <ArrowRight className="size-4" />
                  {content.ui.mobileBackToInvestment}
                </button>
              </div>
            ) : null}
          </div>
        </div>

        <div className="hidden gap-6 lg:grid lg:grid-cols-[1fr_0.92fr] lg:items-start">
          <div className="rounded-[2rem] border border-border/70 bg-white/82 p-4 shadow-[0_24px_80px_rgb(0_0_0/0.10)] backdrop-blur-xl">
            <DesktopStepper
              steps={steps}
              activeStep={activeStep}
              onStepChange={setActiveStep}
            />

            <div className="grid gap-4 xl:grid-cols-2">
              <LineSelector
                content={content}
                lineId={lineId}
                onSelect={(id) => {
                  setLineId(id);
                  setActiveStep("investment");
                }}
              />

              <InvestmentSelector
                content={content}
                investmentId={investmentId}
                onSelect={(id) => {
                  setInvestmentId(id);
                  setActiveStep("result");
                }}
              />
            </div>
          </div>

          <div className="sticky top-24">
            <AdvisorResultCard
              content={content}
              recommendation={recommendation}
              onOpen={() => setModalOpen(true)}
            />
          </div>
        </div>
      </Container>

      {modalOpen ? (
        <AdvisorModal
          content={content}
          message={message}
          whatsappUrl={whatsappUrl}
          onClose={() => setModalOpen(false)}
        />
      ) : null}
    </section>
  );
}

function MobileStepper({
  steps,
  activeStep,
  onStepChange,
}: {
  steps: { id: StepId; label: string; number: string }[];
  activeStep: StepId;
  onStepChange: (step: StepId) => void;
}) {
  return (
    <div className="mb-4 grid grid-cols-3 gap-2">
      {steps.map((step) => (
        <button
          key={step.id}
          type="button"
          onClick={() => onStepChange(step.id)}
          className={cn(
            "rounded-2xl border px-2 py-2.5 text-center transition",
            activeStep === step.id
              ? "border-primary bg-primary/10 text-primary"
              : "border-border bg-white text-content-muted",
          )}
        >
          <span className="block text-xs font-black">{step.number}</span>
          <span className="mt-1 block truncate text-[0.68rem] font-bold">
            {step.label}
          </span>
        </button>
      ))}
    </div>
  );
}

function DesktopStepper({
  steps,
  activeStep,
  onStepChange,
}: {
  steps: { id: StepId; label: string; number: string }[];
  activeStep: StepId;
  onStepChange: (step: StepId) => void;
}) {
  return (
    <div className="mb-4 grid gap-2 md:grid-cols-3">
      {steps.map((step) => (
        <button
          key={step.id}
          type="button"
          onClick={() => onStepChange(step.id)}
          className={cn(
            "flex items-center gap-3 rounded-2xl border px-3 py-3 text-right transition",
            activeStep === step.id
              ? "border-primary bg-primary/10 text-primary"
              : "border-border bg-white text-content-muted hover:border-primary/40 hover:text-foreground",
          )}
        >
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-black text-primary">
            {step.number}
          </span>
          <span className="text-sm font-bold">{step.label}</span>
        </button>
      ))}
    </div>
  );
}

function MobileLineStep({
  content,
  lineId,
  onSelect,
  onNext,
}: {
  content: LineAdvisorSectionContent;
  lineId?: string;
  onSelect: (id: string) => void;
  onNext: () => void;
}) {
  return (
    <motion.div
      key="mobile-line"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <LineSelector content={content} lineId={lineId} onSelect={onSelect} />

      <button
        type="button"
        onClick={onNext}
        className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-secondary px-4 py-3 text-sm font-bold text-secondary-foreground shadow-md"
      >
        {content.ui.mobileNextToInvestment}
        <ArrowLeft className="size-4" />
      </button>
    </motion.div>
  );
}

function MobileInvestmentStep({
  content,
  investmentId,
  onSelect,
  onBack,
  onNext,
}: {
  content: LineAdvisorSectionContent;
  investmentId?: string;
  onSelect: (id: string) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <motion.div
      key="mobile-investment"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <InvestmentSelector
        content={content}
        investmentId={investmentId}
        onSelect={onSelect}
      />

      <div className="mt-3 grid grid-cols-[auto_1fr] gap-2">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center justify-center rounded-xl border px-4 py-3 text-sm font-bold text-secondary"
          aria-label={content.ui.mobileBackToLine}
        >
          <ArrowRight className="size-4" />
        </button>

        <button
          type="button"
          onClick={onNext}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-secondary px-4 py-3 text-sm font-bold text-secondary-foreground shadow-md"
        >
          {content.ui.mobileShowResult}
          <ArrowLeft className="size-4" />
        </button>
      </div>
    </motion.div>
  );
}

function LineSelector({
  content,
  lineId,
  onSelect,
}: {
  content: LineAdvisorSectionContent;
  lineId?: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="rounded-[1.45rem] border border-border/70 bg-surface/80 p-4">
      <div className="mb-3 flex items-center gap-2">
        <Factory className="size-4.5 text-primary" />
        <h3 className="text-sm font-black text-secondary">
          {content.steps.line}
        </h3>
      </div>

      <div className="grid gap-2">
        {content.lines.map((line) => {
          const active = line.id === lineId;

          return (
            <button
              key={line.id}
              type="button"
              onClick={() => onSelect(line.id)}
              className={cn(
                "rounded-xl border px-3 py-3 text-right transition",
                active
                  ? "border-primary bg-primary/10 shadow-sm"
                  : "border-border bg-white hover:border-primary/50",
              )}
            >
              <span className="block text-[0.86rem] font-black text-foreground">
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
  );
}

function InvestmentSelector({
  content,
  investmentId,
  onSelect,
}: {
  content: LineAdvisorSectionContent;
  investmentId?: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="rounded-[1.45rem] bg-[radial-gradient(circle_at_top_right,color-mix(in_oklab,var(--primary)_18%,transparent),transparent_16rem),linear-gradient(145deg,color-mix(in_oklab,var(--secondary)_92%,black),var(--secondary))] p-4 text-white">
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
              onClick={() => onSelect(item.id)}
              className={cn(
                "rounded-xl border px-3 py-3 text-right transition",
                active
                  ? "border-primary bg-primary/25"
                  : "border-white/15 bg-white/[0.06] hover:border-primary/60",
              )}
            >
              <span className="block text-[0.86rem] font-black text-white">
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
  );
}

function AdvisorResultCard({
  content,
  recommendation,
  onOpen,
}: {
  content: LineAdvisorSectionContent;
  recommendation: Recommendation | null;
  onOpen: () => void;
}) {
  return (
    <motion.div
      key={recommendation?.title}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="overflow-hidden rounded-[2rem] border border-border/70 bg-white shadow-[0_24px_80px_rgb(0_0_0/0.12)]"
    >
      <div className="bg-[radial-gradient(circle_at_top_right,color-mix(in_oklab,var(--primary)_16%,transparent),transparent_18rem),linear-gradient(135deg,var(--surface),var(--background))] p-5">
        <div className="flex items-start gap-3">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md">
            <Sparkles className="size-5" />
          </span>

          <div>
            <p className="text-xs font-black text-primary">
              {content.steps.result}
            </p>

            <h3 className="mt-1 text-xl font-black leading-8 text-secondary">
              {recommendation?.title}
            </h3>
          </div>
        </div>

        <div className="mt-5 grid gap-3">
          <div className="rounded-2xl border bg-white p-4">
            <p className="text-xs font-bold text-muted-foreground">
              {content.ui.recommendationCapacityLabel}
            </p>
            <p className="mt-1 text-sm font-black text-foreground">
              {recommendation?.capacity}
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-4">
            <p className="text-xs font-bold text-muted-foreground">
              {content.ui.recommendationConfigurationLabel}
            </p>
            <p className="mt-1 text-sm leading-7 text-content">
              {recommendation?.configuration}
            </p>
          </div>
        </div>

        <p className="mt-4 flex gap-2 text-justify text-sm leading-7 text-content-muted">
          <CheckCircle2 className="mt-1 size-4 shrink-0 text-primary" />
          {recommendation?.note}
        </p>

        <button
          type="button"
          onClick={onOpen}
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-secondary px-4 py-3 text-sm font-bold text-secondary-foreground shadow-md transition hover:-translate-y-0.5 hover:bg-secondary/90"
        >
          {content.cta.label}
          <ArrowLeft className="size-4" />
        </button>
      </div>
    </motion.div>
  );
}

function AdvisorModal({
  content,
  message,
  whatsappUrl,
  onClose,
}: {
  content: LineAdvisorSectionContent;
  message: string;
  whatsappUrl: string;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-[1.5rem] bg-white p-5 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-black text-primary">
              {content.ui.modalEyebrow}
            </p>
            <h3 className="mt-1 text-xl font-black text-secondary">
              {content.ui.modalTitle}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full border p-2 text-content-muted transition hover:bg-surface"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="mt-4 rounded-xl border bg-surface p-4 text-sm leading-7 text-content-muted">
          <pre className="whitespace-pre-wrap font-sans">{message}</pre>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => navigator.clipboard.writeText(message)}
            className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-bold text-secondary transition hover:bg-surface"
          >
            <Clipboard className="size-4" />
            {content.ui.copyMessageLabel}
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-secondary px-4 py-2 text-sm font-bold text-secondary-foreground transition hover:bg-secondary/90"
          >
            <MessageCircle className="size-4" />
            {content.ui.whatsappLabel}
          </a>
        </div>
      </div>
    </div>
  );
}