import type { ReactNode } from "react";
import Image from "next/image";
import styles from "./DirectoryHero.module.css";

type DirectoryHeroProps = {
  titleId: string;
  eyebrow: string;
  title: [string, string];
  description: string;
  side?: ReactNode;
  children: ReactNode;
};

export function DirectoryHero({ titleId, eyebrow, title, description, side, children }: DirectoryHeroProps) {
  return (
    <section className={`wrap ${styles.shell}`} aria-labelledby={titleId}>
      <div className={side ? styles.hero : `${styles.hero} ${styles.centered}`}>
        <div className={styles.copy}>
          <p className={`label ${styles.eyebrow}`}>{eyebrow}</p>
          <h1 id={titleId}><span>{title[0]}</span> <span>{title[1]}</span></h1>
          <p className={styles.lead}>{description}</p>
          {children}
        </div>
        {side}
      </div>
    </section>
  );
}

export function DirectoryHeroGallery({ scenes }: { scenes: { src: string; caption: string }[] }) {
  return (
    <div className={styles.gallery} aria-hidden="true">
      {scenes.map(({ src, caption }, index) => (
        <div key={src} className={styles.scene}>
          <Image
            src={src}
            alt=""
            fill
            preload={index === 0}
            sizes={index === 0 ? "(max-width: 600px) 90vw, (max-width: 860px) 57vw, 32vw" : "(max-width: 860px) 45vw, 16vw"}
          />
          <span className="label">{caption}</span>
        </div>
      ))}
    </div>
  );
}
