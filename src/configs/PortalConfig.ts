import { PortalSectionKey, PortalSectionVisibility } from "@/types/PortalTypes";

export const PORTAL_SECTION_LABELS: Record<PortalSectionKey, string> = {
  readme: "README",
  internalDocs: "Internal Docs",
  apiReference: "API Reference",
  schemaDocs: "Schema Docs",
  securityReport: "Security Report",
};

export const PORTAL_SECTION_KEYS: PortalSectionKey[] = [
  "readme",
  "internalDocs",
  "apiReference",
  "schemaDocs",
  "securityReport",
];

export const TAB_IDS = ["general", "sections", "branding", "domain"] as const;

export type TabId = (typeof TAB_IDS)[number];

export const TAB_LABELS: Record<TabId, string> = {
  general: "General",
  sections: "Sections",
  branding: "Branding",
  domain: "Custom Domain",
};

export const VISIBILITY_OPTIONS: {
  value: PortalSectionVisibility;
  label: string;
  description: string;
}[] = [
  {
    value: "public",
    label: "Public",
    description: "Visible to all portal visitors",
  },
  {
    value: "internal",
    label: "Internal only",
    description: "Hidden from the portal entirely",
  },
  {
    value: "coming_soon",
    label: "Coming soon",
    description: "Shows as locked in the sidebar",
  },
];
