import { ApiSpec, ApiSpecEndpoint } from "./ApiSpecTypes";

export interface TryConsoleProps {
  projectId: string;
  endpoint: ApiSpecEndpoint;
  spec: ApiSpec;
  onClose: () => void;
}
