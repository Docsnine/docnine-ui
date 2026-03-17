export interface StaleSectionBannerProps {
  changeSummary: string | null;
  onViewDiff: () => void;
  onAcceptAI: () => void;
  onDismiss: () => void;
  accepting: boolean;
}
