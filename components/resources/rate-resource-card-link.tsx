"use client";

import { AnalyticsLink } from "@/components/analytics/analytics-link";
import { trackRateDiscussionClick } from "@/lib/analytics";
import type { RatingEntry } from "@/lib/data";
import type { Resource } from "@/types";

type RateResourceCardLinkProps = {
  resource: Resource;
  href: string;
  discussionUrl: string | null;
  rating?: RatingEntry;
  className?: string;
  children: React.ReactNode;
};

export function RateResourceCardLink({
  resource,
  href,
  discussionUrl,
  rating,
  className,
  children,
}: RateResourceCardLinkProps) {
  const hasExistingRating = Boolean(rating && rating.votes > 0);

  return (
    <AnalyticsLink
      href={href}
      external
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onTrack={() =>
        trackRateDiscussionClick({
          resource_id: resource.id,
          resource_category: resource.category,
          has_existing_rating: hasExistingRating,
          rating_avg: hasExistingRating ? rating?.avg_stars : undefined,
          rating_votes: hasExistingRating ? rating?.votes : undefined,
          link_type: discussionUrl ? "direct_discussion" : "fallback_category",
        })
      }
    >
      {children}
    </AnalyticsLink>
  );
}
