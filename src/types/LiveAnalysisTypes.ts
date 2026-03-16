export type LogSeverity = "info" | "warning" | "error" | "success";

export interface LogEntry {
  id: string;
  timestamp: string;
  message: string;
  severity: LogSeverity;
}
