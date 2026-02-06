import React, { useEffect, useMemo, useState } from "react";

const PLACE_TYPES = {
  attraction: "Attraction",
  food: "Food",
  neighborhood: "Neighborhood",
  activity: "Activity",
};

const PLACE_CATALOG = [
  {
    id: "p-old-town-walk",
    name: "Old Town Morning Walk",
    type: "neighborhood",
    neighborhood: "Old Quarter",
    duration: "1.5 hr",
    price: "Free",
    bestTime: "Morning",
    energy: "Easy",
    headline: "Stone lanes, bakeries, and river views.",
    description:
      "A slow loop through the oldest blocks with stops for photos and snacks.",
    tips: [
      "Start before 9am for quiet streets.",
      "Pick one bakery and commit.",
      "Loop back along the river for cooler air.",
    ],
    highlights: ["Clock tower", "Riverside steps", "Hidden courtyards"],
    goodFor: "First-time visitors",
  },
  {
    id: "p-harbor-viewpoint",
    name: "Harbor Viewpoint",
    type: "attraction",
    neighborhood: "South Pier",
    duration: "45 min",
    price: "$",
    bestTime: "Golden hour",
    energy: "Easy",
    headline: "Wide views of ferries, cranes, and skyline.",
    description:
      "A compact overlook with plenty of seating and a clear sightline to the port.",
    tips: [
      "Bring a light jacket for wind.",
      "Plan a 10 minute buffer for sunset crowds.",
    ],
    highlights: ["Pier lookout", "Harbor bridge", "Photo benches"],
    goodFor: "Short breaks",
  },
  {
    id: "p-ferry-loop",
    name: "Ferry Loop Ride",
    type: "activity",
    neighborhood: "Waterfront",
    duration: "2 hr",
    price: "$$",
    bestTime: "Afternoon",
    energy: "Moderate",
    headline: "A breezy ride that connects the main districts.",
    description:
      "Ride the loop for an easy orientation. Hop off for quick snacks or views.",
    tips: [
      "Sit on the right side for skyline views.",
      "Tickets are timed, arrive 10 minutes early.",
    ],
    highlights: ["Skyline loop", "Island stop", "Harbor breeze"],
    goodFor: "Orientation day",
  },
  {
    id: "p-market-hall",
    name: "Market Hall Lunch",
    type: "food",
    neighborhood: "Central Market",
    duration: "1 hr",
    price: "$$",
    bestTime: "Midday",
    energy: "Easy",
    headline: "Quick bites, shared tables, and local favorites.",
    description:
      "A buzzing hall with rotating stalls. Perfect for a flexible group lunch.",
    tips: [
      "Split into pairs and meet at the long tables.",
      "Go early to avoid the 12:30 rush.",
    ],
    highlights: ["Noodle stall", "Fresh juice", "Spice counter"],
    goodFor: "Groups",
  },
  {
    id: "p-night-market",
    name: "Night Market Crawl",
    type: "food",
    neighborhood: "Lantern Row",
    duration: "2.5 hr",
    price: "$",
    bestTime: "Late evening",
    energy: "Moderate",
    headline: "Small plates, bright lights, and slow wandering.",
    description:
      "A casual crawl with low stakes. Try three dishes and call it a night.",
    tips: [
      "Bring small cash for quick transactions.",
      "Pick one sweet stop at the end.",
    ],
    highlights: ["Grill alley", "Tea stand", "Dessert row"],
    goodFor: "Night owls",
  },
  {
    id: "p-art-street",
    name: "Art Street Galleries",
    type: "neighborhood",
    neighborhood: "Warehouse District",
    duration: "2 hr",
    price: "Free",
    bestTime: "Afternoon",
    energy: "Easy",
    headline: "Studios, small galleries, and murals in one loop.",
    description:
      "Open doors and rotating exhibitions. Easy to mix with coffee breaks.",
    tips: [
      "Check the pop up schedule for live demos.",
      "Most galleries close by 6pm.",
    ],
    highlights: ["Mural alley", "Studio row", "Print shop"],
    goodFor: "Creative travelers",
  },
  {
    id: "p-museum-dock",
    name: "Maritime Museum Dock",
    type: "attraction",
    neighborhood: "North Wharf",
    duration: "1.5 hr",
    price: "$$",
    bestTime: "Morning",
    energy: "Easy",
    headline: "Stories of the port with hands-on exhibits.",
    description:
      "A compact museum with good pacing and a quiet dockside cafe.",
    tips: [
      "Tickets are cheapest before noon.",
      "Check the top deck for fresh air.",
    ],
    highlights: ["Ship models", "Captain logbook", "Dockside cafe"],
    goodFor: "Rainy days",
  },
  {
    id: "p-river-kayak",
    name: "River Kayak Loop",
    type: "activity",
    neighborhood: "East Bank",
    duration: "2 hr",
    price: "$$",
    bestTime: "Morning",
    energy: "Active",
    headline: "A calm paddle with skyline views.",
    description:
      "Guided kayaks on a gentle loop. A great reset between city walks.",
    tips: [
      "Wear quick-dry layers.",
      "Lockers are small, pack light.",
    ],
    highlights: ["Floating garden", "Bridge arch", "Quiet inlets"],
    goodFor: "Active mornings",
  },
  {
    id: "p-hill-temple",
    name: "Hill Temple Sunrise",
    type: "attraction",
    neighborhood: "Hilltop",
    duration: "1 hr",
    price: "$",
    bestTime: "Sunrise",
    energy: "Moderate",
    headline: "City views and a calm start to the day.",
    description:
      "Short climb, big payoff. Bring a light snack for the steps.",
    tips: [
      "Arrive 20 minutes before sunrise.",
      "Wear shoes with grip on the stone stairs.",
    ],
    highlights: ["Temple steps", "City panorama", "Morning bells"],
    goodFor: "Early risers",
  },
  {
    id: "p-coffee-roastery",
    name: "Roastery Tasting Bar",
    type: "food",
    neighborhood: "Riverside",
    duration: "45 min",
    price: "$$",
    bestTime: "Mid morning",
    energy: "Easy",
    headline: "Flights of local roasts with a calm vibe.",
    description:
      "A relaxed tasting bar with a short explanation of each roast.",
    tips: [
      "Ask for the lighter roast if you have more stops ahead.",
      "Pick up beans for the next morning.",
    ],
    highlights: ["Tasting flight", "Riverside patio", "Biscuit tray"],
    goodFor: "Coffee fans",
  },
];

const CURATED_ITINERARIES = [
  {
    id: "lp-harbor-days",
    title: "Harbor Highlights in 2 Days",
    type: "curated",
    author: "Lonely Planet editors",
    summary: "A balanced mix of views, food, and easy walking.",
    tags: ["Classic", "First timer", "Balanced pace"],
    days: [
      {
        day: "Day 1",
        summary: "Ease in with the waterfront and the old quarter.",
        places: [
          "p-old-town-walk",
          "p-market-hall",
          "p-harbor-viewpoint",
          "p-museum-dock",
        ],
      },
      {
        day: "Day 2",
        summary: "Float the harbor, then end with art and night bites.",
        places: ["p-ferry-loop", "p-art-street", "p-night-market"],
      },
    ],
    expertNotes:
      "Start late if you arrive the night before. The order keeps walking distances short.",
  },
  {
    id: "lp-active-weekend",
    title: "Active City Weekend",
    type: "curated",
    author: "Lonely Planet editors",
    summary: "For travelers who like motion in the morning.",
    tags: ["Active", "Outdoors", "Morning energy"],
    days: [
      {
        day: "Day 1",
        summary: "Water time and a calm breakfast.",
        places: ["p-river-kayak", "p-coffee-roastery", "p-art-street"],
      },
      {
        day: "Day 2",
        summary: "Sunrise views with a gentle city loop.",
        places: ["p-hill-temple", "p-old-town-walk", "p-harbor-viewpoint"],
      },
    ],
    expertNotes:
      "Swap the morning order if you need a later start. All stops still connect.",
  },
];

const COMMUNITY_ITINERARIES = [
  {
    id: "com-late-bites",
    title: "Late Night Bites and Neon",
    type: "community",
    author: "Maya C.",
    summary: "A flexible crawl built for hungry night owls.",
    tags: ["Night owl", "Budget", "Loose plan"],
    likes: 348,
    places: [
      "p-art-street",
      "p-night-market",
      "p-coffee-roastery",
      "p-harbor-viewpoint",
    ],
    notes:
      "No reservations needed. If the night market is packed, swap with the roastery first.",
  },
  {
    id: "com-story-loop",
    title: "Neighborhood Storytelling Loop",
    type: "community",
    author: "Ravi S.",
    summary: "Slow pacing with time for photos and stories.",
    tags: ["Photo", "History", "Slow pace"],
    likes: 212,
    places: [
      "p-old-town-walk",
      "p-museum-dock",
      "p-market-hall",
      "p-art-street",
    ],
    notes:
      "I like this with a late lunch. The museum cafe is quiet mid afternoon.",
  },
];

const DISCOVER_FILTERS = {
  length: [
    { id: "any", label: "Any length" },
    { id: "short", label: "1-2 days" },
    { id: "medium", label: "3-4 days" },
    { id: "long", label: "5+ days" },
  ],
  budget: [
    { id: "any", label: "Any budget" },
    { id: "budget", label: "Budget" },
    { id: "mid", label: "Mid-range" },
    { id: "splurge", label: "Treat" },
  ],
  pace: [
    { id: "any", label: "Any pace" },
    { id: "slow", label: "Slow" },
    { id: "balanced", label: "Balanced" },
    { id: "fast", label: "Fast" },
  ],
  interest: [
    { id: "any", label: "Any interest" },
    { id: "food", label: "Food" },
    { id: "culture", label: "Culture" },
    { id: "outdoors", label: "Outdoors" },
    { id: "nightlife", label: "Nightlife" },
    { id: "art", label: "Art" },
    { id: "family", label: "Family" },
  ],
};

const DISCOVER_CURATED = [
  {
    id: "lp-slow-harbor",
    title: "Slow Harbor Weekend",
    destination: "Harbor City",
    daysCount: 2,
    vibes: ["slow mornings", "photo walks", "low stress"],
    type: "curated",
    author: "Lonely Planet",
    saves: 1860,
    length: "short",
    budget: "mid",
    pace: "slow",
    interests: ["culture", "food"],
    summary: "Gentle pacing with waterfront views and local flavors.",
    tags: ["Classic", "Slow pace", "First timer"],
    expertNotes:
      "The order keeps walking light and builds in cafe time between stops.",
    days: [
      {
        day: "Day 1",
        summary: "Old quarter strolls and a market lunch.",
        places: ["p-old-town-walk", "p-market-hall", "p-harbor-viewpoint"],
      },
      {
        day: "Day 2",
        summary: "Easy art loop and sunset at the pier.",
        places: ["p-art-street", "p-museum-dock", "p-harbor-viewpoint"],
      },
    ],
  },
  {
    id: "lp-food-forward",
    title: "Food-Forward First Timer",
    destination: "Harbor City",
    daysCount: 3,
    vibes: ["food-forward", "easy walks", "local tastes"],
    type: "curated",
    author: "Lonely Planet",
    saves: 2410,
    length: "medium",
    budget: "mid",
    pace: "balanced",
    interests: ["food", "culture"],
    summary: "A curated tasting tour with scenic breaks between bites.",
    tags: ["Food", "Balanced", "Neighborhoods"],
    expertNotes:
      "Keep each meal smaller so you can try more without rushing.",
    days: [
      {
        day: "Day 1",
        summary: "Market hall and old quarter snacks.",
        places: ["p-old-town-walk", "p-market-hall", "p-coffee-roastery"],
      },
      {
        day: "Day 2",
        summary: "Harbor views with a relaxed lunch.",
        places: ["p-harbor-viewpoint", "p-ferry-loop", "p-market-hall"],
      },
      {
        day: "Day 3",
        summary: "Night market finale.",
        places: ["p-art-street", "p-night-market"],
      },
    ],
  },
  {
    id: "lp-sunrise-active",
    title: "Sunrise + Waterline",
    destination: "Harbor City",
    daysCount: 2,
    vibes: ["early starts", "outdoors", "reset energy"],
    type: "curated",
    author: "Lonely Planet",
    saves: 1320,
    length: "short",
    budget: "splurge",
    pace: "fast",
    interests: ["outdoors", "culture"],
    summary: "Start with sunrise, finish with calm water time.",
    tags: ["Active", "Morning energy", "Outdoors"],
    expertNotes:
      "Swap the kayaking day if weather shifts. Keep the sunrise start.",
    days: [
      {
        day: "Day 1",
        summary: "Sunrise views and old town loop.",
        places: ["p-hill-temple", "p-old-town-walk", "p-coffee-roastery"],
      },
      {
        day: "Day 2",
        summary: "Kayak loop and breezy harbor views.",
        places: ["p-river-kayak", "p-harbor-viewpoint", "p-ferry-loop"],
      },
    ],
  },
];

const DISCOVER_COMMUNITY = [
  {
    id: "com-neon-bites",
    title: "Neon Nights & Street Bites",
    destination: "Harbor City",
    daysCount: 1,
    vibes: ["late nights", "street food", "loose plan"],
    type: "community",
    author: "Kai M.",
    saves: 980,
    length: "short",
    budget: "budget",
    pace: "balanced",
    interests: ["nightlife", "food"],
    summary: "A compact evening crawl built for hungry night owls.",
    tags: ["Night owl", "Budget", "Food"],
    notes:
      "I keep this flexible. Grab the ferry loop if you want cooler air.",
    places: ["p-night-market", "p-harbor-viewpoint", "p-coffee-roastery"],
  },
  {
    id: "com-art-cafe",
    title: "Art Studios + Coffee Breaks",
    destination: "Harbor City",
    daysCount: 2,
    vibes: ["creative", "cafe breaks", "slow chats"],
    type: "community",
    author: "Lena J.",
    saves: 1120,
    length: "short",
    budget: "mid",
    pace: "slow",
    interests: ["art", "culture"],
    summary: "A relaxed loop for gallery lovers who like to linger.",
    tags: ["Art", "Slow pace", "Coffee"],
    notes:
      "Most galleries close early, so start by noon and linger at the roastery.",
    days: [
      {
        day: "Day 1",
        summary: "Art street and a long coffee stop.",
        places: ["p-art-street", "p-coffee-roastery"],
      },
      {
        day: "Day 2",
        summary: "Museum dock and riverside walk.",
        places: ["p-museum-dock", "p-old-town-walk"],
      },
    ],
  },
  {
    id: "com-family-harbor",
    title: "Family-Friendly Harbor Loop",
    destination: "Harbor City",
    daysCount: 2,
    vibes: ["kid-friendly", "short stops", "easy snacks"],
    type: "community",
    author: "Priya R.",
    saves: 860,
    length: "short",
    budget: "budget",
    pace: "slow",
    interests: ["family", "culture"],
    summary: "Short hops and snack breaks for younger travelers.",
    tags: ["Family", "Easy pace", "Snacks"],
    notes:
      "We cut each stop to 60-90 minutes and used the ferry for a break.",
    days: [
      {
        day: "Day 1",
        summary: "Museum dock and market hall lunch.",
        places: ["p-museum-dock", "p-market-hall"],
      },
      {
        day: "Day 2",
        summary: "Harbor viewpoint and a slow old town stroll.",
        places: ["p-harbor-viewpoint", "p-old-town-walk"],
      },
    ],
  },
  {
    id: "com-rainy-reset",
    title: "Rainy Day Reset",
    destination: "Harbor City",
    daysCount: 1,
    vibes: ["indoor calm", "slow pace", "warm drinks"],
    type: "community",
    author: "Miles T.",
    saves: 640,
    length: "short",
    budget: "mid",
    pace: "slow",
    interests: ["culture", "art"],
    summary: "An indoor-first loop for stormy afternoons.",
    tags: ["Rainy day", "Indoor", "Slow pace"],
    notes:
      "I skip the ferry on wet days. The museum cafe is a cozy backup.",
    places: ["p-museum-dock", "p-art-street", "p-coffee-roastery"],
  },
  {
    id: "com-weekend-remix",
    title: "Weekend Remix: Mix & Match",
    destination: "Harbor City",
    daysCount: 3,
    vibes: ["flexible", "first timer", "choose your own"],
    type: "community",
    author: "Sasha W.",
    saves: 1510,
    length: "medium",
    budget: "mid",
    pace: "balanced",
    interests: ["culture", "food", "outdoors"],
    summary: "A flexible set of anchor stops with room to wander.",
    tags: ["Flexible", "Balanced", "First timer"],
    notes:
      "Pick one anchor stop per day and fill the rest with whatever you see.",
    days: [
      {
        day: "Day 1",
        summary: "Old town and harbor views.",
        places: ["p-old-town-walk", "p-harbor-viewpoint"],
      },
      {
        day: "Day 2",
        summary: "Water time with a market break.",
        places: ["p-ferry-loop", "p-market-hall"],
      },
      {
        day: "Day 3",
        summary: "Art street and a night market finale.",
        places: ["p-art-street", "p-night-market"],
      },
    ],
  },
];

const DISCOVER_ITINERARIES = [...DISCOVER_CURATED, ...DISCOVER_COMMUNITY];

const DRAFT_SEED = {
  id: "draft-1",
  title: "My weekend draft",
  type: "community",
  status: "draft",
  author: "You",
  summary: "A flexible draft you can keep shaping.",
  tags: ["Draft", "Private"],
  places: ["p-old-town-walk", "p-harbor-viewpoint"],
};

const UI_MODES = [
  { id: "ready", label: "Ready" },
  { id: "loading", label: "Loading" },
  { id: "empty", label: "Empty" },
  { id: "error", label: "Error" },
];

const DISCOVER_UI_MODES = UI_MODES.filter((mode) => mode.id !== "error");

const TYPE_FILTERS = [
  { id: "all", label: "All types" },
  { id: "curated", label: "Lonely Planet curated" },
  { id: "community", label: "Community" },
];

const getPlaceIdsFromItinerary = (itinerary) => {
  if (itinerary?.days?.length) {
    return itinerary.days.flatMap((day) => day.places);
  }
  return itinerary?.places ?? [];
};

const buildPlaceMap = () => {
  const map = {};
  PLACE_CATALOG.forEach((place) => {
    map[place.id] = place;
  });
  return map;
};

const chunkIntoDays = (placeIds, chunkSize) => {
  const days = [];
  for (let i = 0; i < placeIds.length; i += chunkSize) {
    const dayNumber = days.length + 1;
    days.push({
      day: `Day ${dayNumber}`,
      summary: "Auto-grouped for a balanced pace.",
      places: placeIds.slice(i, i + chunkSize),
    });
  }
  return days;
};

const formatSaves = (count) => {
  if (!count) return "0";
  if (count >= 1000) {
    const rounded = (count / 1000).toFixed(1);
    const trimmed = rounded.endsWith(".0") ? rounded.slice(0, -2) : rounded;
    return `${trimmed}k`;
  }
  return `${count}`;
};

const matchesDiscoverFilters = (itinerary, filters, searchTerm) => {
  const normalized = searchTerm.trim().toLowerCase();
  if (normalized) {
    const haystack = [
      itinerary.title,
      itinerary.destination,
      itinerary.summary,
      ...(itinerary.vibes ?? []),
      ...(itinerary.tags ?? []),
    ]
      .join(" ")
      .toLowerCase();
    if (!haystack.includes(normalized)) return false;
  }

  if (filters.length !== "any" && itinerary.length !== filters.length) {
    return false;
  }
  if (filters.budget !== "any" && itinerary.budget !== filters.budget) {
    return false;
  }
  if (filters.pace !== "any" && itinerary.pace !== filters.pace) {
    return false;
  }
  if (
    filters.interest !== "any" &&
    !itinerary.interests?.includes(filters.interest)
  ) {
    return false;
  }
  return true;
};

export default function App() {
  const [history, setHistory] = useState([{ name: "home" }]);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [discoverSearch, setDiscoverSearch] = useState("");
  const [discoverFilters, setDiscoverFilters] = useState({
    length: "any",
    budget: "any",
    pace: "any",
    interest: "any",
  });
  const [uiMode, setUiMode] = useState("ready");
  const [toast, setToast] = useState("");
  const [draftPlaces, setDraftPlaces] = useState(DRAFT_SEED.places);
  const [draftTitle, setDraftTitle] = useState(DRAFT_SEED.title);
  const [groupDraftByDay, setGroupDraftByDay] = useState(true);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(() => setToast(""), 2200);
    return () => clearTimeout(timer);
  }, [toast]);

  const route = history[history.length - 1];
  const navigate = (next) => setHistory((prev) => [...prev, next]);
  const goBack = () =>
    setHistory((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
  const goHome = () => setHistory([{ name: "home" }]);

  const placeMap = useMemo(buildPlaceMap, []);

  const draftItinerary = useMemo(
    () => ({
      ...DRAFT_SEED,
      title: draftTitle,
      places: draftPlaces,
    }),
    [draftTitle, draftPlaces]
  );

  const homeItineraries = useMemo(
    () => [...CURATED_ITINERARIES, ...COMMUNITY_ITINERARIES, draftItinerary],
    [draftItinerary]
  );

  const allItineraries = useMemo(
    () => [...homeItineraries, ...DISCOVER_ITINERARIES],
    [homeItineraries]
  );

  const normalizedSearch = search.trim().toLowerCase();

  const filteredItineraries = useMemo(() => {
    let items = homeItineraries;
    if (typeFilter !== "all") {
      items = items.filter((item) => item.type === typeFilter);
    }
    if (normalizedSearch) {
      items = items.filter((item) => {
        const haystack = [
          item.title,
          item.summary,
          item.author,
          ...(item.tags ?? []),
        ]
          .join(" ")
          .toLowerCase();
        return haystack.includes(normalizedSearch);
      });
    }
    return items;
  }, [homeItineraries, typeFilter, normalizedSearch]);

  const discoverResults = useMemo(() => {
    const filtered = DISCOVER_ITINERARIES.filter((itinerary) =>
      matchesDiscoverFilters(itinerary, discoverFilters, discoverSearch)
    );
    return {
      curated: filtered.filter((item) => item.type === "curated"),
      community: filtered.filter((item) => item.type === "community"),
      total: filtered.length,
    };
  }, [discoverFilters, discoverSearch]);

  const featuredPlaces = PLACE_CATALOG.slice(0, 6);

  const activeItinerary = useMemo(
    () =>
      route?.itineraryId
        ? allItineraries.find((item) => item.id === route.itineraryId)
        : null,
    [allItineraries, route?.itineraryId]
  );

  const activePlace = useMemo(
    () =>
      route?.placeId
        ? PLACE_CATALOG.find((place) => place.id === route.placeId)
        : null,
    [route?.placeId]
  );

  const addPlaceToDraft = (placeId) => {
    if (draftPlaces.includes(placeId)) {
      setToast("Already in your draft.");
      return;
    }
    setDraftPlaces((prev) => [...prev, placeId]);
    setToast("Added to your draft.");
  };

  const removePlaceFromDraft = (placeId) => {
    setDraftPlaces((prev) => prev.filter((id) => id !== placeId));
    setToast("Removed from your draft.");
  };

  const copyItineraryToDraft = (itinerary) => {
    const placeIds = getPlaceIdsFromItinerary(itinerary);
    if (placeIds.length === 0) {
      setToast("No places to copy yet.");
      return;
    }
    setDraftPlaces((prev) => {
      const merged = [...prev];
      placeIds.forEach((id) => {
        if (!merged.includes(id)) merged.push(id);
      });
      return merged;
    });
    setToast("Copied places into your draft.");
  };

  const draftDayGroups = useMemo(() => {
    if (!groupDraftByDay) return [];
    return chunkIntoDays(draftPlaces, 3);
  }, [draftPlaces, groupDraftByDay]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-6">
        <header className="border-b border-slate-800 pb-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Lonely Planet prototype
              </p>
              <div>
                <h1 className="text-2xl font-semibold">Itinerary Types Lab</h1>
                <p className="text-sm text-slate-400">
                  Clickable prototype with mock data only. No backend.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={goHome}
                className={`rounded-full border px-4 py-2 text-sm transition ${
                  route.name === "home"
                    ? "border-slate-500 bg-slate-800 text-white"
                    : "border-slate-700 text-slate-300 hover:border-slate-500"
                }`}
              >
                Explore
              </button>
              <button
                type="button"
                onClick={() => navigate({ name: "discover" })}
                className={`rounded-full border px-4 py-2 text-sm transition ${
                  route.name === "discover"
                    ? "border-indigo-400/60 bg-indigo-500/20 text-indigo-200"
                    : "border-indigo-400/40 text-indigo-200 hover:border-indigo-300"
                }`}
              >
                Discover
              </button>
              <button
                type="button"
                onClick={() => navigate({ name: "builder" })}
                className={`rounded-full border px-4 py-2 text-sm transition ${
                  route.name === "builder"
                    ? "border-emerald-400/60 bg-emerald-500/20 text-emerald-200"
                    : "border-emerald-400/40 text-emerald-200 hover:border-emerald-300"
                }`}
              >
                Build draft
              </button>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-400">
            <span className="rounded-full border border-slate-700 px-3 py-1">
              Places: {PLACE_CATALOG.length}
            </span>
            <span className="rounded-full border border-slate-700 px-3 py-1">
              Itineraries: {allItineraries.length}
            </span>
            <span className="rounded-full border border-slate-700 px-3 py-1">
              Draft: {draftPlaces.length} places
            </span>
            <span className="rounded-full border border-slate-700 px-3 py-1">
              Route: {route.name}
            </span>
          </div>
          {route.name !== "home" && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={goBack}
                className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300 hover:border-slate-500"
              >
                Back
              </button>
              <button
                type="button"
                onClick={goHome}
                className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300 hover:border-slate-500"
              >
                Home
              </button>
              <p className="text-xs text-slate-500">
                State-based routing. No external router used.
              </p>
            </div>
          )}
        </header>

        {route.name === "home" && (
          <HomeScreen
            uiMode={uiMode}
            setUiMode={setUiMode}
            search={search}
            setSearch={setSearch}
            typeFilter={typeFilter}
            setTypeFilter={setTypeFilter}
            filteredItineraries={filteredItineraries}
            onOpenItinerary={(id) =>
              navigate({ name: "itinerary", itineraryId: id })
            }
            placeMap={placeMap}
            featuredPlaces={featuredPlaces}
            onOpenPlace={(id) => navigate({ name: "place", placeId: id })}
            onAddToDraft={addPlaceToDraft}
            draftItinerary={draftItinerary}
          />
        )}

        {route.name === "discover" && (
          <DiscoverScreen
            uiMode={uiMode}
            setUiMode={setUiMode}
            search={discoverSearch}
            setSearch={setDiscoverSearch}
            filters={discoverFilters}
            setFilters={setDiscoverFilters}
            curatedItineraries={discoverResults.curated}
            communityItineraries={discoverResults.community}
            totalResults={discoverResults.total}
            onOpenItinerary={(id) =>
              navigate({ name: "itinerary", itineraryId: id })
            }
          />
        )}

        {route.name === "itinerary" && (
          <ItineraryScreen
            uiMode={uiMode}
            itinerary={activeItinerary}
            placeMap={placeMap}
            onOpenPlace={(id) =>
              navigate({
                name: "place",
                placeId: id,
                source: "itinerary",
                itineraryId: route.itineraryId,
              })
            }
            onCopyToDraft={copyItineraryToDraft}
            onAddToDraft={addPlaceToDraft}
            onGoHome={goHome}
          />
        )}

        {route.name === "place" && (
          <PlaceScreen
            uiMode={uiMode}
            place={activePlace}
            inDraft={draftPlaces.includes(route.placeId)}
            onAddToDraft={addPlaceToDraft}
            onRemoveFromDraft={removePlaceFromDraft}
            onOpenPlace={(id) => navigate({ name: "place", placeId: id })}
            onSaveForLater={() => setToast("Saved for later.")}
          />
        )}

        {route.name === "builder" && (
          <BuilderScreen
            draftTitle={draftTitle}
            setDraftTitle={setDraftTitle}
            draftPlaces={draftPlaces}
            placeMap={placeMap}
            groupDraftByDay={groupDraftByDay}
            setGroupDraftByDay={setGroupDraftByDay}
            draftDayGroups={draftDayGroups}
            onOpenPlace={(id) => navigate({ name: "place", placeId: id })}
            onRemoveFromDraft={removePlaceFromDraft}
            onAddMore={() => navigate({ name: "home" })}
            onPreviewDraft={() =>
              navigate({ name: "itinerary", itineraryId: DRAFT_SEED.id })
            }
            onSaveDraft={() => setToast("Draft saved locally.")}
          />
        )}
      </div>

      {toast && (
        <div className="fixed bottom-6 right-6 rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-200 shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}

function HomeScreen({
  uiMode,
  setUiMode,
  search,
  setSearch,
  typeFilter,
  setTypeFilter,
  filteredItineraries,
  onOpenItinerary,
  placeMap,
  featuredPlaces,
  onOpenPlace,
  onAddToDraft,
  draftItinerary,
}) {
  const showEmpty =
    uiMode === "empty" || (uiMode === "ready" && filteredItineraries.length === 0);

  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-[2fr_1fr]">
      <div className="space-y-6">
        <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold">Pick your starting point</h2>
              <p className="mt-2 text-sm text-slate-400">
                Curated itineraries are sequenced by experts. Community
                itineraries are flexible and personal.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onOpenItinerary(draftItinerary.id)}
              className="rounded-full border border-emerald-400/40 px-4 py-2 text-sm text-emerald-200 hover:border-emerald-300"
            >
              Continue your draft
            </button>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex min-w-[240px] flex-1 items-center rounded-full border border-slate-700 bg-slate-950 px-4 py-2 text-sm text-slate-200">
              <span className="mr-2 text-slate-500">Search</span>
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Try 'night' or 'classic'"
                className="w-full bg-transparent text-sm text-slate-200 outline-none"
              />
            </div>
            <button
              type="button"
              onClick={() => setSearch("")}
              className="rounded-full border border-slate-700 px-4 py-2 text-xs text-slate-300 hover:border-slate-500"
            >
              Clear
            </button>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {TYPE_FILTERS.map((filter) => (
              <button
                key={filter.id}
                type="button"
                onClick={() => setTypeFilter(filter.id)}
                className={`rounded-full border px-3 py-1 text-xs transition ${
                  typeFilter === filter.id
                    ? "border-slate-500 bg-slate-800 text-white"
                    : "border-slate-700 text-slate-300 hover:border-slate-500"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
          <p className="mt-3 text-xs text-slate-500">
            Filters change what appears below. They do not edit data.
          </p>
        </section>

        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-lg font-semibold">Itineraries</h3>
            <p className="text-xs text-slate-500">
              Ordered lists of Places, optionally grouped into days.
            </p>
          </div>

          {uiMode === "loading" && (
            <div className="grid gap-4 md:grid-cols-2">
              {[0, 1, 2, 3].map((index) => (
                <SkeletonCard key={`sk-${index}`} />
              ))}
            </div>
          )}

          {uiMode === "error" && (
            <ErrorState
              title="Itineraries failed to load"
              description="This prototype is offline. Try switching to Ready mode."
              actionLabel="Switch to Ready"
              onAction={() => setUiMode("ready")}
            />
          )}

          {showEmpty && (
            <EmptyState
              title="No itineraries match yet"
              description="Try clearing filters or searching for a different vibe."
              actionLabel="Reset filters"
              onAction={() => {
                setSearch("");
                setTypeFilter("all");
                setUiMode("ready");
              }}
            />
          )}

          {uiMode === "ready" && filteredItineraries.length > 0 && (
            <div className="grid gap-4 md:grid-cols-2">
              {filteredItineraries.map((itinerary) => (
                <ItineraryCard
                  key={itinerary.id}
                  itinerary={itinerary}
                  placeMap={placeMap}
                  onOpen={() => onOpenItinerary(itinerary.id)}
                />
              ))}
            </div>
          )}
        </section>

        <section className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-lg font-semibold">Places to drop in</h3>
            <p className="text-xs text-slate-500">
              Add to your draft without leaving this screen.
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {featuredPlaces.map((place) => (
              <PlaceMiniCard
                key={place.id}
                place={place}
                onOpen={() => onOpenPlace(place.id)}
                onAdd={() => onAddToDraft(place.id)}
              />
            ))}
          </div>
        </section>
      </div>

      <aside className="space-y-6">
        <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Prototype states
          </h3>
          <p className="mt-3 text-sm text-slate-400">
            Toggle UI states to validate copy and layout. No data is lost.
          </p>
          <div className="mt-4 grid gap-2">
            {UI_MODES.map((mode) => (
              <button
                key={mode.id}
                type="button"
                onClick={() => setUiMode(mode.id)}
                className={`rounded-xl border px-4 py-2 text-left text-sm transition ${
                  uiMode === mode.id
                    ? "border-amber-400/50 bg-amber-500/10 text-amber-100"
                    : "border-slate-700 text-slate-300 hover:border-slate-500"
                }`}
              >
                <div className="font-semibold">{mode.label}</div>
                <div className="text-xs text-slate-500">
                  {mode.id === "ready" &&
                    "Real mock data is visible and clickable."}
                  {mode.id === "loading" &&
                    "Shows skeletons to test waiting states."}
                  {mode.id === "empty" &&
                    "Shows zero results and empty microcopy."}
                  {mode.id === "error" &&
                    "Shows error and recovery messaging."}
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
          <h3 className="text-lg font-semibold">Your draft snapshot</h3>
          <p className="mt-2 text-sm text-slate-400">
            A private community itinerary. Share only when it feels ready.
          </p>
          <div className="mt-4 space-y-3">
            <div className="rounded-xl border border-slate-700 px-4 py-3 text-sm text-slate-200">
              <div className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Draft title
              </div>
              <div className="mt-1 font-semibold">{draftItinerary.title}</div>
            </div>
            <div className="rounded-xl border border-slate-700 px-4 py-3 text-sm text-slate-200">
              <div className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Places
              </div>
              <div className="mt-1 font-semibold">
                {draftItinerary.places.length}
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onOpenItinerary(draftItinerary.id)}
            className="mt-4 w-full rounded-full border border-emerald-400/40 px-4 py-2 text-sm text-emerald-200 hover:border-emerald-300"
          >
            Preview draft itinerary
          </button>
        </section>

        <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
          <h3 className="text-lg font-semibold">Two itinerary types</h3>
          <div className="mt-4 space-y-4 text-sm text-slate-400">
            <div>
              <Badge tone="curated">Lonely Planet curated</Badge>
              <p className="mt-2">
                Expert sequencing, pacing, and practical notes baked in.
              </p>
            </div>
            <div>
              <Badge tone="community">Community</Badge>
              <p className="mt-2">
                Personal stories and flexible ordering. Great for discovery.
              </p>
            </div>
          </div>
        </section>
      </aside>
    </div>
  );
}

function DiscoverScreen({
  uiMode,
  setUiMode,
  search,
  setSearch,
  filters,
  setFilters,
  curatedItineraries,
  communityItineraries,
  totalResults,
  onOpenItinerary,
}) {
  const showEmpty =
    uiMode === "empty" || (uiMode === "ready" && totalResults === 0);

  const updateFilter = (key, value) =>
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));

  const resetFilters = () =>
    setFilters({
      length: "any",
      budget: "any",
      pace: "any",
      interest: "any",
    });

  return (
    <div className="mt-8 space-y-6">
      <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold">Discover itineraries</h2>
            <p className="mt-2 text-sm text-slate-400">
              Start with a vibe, then narrow by trip length, budget, and pace.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="rounded-full border border-slate-700 px-3 py-1">
              {totalResults} matches
            </span>
            <span className="rounded-full border border-slate-700 px-3 py-1">
              {curatedItineraries.length} curated
            </span>
            <span className="rounded-full border border-slate-700 px-3 py-1">
              {communityItineraries.length} community
            </span>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <div className="flex min-w-[240px] flex-1 items-center rounded-full border border-slate-700 bg-slate-950 px-4 py-2 text-sm text-slate-200">
            <span className="mr-2 text-slate-500">Search</span>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search destinations, vibes, or names"
              className="w-full bg-transparent text-sm text-slate-200 outline-none"
            />
          </div>
          <button
            type="button"
            onClick={() => setSearch("")}
            className="rounded-full border border-slate-700 px-4 py-2 text-xs text-slate-300 hover:border-slate-500"
          >
            Clear search
          </button>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-4">
          <FilterGroup
            label="Trip length"
            options={DISCOVER_FILTERS.length}
            value={filters.length}
            onChange={(value) => updateFilter("length", value)}
          />
          <FilterGroup
            label="Budget"
            options={DISCOVER_FILTERS.budget}
            value={filters.budget}
            onChange={(value) => updateFilter("budget", value)}
          />
          <FilterGroup
            label="Pace"
            options={DISCOVER_FILTERS.pace}
            value={filters.pace}
            onChange={(value) => updateFilter("pace", value)}
          />
          <FilterGroup
            label="Interests"
            options={DISCOVER_FILTERS.interest}
            value={filters.interest}
            onChange={(value) => updateFilter("interest", value)}
          />
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
          <p>Filters only affect this screen. No edits are saved.</p>
          <button
            type="button"
            onClick={() => {
              setSearch("");
              resetFilters();
              setUiMode("ready");
            }}
            className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300 hover:border-slate-500"
          >
            Reset filters
          </button>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              UI state
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Switch to preview loading and empty messaging.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {DISCOVER_UI_MODES.map((mode) => (
              <button
                key={mode.id}
                type="button"
                onClick={() => setUiMode(mode.id)}
                className={`rounded-full border px-3 py-1 text-xs transition ${
                  uiMode === mode.id
                    ? "border-amber-400/50 bg-amber-500/10 text-amber-100"
                    : "border-slate-700 text-slate-300 hover:border-slate-500"
                }`}
              >
                {mode.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {uiMode === "loading" && (
        <div className="grid gap-4 md:grid-cols-2">
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <SkeletonCard key={`discover-sk-${index}`} />
          ))}
        </div>
      )}

      {uiMode === "error" && (
        <ErrorState
          title="Discover is temporarily offline"
          description="This prototype is running locally. Switch back to Ready."
          actionLabel="Switch to Ready"
          onAction={() => setUiMode("ready")}
        />
      )}

      {showEmpty && (
        <EmptyState
          title="No itineraries match your filters"
          description="Try widening your trip length or clearing your search."
          actionLabel="Clear filters"
          onAction={() => {
            setSearch("");
            resetFilters();
            setUiMode("ready");
          }}
        />
      )}

      {uiMode === "ready" && totalResults > 0 && (
        <div className="space-y-6">
          <section className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-lg font-semibold">
                Curated by Lonely Planet
              </h3>
              <span className="text-xs text-slate-500">
                {curatedItineraries.length} itineraries
              </span>
            </div>
            <p className="text-sm text-slate-400">
              Expert sequencing, pacing notes, and practical tips included.
            </p>
            {curatedItineraries.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-slate-700 bg-slate-950/60 p-6 text-sm text-slate-400">
                No curated itineraries match this filter set yet.
              </p>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {curatedItineraries.map((itinerary) => (
                  <DiscoverItineraryCard
                    key={itinerary.id}
                    itinerary={itinerary}
                    onOpen={() => onOpenItinerary(itinerary.id)}
                  />
                ))}
              </div>
            )}
          </section>

          <section className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-lg font-semibold">From the community</h3>
              <span className="text-xs text-slate-500">
                {communityItineraries.length} itineraries
              </span>
            </div>
            <p className="text-sm text-slate-400">
              Personal routes with flexible pacing and lots of remix potential.
            </p>
            {communityItineraries.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-slate-700 bg-slate-950/60 p-6 text-sm text-slate-400">
                No community itineraries match this filter set yet.
              </p>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {communityItineraries.map((itinerary) => (
                  <DiscoverItineraryCard
                    key={itinerary.id}
                    itinerary={itinerary}
                    onOpen={() => onOpenItinerary(itinerary.id)}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
}

function FilterGroup({ label, options, value, onChange }) {
  return (
    <div className="space-y-2">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
            className={`rounded-full border px-3 py-1 text-xs transition ${
              value === option.id
                ? "border-slate-500 bg-slate-800 text-white"
                : "border-slate-700 text-slate-300 hover:border-slate-500"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function DiscoverItineraryCard({ itinerary, onOpen }) {
  const daysCount = itinerary.days?.length ?? itinerary.daysCount ?? 0;
  const daysLabel = `${daysCount} day${daysCount === 1 ? "" : "s"}`;
  const isCurated = itinerary.type === "curated";

  return (
    <button
      type="button"
      onClick={onOpen}
      className="group rounded-2xl border border-slate-800 bg-slate-900/40 p-5 text-left transition hover:border-slate-500"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Badge tone={isCurated ? "curated" : "community"}>
          {isCurated ? "LP Curated" : "Community"}
        </Badge>
        <span className="text-xs text-slate-500">
          {formatSaves(itinerary.saves)} saves
        </span>
      </div>
      <h4 className="mt-3 text-lg font-semibold group-hover:text-white">
        {itinerary.title}
      </h4>
      <p className="mt-2 text-sm text-slate-400">
        {itinerary.destination} • {daysLabel}
      </p>
      <p className="mt-3 text-sm text-slate-400">{itinerary.summary}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {(itinerary.vibes ?? []).map((tag) => (
          <Badge key={tag} tone="subtle">
            {tag}
          </Badge>
        ))}
      </div>
    </button>
  );
}

function ItineraryScreen({
  uiMode,
  itinerary,
  placeMap,
  onOpenPlace,
  onCopyToDraft,
  onAddToDraft,
  onGoHome,
}) {
  if (uiMode === "loading") {
    return (
      <div className="mt-8">
        <SkeletonPanel />
      </div>
    );
  }

  if (uiMode === "error") {
    return (
      <div className="mt-8">
        <ErrorState
          title="Itinerary failed to load"
          description="Try switching to Ready mode or head back home."
          actionLabel="Go home"
          onAction={onGoHome}
        />
      </div>
    );
  }

  if (!itinerary) {
    return (
      <div className="mt-8">
        <ErrorState
          title="Itinerary not found"
          description="Try opening a different itinerary from the list."
        />
      </div>
    );
  }

  const placeIds = getPlaceIdsFromItinerary(itinerary);
  const hasDays = itinerary?.days?.length > 0;
  const isCurated = itinerary.type === "curated";
  const isDraft = itinerary.status === "draft";

  if (uiMode === "empty" || placeIds.length === 0) {
    return (
      <div className="mt-8">
        <EmptyState
          title="No places yet"
          description="This itinerary is waiting for places. Add some or copy from another list."
          actionLabel="Add to draft"
          onAction={() => onCopyToDraft(itinerary)}
        />
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-6">
      <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone={isDraft ? "draft" : isCurated ? "curated" : "community"}>
                {isDraft
                  ? "Community draft"
                  : isCurated
                  ? "Lonely Planet curated"
                  : "Community itinerary"}
              </Badge>
              <Badge tone="subtle">{placeIds.length} places</Badge>
            </div>
            <div>
              <h2 className="text-2xl font-semibold">{itinerary.title}</h2>
              <p className="mt-2 text-sm text-slate-400">{itinerary.summary}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {(itinerary.tags ?? []).map((tag) => (
                <Badge key={tag} tone="subtle">
                  {tag}
                </Badge>
              ))}
            </div>
            {itinerary.expertNotes && (
              <div className="rounded-xl border border-slate-700 bg-slate-950/70 p-4 text-sm text-slate-300">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Expert notes
                </p>
                <p className="mt-2">{itinerary.expertNotes}</p>
              </div>
            )}
            {itinerary.notes && (
              <div className="rounded-xl border border-slate-700 bg-slate-950/70 p-4 text-sm text-slate-300">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Community notes
                </p>
                <p className="mt-2">{itinerary.notes}</p>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={() => onCopyToDraft(itinerary)}
              className="rounded-full border border-emerald-400/40 px-4 py-2 text-sm text-emerald-200 hover:border-emerald-300"
            >
              Copy into my draft
            </button>
            <button
              type="button"
              onClick={() => onAddToDraft(placeIds[0])}
              className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:border-slate-500"
            >
              Add first place
            </button>
            <div className="text-xs text-slate-500">
              Copy keeps the order. You can tweak later.
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <section className="space-y-6">
          {hasDays ? (
            itinerary.days.map((day) => (
              <div
                key={day.day}
                className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-lg font-semibold">{day.day}</h3>
                  <span className="text-xs text-slate-500">
                    {day.places.length} places
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-400">{day.summary}</p>
                <div className="mt-4 space-y-3">
                  {day.places.map((placeId, index) => (
                    <PlaceRow
                      key={`${day.day}-${placeId}`}
                      place={placeMap[placeId]}
                      index={index + 1}
                      onOpen={() => onOpenPlace(placeId)}
                    />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-lg font-semibold">Ordered list</h3>
                <span className="text-xs text-slate-500">
                  No day grouping
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-400">
                A single list for maximum flexibility. Group into days later if
                you want.
              </p>
              <div className="mt-4 space-y-3">
                {placeIds.map((placeId, index) => (
                  <PlaceRow
                    key={`place-${placeId}`}
                    place={placeMap[placeId]}
                    index={index + 1}
                    onOpen={() => onOpenPlace(placeId)}
                  />
                ))}
              </div>
            </div>
          )}
        </section>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Map preview
            </p>
            <div className="mt-4 h-40 rounded-xl border border-dashed border-slate-700 bg-slate-950/60" />
            <p className="mt-3 text-xs text-slate-500">
              Map is a placeholder for the prototype.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Quick actions
            </p>
            <div className="mt-3 space-y-2">
              <ActionRow
                title="Add a place"
                description="Jump to a place and add it to your draft."
              />
              <ActionRow
                title="Reorder later"
                description="Drag and drop is mocked for now."
              />
              <ActionRow
                title="Share a link"
                description="Sharing is disabled in prototype mode."
              />
            </div>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Notes
            </p>
            <p className="mt-3 text-sm text-slate-400">
              {isCurated
                ? "Curated itineraries include pacing logic and practical tips."
                : "Community itineraries are flexible and meant for remixing."}
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

function PlaceScreen({
  uiMode,
  place,
  inDraft,
  onAddToDraft,
  onRemoveFromDraft,
  onOpenPlace,
  onSaveForLater,
}) {
  if (uiMode === "loading") {
    return (
      <div className="mt-8">
        <SkeletonPanel />
      </div>
    );
  }

  if (uiMode === "error") {
    return (
      <div className="mt-8">
        <ErrorState
          title="Place failed to load"
          description="Try returning to the list and reopening the place."
        />
      </div>
    );
  }

  if (!place || uiMode === "empty") {
    return (
      <div className="mt-8">
        <EmptyState
          title="This place is not ready yet"
          description="Switch back to Ready mode to see the full details."
        />
      </div>
    );
  }

  const similarPlaces = PLACE_CATALOG.filter(
    (item) =>
      item.id !== place.id &&
      (item.type === place.type || item.neighborhood === place.neighborhood)
  ).slice(0, 3);

  return (
    <div className="mt-8 space-y-6">
      <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="subtle">{PLACE_TYPES[place.type]}</Badge>
              <Badge tone="subtle">{place.neighborhood}</Badge>
            </div>
            <h2 className="mt-3 text-2xl font-semibold">{place.name}</h2>
            <p className="mt-2 text-sm text-slate-400">{place.headline}</p>
          </div>
          <div className="flex flex-col gap-3">
            {inDraft ? (
              <button
                type="button"
                onClick={() => onRemoveFromDraft(place.id)}
                className="rounded-full border border-rose-400/40 px-4 py-2 text-sm text-rose-200 hover:border-rose-300"
              >
                Remove from draft
              </button>
            ) : (
              <button
                type="button"
                onClick={() => onAddToDraft(place.id)}
                className="rounded-full border border-emerald-400/40 px-4 py-2 text-sm text-emerald-200 hover:border-emerald-300"
              >
                Add to draft
              </button>
            )}
            <button
              type="button"
              onClick={onSaveForLater}
              className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:border-slate-500"
            >
              Save for later
            </button>
            <p className="text-xs text-slate-500">
              No reservations or backend calls in prototype mode.
            </p>
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <section className="space-y-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
            <h3 className="text-lg font-semibold">Why it fits</h3>
            <p className="mt-3 text-sm text-slate-400">{place.description}</p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <InfoTile label="Time" value={place.duration} />
              <InfoTile label="Price" value={place.price} />
              <InfoTile label="Best time" value={place.bestTime} />
              <InfoTile label="Energy" value={place.energy} />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
            <h3 className="text-lg font-semibold">Local tips</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-400">
              {place.tips.map((tip) => (
                <li key={tip} className="rounded-xl border border-slate-700 p-3">
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
            <h3 className="text-lg font-semibold">Highlights to notice</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {place.highlights.map((highlight) => (
                <Badge key={highlight} tone="subtle">
                  {highlight}
                </Badge>
              ))}
            </div>
            <p className="mt-3 text-sm text-slate-500">
              These highlights are placeholders for quick story hooks.
            </p>
          </div>
        </section>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Good for
            </p>
            <p className="mt-3 text-sm text-slate-200">{place.goodFor}</p>
            <p className="mt-2 text-xs text-slate-500">
              This copy can adapt by itinerary type.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Nearby picks
            </p>
            <div className="mt-3 space-y-2">
              {similarPlaces.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onOpenPlace(item.id)}
                  className="flex w-full items-center justify-between rounded-xl border border-slate-700 px-3 py-2 text-left text-sm text-slate-200 hover:border-slate-500"
                >
                  <span>{item.name}</span>
                  <span className="text-xs text-slate-500">
                    {PLACE_TYPES[item.type]}
                  </span>
                </button>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Itinerary fit
            </p>
            <p className="mt-3 text-sm text-slate-400">
              Add this place after a lighter stop. It resets energy without
              breaking flow.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

function BuilderScreen({
  draftTitle,
  setDraftTitle,
  draftPlaces,
  placeMap,
  groupDraftByDay,
  setGroupDraftByDay,
  draftDayGroups,
  onOpenPlace,
  onRemoveFromDraft,
  onAddMore,
  onPreviewDraft,
  onSaveDraft,
}) {
  return (
    <div className="mt-8 space-y-6">
      <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold">Build a community itinerary</h2>
            <p className="mt-2 text-sm text-slate-400">
              This is your private draft. Nothing is published until you share.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={onSaveDraft}
              className="rounded-full border border-emerald-400/40 px-4 py-2 text-sm text-emerald-200 hover:border-emerald-300"
            >
              Save draft
            </button>
            <button
              type="button"
              onClick={onPreviewDraft}
              className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:border-slate-500"
            >
              Preview itinerary
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-[2fr_1fr]">
          <label className="space-y-2 text-sm text-slate-400">
            Draft title
            <input
              value={draftTitle}
              onChange={(event) => setDraftTitle(event.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2 text-base text-slate-100 outline-none focus:border-slate-500"
            />
          </label>
          <div className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-300">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Draft status
            </p>
            <p className="mt-2">
              Private. You can share when it feels ready.
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-400">
          <button
            type="button"
            onClick={() => setGroupDraftByDay((prev) => !prev)}
            className={`rounded-full border px-3 py-1 ${
              groupDraftByDay
                ? "border-amber-400/50 bg-amber-500/10 text-amber-100"
                : "border-slate-700 text-slate-300"
            }`}
          >
            {groupDraftByDay ? "Grouped into days" : "Single ordered list"}
          </button>
          <span>Drag to reorder is a placeholder.</span>
        </div>
      </section>

      {draftPlaces.length === 0 ? (
        <EmptyState
          title="Your draft is empty"
          description="Add places from the Explore tab to start building."
          actionLabel="Browse places"
          onAction={onAddMore}
        />
      ) : (
        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-lg font-semibold">Draft places</h3>
            <button
              type="button"
              onClick={onAddMore}
              className="rounded-full border border-slate-700 px-4 py-2 text-xs text-slate-300 hover:border-slate-500"
            >
              Add more places
            </button>
          </div>

          {groupDraftByDay ? (
            <div className="space-y-4">
              {draftDayGroups.map((day) => (
                <div
                  key={day.day}
                  className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-semibold">{day.day}</h4>
                    <span className="text-xs text-slate-500">
                      {day.places.length} places
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-slate-500">{day.summary}</p>
                  <div className="mt-4 space-y-3">
                    {day.places.map((placeId, index) => (
                      <DraftRow
                        key={`${day.day}-${placeId}`}
                        place={placeMap[placeId]}
                        index={index + 1}
                        onOpen={() => onOpenPlace(placeId)}
                        onRemove={() => onRemoveFromDraft(placeId)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
              <div className="space-y-3">
                {draftPlaces.map((placeId, index) => (
                  <DraftRow
                    key={`draft-${placeId}`}
                    place={placeMap[placeId]}
                    index={index + 1}
                    onOpen={() => onOpenPlace(placeId)}
                    onRemove={() => onRemoveFromDraft(placeId)}
                  />
                ))}
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  );
}

function ItineraryCard({ itinerary, placeMap, onOpen }) {
  const placeIds = getPlaceIdsFromItinerary(itinerary);
  const isCurated = itinerary.type === "curated";
  const isDraft = itinerary.status === "draft";
  const previewPlaces = placeIds.slice(0, 3).map((id) => placeMap[id]?.name);

  return (
    <button
      type="button"
      onClick={onOpen}
      className="group rounded-2xl border border-slate-800 bg-slate-900/40 p-5 text-left transition hover:border-slate-500"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Badge tone={isDraft ? "draft" : isCurated ? "curated" : "community"}>
          {isDraft
            ? "Community draft"
            : isCurated
            ? "Lonely Planet curated"
            : "Community itinerary"}
        </Badge>
        <span className="text-xs text-slate-500">{placeIds.length} places</span>
      </div>
      <h4 className="mt-3 text-lg font-semibold group-hover:text-white">
        {itinerary.title}
      </h4>
      <p className="mt-2 text-sm text-slate-400">{itinerary.summary}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {(itinerary.tags ?? []).map((tag) => (
          <Badge key={tag} tone="subtle">
            {tag}
          </Badge>
        ))}
      </div>
      <p className="mt-4 text-xs text-slate-500">
        {previewPlaces.length > 0
          ? `Starts with ${previewPlaces.join(", ")}.`
          : "Add places to preview this itinerary."}
      </p>
    </button>
  );
}

function PlaceMiniCard({ place, onOpen, onAdd }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <Badge tone="subtle">{PLACE_TYPES[place.type]}</Badge>
          <h4 className="mt-2 text-base font-semibold">{place.name}</h4>
          <p className="mt-1 text-xs text-slate-500">{place.neighborhood}</p>
        </div>
        <button
          type="button"
          onClick={onAdd}
          className="rounded-full border border-emerald-400/40 px-3 py-1 text-xs text-emerald-200 hover:border-emerald-300"
        >
          Add
        </button>
      </div>
      <p className="mt-3 text-xs text-slate-400">{place.headline}</p>
      <button
        type="button"
        onClick={onOpen}
        className="mt-3 text-xs text-slate-300 underline-offset-4 hover:underline"
      >
        View details
      </button>
    </div>
  );
}

function PlaceRow({ place, index, onOpen }) {
  if (!place) return null;
  return (
    <button
      type="button"
      onClick={onOpen}
      className="flex w-full items-center justify-between rounded-xl border border-slate-700 bg-slate-950/40 px-4 py-3 text-left text-sm text-slate-200 hover:border-slate-500"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 text-xs text-slate-400">
          {index}
        </div>
        <div>
          <div className="font-semibold">{place.name}</div>
          <div className="text-xs text-slate-500">
            {PLACE_TYPES[place.type]} - {place.duration}
          </div>
        </div>
      </div>
      <span className="text-xs text-slate-500">{place.neighborhood}</span>
    </button>
  );
}

function DraftRow({ place, index, onOpen, onRemove }) {
  if (!place) return null;
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-700 bg-slate-950/40 px-4 py-3 text-sm text-slate-200">
      <button type="button" onClick={onOpen} className="text-left">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 text-xs text-slate-400">
            {index}
          </div>
          <div>
            <div className="font-semibold">{place.name}</div>
            <div className="text-xs text-slate-500">
              {PLACE_TYPES[place.type]} - {place.duration}
            </div>
          </div>
        </div>
      </button>
      <button
        type="button"
        onClick={onRemove}
        className="rounded-full border border-rose-400/40 px-3 py-1 text-xs text-rose-200 hover:border-rose-300"
      >
        Remove
      </button>
    </div>
  );
}

function Badge({ tone = "default", children }) {
  const tones = {
    default: "border-slate-700 text-slate-200 bg-slate-900/60",
    subtle: "border-slate-700 text-slate-400 bg-slate-950/60",
    curated: "border-amber-400/40 text-amber-200 bg-amber-500/10",
    community: "border-emerald-400/40 text-emerald-200 bg-emerald-500/10",
    draft: "border-sky-400/40 text-sky-200 bg-sky-500/10",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${
        tones[tone] ?? tones.default
      }`}
    >
      {children}
    </span>
  );
}

function InfoTile({ label, value }) {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-3">
      <div className="text-xs uppercase tracking-[0.2em] text-slate-500">
        {label}
      </div>
      <div className="mt-2 text-sm text-slate-200">{value}</div>
    </div>
  );
}

function ActionRow({ title, description }) {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-3 text-sm text-slate-200">
      <div className="font-semibold">{title}</div>
      <div className="mt-1 text-xs text-slate-500">{description}</div>
    </div>
  );
}

function EmptyState({ title, description, actionLabel, onAction }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-950/60 p-8 text-center">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-slate-400">{description}</p>
      {actionLabel && (
        <button
          type="button"
          onClick={onAction}
          className="mt-4 rounded-full border border-slate-600 px-4 py-2 text-sm text-slate-200 hover:border-slate-500"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

function ErrorState({ title, description, actionLabel, onAction }) {
  return (
    <div className="rounded-2xl border border-rose-500/40 bg-rose-500/10 p-8 text-center">
      <h3 className="text-lg font-semibold text-rose-100">{title}</h3>
      <p className="mt-2 text-sm text-rose-100/70">{description}</p>
      {actionLabel && (
        <button
          type="button"
          onClick={onAction}
          className="mt-4 rounded-full border border-rose-400/60 px-4 py-2 text-sm text-rose-100 hover:border-rose-300"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
      <div className="h-4 w-32 rounded bg-slate-700/60" />
      <div className="mt-4 h-5 w-2/3 rounded bg-slate-700/60" />
      <div className="mt-2 h-4 w-full rounded bg-slate-800/60" />
      <div className="mt-2 h-4 w-5/6 rounded bg-slate-800/60" />
      <div className="mt-4 h-4 w-1/2 rounded bg-slate-700/60" />
    </div>
  );
}

function SkeletonPanel() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-28 rounded-2xl border border-slate-800 bg-slate-900/40" />
      <div className="h-56 rounded-2xl border border-slate-800 bg-slate-900/40" />
    </div>
  );
}
