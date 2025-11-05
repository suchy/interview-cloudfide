import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { fetchSymbolHistory } from './fetchSymbolHistory.ts';

describe('fetchSymbolHistory', { concurrency: true }, () => {
  test('should return an array', async () => {
    const symbolHistory = await fetchSymbolHistory('BTCUSDT');
    assert.equal(Array.isArray(symbolHistory), true);
  });

  test('should return empty array if symbol is invalid', async () => {
    const symbolHistory = await fetchSymbolHistory('INVALID_SYMBOL');
    assert.equal(Array.isArray(symbolHistory), true);
    assert.equal(symbolHistory.length, 0);
  });

  test('should return return results within time range', async () => {
    const endTime = new Date();
    const startTime = new Date(endTime.getTime() - 60000);

    const symbolHistory = await fetchSymbolHistory(
      'BTCUSDT',
      startTime,
      endTime
    );

    assert.equal(symbolHistory.length > 0, true);
    assert.equal(symbolHistory[0]?.timestamp >= startTime, true);
    assert.equal(
      symbolHistory[symbolHistory.length - 1]?.timestamp <= endTime,
      true
    );
  });
});
