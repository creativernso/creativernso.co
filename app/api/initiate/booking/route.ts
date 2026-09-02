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

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const { uid, title, startTime, videoCallUrl } = body as {
    uid?: string | null;
    title?: string | null;
    startTime?: string | null;
    videoCallUrl?: string | null;
  };

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: "Email service not configured" },
      { status: 503 }
    );
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const receivedAt = new Date().toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
  const startTimeFormatted = startTime
    ? new Date(startTime).toLocaleString("en-US", {
        dateStyle: "full",
        timeStyle: "short",
      })
    : null;

  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: "New Discovery Call Booked — Ernso Azor",
      html: `
        <div style="font-family: -apple-system, sans-serif; max-width: 560px; margin: 0 auto; color: #151516;">
          <p style="font-size: 15px; line-height: 1.6;">A new discovery call was just booked via the Initiate page.</p>
          ${title ? `<p style="font-size: 14px; color: #35373A;"><strong>Event:</strong> ${escapeHtml(title)}</p>` : ""}
          ${startTimeFormatted ? `<p style="font-size: 14px; color: #35373A;"><strong>Scheduled for:</strong> ${escapeHtml(startTimeFormatted)}</p>` : ""}
          ${videoCallUrl ? `<p style="font-size: 14px; color: #35373A;"><strong>Video call link:</strong> <a href="${escapeHtml(videoCallUrl)}" style="color:#151516;">${escapeHtml(videoCallUrl)}</a></p>` : ""}
          ${uid ? `<p style="font-size: 13px; color: #807A70;"><strong>Booking ID:</strong> ${escapeHtml(uid)}</p>` : ""}
          <p style="font-size: 13px; color: #807A70;">Full details, including the attendee's name and email, are in your Cal.com dashboard and the confirmation email Cal.com sent automatically.</p>
          <p style="font-size: 13px; color: #807A70; margin-top: 16px;">Booked on: ${escapeHtml(receivedAt)}</p>
        </div>
      `,
    });

    if (result.error) {
      console.error("Failed to send booking notification", result.error);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Failed to send booking notification", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
