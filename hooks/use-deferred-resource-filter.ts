"use client";

import { useDeferredValue, useMemo } from "react";

import {
  filterResources,
  type ResourceFilterState,
} from "@/lib/filter-resources";
import type { Resource } from "@/types";

export function useDeferredResourceFilter(
  resources: Resource[],
  filters: ResourceFilterState,
) {
  const deferredFilters = useDeferredValue(filters);

  const filtered = useMemo(
    () => filterResources(resources, deferredFilters),
    [resources, deferredFilters],
  );

  const isFiltering =
    filters.query !== deferredFilters.query ||
    filters.category !== deferredFilters.category ||
    filters.level !== deferredFilters.level ||
    filters.cost !== deferredFilters.cost ||
    filters.platform !== deferredFilters.platform;

  return { filtered, isFiltering };
}
