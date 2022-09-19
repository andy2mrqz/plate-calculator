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
    for (let numPlates = 1; numPlates <= count; numPlates++) {
      if (accumulatedWeight >= target) break;

      const pairWeight = +plate * 2;
      if (accumulatedWeight + pairWeight <= target) {
        platesNeeded[plate] = numPlates;
        accumulatedWeight += pairWeight;
      }
    }
  }

  return {
    plates: platesNeeded,
    final: accumulatedWeight,
    delta:
      target === accumulatedWeight ? undefined : target - accumulatedWeight,
  };
};
