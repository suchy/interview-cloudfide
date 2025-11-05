import express from 'express';
import { fetchSymbolHistory } from './domain/fetchSymbolHistory.ts';
import { analyzeSymbolHistory } from './domain/analyzeSymbolHistory.ts';

const app = express();

app.get('/', async (req, res) => {
  const query = req.query;

  const symbol = query.symbol?.toString()?.toUpperCase();

  const startTime = query.startTime
    ? new Date(query.startTime.toString())
    : undefined;

  const endTime = query.endTime
    ? new Date(query.endTime.toString())
    : undefined;

  if (!symbol) {
    return res.json([]);
  }

  const symbolHistory = await fetchSymbolHistory(symbol, startTime, endTime);

  const symbolHistoryAnalyze = analyzeSymbolHistory(symbolHistory);

  res.json(symbolHistoryAnalyze);
});

const port = process.env.PORT ?? 3001;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
