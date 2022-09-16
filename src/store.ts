import { writable } from "svelte/store";

// TODO: DRY this up

const PLATES_LOCALSTORAGE = "plates";

type Plates = {
  [weight: string]: number;
};

const defaultPlates: Plates = {
  55: 1,
  45: 1,
  35: 1,
  25: 1,
  15: 1,
  5: 1,
  2.5: 1,
};

const maybePlates = (
  platesInput: string | object | null
): Plates | undefined => {
  try {
    if (!platesInput) return undefined;

    const parsedPlates =
      typeof platesInput === "object" ? platesInput : JSON.parse(platesInput);

    if (
      typeof parsedPlates === "object" &&
      Object.values(parsedPlates).every((val) => typeof val === "number")
    ) {
      return parsedPlates as Plates;
    }
    return undefined;
  } catch (e) {
    console.warn("something went wrong parsing plates:", e);
    console.warn("received:", platesInput);
    return undefined;
  }
};

const storedPlates = maybePlates(
  localStorage.getItem(PLATES_LOCALSTORAGE) ?? defaultPlates
);
export const plates = writable(storedPlates);

plates.subscribe((updatedValue) => {
  const updatedPlates = maybePlates(updatedValue);
  localStorage.setItem(
    PLATES_LOCALSTORAGE,
    updatedPlates
      ? JSON.stringify(updatedPlates)
      : JSON.stringify(defaultPlates)
  );
});

const BAR_WEIGHT_LOCALSTORAGE = "barWeight";
export const defaultBarWeight = 45;
const maybeBarWeight = (
  barWeightInput: string | number | null
): number | undefined => {
  return ["string", "number"].includes(typeof barWeightInput) &&
    !isNaN(Number(barWeightInput))
    ? Number(barWeightInput)
    : undefined;
};
const storedBarWeight =
  maybeBarWeight(localStorage.getItem(BAR_WEIGHT_LOCALSTORAGE)) ??
  defaultBarWeight;
export const barWeight = writable(storedBarWeight);

barWeight.subscribe((updatedValue) => {
  const updatedBarWeight = maybeBarWeight(updatedValue);
  barWeight.set(updatedBarWeight ?? defaultBarWeight);
  localStorage.setItem(
    BAR_WEIGHT_LOCALSTORAGE,
    (updatedBarWeight ?? defaultBarWeight).toString()
  );
});

export const reset = () => {
  plates.set(defaultPlates);
  barWeight.set(defaultBarWeight);
};
