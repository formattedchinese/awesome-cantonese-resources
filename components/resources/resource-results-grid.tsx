import { memo } from "react";

import { ResourceCard } from "@/components/resources/resource-card";
import type { ResourceCardAnalytics } from "@/components/resources/resource-card-link";
import type { Resource } from "@/types";
import { cn } from "@/lib/utils";

type ResourceResultsGridProps = {
  resources: Resource[];
  totalCount: number;
  sourcePage: string;
  sourceContext: ResourceCardAnalytics["sourceContext"];
  collectionId?: string;
  isFiltering?: boolean;
};

export const ResourceResultsGrid = memo(function ResourceResultsGrid({
  resources,
  totalCount,
  sourcePage,
  sourceContext,
  collectionId,
  isFiltering = false,
}: ResourceResultsGridProps) {
  return (
    <>
      <div
        className={cn(
          "grid gap-4 sm:grid-cols-2 xl:grid-cols-3",
          isFiltering && "opacity-70 transition-opacity",
        )}
      >
        {resources.map((r, i) => (
          <ResourceCard
            key={r.id}
            resource={r}
            analytics={{
              sourceContext,
              sourcePage,
              collectionId,
              positionIndex: i,
            }}
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
