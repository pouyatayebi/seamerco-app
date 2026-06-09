// components/shared/hero-icon-map.tsx

import type { ComponentType, SVGProps } from "react";

import { TomatoProcessingLineIcon } from "@/components/svg/TomatoProcessingLineIcon";
import { CannedBeansLineIcon } from "@/components/svg/CannedBeansLineIcon";
import { CannedTunaLineIcon } from "@/components/svg/CannedTunaLineIcon";
import { TomatoPackagingLineIcon } from "@/components/svg/TomatoPackagingLineIcon";
import { CannedJamFruitLineIcon } from "@/components/svg/CannedJamFruitLineIcon";
import { CannedOlivePickledLineIcon } from "@/components/svg/CannedOlivePickledLineIcon";

export type HeroIconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export const heroIconMap = {
  "tomato-processing": TomatoProcessingLineIcon,
  "canned-beans": CannedBeansLineIcon,
  "canned-tuna": CannedTunaLineIcon,
  "tomato-packaging": TomatoPackagingLineIcon,
  "canned-jam-fruit": CannedJamFruitLineIcon,
  "canned-olive-pickled": CannedOlivePickledLineIcon,
} satisfies Record<string, HeroIconComponent>;

export type HeroIconKey = keyof typeof heroIconMap;