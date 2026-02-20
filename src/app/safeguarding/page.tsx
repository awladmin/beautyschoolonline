import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Safeguarding Policy",
  description: `${siteConfig.shortName} safeguarding policy — our commitment to the safety and wellbeing of young learners.`,
};

export default function SafeguardingPage() {
  return (
    <section className="py-16 sm:py-24">
      <article className="prose prose-gray mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1>Safeguarding Policy</h1>
        <p className="text-sm text-muted-foreground">
          Last updated: 20 February 2026
        </p>

        <h2>1. Our commitment</h2>
        <p>
          {siteConfig.shortName} is committed to safeguarding and promoting the
          welfare of all young people who use our services. The safety of our
          learners is our highest priority.
        </p>

        <h2>2. Scope</h2>
        <p>
          This policy applies to all {siteConfig.shortName} staff, assessors,
          contractors, and anyone acting on our behalf. It covers all
          interactions with learners, including online course delivery,
          evidence review, and communication.
        </p>

        <h2>3. Key principles</h2>
        <ul>
          <li>
            The welfare of the child or young person is paramount in all
            decisions and actions.
          </li>
          <li>
            All young people have the right to protection from abuse and
            exploitation, regardless of age, disability, gender, racial
            heritage, religious belief, sexual orientation, or identity.
          </li>
          <li>
            We work in partnership with parents, guardians, and DofE Leaders to
            ensure the safety of learners.
          </li>
        </ul>

        <h2>4. Age-appropriate content</h2>
        <p>
          All course content is carefully designed to be age-appropriate for
          our learners (aged 14+). We only recommend beauty products and
          techniques that are safe for young people. We never include content
          that could be harmful, inappropriate, or unsuitable for our target
          age group.
        </p>

        <h2>5. Safe materials and techniques</h2>
        <p>
          Our courses only use and recommend products and techniques that are
          safe for young learners. We provide clear safety guidance in every
          lesson and encourage learners to seek adult supervision where
          appropriate, particularly when using heat-styling tools or
          unfamiliar products.
        </p>

        <h2>6. Online safety</h2>
        <p>
          We take online safety seriously. Our platform is designed with
          safeguarding in mind:
        </p>
        <ul>
          <li>
            Evidence submissions are only visible to the learner and their
            assigned assessor.
          </li>
          <li>There are no public forums, chat rooms, or social features.</li>
          <li>
            All assessor communications are professional and focused on course
            feedback.
          </li>
          <li>
            We do not request or store unnecessary personal information from
            young people.
          </li>
        </ul>

        <h2>7. Assessors</h2>
        <p>
          All assessors working with {siteConfig.shortName} are required to hold an
          enhanced DBS check (or equivalent) and to complete safeguarding
          training. Assessors are trained to recognise signs of abuse or
          concern and know how to report them appropriately.
        </p>

        <h2>8. Reporting concerns</h2>
        <p>
          If you have any safeguarding concerns about a young person using our
          services, or about the conduct of any {siteConfig.shortName} staff or
          assessor, please contact us immediately at{" "}
          <a href={`mailto:${siteConfig.supportEmail}`}>
            {siteConfig.supportEmail}
          </a>
          .
        </p>
        <p>
          We will take all concerns seriously and respond promptly. Where
          appropriate, we will refer concerns to the relevant local authority
          or statutory agency.
        </p>

        <h2>9. Review</h2>
        <p>
          This policy is reviewed regularly and updated as necessary to reflect
          best practice and any changes in legislation.
        </p>
      </article>
    </section>
  );
}
