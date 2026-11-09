import type { Metadata } from "next";
import { PolicyPage } from "@/components/sites/rak/PolicyPage";

export const metadata: Metadata = { title: "Accessibility statement" };

export default function AccessibilityPage() {
  return (
    <PolicyPage title="Accessibility statement">
      <p>The website supports keyboard navigation and includes visible focus indicators. The homepage adjusts its animations when your device is set to reduce motion.</p>
      <h2>Report an issue</h2>
      <p>If you have difficulty using the site, please share the page address and what you were trying to do so we can look into it.</p>
    </PolicyPage>
  );
}
