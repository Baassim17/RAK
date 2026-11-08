import { who } from "./content";
import { WhoCarousel } from "./WhoCarousel";

export function Manifesto() {
  return (
    <section className="who" aria-labelledby="who-title">
      <div className="wrap who-in">
        <div className="who-intro">
          <h2 id="who-title" className="who-lead">
            {who.title} <span>{who.emphasis}</span>
          </h2>
          <p>{who.intro}</p>
        </div>
        <WhoCarousel />
      </div>
    </section>
  );
}
