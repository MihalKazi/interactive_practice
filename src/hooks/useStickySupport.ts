"use client";

export function useStickySupport() {
  return typeof CSS === "undefined" ? true : CSS.supports("position", "sticky");
}
