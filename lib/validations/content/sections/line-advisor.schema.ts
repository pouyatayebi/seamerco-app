import { z } from "zod";

export const lineAdvisorSectionSchema = z.object({
  eyebrow: z.string().optional(),
  title: z.string().min(1),
  description: z.string().min(1),

  steps: z.object({
    line: z.string().min(1),
    investment: z.string().min(1),
    result: z.string().min(1),
  }),

  cta: z.object({
    label: z.string().min(1),
    href: z.string().min(1),
  }),

  lines: z.array(
    z.object({
      id: z.string().min(1),
      label: z.string().min(1),
      subtitle: z.string().min(1),
    })
  ),

  investments: z.array(
    z.object({
      id: z.string().min(1),
      label: z.string().min(1),
      rangeLabel: z.string().min(1),
      hint: z.string().min(1),
    })
  ),

  recommendations: z.record(
    z.string(),
    z.record(
      z.string(),
      z.object({
        title: z.string().min(1),
        capacity: z.string().min(1),
        configuration: z.string().min(1),
        note: z.string().min(1),
      })
    )
  ),

ui: z.object({
  stepNumbers: z.object({
    line: z.string(),
    investment: z.string(),
    result: z.string(),
  }),
  mobileNextToInvestment: z.string(),
  mobileShowResult: z.string(),
  mobileBackToLine: z.string(),
  mobileBackToInvestment: z.string(),
  recommendationCapacityLabel: z.string(),
  recommendationConfigurationLabel: z.string(),
  modalEyebrow: z.string(),
  modalTitle: z.string(),
  copyMessageLabel: z.string(),
  whatsappLabel: z.string(),
  whatsappMessageLines: z.object({
    greeting: z.string(),
    line: z.string(),
    investment: z.string(),
    recommendation: z.string(),
    capacity: z.string(),
    configuration: z.string(),
    request: z.string(),
  }),
}),

});

export type LineAdvisorSectionContent = z.infer<
  typeof lineAdvisorSectionSchema
>;