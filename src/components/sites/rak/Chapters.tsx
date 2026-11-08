import Image from "next/image";
import { ChapterSequence } from "./ChapterSequence";
import { services } from "./content";

const total = String(services.length).padStart(2, "0");
const framePhotoSizes = "(max-width: 1680px) 36vw, 505px";

export function Chapters() {
  return (
    <section id="services" className="chap" aria-labelledby="chap-heading">
      <ChapterSequence>
        <h2 id="chap-heading" className="chap-heading">
          The Protection <span>We Provide</span>
        </h2>
        <div className="chap-layout">
          <div className="chap-list">
            {services.map((service) => (
              <article className="chap-item" key={service.id}>
                <div className="chap-inline-photo">
                  <Image src={service.img} alt={service.alt} fill sizes="(max-width: 960px) 92vw, 760px" />
                </div>
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
              </article>
            ))}
          </div>
          <div className="chap-frame" aria-hidden="true">
            <svg className="chap-blur-filter" width="0" height="0">
              <filter id="chapter-motion-blur">
                <feGaussianBlur stdDeviation="20 5" />
              </filter>
            </svg>
            <div className="chap-backdrops">
              {services.map(({ id, img }) => (
                <div className="chap-backdrop" key={id}>
                  <Image src={img} alt="" fill sizes={framePhotoSizes} />
                </div>
              ))}
            </div>
            {services.map(({ id, chapter }) => (
              <p className="chap-frame-title" key={id}><strong>{chapter.emphasis}</strong> {chapter.heading}</p>
            ))}
            <div className="chap-mat">
              <div className="chap-window">
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
        </div>
      </ChapterSequence>
    </section>
  );
}
