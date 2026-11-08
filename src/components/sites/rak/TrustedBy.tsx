import Image from "next/image";
import { clients } from "./content";

export function TrustedBy() {
  const stripLabel = clients.some(({ logo }) => !logo) ? "Illustrative wordmarks" : "Client wordmarks";
  const items = clients.map(({ name, logo }, index) => (
    <li className="client" key={name}>
      {logo ? (
        <Image src={logo} alt={name} width={160} height={48} className="client-logo" />
      ) : (
        <>
          <ClientMark i={index} />
          <span>{name}</span>
        </>
      )}
    </li>
  ));

  return (
    <section className="clients" aria-labelledby="clients-title">
      <div className="wrap clients-in">
        <h2 id="clients-title" className="clients-title">
          Protecting the places where <span>people work, live and gather.</span>
        </h2>
        <div className="clients-mq" tabIndex={0} role="group" aria-label={stripLabel}>
          <div className="clients-track">
            <ul className="clients-list" role="list">{items}</ul>
            <ul className="clients-list" aria-hidden="true">{items}</ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Simple geometric marks for the placeholder wordmarks. */
function ClientMark({ i }: { i: number }) {
  const marks = [
    <circle key="c" cx="16" cy="16" r="11" />,
    <rect key="r" x="7" y="7" width="18" height="18" transform="rotate(45 16 16)" />,
    <path key="t" d="M16 5 28 27H4Z" />,
    <path key="a" d="M5 26a11 11 0 0 1 22 0M10 26a6 6 0 0 1 12 0" />,
    <path key="b" d="M6 8h20M6 16h20M6 24h20" />,
    <path key="h" d="M16 4 27 10v12L16 28 5 22V10Z" />,
    <path key="s" d="M16 4v24M4 16h24M8 8l16 16M24 8 8 24" />,
    <path key="w" d="M4 20c4-8 8-8 12 0s8 8 12 0" />,
  ];
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden className="client-mark">
      {marks[i % marks.length]}
    </svg>
  );
}
