import { memo } from "react";

import { RateResourceCard } from "@/components/resources/rate-resource-card";
import type { RatingEntry } from "@/lib/data";
import type { Resource } from "@/types";
import { cn } from "@/lib/utils";

type RateResourceResultsGridProps = {
  resources: Resource[];
  totalCount: number;
  discussionUrls: Record<string, string>;
  ratings: Record<string, RatingEntry>;
  fallbackCategoryUrl: string | null;
  isFiltering?: boolean;
};

export const RateResourceResultsGrid = memo(function RateResourceResultsGrid({
  resources,
  totalCount,
  discussionUrls,
  ratings,
  fallbackCategoryUrl,
  isFiltering = false,
}: RateResourceResultsGridProps) {
  return (
    <>
      <div
        className={cn(
          "grid gap-4 sm:grid-cols-2 xl:grid-cols-3",
          isFiltering && "opacity-70 transition-opacity",
        )}
      >
        {resources.map((r) => (
          <RateResourceCard
            key={r.id}
            resource={r}
            discussionUrl={discussionUrls[r.id] ?? null}
            rating={ratings[r.id]}
            fallbackCategoryUrl={fallbackCategoryUrl}
          />
        ))}
      </div>

      {resources.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-border px-4 py-10 text-center text-sm text-muted-foreground">
          No resources match these filters. Try clearing search, widening the
          level, or choosing &quot;All categories&quot;.
        </p>
      ) : null}

      <p className="sr-only" aria-live="polite">
        Showing {resources.length} of {totalCount} resources
      </p>
    </>
  );
});
