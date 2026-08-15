import type { Category, Cost, Level, Platform, Resource } from "@/types";

export type ResourceCostFilter = "all" | Exclude<Cost, null> | "not_applicable";
export type ResourcePlatformFilter = "all" | Platform;

export type ResourceFilterState = {
  query: string;
  category: "all" | Category;
  level: "all" | Level;
  cost: ResourceCostFilter;
  platform: ResourcePlatformFilter;
};

function resourceMatchesLevel(resource: Resource, level: Level | "all"): boolean {
  if (level === "all") return true;
  const lv = resource.levels;
  return lv.includes(level) || lv.includes("All Levels");
}

export function filterResources(
  resources: Resource[],
  filters: ResourceFilterState,
): Resource[] {
  const q = filters.query.trim().toLowerCase();

  return resources.filter((r) => {
    if (filters.category !== "all" && r.category !== filters.category) return false;
    if (!resourceMatchesLevel(r, filters.level)) return false;
    if (filters.cost !== "all") {
      if (filters.cost === "not_applicable") {
        if (r.cost !== null) return false;
      } else {
        if (r.cost !== filters.cost) return false;
      }
    }
    if (filters.platform !== "all" && !r.platforms.includes(filters.platform)) {
      return false;
    }
    if (!q) return true;
    const haystack = [r.name, r.description, r.tags.join(" ")]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}
