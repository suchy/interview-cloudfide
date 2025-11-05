import assert from 'node:assert/strict';
import { describe, test, beforeEach } from 'node:test';
import { analyzeSymbolHistory } from './analyzeSymbolHistory.ts';
import { type SymbolHistoryEntry } from './types.ts';

describe('analyzeSymbolHistory', { concurrency: true }, () => {
  let symbolHistory: SymbolHistoryEntry[] = [];

  beforeEach(() => {
    const now = new Date();

    symbolHistory = [
      { price: '20', timestamp: now },
      {
        price: '100',
        timestamp: new Date(now.getTime() + 1000)
      },
      {
        price: '120',
        timestamp: new Date(now.getTime() + 2000)
      },
      {
        price: '60',
        timestamp: new Date(now.getTime() + 3000)
      }
    ];
  });

  test('should return array', () => {
    const result = analyzeSymbolHistory(symbolHistory);
    assert.equal(Array.isArray(result), true);
    assert.equal(result.length, 4);
  });

  test('should return emprty array if history was empty', () => {
    const result = analyzeSymbolHistory([]);
    assert.equal(result.length, 0);
  });

  test('should calculate diff', () => {
    const result = analyzeSymbolHistory(symbolHistory);

    assert.equal(result[0].diff, 20);
    assert.equal(result[1].diff, 80);
    assert.equal(result[3].diff, -60);
  });

  test('should calculate diff percentage', () => {
    const result = analyzeSymbolHistory(symbolHistory);

    assert.equal(result[0].diffPercentage, 100);
    assert.equal(result[1].diffPercentage, 400);
    assert.equal(result[3].diffPercentage, 50);
  });

  test('should decide if is increase or decrease', () => {
    const result = analyzeSymbolHistory(symbolHistory);

    assert.equal(result[0].isIncrease, true);
    assert.equal(result[0].isDecrease, false);
    assert.equal(result[3].isIncrease, false);
    assert.equal(result[3].isDecrease, true);
  });
});
