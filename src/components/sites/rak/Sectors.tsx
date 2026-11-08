import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { sectors } from "./content";
import { SectorMarquee } from "./SectorMarquee";

export function Sectors({ withLink = true }: { withLink?: boolean }) {
  const href = withLink ? "/industries" : "/contact";

  return (
    <section id="sectors" className="sectors" aria-labelledby="sectors-title">
      <header className="wrap sectors-intro">
        <h2 id="sectors-title">Security for <span>every kind of site.</span></h2>
      </header>
      <SectorMarquee items={sectors.map(({ id, name, description }) => ({ id, name, description }))} />
      <div className="wrap sectors-foot">
        <p>From public facilities and workplaces to residential communities and distribution sites, we build guarding, patrol and CCTV plans around how each site operates.</p>
        <Link href={href} className="sectors-cta label">
          {withLink ? "See all sectors" : "Discuss your site"} <ArrowUpRight size={16} aria-hidden />
        </Link>
      </div>
    </section>
  );
}
