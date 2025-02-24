import { z } from "zod";

export const calculateWin5CombinationsSchema = z.object({
  totalSum: z
    .number({ required_error: "人気順の合計を入力してください" })
    .gte(5, { message: "人気順の合計は5以上の数値を入力してください" }),
  race1: z.number().gte(1, { message: "1以上19未満の数値を入力してください" }),
  race2: z.number().gte(1, { message: "1以上19未満の数値を入力してください" }),
  race3: z.number().gte(1, { message: "1以上19未満の数値を入力してください" }),
  race4: z.number().gte(1, { message: "1以上19未満の数値を入力してください" }),
  race5: z.number().gte(1, { message: "1以上19未満の数値を入力してください" }),
});

export type CalculateWin5Combinations = z.infer<
  typeof calculateWin5CombinationsSchema
>;
