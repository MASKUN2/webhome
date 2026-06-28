/**
 * Static site configuration for the jwih.org home portal (webhome).
 *
 * `services` is the hand-maintained directory of everything deployed under
 * *.jwih.org. To add a service, append an entry here and commit — no build
 * tooling or external source involved (this is the "static config" approach).
 *
 * Later phase: a k3s Ingress discovery step could generate this list instead.
 */

export const site = {
  name: "jwih.org",
  tagline: "inho's homelab",
  description:
    "Self-hosted services running on a home server. Pick one below to jump in.",
  // Canonical origin. www / home redirect here (handled at the edge / middleware).
  url: "https://jwih.org",
} as const;

export type ServiceStatus = "live" | "planned";

export interface Service {
  /** Stable key, also used as React list key. */
  id: string;
  /** Display name. */
  name: string;
  /** One-line description shown on the card. */
  description: string;
  /** Full URL the card links to (its subdomain). */
  href: string;
  /** Whether it is reachable yet. `planned` cards render disabled. */
  status: ServiceStatus;
  /** Optional emoji/glyph shown as the card icon. */
  icon?: string;
}

export const services: Service[] = [
  {
    id: "inhology",
    name: "inhology",
    description: "Personal blog — writing on dev, infra, and whatever else.",
    href: "https://inhology.jwih.org",
    status: "live",
    icon: "✍️",
  },
];
