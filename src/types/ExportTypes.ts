export interface ExportTabContent {
  key: string;
  label: string;
  content: string;
  isCustom?: boolean;
  order?: number;
}

export interface ExportDocumentData {
  projectName: string;
  projectDescription?: string;
  exportedAt: string;
  tabs: ExportTabContent[];
  totalTabs: number;
}
