import { sendGAEvent } from "@next/third-parties/google";

export type SourceContext = "catalog" | "collection" | "home_demo";

export type CollectionClickSource = "home_start_here" | "collections_list";

export type PageContext = "resources" | "rate_resources";

export type FilterSource = "desktop" | "mobile";

export type ContributeActionType =
  | "suggest_resource"
  | "rate_review"
  | "report_bug"
  | "ask_question"
  | "contribution_guide"
  | "github_repo"
  | "email_suggestion"
  | "suggestion_form";

export type CtaLabel =
  | "browse_catalog"
  | "start_here"
  | "explore_resources"
  | "help_improve"
  | "all_collections"
  | "browse_all_resources";

export type CtaLocation =
  | "hero"
  | "how_it_works"
  | "guided_path"
  | "collections_header";

export type RateDiscussionLinkType = "direct_discussion" | "fallback_category";

export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || "G-8H5KVJPZGG";

export function getLinkDomain(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return "";
  }
}

function sendEvent(eventName: string, params: Record<string, string | number | boolean>) {
  if (typeof window === "undefined") return;
  sendGAEvent("event", eventName, params);
}

export function trackResourceClick(params: {
  resource_id: string;
  resource_name: string;
  resource_category: string;
  resource_level: string;
  link_domain: string;
  source_page: string;
  source_context: SourceContext;
  collection_id?: string;
  position_index?: number;
}) {
  sendEvent("resource_click", {
    resource_id: params.resource_id,
    resource_name: params.resource_name,
    resource_category: params.resource_category,
    resource_level: params.resource_level,
    link_domain: params.link_domain,
    source_page: params.source_page,
    source_context: params.source_context,
    ...(params.collection_id ? { collection_id: params.collection_id } : {}),
    ...(params.position_index !== undefined
      ? { position_index: params.position_index }
      : {}),
  });
}

export function trackCollectionClick(params: {
  collection_id: string;
  collection_kind: string;
  target_level: string;
  source: CollectionClickSource;
}) {
  sendEvent("collection_click", {
    collection_id: params.collection_id,
    collection_kind: params.collection_kind,
    target_level: params.target_level,
    source: params.source,
  });
}

export function trackContributeClick(params: {
  action_type: ContributeActionType;
  source_page: string;
  link_domain?: string;
}) {
  sendEvent("contribute_click", {
    action_type: params.action_type,
    source_page: params.source_page,
    ...(params.link_domain ? { link_domain: params.link_domain } : {}),
  });
}

export function trackSearch(params: {
  search_term: string;
  page_context: PageContext;
  result_count: number;
}) {
  sendEvent("search", {
    search_term: params.search_term,
    page_context: params.page_context,
    result_count: params.result_count,
  });
}

export function trackFilterApply(params: {
  page_context: PageContext;
  category: string;
  level: string;
  cost: string;
  platform: string;
  has_search_query: boolean;
  result_count: number;
  filter_source: FilterSource;
}) {
  sendEvent("filter_apply", {
    page_context: params.page_context,
    category: params.category,
    level: params.level,
    cost: params.cost,
    platform: params.platform,
    has_search_query: params.has_search_query,
    result_count: params.result_count,
    filter_source: params.filter_source,
  });
}

export function trackFilterClear(params: {
  page_context: PageContext;
  filter_source: FilterSource;
}) {
  sendEvent("filter_clear", {
    page_context: params.page_context,
    filter_source: params.filter_source,
  });
}

export function trackCtaClick(params: {
  cta_label: CtaLabel;
  cta_location: CtaLocation;
  destination: string;
}) {
  sendEvent("cta_click", {
    cta_label: params.cta_label,
    cta_location: params.cta_location,
    destination: params.destination,
  });
}

export function trackRateDiscussionClick(params: {
  resource_id: string;
  resource_category: string;
  has_existing_rating: boolean;
  rating_avg?: number;
  rating_votes?: number;
  link_type: RateDiscussionLinkType;
}) {
  sendEvent("rate_discussion_click", {
    resource_id: params.resource_id,
    resource_category: params.resource_category,
    has_existing_rating: params.has_existing_rating,
    link_type: params.link_type,
    ...(params.rating_avg !== undefined ? { rating_avg: params.rating_avg } : {}),
    ...(params.rating_votes !== undefined ? { rating_votes: params.rating_votes } : {}),
  });
}
