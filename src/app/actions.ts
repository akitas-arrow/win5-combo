"use server";

import { Combo } from "./types";

export const calculateWin5Combinations = async (
  prevState: Combo | null,
  formData: FormData
): Promise<Combo> => {
  const totalSum = parseInt(formData.get("totalSum") as string, 10);

  const raceSelections = () => {
    return Array({ length: 5 }).map((_, index) => {
      const raceSelection = parseInt(
        formData.get(`race${index + 1}`) as string,
        10
      );
      if (isNaN(raceSelection) || raceSelection <= 0) {
        return null;
      } else {
        return raceSelection;
      }
    });
  };

  const results = new Set<string>();

  function backtrack(path: number[], sum: number, raceIndex: number) {
    if (raceIndex === 4) {
      if (sum === totalSum) {
        results.add(JSON.stringify(path));
      }
      return;
    }

    if (raceSelections()[raceIndex] !== null) {
      backtrack(
        [...path, raceSelections()[raceIndex] as number],
        sum + (raceSelections()[raceIndex] as number),
        raceIndex + 1
      );
    } else {
      for (let i = 1; i <= 18; i++) {
        if (sum + i > totalSum) break;
        backtrack([...path, i], sum + i, raceIndex + 1);
      }
    }
  }

  backtrack([], 0, 0);

  return {
    combinations: [...results].map((arr) => JSON.parse(arr)),
    raceSelections: raceSelections(),
    totalSum: totalSum,
  };
};
