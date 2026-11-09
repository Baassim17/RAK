import Image from "next/image";
import Link from "next/link";
import { ArrowLeftRight, ArrowUpRight } from "lucide-react";
import { ChapterSequence } from "./ChapterSequence";
import { services } from "./content";

const total = String(services.length).padStart(2, "0");
const framePhotoSizes = "(max-width: 1680px) 42vw, 570px";

export function Chapters() {
  return (
    <section id="services" className="chap" aria-labelledby="chap-heading">
      <ChapterSequence>
        <h2 id="chap-heading" className="chap-heading">
          The Protection <span>We Provide</span>
        </h2>
        <div className="chap-mobile">
          <p className="chap-mobile-hint label">
            <span>{services.length} services</span>
            <span><ArrowLeftRight size={14} aria-hidden="true" /> Swipe to explore</span>
          </p>
          <ul className="chap-mobile-rail" role="list" aria-label="Security services" tabIndex={0}>
            {services.map(({ id, no, title, body, img, alt }) => (
              <li className="chap-mobile-card" key={id}>
                <div className="chap-mobile-photo">
                  <Image src={img} alt={alt} fill sizes="(max-width: 430px) calc(100vw - 68px), 360px" />
                  <span className="label" aria-hidden="true">{no} / {total}</span>
                </div>
                <div className="chap-mobile-copy">
                  <h3>{title}</h3>
                  <p>{body}</p>
                  <Link href={`/services#service-${id}`} aria-label={`View details for ${title}`}>
                    View service details <ArrowUpRight size={15} aria-hidden="true" />
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="chap-layout">
          <div className="chap-backdrops" aria-hidden="true">
            <svg className="chap-blur-filter" width="0" height="0">
              <filter id="chapter-motion-blur">
                <feGaussianBlur stdDeviation="20 5" />
              </filter>
            </svg>
            {services.map(({ id, img }) => (
              <div className="chap-backdrop" key={id}>
                <Image src={img} alt="" fill sizes="(max-width: 1680px) 50vw, 800px" />
              </div>
            ))}
          </div>
          <div className="chap-list">
            {services.map((service) => (
              <article className="chap-item" key={service.id}>
                <div className="chap-copy">
                  <p className="label chap-no">{service.no} / {total} · {service.short}</p>
                  <h3 className="chap-title">{service.title}</h3>
                  <p className="chap-body">{service.body}</p>
                  <dl className="chap-details">
                    {service.rows.map(([label, value]) => (
                      <div key={label}><dt className="label">{label}</dt><dd>{value}</dd></div>
                    ))}
                  </dl>
                  <ul className="chap-tags label" role="list">
                    {service.tags.map((tag) => <li key={tag}>{tag}</li>)}
                  </ul>
                </div>
                <figure className="chap-inline-media">
                  <figcaption className="chap-statement"><strong>{service.chapter.emphasis}</strong> {service.chapter.heading}</figcaption>
                  <div className="chap-inline-photo">
                    <Image src={service.img} alt={service.alt} fill sizes="(max-width: 960px) 92vw, 760px" />
                  </div>
                </figure>
              </article>
            ))}
          </div>
          <div className="chap-frame">
            <div className="chap-statements">
              {services.map(({ id, chapter }) => (
                <p className="chap-statement chap-frame-title" key={id}><strong>{chapter.emphasis}</strong> {chapter.heading}</p>
              ))}
            </div>
            <div className="chap-window" aria-hidden="true">
              {services.map((service) => (
                <div className="chap-layer" key={service.id}>
                  <Image src={service.img} alt="" fill sizes={framePhotoSizes} />
                  <div className="chap-caption label">
                    <span>{service.short}</span>
                    <span>{service.no} / {total}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ChapterSequence>
    </section>
  );
}
