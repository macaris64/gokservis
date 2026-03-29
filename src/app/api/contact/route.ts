import { NextRequest, NextResponse } from "next/server";

export interface ContactPayload {
  name: string;
  company?: string;
  email: string;
  subject: string;
  message: string;
}

function validatePayload(body: unknown): body is ContactPayload {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.name === "string" && b.name.trim().length > 0 &&
    typeof b.email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email) &&
    typeof b.subject === "string" && b.subject.trim().length > 0 &&
    typeof b.message === "string" && b.message.trim().length > 0
  );
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz istek gövdesi." }, { status: 400 });
  }

  if (!validatePayload(body)) {
    return NextResponse.json(
      { error: "Ad, e-posta, konu ve mesaj alanları zorunludur." },
      { status: 422 }
    );
  }

  const { name, company, email, subject, message } = body;

  /*
   * ── E-POSTA TESLİMATI ──────────────────────────────────────────────
   * Gerçek gönderim için aşağıdaki sağlayıcılardan birini kullanın:
   *
   *   • Resend   → https://resend.com   (npm i resend)
   *   • Nodemailer + SMTP
   *   • SendGrid
   *
   * Örnek (Resend):
   *   import { Resend } from "resend";
   *   const resend = new Resend(process.env.RESEND_API_KEY);
   *   await resend.emails.send({
   *     from: "iletisim@gokservis.com.tr",
   *     to: "info@gokservis.com.tr",
   *     subject: `[GökServis İletişim] ${subject}`,
   *     text: `Ad: ${name}\nŞirket: ${company ?? "-"}\nE-Posta: ${email}\n\n${message}`,
   *   });
   * ──────────────────────────────────────────────────────────────────── */

  // Development: log to console
  if (process.env.NODE_ENV === "development") {
    console.log("[GökServis İletişim Formu]", { name, company, email, subject, message });
  }

  // Notify via webhook if configured (Slack, Teams, Discord, etc.)
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: [
            `📡 *Yeni GökServis İletişim Talebi*`,
            `*Ad:* ${name}`,
            `*Şirket:* ${company ?? "-"}`,
            `*E-Posta:* ${email}`,
            `*Konu:* ${subject}`,
            `*Mesaj:*\n${message}`,
          ].join("\n"),
        }),
      });
    } catch (err) {
      console.error("[GökServis] Webhook gönderimi başarısız:", err);
    }
  }

  return NextResponse.json(
    { success: true, message: "Mesajınız alındı. En kısa sürede size dönüş yapılacak." },
    { status: 200 }
  );
}
