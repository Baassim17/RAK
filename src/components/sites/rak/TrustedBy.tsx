import { demoBrands } from "./content";

export function TrustedBy() {
  return (
    <section className="clients" aria-labelledby="clients-title">
      <div className="wrap clients-in">
        <h2 id="clients-title" className="clients-title">
          Protecting the places where <span>people work, live and gather.</span>
        </h2>
        <div className="clients-rail" role="group" aria-label="Illustrative brand logos" tabIndex={0}>
          <ul className="clients-list" role="list">
            {demoBrands.map(({ name, logo }) => (
              <li key={name}>
                <span className="sr-only">{name}</span>
                <span className="client-logo" style={{ maskImage: `url("/sites/rak/clients/${logo}.svg")` }} aria-hidden="true" />
              </li>
            ))}
          </ul>
        </div>
        <p className="label clients-caption">Illustrative brands</p>
      </div>
    </section>
  );
}
