import type { Plates } from "./store";
import { sortedEntries } from "./utils";

type PlatesNeeded = {
  plates: Plates;
  final?: number;
  delta?: number;
};

export const platesNeeded = (
  target: number,
  barWeight: number,
  plates: Plates
): PlatesNeeded => {
  const platesOnHand = sortedEntries(plates);

  let accumulatedWeight = barWeight;
  const platesNeeded: Plates = {};
  for (const [plate, count] of platesOnHand) {
    if (accumulatedWeight >= target) break;

    const anyLeft = (platesNeeded[plate] ?? 0) < count;
    if (anyLeft && accumulatedWeight + +plate * 2 <= target) {
      platesNeeded[plate] = (platesNeeded[plate] ?? 0) + 1;
      accumulatedWeight += +plate * 2;
    }
  }

  return {
    plates: platesNeeded,
    final: accumulatedWeight,
    delta:
      target === accumulatedWeight ? undefined : target - accumulatedWeight,
  };
};
