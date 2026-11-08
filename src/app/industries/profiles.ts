import type { Sector, Service } from "@/components/sites/rak/content";

export const industryGroups = [
  { id: "community", label: "Public & community" },
  { id: "business", label: "Business & hospitality" },
  { id: "operations", label: "Industrial & infrastructure" },
] as const;

export type IndustryGroup = (typeof industryGroups)[number]["id"];

type SectorProfile = {
  group: IndustryGroup;
  priorities: [string, string, string];
  planning: string;
  brief: string;
  services: [Service["id"], Service["id"]];
};

export const sectorProfiles: Record<Sector["id"], SectorProfile> = {
  government: {
    group: "community",
    priorities: ["Public entrances", "Restricted areas", "Opening and closing"],
    planning: "Separate public access from staff and contractor routes. Agree how officers assist visitors, manage queues at busy times and hand over issues to facility management.",
    brief: "Public opening hours, visitor volumes and which areas require controlled access.",
    services: ["guarding", "cctv"],
  },
  commercial: {
    group: "business",
    priorities: ["Reception", "Tenant access", "After-hours patrols"],
    planning: "Coordinate visitor passes and deliveries across tenants while keeping reception welcoming. Plan patrols for shared floors, car parks and service areas during quieter hours.",
    brief: "Tenant mix, reception hours and separate routes for deliveries or after-hours access.",
    services: ["commercial", "cctv"],
  },
  industrial: {
    group: "operations",
    priorities: ["Gatehouses", "Perimeter checks", "Shift changes"],
    planning: "Align gate coverage with shift changes, contractor arrivals and vehicle movements. Identify high-value storage and quiet areas for patrols, and agree how officers report anything unusual.",
    brief: "Shift times, gate locations and areas that need additional coverage.",
    services: ["guarding", "cctv"],
  },
  residential: {
    group: "community",
    priorities: ["Resident access", "Visitor management", "Shared areas"],
    planning: "Set consistent rules for guests, deliveries and contractors. Plan patrols around car parks, shared amenities and quiet hours, and agree who handles resident concerns.",
    brief: "Number of entrances, guest access rules and priority times for patrols.",
    services: ["guarding", "cctv"],
  },
  healthcare: {
    group: "community",
    priorities: ["Visitor access", "Sensitive areas", "Staff escalation"],
    planning: "Plan a calm, visible presence around receptions and waiting areas while keeping emergency access clear. Agree escalation procedures with facility staff and identify areas where privacy shapes coverage.",
    brief: "Visitor policies, emergency access routes and areas with restricted entry.",
    services: ["guarding", "cctv"],
  },
  education: {
    group: "community",
    priorities: ["Arrival and pickup", "Campus access", "After-hours use"],
    planning: "Coordinate gate duties with drop-off, pickup and visitor check-in. Plan coverage for evening activities and campus events, with a clear route for escalating concerns to site staff.",
    brief: "Term hours, entrance layouts and the timing of busy arrival and departure periods.",
    services: ["guarding", "events"],
  },
  retail: {
    group: "business",
    priorities: ["Customer entrances", "Peak footfall", "Loading areas"],
    planning: "Place officers around busy entrances and common areas while coordinating with tenant teams. Plan coverage around trading hours, promotions and deliveries at the back of the property.",
    brief: "Trading hours, seasonal peaks and the location of staff entrances and delivery bays.",
    services: ["guarding", "cctv"],
  },
  hospitality: {
    group: "business",
    priorities: ["Guest arrivals", "Events", "Staff-only access"],
    planning: "Balance a visible presence with a welcoming guest experience. Coordinate coverage across entrances, event spaces and back-of-house areas, with clear handover to duty managers.",
    brief: "Guest arrival patterns, event schedules and access rules for staff and suppliers.",
    services: ["guarding", "events"],
  },
  construction: {
    group: "operations",
    priorities: ["Site gates", "Deliveries", "Out-of-hours checks"],
    planning: "Set access and patrol arrangements that can change as the project develops. Agree how to handle deliveries, record contractor access and check equipment yards after work stops.",
    brief: "Current site plan, working hours and upcoming changes to access or perimeter routes.",
    services: ["guarding", "cctv"],
  },
  logistics: {
    group: "operations",
    priorities: ["Driver check-in", "Loading bays", "Yard patrols"],
    planning: "Align security with dispatch and receiving schedules. Agree how drivers and visitors check in, where vehicles wait and how officers report activity outside normal operating hours.",
    brief: "Vehicle volumes, dispatch hours and the layout of loading bays and yards.",
    services: ["guarding", "cctv"],
  },
};
