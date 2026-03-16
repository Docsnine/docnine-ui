import { BillingPlan } from "@/types/BillingTypes";
import { Star, User, Users, Zap } from "lucide-react";

export const COMPARISON_ROWS = [
  { label: "Projects", key: "projects" as const },
  { label: "Team seats", key: "seats" as const },
  { label: "AI chats / month", key: "aiChatsPerMonth" as const },
  { label: "Portals", key: "portals" as const },
  { label: "Max file size (MB)", key: "maxFileSizeMb" as const },
  { label: "Version history (days)", key: "versionHistoryDays" as const },
];

export const FEATURE_ROWS: {
  label: string;
  key: keyof BillingPlan["features"];
}[] = [
  { label: "Share (view only)", key: "shareViewOnly" },
  { label: "Share (edit access)", key: "shareEdit" },
  { label: "Archive & restore", key: "archiveRestore" },
  { label: "OpenAPI importer", key: "openApiImporter" },
  { label: "GitHub sync", key: "githubSync" },
  { label: "Custom domain", key: "customDomain" },
  { label: "Doc approval workflow", key: "docApproval" },
  { label: "API / webhook access", key: "apiWebhookAccess" },
];

export const PLAN_ICONS: Record<string, React.ElementType> = {
  free: Star,
  starter: Zap,
  pro: User,
  team: Users,
};

export const PLAN_COLOURS: Record<string, string> = {
  free: "bg-muted text-muted-foreground border-border",
  starter: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  pro: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  team: "bg-primary/10 text-primary border-primary/20",
};

export const PLAN_ACCENT: Record<string, string> = {
  free: "text-muted-foreground",
  starter: "text-blue-400",
  pro: "text-primary",
  team: "text-primary",
};

export const PLAN_BTN: Record<string, string> = {
  free: "",
  starter: "bg-foreground text-background",
  pro: "bg-primary hover:bg-primary/90 text-white",
  team: "bg-background border border-border text-white",
};

export const PLAN_LABELS: Record<
  string,
  { name: string; colour: string; Icon: React.ElementType }
> = {
  starter: { name: "Starter", colour: "text-blue-400", Icon: Zap },
  pro: { name: "Pro", colour: "text-violet-400", Icon: User },
  team: { name: "Team", colour: "text-primary", Icon: User },
};
