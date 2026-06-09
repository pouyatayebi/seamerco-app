import type { ComponentType, SVGProps } from "react";

import { AsepticIcon } from "@/components/svg/AsepticIcon";
import { CanIcon } from "@/components/svg/CanIcon";
import { CannedBeansLineIcon } from "@/components/svg/CannedBeansLineIcon";
import { CannedJamFruitLineIcon } from "@/components/svg/CannedJamFruitLineIcon";
import { CannedOlivePickledLineIcon } from "@/components/svg/CannedOlivePickledLineIcon";
import { CannedTunaLineIcon } from "@/components/svg/CannedTunaLineIcon";
import { GlassIcon } from "@/components/svg/GlassIcon";
import { SachetIcon } from "@/components/svg/SachetIcon";
import { TomatoPackagingLineIcon } from "@/components/svg/TomatoPackagingLineIcon";
import { TomatoProcessingLineIcon } from "@/components/svg/TomatoProcessingLineIcon";

export type HeroIconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export const heroIconMap = {
  "tomato-processing": TomatoProcessingLineIcon,
  "canned-beans": CannedBeansLineIcon,
  "canned-tuna": CannedTunaLineIcon,
  "tomato-packaging": TomatoPackagingLineIcon,
  "canned-jam-fruit": CannedJamFruitLineIcon,
  "canned-olive-pickled": CannedOlivePickledLineIcon,

  "tomato-can": CanIcon,
  "tomato-glass": GlassIcon,
  "tomato-aseptic": AsepticIcon,
  "tomato-sachet": SachetIcon,
} satisfies Record<string, HeroIconComponent>;

export type HeroIconKey = keyof typeof heroIconMap;