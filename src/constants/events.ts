/**
 * Single source of event IDs used across Lifestyle, Map, Search, and Booking.
 * Only ids listed here have booking detail pages.
 */
export const EVENT_IDS = [
  'pasta', 'wine-tasting', 'kids-workshop', 'skating', 'stage-performance',
  'wine-basics', 'apartment-makeover', 'mini-garden', 'eco-life', 'seasonal-crafts',
  'mini-einsteins', 'vision-board', 'paint-by-numbers', 'bead-jewelry', 'pottery-workshop'
] as const;
export type EventId = (typeof EVENT_IDS)[number];

export function isValidEventId(id: string | undefined): id is EventId {
  return id != null && EVENT_IDS.includes(id as EventId);
}
