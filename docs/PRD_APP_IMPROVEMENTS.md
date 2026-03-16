# Product Requirements Document: Auchan Experience App — Page Improvements & Removal of Hydroponic Gardens

**Version:** 1.0  
**Scope:** `auchan-app-prototype` — all pages made functional; Hydroponic Garden removed everywhere.

---

## 1. Summary

- **Remove** all Hydroponic Garden / Garden experience: page, route, nav item, map pin, search results, lifestyle category, and booking event.
- **Improve** every remaining page so it is **functional end-to-end**: clear entry/exit, working navigation, consistent data, and no dead-ends or broken flows.

---

## 2. Remove Hydroponic Gardens

### 2.1 Code & routing

| Item | Action |
|------|--------|
| **Route** `/garden` | Remove from `App.tsx`. |
| **Page** `GardenExperience.tsx` | Delete the file (or archive out of the app). |
| **Import** `GardenExperience` | Remove from `App.tsx`. |
| **BottomNav** | Remove the “Garden” `NavLink` and icon from `BottomNav.tsx`. |
| **StoreMap** | Remove `locations.garden` from the `locations` object; remove any map pin, path, or bottom sheet content that references “Garden” or “Hydroponic Garden”. Set default `activeLocation` to another location (e.g. `cooking` or `wine`). |
| **BookingDetails** | Remove the `'garden-tour'` (and any `'harvest'`) entry from `EVENT_DATA`. Handle `/booking/garden-tour` (and `/booking/harvest`) by redirect to `/booking` or `/lifestyle` or show a “Not found” state. |
| **SearchFilter** | Remove the search result card that links to “Hydroponic Garden Tour” and navigates to `/booking/garden-tour`. Replace with another event card or remove the card. |
| **LifestyleHub** | In the category grid, remove or replace the “Garden” category (e.g. replace with “Wine” or “Tasting” so the grid still has four items). Ensure no links point to `/garden` or garden-related bookings. |

### 2.2 Content & copy

- **StoreMap:** No remaining copy or pins for “Hydroponic Garden”, “Garden”, or “Guided Garden Tour”.
- **SearchFilter:** No “Hydroponic Garden Tour” or similar.
- **LifestyleHub:** No “Garden” category; no hero or cards for garden experiences.
- **BookingDetails:** No `garden-tour` (or harvest) event; no references in fallback or “Other events” if present.

### 2.3 Stitch / static assets (if applicable)

- If `dist/stitch/` or other static HTML/assets reference “Hydroponic Garden”, “Garden” page, or garden tours: update or remove those references so they align with the app (no garden page, no garden booking).

---

## 3. Page-by-page improvements (“actually work”)

Each page should have: **clear purpose**, **working navigation**, **consistent data**, and **no broken flows**. Below is the improvement spec per page.

---

### 3.1 Onboarding (`/onboarding`)

**Current:** Single screen; “Unlock Family Mode” CTA; back button (navigate -1 from `/` may be odd).

**Improvements:**

- **Entry:** Root `/` redirects to `/onboarding` (keep). No dependency on “previous” page.
- **Primary CTA:** “Unlock Family Mode” (or “Get Started”) navigates to **Lifestyle** (`/lifestyle`) as the main home. No dead end.
- **Back:** If user lands here from elsewhere, back goes to referrer; if direct, hide back or make it go to `/lifestyle`.
- **State (optional):** If “Family Mode” is a feature flag or user state, persist (e.g. localStorage) so that after “Unlock”, the app treats the user as having Family Mode on (e.g. Family Profile, shared lists) where relevant.
- **Success feedback:** Optional short toast or inline message: “Family Mode enabled” before navigating.

**Acceptance:** User can open app → see onboarding → tap CTA → land on Lifestyle with no errors or blank screens.

---

### 3.2 Lifestyle Hub (`/lifestyle`)

**Current:** Hero (Pasta Masterclass → `/booking/pasta`), category grid (Cooking, Garden, Skating, Kids), “See all” → `/search`, recommended cards.

**Improvements:**

- **Remove Garden:** Replace “Garden” in the category grid with another category (e.g. “Wine”, “Tasting”, “Fresh”) and link to `/search` (or a specific booking if you add one). No link to `/garden`.
- **Hero:** “Italian Pasta Masterclass” → `/booking/pasta` (keep). Ensure image and copy load; no broken image URLs.
- **“See all”:** Goes to `/search`; search page shows activities (no Hydroponic Garden Tour).
- **Recommended cards:** Every card has a valid `onClick`/navigation target (e.g. `/booking/:id` for an existing event). Remove or replace any card that pointed to garden.
- **Store selector:** If “Auchan Soroksár” is tappable, either implement a store-picker (modal/list) or remove the interaction until it exists. Avoid non-functional UI.
- **Empty state (optional):** If “Recommended for You” is ever empty, show a short message and a CTA to “Browse activities” → `/search`.

**Acceptance:** All links and buttons go to valid routes; no garden; hero and list feel consistent.

---

### 3.3 Store Map (`/map`)

**Current:** Locations (cooking, garden, wine); zoom; “You are here”; bottom sheet with events; search placeholder → `/search`.

**Improvements:**

- **Remove Garden:** Delete `locations.garden`. Remove map pin, path segment, and bottom sheet content for “Hydroponic Garden” / “Garden”. Default `activeLocation` to `locations.cooking` (or `wine`).
- **Locations:** Only **Cooking Studio** and **Wine Cellar** (and any other non-garden zones). Each has: title, icon, distance, events list with valid `route` values (only existing booking IDs).
- **Event routes:** Every `route` in each location’s `events` must be a valid `/booking/:id` (e.g. `pasta`, `wine-tasting`, `kids-workshop`, `skating`). Remove `garden-tour` and `harvest`.
- **“Start” / Navigate:** If there is a “Start” or “Navigate” button, it should set “navigating” state and optionally show a simple in-app message (e.g. “Navigate to Cooking Studio”) or deep-link placeholder. No crash; no dead action.
- **Search bar:** Keeps navigating to `/search`. Placeholder text: e.g. “Search zones (e.g. Cooking Studio, Wine Cellar)” — no mention of Garden.
- **Back button:** `navigate(-1)` is fine; ensure it doesn’t break when coming from different entry points.

**Acceptance:** Map shows only Cooking and Wine (and any other non-garden zones); all event links work; no garden references.

---

### 3.4 Search / Activities (`/search`)

**Current:** Filter chips (Date, Price, Category); list of event cards (Pasta, Hydroponic Garden Tour, etc.); cards navigate to `/booking/:id`.

**Improvements:**

- **Remove Hydroponic Garden:** Remove the entire card that shows “Hydroponic Garden Tour” and links to `/booking/garden-tour`. Do not replace with another “garden” event.
- **Filters:** Filter chips can toggle visual state (e.g. “active”). Filtering can filter the **current list of events** (e.g. by category or date if you add fields). Result list updates; no need for backend yet — use in-memory filter on a small list. If a filter combination yields no results, show an empty state: “No activities match” + “Clear filters”.
- **Search input:** Optional: debounced search that filters the same list by title/tag. If empty query, show full list.
- **Event list:** All remaining cards must have a valid `navigate('/booking/:id')` where `:id` exists in `BookingDetails` `EVENT_DATA` (e.g. `pasta`, `wine-tasting`, `kids-workshop`, `skating`). No 404 or blank booking page.
- **Bookmark:** “Saved to Bookmarks” toast is acceptable as a placeholder until a real bookmark feature exists.

**Acceptance:** No garden card; every card goes to a valid booking detail; filters (and optional search) affect the list or show empty state.

---

### 3.5 Booking details (`/booking`, `/booking/:id`)

**Current:** `EVENT_DATA` keyed by id; `useParams()` for `:id`; fallback or generic view when id missing or unknown.

**Improvements:**

- **Remove Garden:** Delete the `'garden-tour'` (and `'harvest'` if present) keys from `EVENT_DATA`. Ensure no other code references these ids.
- **Unknown id:** If `:id` is not in `EVENT_DATA` (e.g. user bookmarked old `/booking/garden-tour`), show a **friendly “Event not found”** view: short message + button “Browse activities” → `/search` or “Back to Lifestyle” → `/lifestyle`. Do not show a blank page or raw error.
- **Booking CTA:** “Book now” (or equivalent) should navigate to **Confirmation** (`/confirmation`) and optionally pass state (e.g. event title) so confirmation can show “Booking Confirmed for [Event]”. If you don’t pass state, confirmation can stay generic (“Your spot is secured”).
- **Ingredients / “Add to list”:** If buttons exist, they can show a toast (“Added to list”) or navigate to a future “List” screen. No crash; no dead button.
- **Consistency:** All event ids used in Lifestyle, Map, and Search must exist in `EVENT_DATA`.

**Acceptance:** Every `/booking/:id` linked from the app shows a valid event or “Event not found”; Book → Confirmation works; no garden events.

---

### 3.6 Booking confirmation (`/confirmation`)

**Current:** Static “Booking Confirmed!” and e-ticket for “Italian Pasta Masterclass”.

**Improvements:**

- **Dynamic content (recommended):** If user comes from Booking details, pass event info (e.g. via `location.state` or context) and show that event’s title, date, and image on the e-ticket. If no state, fallback to a default (e.g. Pasta Masterclass) so the page never looks broken.
- **Navigation:** “Back to Lifestyle” (or “Done”) goes to `/lifestyle`. No dead end.
- **QR code:** Can remain placeholder (e.g. static QR or “Scan at entrance” text). No functional requirement for real QR generation in this PRD.
- **Secondary actions (optional):** “Add to calendar” or “Share” can be toasts for now (“Added to calendar” / “Share not implemented yet”).

**Acceptance:** User can complete a booking flow and see a confirmation that reflects the booked event (or a sensible default); CTA returns to Lifestyle.

---

### 3.7 Loyalty dashboard (`/loyalty`)

**Current:** Points display, tier progress, reward cards with “Redeem” toast.

**Improvements:**

- **Redeem:** “Redeem” can keep showing a toast (“Free Cooking Workshop Redeemed!”). Optionally deduct points in local state (e.g. 2,450 − 800) and update the displayed points so the user sees a number change. No backend required for v1.
- **Navigation:** Any links (e.g. to booking or lifestyle) must point to existing routes. Remove any link to garden or garden events.
- **Empty state (optional):** If points are 0 and no rewards available, show a short message and a CTA to “Earn points” (e.g. link to Lifestyle or in-store info).

**Acceptance:** Points and rewards are visible; Redeem has visible feedback; no broken or garden-related links.

---

### 3.8 Family profile (`/family`)

**Current:** Parent profile, Family Mode toggle, family members, “Manage” and “Add member”.

**Improvements:**

- **Family Mode toggle:** Toggle state should be reflected in UI (on/off). Optionally persist in localStorage so it’s consistent across sessions. No need to change other pages’ content for v1 unless you already have “family” content.
- **Manage:** “Manage Profile” toast is acceptable; or navigate to a dedicated “Edit profile” screen (can be a simple form with name, avatar placeholder). No crash.
- **Add member:** “Add family member” can show a toast or a simple modal/form: name field + “Add” → append a mock member to local state and show in the list. No backend required.
- **Back:** Back button works (e.g. `navigate(-1)` or link to Lifestyle).

**Acceptance:** Toggle and buttons have clear feedback; no broken navigation; optional add-member flow works in-memory.

---

### 3.9 Bottom navigation (global)

**Current:** Many items (Onboard, Family, Lifestyle, Search, Book, Confirm, Map, Loyalty, Garden).

**Improvements:**

- **Remove Garden:** Remove the Garden nav item entirely.
- **Simplify (optional):** Consider a smaller set of tabs for a cleaner UX, e.g. **Lifestyle** (home), **Map**, **Search**, **Loyalty**, **Family** (or **Profile**). Move “Onboard”, “Book”, “Confirm” to in-flow only (e.g. from Lifestyle or Search), not as main tabs, so the bar doesn’t overflow and each tab has a clear purpose.
- **Active state:** `NavLink` active state and `text-auchan-red` for the current route. No duplicate or wrong highlight.
- **Consistent order:** Same order on every page; no missing or extra items after removing Garden.

**Acceptance:** No Garden tab; all visible tabs navigate to existing routes; active state correct.

---

## 4. Data & routing consistency

- **Single source of events:** Consider a small `constants/events.ts` (or similar) that exports event ids and minimal fields (id, title, tag). Use it in LifestyleHub, StoreMap, SearchFilter, and BookingDetails so adding/removing an event is done in one place.
- **Booking ids:** Every link that goes to `/booking/:id` must use an id that exists in `EVENT_DATA` (or the new events module). Valid ids after removal: e.g. `pasta`, `wine-tasting`, `kids-workshop`, `skating`. No `garden-tour` or `harvest`.
- **404 / Not found:** Any unknown route (e.g. `/garden` after removal) should redirect to `/lifestyle` or show a small “Page not found” with a link to Home.

---

## 5. Implementation checklist

- [ ] Remove `/garden` route and `GardenExperience` page and import.
- [ ] Remove Garden from `BottomNav`.
- [ ] Remove `locations.garden` and all Garden UI from `StoreMap`; set default location to cooking or wine.
- [ ] Remove `garden-tour` (and `harvest`) from `EVENT_DATA` in `BookingDetails`; handle unknown `:id` with “Event not found” + link to search/lifestyle.
- [ ] Remove Hydroponic Garden Tour card and any garden links from `SearchFilter`.
- [ ] Replace or remove “Garden” category in `LifestyleHub`; ensure no link to `/garden` or garden bookings.
- [ ] (Optional) Add `constants/events.ts` and refactor event ids and links.
- [ ] Onboarding: CTA to `/lifestyle`; optional Family Mode persistence.
- [ ] Lifestyle: all links valid; no garden.
- [ ] Map: only non-garden locations; all event routes valid.
- [ ] Search: filters and optional search; empty state; no garden card.
- [ ] Booking: “Event not found” for unknown id; Book → Confirmation with optional state.
- [ ] Confirmation: optional dynamic event from navigation state; back to Lifestyle.
- [ ] Loyalty: redeem feedback; optional points deduction in state.
- [ ] Family: toggle and add-member feedback (and optional persistence).
- [ ] 404 or redirect for `/garden` and any other removed route.
- [ ] (Optional) Simplify BottomNav to 4–5 main tabs and move the rest in-flow.

---

## 6. Success criteria

- No references to “Hydroponic Garden”, “Garden” experience, or garden-only events anywhere in the app (copy, routes, nav, map, search, booking).
- Every page is reachable via nav or in-flow navigation; no dead links to removed routes or events.
- Every button and link either performs a clear action (navigate, toast, toggle) or shows a deliberate “coming soon”/empty state.
- A user can: land on Onboarding → go to Lifestyle → open an event from Lifestyle or Search → open Booking details → tap Book → see Confirmation → return to Lifestyle; and use Map, Loyalty, and Family without errors or dead-ends.

This PRD is the single reference for removing Hydroponic Gardens and making all pages of the Auchan Experience app work end-to-end.
