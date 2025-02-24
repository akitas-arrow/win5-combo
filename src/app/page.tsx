"use client";

import { useActionState } from "react";
import { Combo } from "./types";
import { useForm } from "@conform-to/react";
import { calculateWin5CombinationsSchema } from "./schemas";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import { calculateWin5Combinations } from "./actions";

export default function Home() {
  const [lastResult, action, isPending] = useActionState(
    calculateWin5Combinations,
    null
  );

  const [form, fields] = useForm({
    constraint: getZodConstraint(calculateWin5CombinationsSchema),
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: calculateWin5CombinationsSchema,
      });
    },
    defaultValue: {
      totalSum: 5,
    },
  });

  return (
    <div>
      <form action={action}>
        <label>
          人気順の合計（必須）
          <input type="number" name="totalSum" />
        </label>
        <fieldset>
          1着馬の人気順（任意）
          {Array.from({ length: 5 }).map((_, i) => (
            <label key={i}>
              {i + 1}レース
              <input type="number" placeholder="未選択" />
            </label>
          ))}
        </fieldset>
        <button type="submit">計算</button>
      </form>
    </div>
  );
}
