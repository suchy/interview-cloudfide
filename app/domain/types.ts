export interface SymbolHistoryEntry {
  price: string;
  timestamp: Date;
}

export interface SymbolHistoryAnalyzeEntry {
  timestamp: Date;
  price: Number;
  diff: Number;
  diffPercentage: Number;
  isIncrease: boolean;
  isDecrease: boolean;
}
