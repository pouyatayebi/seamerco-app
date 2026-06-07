export type NavigationItem = {
  title: string;
  href: string;
  links?: {
    title: string;
    href: string;
  }[];
};