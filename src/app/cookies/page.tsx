import type { Metadata } from "next";
import { PolicyPage } from "@/components/sites/rak/PolicyPage";

export const metadata: Metadata = { title: "Cookie policy" };

export default function CookiesPage() {
  return (
    <PolicyPage title="Cookie policy">
      <h2>Browser storage</h2>
      <p>The site uses browser session storage to remember whether you have seen the opening animation. This lets the site skip the animation on later pages in the same tab.</p>
      <h2>External websites</h2>
      <p>Links to external websites, including LinkedIn, take you to services with their own privacy and cookie settings.</p>
    </PolicyPage>
  );
}
