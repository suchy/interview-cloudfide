import { Spot } from '@binance/spot';

const apiKey = process.env.BINANCE_API_KEY;
const apiSecret = process.env.BINANCE_SECRET_KEY;

if (!apiKey) {
  throw new Error('BINANCE_API_KEY is missing.');
}

if (!apiSecret) {
  throw new Error('BINANCE_SECRET_KEY is missing.');
}

const client = new Spot({
  configurationRestAPI: {
    apiKey,
    apiSecret
  }
}).restAPI;

interface GetRecentTradesArgs {
  symbol: string;
  limit?: number;
  startTime?: Date;
  endTime?: Date;
}
export async function getRecentTrades(args: GetRecentTradesArgs) {
  try {
    const { symbol, limit = 500, startTime, endTime } = args;

    const params: Record<string, string | number> = {
      symbol,
      limit
    };

    if (startTime) {
      params.startTime = startTime.getTime();
    }

    if (endTime) {
      params.endTime = endTime.getTime();
    }

    const response = await client.aggTrades(params);
    const trades = await response.data();
    return trades;
  } catch (error) {
    console.error('Error fetching recent trades:', error);
    return [];
  }
}
