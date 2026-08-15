"use client";

import { useEffect, useRef } from "react";

import {
  trackFilterApply,
  trackSearch,
  type FilterSource,
  type PageContext,
} from "@/lib/analytics";

const SEARCH_DEBOUNCE_MS = 600;
const FILTER_DEBOUNCE_MS = 400;

type FilterState = {
  category: string;
  level: string;
  cost: string;
  platform: string;
};

type UseExplorerAnalyticsOptions = {
  pageContext: PageContext;
  query: string;
  category: string;
  level: string;
  cost: string;
  platform: string;
  resultCount: number;
  filterSourceRef: React.RefObject<FilterSource>;
};

function filterSnapshot(filters: FilterState): string {
  return `${filters.category}|${filters.level}|${filters.cost}|${filters.platform}`;
}

function hasNonDefaultFilters(filters: FilterState): boolean {
  return (
    filters.category !== "all" ||
    filters.level !== "all" ||
    filters.cost !== "all" ||
    filters.platform !== "all"
  );
}

export function useExplorerAnalytics({
  pageContext,
  query,
  category,
  level,
  cost,
  platform,
  resultCount,
  filterSourceRef,
}: UseExplorerAnalyticsOptions) {
  const trimmedQuery = query.trim();

  const resultCountRef = useRef(resultCount);
  resultCountRef.current = resultCount;

  const hasSearchQueryRef = useRef(trimmedQuery.length > 0);
  hasSearchQueryRef.current = trimmedQuery.length > 0;

  const previousSearchRef = useRef<string | null>(null);
  const previousFilterRef = useRef<string | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (!trimmedQuery) {
        previousSearchRef.current = "";
        return;
      }

      if (previousSearchRef.current === trimmedQuery) return;
      previousSearchRef.current = trimmedQuery;

      trackSearch({
        search_term: trimmedQuery,
        page_context: pageContext,
        result_count: resultCountRef.current,
      });
    }, SEARCH_DEBOUNCE_MS);

    return () => window.clearTimeout(timer);
  }, [trimmedQuery, pageContext]);

  useEffect(() => {
    const filters: FilterState = { category, level, cost, platform };
    const snapshot = filterSnapshot(filters);

    const timer = window.setTimeout(() => {
      const isInitialMount = previousFilterRef.current === null;

      if (isInitialMount) {
        previousFilterRef.current = snapshot;
        if (!hasNonDefaultFilters(filters)) return;
      } else if (previousFilterRef.current === snapshot) {
        return;
      } else {
        previousFilterRef.current = snapshot;
      }

      trackFilterApply({
        page_context: pageContext,
        category,
        level,
        cost,
        platform,
        has_search_query: hasSearchQueryRef.current,
        result_count: resultCountRef.current,
        filter_source: filterSourceRef.current ?? "desktop",
      });
    }, FILTER_DEBOUNCE_MS);

    return () => window.clearTimeout(timer);
  }, [category, level, cost, platform, pageContext, filterSourceRef]);
}
