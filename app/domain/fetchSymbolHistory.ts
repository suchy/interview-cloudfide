import { getRecentTrades } from '../binance.ts';
import { type SymbolHistoryEntry } from './types.ts';

export async function fetchSymbolHistory(
  symbol: string,
  startTime?: Date,
  endTime?: Date
) {
  const trades = await getRecentTrades({ symbol, startTime, endTime });

  const symbolHistory: SymbolHistoryEntry[] = [];

  for (const t of trades) {
    if (!t.T || !t.p) {
      continue;
    }

    symbolHistory.push({
      price: t.p,
      timestamp: new Date(t.T)
    });
  }

  return symbolHistory;
}
