import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./PolicyPage.module.css";

export function PolicyPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="wrap">
      <article className={styles.policy}>
        <h1>{title}</h1>
        {children}
        <Link href="/contact">Contact RAK Security</Link>
      </article>
    </div>
  );
}
