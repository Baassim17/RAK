import type { Metadata } from "next";
import { PageHero } from "@/components/sites/rak/Sections";
import { QuoteForm } from "@/components/sites/rak/QuoteForm";

export const metadata: Metadata = { title: "Careers" };

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        index="[ 04 ]"
        title={<>Join <em>the watch.</em></>}
        lead="We are always interested in disciplined, reliable people for security guard and related roles."
      />
      <section className="sec">
        <div className="wrap two">
          <div>
            <span className="label paren">Why RAK Security</span>
            <h2 className="display h-md sub-h" data-split>
              A career with <em>purpose.</em>
            </h2>
            <div className="rows" data-reveal>
              <div><span className="label">Roles</span><span>Security guard · supervisor · CCTV operator</span></div>
              <div><span className="label">Location</span><span>Ras Al Khaimah, UAE</span></div>
              <div><span className="label">Benefits</span><span className="ph">[Add benefits]</span></div>
              <div><span className="label">Requirements</span><span className="ph">[e.g. valid ID, security licence / training — confirm]</span></div>
            </div>
          </div>
          <div data-reveal>
            <QuoteForm mode="careers" />
          </div>
        </div>
      </section>
    </>
  );
}
