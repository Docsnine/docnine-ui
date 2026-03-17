import { ApiProjectMeta, CustomTab } from "./ProjectTypes";

export type PortalSectionVisibility = "public" | "internal" | "coming_soon";
export type PortalAccessMode = "public" | "password";

export type PortalSectionKey =
  | "readme"
  | "internalDocs"
  | "apiReference"
  | "schemaDocs"
  | "securityReport";

export interface PortalSectionConfig {
  sectionKey: PortalSectionKey;
  visibility: PortalSectionVisibility;
}

export interface PortalFooterLink {
  label: string;
  href: string;
}

export interface PortalBranding {
  logo?: string;
  favicon?: string;
  primaryColor?: string;
  bgColor?: string;
  accentColor?: string;
  headerText?: string;
  footerText?: string;
  footerLinks?: PortalFooterLink[];
}

export interface ApiPortal {
  _id?: string;
  projectId?: string;
  slug: string;
  isPublished: boolean;
  accessMode: PortalAccessMode;
  branding: PortalBranding;
  sections: PortalSectionConfig[];
  seoTitle?: string;
  seoDescription?: string;
  customDomain?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface PublicPortalData {
  portal: ApiPortal;
  project: {
    repoOwner: string;
    repoName: string;
    meta: ApiProjectMeta;
    techStack: string[];
  };
  protected: boolean;
  /** null when password-protected and not yet verified */
  content: Record<PortalSectionKey, string | null> | null;
  /** null when password-protected and not yet verified */
  sectionVisibility: Record<PortalSectionKey, PortalSectionVisibility> | null;
}

export interface PortalSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
  /** Optional initial portal data (to avoid an extra fetch when already loaded) */
  initialPortal?: ApiPortal | null;
  /** Optional custom tabs from the project (to include in publishable sections) */
  customTabs?: CustomTab[];
  onPublishChange?: (portal: ApiPortal) => void;
}
