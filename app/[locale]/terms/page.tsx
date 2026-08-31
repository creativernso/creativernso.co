export const metadata = {
  title: "Terms of Service — Ernso Azor",
  description: "The terms governing use of the creativernso.co website.",
};

export default function TermsPage() {
  return (
    <section
      data-theme="dark"
      className="relative min-h-screen py-10 text-bone md:py-14"
    >
      <div className="mx-auto max-w-[760px] px-6 md:px-12">
        <h1 className="font-display text-bone text-[clamp(32px,5vw,64px)] font-bold leading-[1.05] tracking-[-0.04em]">
          Terms of Service
        </h1>
        <p className="mt-3 text-[13px] text-muted-2">
          Last updated: August 31, 2026
        </p>

        <div className="mt-10 space-y-9 text-[15px] leading-[1.7] text-muted-2 md:text-[16px]">
          <p>
            These terms govern your use of creativernso.co (&ldquo;this
            site&rdquo;), the personal portfolio of Ernso Azor, a brand
            designer and strategist based in Curitiba, Brazil. By browsing
            this site or submitting the contact form, you agree to the
            terms below.
          </p>

          <div>
            <h2 className="font-display text-bone text-[19px] font-bold tracking-[-0.02em] md:text-[21px]">
              1. About this site
            </h2>
            <p className="mt-3">
              This site is informational: it presents my work, background,
              and a way to get in touch. It does not process payments,
              create accounts, or sell products. Any paid design or
              strategy engagement is agreed separately, directly with me,
              and is governed by the terms of that specific agreement, not
              by this page.
            </p>
          </div>

          <div>
            <h2 className="font-display text-bone text-[19px] font-bold tracking-[-0.02em] md:text-[21px]">
              2. Intellectual property
            </h2>
            <p className="mt-3">
              Unless otherwise noted, all content on this site, including
              text, visuals, and project case studies, is the property of
              Ernso Azor or the respective clients featured, and is
              protected by copyright. Project work shown here is displayed
              with permission as a representation of past work. Nothing on
              this site may be reproduced, redistributed, or used
              commercially without prior written consent.
            </p>
          </div>

          <div>
            <h2 className="font-display text-bone text-[19px] font-bold tracking-[-0.02em] md:text-[21px]">
              3. The contact form
            </h2>
            <p className="mt-3">
              Submitting the Initiate form sends your information to me by
              email. It does not create a contract, reserve a project slot,
              or obligate either party to work together. Project scope,
              pricing, and terms are only finalized through a separate,
              explicit agreement.
            </p>
          </div>

          <div>
            <h2 className="font-display text-bone text-[19px] font-bold tracking-[-0.02em] md:text-[21px]">
              4. Acceptable use
            </h2>
            <p className="mt-3">
              You agree not to misuse this site: no attempts to disrupt its
              operation, scrape its content at scale, or use the contact
              form for spam or unrelated solicitation.
            </p>
          </div>

          <div>
            <h2 className="font-display text-bone text-[19px] font-bold tracking-[-0.02em] md:text-[21px]">
              5. No warranty
            </h2>
            <p className="mt-3">
              This site and its content are provided &ldquo;as is,&rdquo;
              without warranties of any kind. I make reasonable efforts to
              keep it accurate and available, but do not guarantee
              uninterrupted access or error-free content.
            </p>
          </div>

          <div>
            <h2 className="font-display text-bone text-[19px] font-bold tracking-[-0.02em] md:text-[21px]">
              6. Limitation of liability
            </h2>
            <p className="mt-3">
              To the fullest extent permitted by law, I am not liable for
              any indirect, incidental, or consequential damages arising
              from your use of this site.
            </p>
          </div>

          <div>
            <h2 className="font-display text-bone text-[19px] font-bold tracking-[-0.02em] md:text-[21px]">
              7. Third-party links
            </h2>
            <p className="mt-3">
              This site links to third-party platforms, including Instagram,
              LinkedIn, and Behance. I am not responsible for the content or
              privacy practices of those platforms once you leave this site.
            </p>
          </div>

          <div>
            <h2 className="font-display text-bone text-[19px] font-bold tracking-[-0.02em] md:text-[21px]">
              8. Governing law
            </h2>
            <p className="mt-3">
              These terms are governed by the laws of Brazil, without regard
              to conflict-of-law principles.
            </p>
          </div>

          <div>
            <h2 className="font-display text-bone text-[19px] font-bold tracking-[-0.02em] md:text-[21px]">
              9. Changes to these terms
            </h2>
            <p className="mt-3">
              These terms may be updated from time to time. Continued use of
              this site after a change means you accept the revised terms.
            </p>
          </div>

          <div>
            <h2 className="font-display text-bone text-[19px] font-bold tracking-[-0.02em] md:text-[21px]">
              10. Contact
            </h2>
            <p className="mt-3">
              Questions about these terms can be sent to{" "}
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
