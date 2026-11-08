// Single source of truth for site copy.
// ⚠ Values wrapped in [brackets] are placeholders — replace with confirmed company details before launch.

export const company = {
  name: "RAK Security Services LLC",
  short: "RAK Security",
  industry: "Security Guarding & Patrol Services",
  hq: "Ras Al Khaimah, United Arab Emirates",
  coords: "25.79°N · 55.94°E",
  linkedin: "https://www.linkedin.com/company/raksecurityservices/",
  phone: "[+971 — phone]",
  email: "[info@ — email]",
  whatsapp: "", // e.g. "9715XXXXXXXX" — WhatsApp button is hidden until set
  address: "[Street address], Ras Al Khaimah, UAE",
  licence: "[Trade / security licence no.]",
  approvals: "[Regulator approvals · insurance]",
};

export type Service = {
  id: string;
  no: string;
  title: string;
  short: string;
  body: string;
  rows: [string, string][];
  tags: string[];
  img: string;
  alt: string;
  chapter: { emphasis: string; heading: string };
};

export const services: Service[] = [
  {
    id: "commercial",
    chapter: { emphasis: "Security", heading: "for the places that need it most." },
    no: "01",
    title: "Commercial & Office Security",
    short: "Commercial",
    body: "Reception, access control and patrol presence that protects people, assets and reputation in offices and commercial properties.",
    rows: [["Focus", "Offices · commercial premises"], ["Presence", "Reception · patrol"], ["Control", "Access management"]],
    tags: ["Access control", "Front of house", "Patrols"],
    img: "/sites/rak/img/svc-commercial.jpg",
    alt: "Security officer standing watch in an office building lobby beside the access turnstiles",
  },
  {
    id: "guarding",
    chapter: { emphasis: "Officers", heading: "on post when it matters." },
    no: "02",
    title: "Uniformed Officers & Manned Guarding",
    short: "Guarding",
    body: "Presentable, trained officers on post — a visible deterrent and a calm first responder, day and night.",
    rows: [["Focus", "Uniformed guarding"], ["Modes", "Static posts · mobile patrol"], ["Cover", "Day & night rosters"]],
    tags: ["Static posts", "Mobile patrol", "Rosters"],
    img: "/sites/rak/img/svc-guarding.jpg",
    alt: "Uniformed security officer in a high-visibility vest on patrol",
  },
  {
    id: "events",
    chapter: { emphasis: "Safer events", heading: "from first arrival to last exit." },
    no: "03",
    title: "Event Security Management",
    short: "Events",
    body: "Risk planning, entry control and crowd management for private, corporate and public events of every size.",
    rows: [["Focus", "Events"], ["Scope", "Planning · entry · crowd"], ["Scale", "Private to public"]],
    tags: ["Risk planning", "Crowd control", "VIP areas"],
    img: "/sites/rak/img/svc-events.jpg",
    alt: "Concert crowd under blue stage lights",
  },
  {
    id: "cit",
    chapter: { emphasis: "Secure handling", heading: "at every step of the journey." },
    no: "04",
    title: "Cash-in-Transit",
    short: "CIT",
    body: "Secure movement of cash and valuables, run on disciplined procedures and accountable handling at every step.",
    rows: [["Focus", "Cash & valuables"], ["Method", "Secure routing"], ["Standard", "Accountable handling"]],
    tags: ["Secure routes", "Chain of custody", "Protocol"],
    img: "/sites/rak/img/svc-cit.jpg",
    alt: "Heavy steel bank vault door with a circular locking wheel",
  },
  {
    id: "protection",
    chapter: { emphasis: "Discreet protection", heading: "wherever the day takes you." },
    no: "05",
    title: "Bodyguards & Executive Protection",
    short: "Protection",
    body: "Discreet close protection for executives, families and high-profile individuals, built on planning and awareness.",
    rows: [["Focus", "Individuals"], ["Method", "Close protection"], ["Style", "Discreet"]],
    tags: ["Close protection", "Advance work", "Discretion"],
    img: "/sites/rak/img/svc-protection.jpg",
    alt: "Close-protection officer in a dark suit with an earpiece",
  },
  {
    id: "cctv",
    chapter: { emphasis: "Eyes on your site", heading: "even when no one is there." },
    no: "06",
    title: "CCTV Installation & Monitoring",
    short: "CCTV",
    body: "Camera systems designed, installed and watched — so your site is seen even when nobody is standing there.",
    rows: [["Focus", "Surveillance"], ["Scope", "Design · install · monitor"], ["Role", "Extends guarding"]],
    tags: ["Installation", "Monitoring", "Incident review"],
    img: "/sites/rak/img/svc-cctv.jpg",
    alt: "CCTV camera mounted on a building facade",
  },
];

/* Hero time-lapse: one 24-hour shift across RAK, three chapters that rotate automatically. */
export type HeroChapter = { phase: string; time: string; word: string; body: string; img: string; alt: string };

export const heroStory: HeroChapter[] = [
  {
    phase: "Dawn",
    time: "06:00",
    word: "On post.",
    body: "Officers are at the gate before the city wakes up. Every entry is checked, every barrier is manned and every shift starts briefed.",
    img: "/sites/rak/img/hero-01-dawn.webp",
    alt: "Security officer standing beside a gate barrier at dawn, with the Hajar mountains in the mist behind",
  },
  {
    phase: "Dusk",
    time: "18:00",
    word: "On patrol.",
    body: "As the day hands over, patrols take the road. Routes, sites and checkpoints are covered from the coast to the mountains.",
    img: "/sites/rak/img/hero-02-dusk.webp",
    alt: "Patrol vehicle driving a mountain road at dusk above the lights of Ras Al Khaimah",
  },
  {
    phase: "Night",
    time: "02:00",
    word: "Unseen.",
    body: "At 2am the cameras are still watching and someone is watching them. Gates, car parks and corridors stay in view all night.",
    img: "/sites/rak/img/hero-03-night.webp",
    alt: "Operator in a dark control room watching a wall of CCTV monitors at night",
  },
];

type Sector = { id: string; name: string; description: string; photo?: { src: string; alt: string } };

export const sectors: Sector[] = [
  {
    id: "government",
    name: "Government & Public Facilities",
    description: "Visitor access, reception coverage and patrols for public buildings and facilities.",
  },
  {
    id: "commercial",
    name: "Commercial & Corporate",
    description: "Front-of-house guarding, access control and patrols for offices and corporate premises.",
    photo: { src: "/sites/rak/img/sec-commercial.jpg", alt: "Glass office towers seen from street level" },
  },
  {
    id: "industrial",
    name: "Industrial & Manufacturing",
    description: "Gate coverage, perimeter checks and patrols for production facilities and industrial sites.",
  },
  {
    id: "residential",
    name: "Residential & Communities",
    description: "Discreet guarding, visitor management and patrols for homes, buildings and residential communities.",
    photo: { src: "/sites/rak/img/sec-residential.jpg", alt: "Modern white villa with a swimming pool" },
  },
  {
    id: "healthcare",
    name: "Healthcare & Medical",
    description: "A calm security presence and access control for patients, staff and visitors at healthcare facilities.",
  },
  {
    id: "education",
    name: "Education & Institutions",
    description: "Visitor access and site patrols for schools, campuses and other institutions.",
    photo: { src: "/sites/rak/img/sec-institutional.jpg", alt: "Modern red-brick campus building and plaza" },
  },
  {
    id: "retail",
    name: "Retail & Shopping Centers",
    description: "Visible guarding and patrols for shops, shopping centers and their shared spaces.",
  },
  {
    id: "hospitality",
    name: "Hospitality & Tourism",
    description: "Guest-facing security, access management and patrols for hotels, resorts and visitor venues.",
  },
  {
    id: "construction",
    name: "Construction & Infrastructure",
    description: "Gate control and perimeter patrols for construction sites, equipment yards and infrastructure projects.",
    photo: { src: "/sites/rak/img/proc-assess.jpg", alt: "Team in high-visibility vests inspecting a site" },
  },
  {
    id: "logistics",
    name: "Logistics & Warehousing",
    description: "Vehicle access, loading-area coverage and patrols for warehouses and distribution sites.",
    photo: { src: "/sites/rak/img/sec-industrial.jpg", alt: "Long aisle of a stocked warehouse" },
  },
];

/* "Who we are" statement and carousel slides */
export type Pillar = { no: string; head: string; title: string; body: string; img: string; alt: string };

export const who = {
  title: "Trained people. Reliable systems.",
  emphasis: "Protection where it matters.",
  intro: "Based in Ras Al Khaimah, we provide guarding and patrol services for offices, communities, events and assets.",
  pillars: [
    {
      no: "01",
      head: "Eyes on every entrance, on record",
      title: "Reliable systems",
      body: "CCTV and supervision back every post, so the gates, car parks and corridors on your site stay in view and on record.",
      img: "/sites/rak/img/who-reliable-systems.webp",
      alt: "Surveillance camera overlooking a gated entrance on a rainy night",
    },
    {
      no: "02",
      head: "Officers where you need them",
      title: "Constant presence",
      body: "Lobbies, gates, patrol routes and events. We put officers where they're needed, at the hours that matter most to you.",
      img: "/sites/rak/img/who-constant-presence.webp",
      alt: "Uniformed security officer standing watch outside a building at night",
    },
    {
      no: "03",
      head: "Briefed people who answer to a supervisor",
      title: "Trained people",
      body: "Uniformed officers who arrive briefed on your site, your people and your routines, and who answer to a supervisor.",
      img: "/sites/rak/img/who-trained-people.webp",
      alt: "Uniformed security officer with a radio at a modern lobby entrance",
    },
  ] satisfies Pillar[],
};

/* "Trusted by" strip. ⚠ DEMO PLACEHOLDERS — invented names, not real clients.
   Replace with real clients (with their permission): set `name`, and `logo` to a file
   in /public/sites/rak/clients/ (SVG or transparent PNG). When `logo` is set it is shown
   instead of the placeholder wordmark. */
export type Client = { name: string; sector: string; logo?: string };

export const clients: Client[] = [
  { name: "Aldara Hotels", sector: "Hospitality" },
  { name: "Marlin Bay", sector: "Residential" },
  { name: "Sahra Logistics", sector: "Industrial" },
  { name: "Qasr Holdings", sector: "Commercial" },
  { name: "Corniche Retail", sector: "Retail" },
  { name: "Falaj Events", sector: "Events" },
  { name: "Noorhaus", sector: "Residential" },
  { name: "Dune & Co.", sector: "Commercial" },
];

export const faqs: { q: string; a: string; placeholder?: boolean }[] = [
  { q: "How do I request a quotation?", a: "Send the form on our Contact page with a few details about your site or event. We'll come back to you with next steps." },
  { q: "Can services be combined?", a: "Yes. Most sites are best protected by a mix — guarding supported by CCTV, for example. Tell us about yours and we'll propose a sensible combination." },
  { q: "Where do you operate?", a: "We are headquartered in Ras Al Khaimah, UAE. [Confirm wider coverage area.]", placeholder: true },
  { q: "Are your officers trained and licensed?", a: "[Add training, licensing and vetting details.]", placeholder: true },
  { q: "Are you hiring?", a: "We welcome security guard enquiries — see the Careers page." },
];

export const nav = [
  { href: "/", label: "Home", sub: "Overview" },
  { href: "/about", label: "About", sub: "Mission · values" },
  { href: "/services", label: "Services", sub: "Six disciplines" },
  { href: "/industries", label: "Industries", sub: "Sectors we protect" },
  { href: "/careers", label: "Careers", sub: "Join the watch" },
  { href: "/contact", label: "Contact", sub: "Request a quote" },
];
