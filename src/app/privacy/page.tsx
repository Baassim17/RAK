import type { Metadata } from "next";
import { PolicyPage } from "@/components/sites/rak/PolicyPage";

export const metadata: Metadata = { title: "Privacy policy" };

export default function PrivacyPage() {
  return (
    <PolicyPage title="Privacy policy">
      <h2>Enquiry forms</h2>
      <p>The contact and careers forms prepare a draft from the details you enter. When you open an email draft, your email app handles the message and you choose when to send it. The website form itself does not submit your entries to a server.</p>
      <h2>Contacting us</h2>
      <p>Include the information we need to respond to your enquiry. For questions about information you have shared with RAK Security, use the contact page.</p>
    </PolicyPage>
  );
}
