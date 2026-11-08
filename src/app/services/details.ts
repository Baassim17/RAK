import type { Service } from "@/components/sites/rak/content";

type ServiceDetail = {
  overview: string;
  coverage: { title: string; description: string }[];
  fit: string;
  brief: string;
};

export const serviceDetails: Record<Service["id"], ServiceDetail> = {
  commercial: {
    overview: "Give staff and visitors a clear point of contact at the entrance, with coverage for the rest of the property built around the way it operates.",
    coverage: [
      { title: "Front of house", description: "Welcome visitors, manage sign-in and passes, and direct deliveries to the right point of entry." },
      { title: "Access and patrols", description: "Cover entrances, car parks and shared areas according to your opening hours and agreed patrol routes." },
      { title: "Incident handover", description: "Agree what officers log, who receives updates and when an issue goes to building management." },
    ],
    fit: "Office buildings, business parks and shared commercial properties.",
    brief: "Share your opening hours, busiest entrances and any after-hours access requirements.",
  },
  guarding: {
    overview: "Put uniformed officers where visibility and a consistent routine matter. Plan fixed posts, patrols and shift handovers around your site.",
    coverage: [
      { title: "Fixed posts", description: "Cover gates, reception desks and other access points with duties agreed for each post." },
      { title: "Patrol rounds", description: "Agree which areas to check, when to check them and how to record anything unusual." },
      { title: "Shift handovers", description: "Set reporting lines and escalation contacts so incoming officers know what needs attention." },
    ],
    fit: "Residential communities, warehouses, industrial premises and sites with multiple access points.",
    brief: "Share your site layout, coverage hours and any gates or areas that need a dedicated officer.",
  },
  events: {
    overview: "Plan security around how guests, staff and suppliers move through the venue, from the first arrivals to the end of the event.",
    coverage: [
      { title: "Pre-event planning", description: "Review the venue, expected attendance, entry points and peak arrival times with the organiser." },
      { title: "Entry and guest flow", description: "Support queues, access checks and movement between public, staff-only and restricted areas." },
      { title: "On-site coordination", description: "Agree how security communicates with venue staff, handles incidents and supports departures." },
    ],
    fit: "Corporate functions, private gatherings and public events.",
    brief: "Share the venue, date, expected attendance and any restricted or VIP areas.",
  },
  cit: {
    overview: "Plan transfers around clear responsibilities for collection, movement and handover, with the scope agreed before service begins.",
    coverage: [
      { title: "Collection and delivery", description: "Agree collection and delivery points, service frequency and suitable time windows." },
      { title: "Transfer responsibilities", description: "Define the authorised contacts, how custody passes between parties and how each handover is recorded." },
      { title: "Exception reporting", description: "Agree who to contact when a collection is delayed or a handover cannot proceed as planned." },
    ],
    fit: "Businesses arranging scheduled or one-off transfers of cash and valuables.",
    brief: "Start with the transfer frequency and general locations. Discuss sensitive transfer details privately.",
  },
  protection: {
    overview: "Build discreet personal security around the individual’s itinerary, privacy needs and the venues they use.",
    coverage: [
      { title: "Advance planning", description: "Review movements, venue arrangements and any points where extra coordination is needed." },
      { title: "Close protection", description: "Agree the level of presence required for meetings, appearances and transfers." },
      { title: "Day-to-day coordination", description: "Define how officers communicate with the principal, their team and venue contacts when plans change." },
    ],
    fit: "Executives, families and high-profile visitors who need discreet personal security.",
    brief: "Share your dates and general locations. Detailed itineraries can be discussed privately.",
  },
  cctv: {
    overview: "Plan camera coverage around the areas you need to see and what staff or officers should do when something needs attention.",
    coverage: [
      { title: "Coverage design", description: "Identify key entrances, circulation routes and blind spots, and review any existing cameras." },
      { title: "Installation", description: "Agree camera positions, recording needs and how authorised staff will access the system." },
      { title: "Monitoring and review", description: "Define when footage is monitored, who handles alerts and how recordings are reviewed after an incident." },
    ],
    fit: "Commercial, residential and industrial sites adding surveillance or updating an existing system.",
    brief: "Share any existing camera layout, the areas you need covered and when monitoring is required.",
  },
};
