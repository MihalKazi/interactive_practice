import type { IdeologicalCategory, IdentityCategory, ProfileGridCell } from "@/types/report";

export const TOTAL_PROFILES = 73;

export function calculatePercentage(value: number, total = TOTAL_PROFILES) {
  return (value / total) * 100;
}

export function formatPercentage(value: number, total = TOTAL_PROFILES) {
  return `${calculatePercentage(value, total).toFixed(1)}%`;
}

export function validateCategoryTotal(
  categories: Array<{ value: number }>,
  expectedTotal = TOTAL_PROFILES,
) {
  if (process.env.NODE_ENV === "production") return;
  const total = categories.reduce((sum, item) => sum + item.value, 0);
  if (categories.some((item) => item.value < 0)) {
    throw new Error("Report data validation failed: negative category value.");
  }
  if (total !== expectedTotal) {
    throw new Error(`Report data validation failed: expected ${expectedTotal}, got ${total}.`);
  }
}

export function generateIdentityGrid(categories: IdentityCategory[]): ProfileGridCell[] {
  validateCategoryTotal(categories);
  let position = 0;
  const cells = categories.flatMap((category) =>
    Array.from({ length: category.value }, () => {
      position += 1;
      return {
        id: `profile-${String(position).padStart(2, "0")}`,
        displayLabel: `Profile ${String(position).padStart(2, "0")}`,
        identityType: category.id,
        position,
        isSyntheticDisplayIdentifier: true as const,
      };
    }),
  );
  if (process.env.NODE_ENV !== "production" && cells.length !== TOTAL_PROFILES) {
    throw new Error(`Identity grid validation failed: expected ${TOTAL_PROFILES} cells, got ${cells.length}.`);
  }
  return cells;
}

export function buildAccessibleChartSummary(
  categories: IdeologicalCategory[],
  total = TOTAL_PROFILES,
) {
  return categories
    .map((category) => `${category.label}: ${category.value} profiles, ${formatPercentage(category.value, total)}`)
    .join("; ");
}
