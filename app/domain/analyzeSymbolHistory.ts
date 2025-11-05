import {
  type SymbolHistoryAnalyzeEntry,
  type SymbolHistoryEntry
} from './types.ts';

export function analyzeSymbolHistory(symbolHistory: SymbolHistoryEntry[]) {
  const symbolHistoryAnalyze: SymbolHistoryAnalyzeEntry[] = [];

  for (let i = 0; i < symbolHistory.length; i++) {
    const item = symbolHistory[i];
    const previousItem = symbolHistory[i - 1];

    if (!previousItem) {
      const price = parseFloat(item.price);

      symbolHistoryAnalyze.push({
        price,
        diff: price,
        diffPercentage: 100,
        timestamp: item.timestamp,
        isIncrease: true,
        isDecrease: false
      });

      continue;
    }

    const previousItemPrice = parseFloat(previousItem.price);
    const itemPrice = parseFloat(item.price);

    const diff = 0 - (previousItemPrice - itemPrice);

    const diffPercentage = (Math.abs(diff) / previousItemPrice) * 100;

    symbolHistoryAnalyze.push({
      price: itemPrice,
      diff,
      diffPercentage,
      timestamp: item.timestamp,
      isIncrease: diff > 0,
      isDecrease: diff < 0
    });
  }

  return symbolHistoryAnalyze;
}
