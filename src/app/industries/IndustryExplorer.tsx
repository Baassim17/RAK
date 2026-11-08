"use client";

import { useState, type ReactNode } from "react";
import { industryGroups, type IndustryGroup } from "./profiles";
import styles from "./industries.module.css";

type ExplorerItem = {
  id: string;
  group: IndustryGroup;
  content: ReactNode;
};

export function IndustryExplorer({ items }: { items: ExplorerItem[] }) {
  const [selected, setSelected] = useState<IndustryGroup | "all">("all");
  const visibleCount = items.filter(({ group }) => selected === "all" || group === selected).length;

  return (
    <>
      <div className={styles.toolbar}>
        <div className={styles.filters} role="group" aria-label="Filter industries">
          <button type="button" aria-pressed={selected === "all"} onClick={() => setSelected("all")}>All industries</button>
          {industryGroups.map(({ id, label }) => (
            <button key={id} type="button" aria-pressed={selected === id} onClick={() => setSelected(id)}>{label}</button>
          ))}
        </div>
        <p className={styles.resultCount} role="status">{visibleCount} of {items.length} sectors</p>
      </div>
      <ul className={styles.cards} role="list">
        {items.map(({ id, group, content }) => (
          <li key={id} hidden={selected !== "all" && group !== selected}>{content}</li>
        ))}
      </ul>
    </>
  );
}
