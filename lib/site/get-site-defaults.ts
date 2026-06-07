import { readYamlContent } from "@/lib/content/read-yaml";
import { siteDefaultsSchema } from "@/lib/validations/content/site/defaults.schema";

export function getSiteDefaults() {
  return readYamlContent(siteDefaultsSchema, "fa", ["site", "defaults"]);
}