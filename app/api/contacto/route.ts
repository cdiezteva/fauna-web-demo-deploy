import { NextResponse } from "next/server";
import { Resend } from "resend";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const { email, name, party, interest } = body as {
    email?: string;
    name?: string;
    party?: string;
    interest?: string;
  };

  if (typeof email !== "string" || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const details = [
    `Nombre y entidad: ${name?.trim() || "—"}`,
    `Tipo de interesado: ${party?.trim() || "—"}`,
    `Email: ${email}`,
    "",
    "Información solicitada y finalidad:",
    interest?.trim() || "—",
  ].join("\n");

  const { error } = await resend.emails.send({
    from: "AVIZOR Fauna <onboarding@resend.dev>",
    to: [email],
    subject: "Solicitud de información de AVIZOR Fauna",
    text: `Se ha recibido una solicitud de información de AVIZOR Fauna.\n\n${details}`,
  });

  if (error) {
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
