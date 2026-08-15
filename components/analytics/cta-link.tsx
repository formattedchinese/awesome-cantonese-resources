"use client";

import Link from "next/link";
import type { ComponentProps } from "react";

import type { CtaLabel, CtaLocation } from "@/lib/analytics";
import { trackCtaClick } from "@/lib/analytics";
import { Button } from "@/components/ui/button";

type CtaLinkProps = {
  href: string;
  ctaLabel: CtaLabel;
  ctaLocation: CtaLocation;
  children: React.ReactNode;
  variant?: ComponentProps<typeof Button>["variant"];
  size?: ComponentProps<typeof Button>["size"];
  className?: string;
};

export function CtaLink({
  href,
  ctaLabel,
  ctaLocation,
  children,
  variant = "outline",
  size,
  className,
}: CtaLinkProps) {
  const handleClick = () => {
    trackCtaClick({
      cta_label: ctaLabel,
      cta_location: ctaLocation,
      destination: href,
    });
  };

  const isHashLink = href.startsWith("#");

  return (
    <Button asChild variant={variant} size={size} className={className}>
      {isHashLink ? (
        <a href={href} onClick={handleClick}>
          {children}
        </a>
      ) : (
        <Link href={href} onClick={handleClick}>
          {children}
        </Link>
      )}
    </Button>
  );
}
