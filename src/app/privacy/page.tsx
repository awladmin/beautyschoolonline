import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `${siteConfig.shortName} privacy policy — how we collect, use, and protect your personal data.`,
};

export default function PrivacyPage() {
  return (
    <section className="py-16 sm:py-24">
      <article className="prose prose-gray mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1>Privacy Policy</h1>
        <p className="text-sm text-muted-foreground">
          Last updated: 20 February 2026
        </p>

        <h2>1. Who we are</h2>
        <p>
          {siteConfig.legalEntityName} (&quot;we&quot;, &quot;us&quot;,
          &quot;our&quot;) operates the website at{" "}
          <Link href="/">{siteConfig.url}</Link>. We are committed to
          protecting your personal data and respecting your privacy.
        </p>

        <h2>2. What data we collect</h2>
        <p>We may collect the following personal data:</p>
        <ul>
          <li>
            <strong>Contact information</strong> — name, email address, and any
            details you provide when contacting us.
          </li>
          <li>
            <strong>Account information</strong> — email address and password
            when you register for the learner portal (when available).
          </li>
          <li>
            <strong>Course evidence</strong> — photos, videos, and written
            reflections you submit as part of your course.
          </li>
          <li>
            <strong>Usage data</strong> — information about how you use our
            website, collected automatically via cookies and analytics tools.
          </li>
        </ul>

        <h2>3. How we use your data</h2>
        <p>We use your personal data to:</p>
        <ul>
          <li>Provide and manage your course and learner account.</li>
          <li>Deliver assessor feedback on your submitted evidence.</li>
          <li>Respond to your enquiries and provide support.</li>
          <li>
            Generate completion reports for your DofE Leader (with your
            consent).
          </li>
          <li>Improve our website and courses.</li>
        </ul>

        <h2>4. Legal basis for processing</h2>
        <p>
          We process your personal data on the basis of: your consent (e.g.
          when you submit a contact form); the performance of a contract (e.g.
          when you enrol on a course); and our legitimate interests in
          operating and improving our services.
        </p>

        <h2>5. Data sharing</h2>
        <p>
          We do not sell your personal data. We may share data with trusted
          third-party service providers who help us operate our website and
          deliver our services (e.g. hosting, email, analytics). These
          providers are required to protect your data in accordance with this
          policy.
        </p>

        <h2>6. Data retention</h2>
        <p>
          We retain your personal data only for as long as necessary to fulfil
          the purposes for which it was collected, or as required by law. Course
          evidence and completion reports are retained for a reasonable period
          after course completion to support your DofE records.
        </p>

        <h2>7. Your rights</h2>
        <p>
          Under UK data protection law (UK GDPR), you have the right to:
          access your personal data; request correction or deletion; restrict
          or object to processing; and request data portability. To exercise
          any of these rights, please contact us.
        </p>

        <h2>8. Cookies</h2>
        <p>
          Our website uses cookies to ensure it functions correctly and to
          understand how visitors use the site. You can control cookie
          preferences through your browser settings.
        </p>

        <h2>9. Children&apos;s data</h2>
        <p>
          Our courses are designed for young people aged 14 and over. Where a
          learner is under 16, we may require parental or guardian consent
          before processing their personal data. We take extra care to protect
          the data of younger learners.
        </p>

        <h2>10. Contact us</h2>
        <p>
          If you have any questions about this privacy policy or how we handle
          your personal data, please contact us at{" "}
          <a href={`mailto:${siteConfig.supportEmail}`}>
            {siteConfig.supportEmail}
          </a>
          .
        </p>
      </article>
    </section>
  );
}
