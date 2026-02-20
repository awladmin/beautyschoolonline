import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `${siteConfig.name} terms of service — the conditions for using our website and courses.`,
};

export default function TermsPage() {
  return (
    <section className="py-16 sm:py-24">
      <article className="prose prose-gray mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1>Terms of Service</h1>
        <p className="text-sm text-muted-foreground">
          Last updated: 20 February 2026
        </p>

        <h2>1. About these terms</h2>
        <p>
          These terms of service (&quot;Terms&quot;) govern your use of the{" "}
          {siteConfig.name} website at <Link href="/">{siteConfig.url}</Link>{" "}
          and any courses or services we provide. By using our website, you
          agree to these Terms.
        </p>

        <h2>2. Our services</h2>
        <p>
          {siteConfig.name} provides online beauty skills courses designed to
          align with the Duke of Edinburgh (DofE) Skills section. Our courses
          include video lessons, guided tasks, evidence submission, and
          assessor feedback.
        </p>
        <p>
          We are not an Approved Activity Provider (AAP) for the DofE. Our
          courses are independently designed to align with DofE Skills section
          requirements. You should always confirm suitability with your DofE
          Leader before enrolling.
        </p>

        <h2>3. Eligibility</h2>
        <p>
          Our courses are designed for young people aged 14 and over. If you
          are under 18, you should have the consent of a parent or guardian
          before using our services. By enrolling, you confirm that you meet
          the age requirements for your chosen course level.
        </p>

        <h2>4. Account responsibilities</h2>
        <p>
          When the learner portal becomes available, you will be responsible
          for maintaining the confidentiality of your account credentials and
          for all activity under your account.
        </p>

        <h2>5. Course content and intellectual property</h2>
        <p>
          All course content — including videos, written materials, and
          graphics — is owned by {siteConfig.legalEntityName} and is protected
          by copyright. You may not copy, distribute, or share course content
          without our written permission.
        </p>

        <h2>6. Evidence and submissions</h2>
        <p>
          You retain ownership of any photos, videos, and reflections you
          submit as course evidence. By submitting evidence, you grant us
          permission to use it for the purpose of providing assessor feedback
          and generating completion reports.
        </p>

        <h2>7. Payments and refunds</h2>
        <p>
          Course fees are payable at the time of enrolment. If you are
          dissatisfied with your course, please contact us within 14 days of
          enrolment. We will review refund requests on a case-by-case basis in
          line with UK consumer rights legislation.
        </p>

        <h2>8. Limitation of liability</h2>
        <p>
          We take reasonable care to ensure our course content is accurate and
          safe. However, we do not guarantee specific outcomes, including DofE
          award completion. Our liability is limited to the course fee you have
          paid.
        </p>

        <h2>9. Changes to these terms</h2>
        <p>
          We may update these Terms from time to time. We will notify
          registered users of significant changes. Your continued use of the
          website after changes are published constitutes acceptance of the
          updated Terms.
        </p>

        <h2>10. Governing law</h2>
        <p>
          These Terms are governed by the laws of England and Wales. Any
          disputes will be subject to the exclusive jurisdiction of the courts
          of England and Wales.
        </p>

        <h2>11. Contact us</h2>
        <p>
          If you have any questions about these Terms, please contact us at{" "}
          <a href={`mailto:${siteConfig.supportEmail}`}>
            {siteConfig.supportEmail}
          </a>
          .
        </p>
      </article>
    </section>
  );
}
