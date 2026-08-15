"use client";

import type { ComponentProps } from "react";

import { AnalyticsLink } from "@/components/analytics/analytics-link";
import {
  getLinkDomain,
  trackContributeClick,
  type ContributeActionType,
} from "@/lib/analytics";

type ContributeLinkProps = Omit<ComponentProps<"a">, "onClick" | "href"> & {
  href: string;
  actionType: ContributeActionType;
  sourcePage: string;
  children: React.ReactNode;
};

export function ContributeLink({
  href,
  actionType,
  sourcePage,
  children,
  ...rest
}: ContributeLinkProps) {
  return (
    <AnalyticsLink
      href={href}
      external
      onTrack={() =>
        trackContributeClick({
          action_type: actionType,
          source_page: sourcePage,
          link_domain: getLinkDomain(href),
        })
      }
      {...rest}
    >
      {children}
    </AnalyticsLink>
  );
}
