import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  computeQuote,
  formatUsd,
  needOptions,
  timelineOptions,
  type NeedKey,
  type TimelineKey,
} from "@/lib/quote";

const ADMIN_EMAIL = process.env.ADMIN_NOTIFICATION_EMAIL || "hey@creativernso.co";
const FROM_EMAIL = process.env.FROM_EMAIL || "Ernso Azor <hello@creativernso.co>";

const worldLabels: Record<string, string> = {
  Institutional: "Institutional : Corporations & Organizations",
  Authority: "Individual : Professionals & Experts",
  Creative: "Creative : Artists, Creators & Public Figures",
};

export async function POST(req: Request) {
  const body = await req.json();
  const { world, needs, timeline, name, email, company } = body as {
    world: string;
    needs: NeedKey[];
    timeline: TimelineKey;
    name: string;
    email: string;
    company?: string;
  };

  if (!name || !email || !Array.isArray(needs) || needs.length === 0 || !timeline) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const { low, high } = computeQuote(needs, timeline);
  const selectedNeeds = needOptions.filter((n) => needs.includes(n.key));
  const timelineLabel =
    timelineOptions.find((t) => t.key === timeline)?.label ?? timeline;

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: "Email service not configured" },
      { status: 503 }
    );
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const needsListHtml = selectedNeeds
    .map((n) => `<li>${n.label} : ${n.desc}</li>`)
    .join("");

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: "Your brand investment estimate",
      html: `
        <div style="font-family: -apple-system, sans-serif; max-width: 560px; margin: 0 auto; color: #151516;">
          <h1 style="font-size: 22px; margin-bottom: 4px;">Hi ${name},</h1>
          <p style="font-size: 15px; line-height: 1.6; color: #35373A;">
            Thanks for sharing where you're headed. Based on your answers, here is your estimated investment range:
          </p>
          <p style="font-size: 32px; font-weight: 700; margin: 24px 0;">
            ${formatUsd(low)} &ndash; ${formatUsd(high)}
          </p>
          <p style="font-size: 14px; color: #807A70;">What's included</p>
          <ul style="font-size: 14px; line-height: 1.8; color: #35373A;">${needsListHtml}</ul>
          <p style="font-size: 14px; color: #807A70; margin-top: 16px;">
            Timeline : ${timelineLabel}
          </p>
          <p style="font-size: 15px; line-height: 1.6; color: #35373A; margin-top: 24px;">
            This is a starting estimate, not a final invoice. Reply directly to this email
            and we'll refine it into a full proposal built around your brand.
          </p>
          <p style="font-size: 15px; margin-top: 32px;">Ernso Azor</p>
        </div>
      `,
    });

    await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      replyTo: email,
      subject: `New lead : ${name}${company ? ` (${company})` : ""}`,
      html: `
        <div style="font-family: -apple-system, sans-serif; max-width: 560px;">
          <h2>New Initiate submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${company ? `<p><strong>Company:</strong> ${company}</p>` : ""}
          <p><strong>World:</strong> ${worldLabels[world] ?? world}</p>
          <p><strong>Needs:</strong> ${selectedNeeds.map((n) => n.label).join(", ")}</p>
          <p><strong>Timeline:</strong> ${timelineLabel}</p>
          <p><strong>Estimated range:</strong> ${formatUsd(low)} &ndash; ${formatUsd(high)}</p>
        </div>
      `,
    });

    return NextResponse.json({ low, high });
  } catch (err) {
    console.error("Failed to send quote email", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
