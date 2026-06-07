import { readYamlContent } from "@/lib/content/read-yaml";

import { siteSettingsSchema } from "@/lib/validations/content/site/settings.schema";

export async function getSiteSettings() {
  return readYamlContent(
    siteSettingsSchema,
    "fa",
    ["site", "settings"]
  );
}