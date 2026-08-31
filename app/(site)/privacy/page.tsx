export const metadata = {
  title: "Privacy Policy — Ernso Azor",
  description: "How Ernso Azor collects, uses, and protects your information.",
};

export default function PrivacyPage() {
  return (
    <section
      data-theme="dark"
      className="relative min-h-screen py-10 text-bone md:py-14"
    >
      <div className="mx-auto max-w-[760px] px-6 md:px-12">
        <h1 className="font-display text-bone text-[clamp(32px,5vw,64px)] font-bold leading-[1.05] tracking-[-0.04em]">
          Privacy Policy
        </h1>
        <p className="mt-3 text-[13px] text-muted-2">
          Last updated: August 31, 2026
        </p>

        <div className="mt-10 space-y-9 text-[15px] leading-[1.7] text-muted-2 md:text-[16px]">
          <p>
            This policy explains what information creativernso.co (&ldquo;this
            site,&rdquo; &ldquo;I,&rdquo; or &ldquo;me&rdquo;) collects, how it
            is used, and the choices you have. I am Ernso Azor, a brand
            designer and strategist based in Curitiba, Brazil, and this site
            is my personal portfolio and contact point.
          </p>

          <div>
            <h2 className="font-display text-bone text-[19px] font-bold tracking-[-0.02em] md:text-[21px]">
              1. Information I collect
            </h2>
            <p className="mt-3">
              The only personal information this site collects is what you
              choose to submit through the Initiate contact form: your name,
              email address, brand or product name, estimated timeline and
              budget, how you found me, and a description of your project.
              If you email or message me directly instead, I receive whatever
              information you include in that message.
            </p>
            <p className="mt-3">
              This site does not use cookies, analytics, or advertising
              trackers. No account creation, payment information, or browsing
              behaviour is collected at any point.
            </p>
          </div>

          <div>
            <h2 className="font-display text-bone text-[19px] font-bold tracking-[-0.02em] md:text-[21px]">
              2. How I use your information
            </h2>
            <p className="mt-3">
              Information submitted through the contact form is used solely
              to respond to your inquiry, understand your project, and
              follow up about a potential collaboration. I do not sell, rent,
              or share your information with third parties for marketing
              purposes.
            </p>
          </div>

          <div>
            <h2 className="font-display text-bone text-[19px] font-bold tracking-[-0.02em] md:text-[21px]">
              3. Third-party services
            </h2>
            <p className="mt-3">
              Form submissions are delivered using Resend, an email
              infrastructure provider, which processes the message on its
              way to my inbox. This site&rsquo;s content (project imagery and
              text) is managed through Sanity, a headless CMS; Sanity does
              not receive or process any information you submit.
            </p>
          </div>

          <div>
            <h2 className="font-display text-bone text-[19px] font-bold tracking-[-0.02em] md:text-[21px]">
              4. Data retention
            </h2>
            <p className="mt-3">
              I keep correspondence and project inquiries for as long as
              reasonably needed for business and record-keeping purposes,
              or until you ask me to delete it.
            </p>
          </div>

          <div>
            <h2 className="font-display text-bone text-[19px] font-bold tracking-[-0.02em] md:text-[21px]">
              5. Your rights
            </h2>
            <p className="mt-3">
              You can ask me at any time to access, correct, or delete the
              information I hold about you by emailing{" "}
              <a
                href="mailto:hey@creativernso.co"
                className="text-bone underline underline-offset-2 hover:text-gold"
              >
                hey@creativernso.co
              </a>
              . I will respond within a reasonable timeframe.
            </p>
          </div>

          <div>
            <h2 className="font-display text-bone text-[19px] font-bold tracking-[-0.02em] md:text-[21px]">
              6. Children&rsquo;s privacy
            </h2>
            <p className="mt-3">
              This site is not directed at children, and I do not knowingly
              collect information from anyone under the age of 16.
            </p>
          </div>

          <div>
            <h2 className="font-display text-bone text-[19px] font-bold tracking-[-0.02em] md:text-[21px]">
              7. Changes to this policy
            </h2>
            <p className="mt-3">
              If this policy changes, the update will be posted on this page
              with a revised date at the top.
            </p>
          </div>

          <div>
            <h2 className="font-display text-bone text-[19px] font-bold tracking-[-0.02em] md:text-[21px]">
              8. Contact
            </h2>
            <p className="mt-3">
              Questions about this policy can be sent to{" "}
              <a
                href="mailto:hey@creativernso.co"
                className="text-bone underline underline-offset-2 hover:text-gold"
              >
                hey@creativernso.co
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
