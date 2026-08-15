"use client";

import Link from "next/link";
import type { ComponentProps } from "react";

type AnalyticsLinkBaseProps = {
  onTrack: () => void;
  className?: string;
  children: React.ReactNode;
};

type AnalyticsExternalLinkProps = AnalyticsLinkBaseProps &
  Omit<ComponentProps<"a">, "onClick" | "href"> & {
    href: string;
    external: true;
  };

type AnalyticsInternalLinkProps = AnalyticsLinkBaseProps &
  Omit<ComponentProps<typeof Link>, "onClick" | "href"> & {
    href: string;
    external?: false;
  };

export type AnalyticsLinkProps = AnalyticsExternalLinkProps | AnalyticsInternalLinkProps;

export function AnalyticsLink(props: AnalyticsLinkProps) {
  const { onTrack, className, children, href, external, ...rest } = props;

  const handleClick = () => {
    onTrack();
  };

  if (external) {
    const anchorProps = rest as Omit<ComponentProps<"a">, "onClick" | "href">;
    return (
      <a href={href} className={className} onClick={handleClick} {...anchorProps}>
        {children}
      </a>
    );
  }

  const linkProps = rest as Omit<ComponentProps<typeof Link>, "onClick" | "href">;
  return (
    <Link href={href} className={className} onClick={handleClick} {...linkProps}>
      {children}
    </Link>
  );
}
