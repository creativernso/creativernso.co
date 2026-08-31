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
  const body = await req.json();
  const {
    firstName,
    lastName,
    email,
    brandName,
    deadline,
    budget,
    source,
    description,
  } = body as Record<string, string>;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !brandName ||
    !deadline ||
    !budget ||
    !source ||
    !description
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
  const fullName = `${firstName} ${lastName}`;

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      replyTo: email,
      subject: `New project brief : ${escapeHtml(brandName)} (${escapeHtml(fullName)})`,
      html: `
        <div style="font-family: -apple-system, sans-serif; max-width: 560px;">
          <h2>New Initiate submission</h2>
          <p><strong>Name:</strong> ${escapeHtml(fullName)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Brand / product:</strong> ${escapeHtml(brandName)}</p>
          <p><strong>Estimated deadline:</strong> ${escapeHtml(deadline)}</p>
          <p><strong>Estimated budget:</strong> ${escapeHtml(budget)}</p>
          <p><strong>Found me via:</strong> ${escapeHtml(source)}</p>
          <p><strong>Project description:</strong></p>
          <p style="white-space: pre-wrap;">${escapeHtml(description)}</p>
        </div>
      `,
    });

    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: "Your brief has been received",
      html: `
        <div style="font-family: -apple-system, sans-serif; max-width: 560px; margin: 0 auto; color: #151516;">
          <h1 style="font-size: 22px; margin-bottom: 4px;">Hi ${escapeHtml(firstName)},</h1>
          <p style="font-size: 15px; line-height: 1.6; color: #35373A;">
            Thanks for sharing the details on ${escapeHtml(brandName)}. Your brief has
            been received and I'll get back to you within one to two business days
            with next steps.
          </p>
          <p style="font-size: 15px; margin-top: 32px;">Ernso Azor</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Failed to send brief email", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
