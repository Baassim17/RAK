
const differentiators = [
  {
    id: "personnel",
    title: "Personnel standards",
    description: "Uniformed officers are briefed on your site, the people they’ll meet and the routines they’re expected to follow.",
    evidence: "Officer briefing checklist",
  },
  {
    id: "supervision",
    title: "Structured supervision",
    description: "Officers report to a supervisor. Agree who checks in on each post and how issues are escalated.",
    evidence: "Supervisor assignment and check-in plan",
  },
  {
    id: "communication",
    title: "Responsive communication",
    description: "Know who to contact for routine updates and who to call when an incident needs attention.",
    evidence: "Contact and escalation list",
  },
  {
    id: "planning",
    title: "Site-specific security planning",
    description: "Build coverage around your access points, patrol routes and operating hours.",
    evidence: "Site assessment and coverage plan",
  },
];

export function WhyChooseRak() {
  return (
    <section id="why-choose-rak" className="why-rak" aria-labelledby="why-rak-title">
      <header className="wrap why-rak-header">
        <h2 id="why-rak-title">Why Choose <span>RAK Security</span></h2>
        <p>Confidence Is Built Into Every Detail.</p>
      </header>

      <div className="why-rak-panel">
        <ol className="wrap why-rak-list" role="list">
          {differentiators.map(({ id, title, description, evidence }, index) => (
            <li className="why-rak-row" key={id} data-reveal={index * 0.045}>
              <span className="label why-rak-index" aria-hidden="true">_{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p className="why-rak-copy">{description}</p>
              <p className="why-rak-evidence"><span className="label">Ask to review</span>{evidence}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
