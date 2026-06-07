import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils";

type ContainerSize = "page" | "header" | "content";

type ContainerProps<T extends ElementType = "div"> = {
  as?: T;
  size?: ContainerSize;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

const containerClassName: Record<ContainerSize, string> = {
  page: "container-page",
  header: "container-header",
  content: "container-content",
};

export function Container<T extends ElementType = "div">({
  as,
  size = "content",
  children,
  className,
  ...props
}: ContainerProps<T>) {
  const Component = as || "div";

  return (
    <Component className={cn(containerClassName[size], className)} {...props}>
      {children}
    </Component>
  );
}