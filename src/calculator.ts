import type { Plates } from "./store";
// import { sortedEntries } from "./utils";

type PlatesNeededResponse = {
  plates: Plates;
  final?: number;
  delta?: number;
};

export const platesNeeded = (
  target: number,
  barWeight: number,
  plates: Plates
): PlatesNeededResponse => {
  if (target < barWeight) {
    return {
      final: barWeight,
      delta: target - barWeight,
      plates: {},
    };
  }

  // const plateCounts = sortedEntries(plates);

  return { plates };
};
