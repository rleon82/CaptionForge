import type { GenerateRequest, GenerateResult } from "./generator";

export interface HistoryEntry {
  id: string;           // crypto.randomUUID()
  timestamp: number;    // Date.now()
  params: GenerateRequest;
  result: GenerateResult;
}
