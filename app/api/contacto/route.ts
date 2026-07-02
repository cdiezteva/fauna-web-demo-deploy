import { NextResponse } from "next/server";
import { Resend } from "resend";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const { email } = await request.json().catch(() => ({ email: undefined }));

  if (typeof email !== "string" || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const { error } = await resend.emails.send({
    from: "AVIZOR Fauna <onboarding@resend.dev>",
    to: [email],
    subject: "correo de prueba de solicitud de información de avizor fauna",
    text: "Este es un correo de prueba de solicitud de información de AVIZOR Fauna.",
  });

  if (error) {
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
