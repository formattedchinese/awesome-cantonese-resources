"use client";

import { AnalyticsLink } from "@/components/analytics/analytics-link";
import {
  getLinkDomain,
  trackResourceClick,
  type SourceContext,
} from "@/lib/analytics";
import type { Resource } from "@/types";

export type ResourceCardAnalytics = {
  sourceContext: SourceContext;
  sourcePage: string;
  collectionId?: string;
  positionIndex?: number;
};

type ResourceCardLinkProps = {
  resource: Resource;
  analytics: ResourceCardAnalytics;
  className?: string;
  children: React.ReactNode;
};

export function ResourceCardLink({
  resource,
  analytics,
  className,
  children,
}: ResourceCardLinkProps) {
  return (
    <AnalyticsLink
      href={resource.url}
      external
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onTrack={() =>
        trackResourceClick({
          resource_id: resource.id,
          resource_name: resource.name,
          resource_category: resource.category,
          resource_level: resource.levels.join(","),
          link_domain: getLinkDomain(resource.url),
          source_page: analytics.sourcePage,
          source_context: analytics.sourceContext,
          collection_id: analytics.collectionId,
          position_index: analytics.positionIndex,
        })
      }
    >
      {children}
    </AnalyticsLink>
  );
}
