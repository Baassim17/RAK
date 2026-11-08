import Image from "next/image";

export function Commitment() {
  return (
    <section id="our-commitment" className="commitment" aria-labelledby="commitment-title">
      <Image className="commitment-image" src="/sites/rak/img/commitment-bg.webp" alt="" fill sizes="100vw" />
      <div className="commitment-card">
        <h2 id="commitment-title">Vigilance <span>Without Compromise.</span></h2>
        <p>We stay alert, act professionally and take responsibility for every post. We prepare for changing conditions so we can protect your people, property and day-to-day operations.</p>
      </div>
    </section>
  );
}
