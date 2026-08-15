"use client";

import { AnalyticsLink } from "@/components/analytics/analytics-link";
import {
  trackCollectionClick,
  type CollectionClickSource,
} from "@/lib/analytics";
import type { Collection } from "@/types";

type CollectionCardLinkProps = {
  collection: Collection;
  clickSource: CollectionClickSource;
  className?: string;
  children: React.ReactNode;
};

function formatTargetLevel(collection: Collection): string {
  if (!collection.target_level) return "";
  return Array.isArray(collection.target_level)
    ? collection.target_level.join(" · ")
    : collection.target_level;
}

export function CollectionCardLink({
  collection,
  clickSource,
  className,
  children,
}: CollectionCardLinkProps) {
  return (
    <AnalyticsLink
      href={`/collections/${collection.id}`}
      className={className}
      onTrack={() =>
        trackCollectionClick({
          collection_id: collection.id,
          collection_kind: collection.kind,
          target_level: formatTargetLevel(collection),
          source: clickSource,
        })
      }
    >
      {children}
    </AnalyticsLink>
  );
}
