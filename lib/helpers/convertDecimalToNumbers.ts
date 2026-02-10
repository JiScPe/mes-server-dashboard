import { Decimal } from "@prisma/client/runtime/client";

export function convertDecimalsToNumbers<T extends Record<string, any>>(
  data: T[],
  decimalFields: (keyof T)[]
): T[] {
  return data.map(item => {
    const converted = { ...item };
    decimalFields.forEach(field => {
      if ((converted[field] as any) instanceof Decimal) {
        converted[field] = Number(converted[field]) as any;
      }
    });
    return converted;
  });
}