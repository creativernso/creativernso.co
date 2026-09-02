import { NextResponse } from "next/server";
import { Resend } from "resend";

const ADMIN_EMAIL = process.env.ADMIN_NOTIFICATION_EMAIL || "hey@creativernso.co";
const FROM_EMAIL = process.env.FROM_EMAIL || "Ernso Azor <hello@creativernso.co>";

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

type BriefPayload = {
  profile: string;
  profileLabel: string;
  nameOrOrg: string;
  services: string[];
  serviceLabels: string[];
  description: string;
  timeline: string;
  timelineLabel: string;
  budget: string;
  budgetLabel: string;
  name: string;
  email: string;
};

export async function POST(req: Request) {
  const body = await req.json();
  const {
    profileLabel,
    nameOrOrg,
    serviceLabels,
    description,
    timelineLabel,
    budgetLabel,
    name,
    email,
  } = body as Partial<BriefPayload>;

  if (
    !profileLabel ||
    !nameOrOrg ||
    !serviceLabels?.length ||
    !description ||
    !timelineLabel ||
    !budgetLabel ||
    !name ||
    !email
  ) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: "Email service not configured" },
      { status: 503 }
    );
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const servicesText = serviceLabels.join(", ");
  const receivedAt = new Date().toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  try {
    const clientResult = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      replyTo: ADMIN_EMAIL,
      subject: "Your brief has been received — Ernso Azor",
      html: `
        <div style="font-family: -apple-system, sans-serif; max-width: 560px; margin: 0 auto; color: #151516;">
          <p style="font-size: 15px; line-height: 1.6;">${escapeHtml(name)},</p>
          <p style="font-size: 15px; line-height: 1.6;">Thank you for reaching out.</p>
          <p style="font-size: 15px; line-height: 1.6;">Your brief has been received and I will review it carefully.</p>
          <p style="font-size: 15px; line-height: 1.6; margin-bottom: 4px;">Here is a summary of what you shared:</p>
          <ul style="font-size: 14.5px; line-height: 1.9; color: #35373A; padding-left: 18px; margin-top: 8px;">
            <li><strong>Profile:</strong> ${escapeHtml(profileLabel)}</li>
            <li><strong>Services of interest:</strong> ${escapeHtml(servicesText)}</li>
            <li><strong>Project description:</strong> ${escapeHtml(description)}</li>
            <li><strong>Timeline:</strong> ${escapeHtml(timelineLabel)}</li>
            <li><strong>Budget range:</strong> ${escapeHtml(budgetLabel)}</li>
          </ul>
          <p style="font-size: 15px; line-height: 1.6;">I will be in touch within 48 hours with my thoughts and next steps.</p>
          <p style="font-size: 15px; line-height: 1.6;">In the meantime, feel free to explore my work at <a href="https://creativernso.co" style="color: #151516;">creativernso.co</a></p>
          <p style="font-size: 15px; line-height: 1.6; margin-top: 28px;">
            — Ernso Azor<br />
            Brand Designer &amp; Strategist<br />
            @creativernso<br />
            hey@creativernso.co
          </p>
        </div>
      `,
    });

    if (clientResult.error) {
      console.error("Failed to send client confirmation", clientResult.error);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    const adminResult = await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      replyTo: email,
      subject: `New Brief Received — ${name} — ${profileLabel}`,
      html: `
        <div style="font-family: -apple-system, sans-serif; max-width: 560px; margin: 0 auto; color: #151516;">
          <p style="font-size: 15px; line-height: 1.6;">New project brief received via the Initiate page.</p>
          <p style="font-size: 14.5px; line-height: 1.9;">
            <strong>CLIENT PROFILE:</strong> ${escapeHtml(profileLabel)}<br />
            <strong>NAME / ORGANIZATION:</strong> ${escapeHtml(nameOrOrg)}<br />
            <strong>SERVICES REQUESTED:</strong> ${escapeHtml(servicesText)}<br />
            <strong>PROJECT DESCRIPTION:</strong> ${escapeHtml(description)}<br />
            <strong>TIMELINE:</strong> ${escapeHtml(timelineLabel)}<br />
            <strong>BUDGET RANGE:</strong> ${escapeHtml(budgetLabel)}<br />
            <strong>EMAIL:</strong> ${escapeHtml(email)}<br />
            <strong>NAME:</strong> ${escapeHtml(name)}
          </p>
          <p style="font-size: 13px; color: #807A70; margin-top: 24px;">Received on: ${escapeHtml(receivedAt)}</p>
        </div>
      `,
    });

    if (adminResult.error) {
      console.error("Failed to send admin notification", adminResult.error);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Failed to send brief email", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
