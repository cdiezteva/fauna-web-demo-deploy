"use client";

import { useState } from "react";
import SectionLabel from "./SectionLabel";
import Reveal from "./Reveal";
import { contact } from "@/lib/content";
import { useI18n } from "@/lib/i18n";

const inputClass =
  "font-sans text-[15px] text-ink px-3.5 py-2.5 border border-[#d3d9d8] rounded-md bg-[#fafbfb] focus:outline-none focus:border-brand transition-colors";

export default function Contacto() {
  const { t } = useI18n();
  const c = t.contacto;
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);

  return (
    <section id="contacto" className="scroll-mt-[74px] bg-mist border-t border-line">
      <div className="max-w-[1220px] mx-auto px-5 md:px-11 py-16 md:py-[120px]">
        <div className="flex gap-10 md:gap-16 flex-wrap items-start md:items-stretch">
          <Reveal className="flex-[1_1_360px] min-w-[280px]">
            <SectionLabel num="06" label={c.label} />
            <h2 className="font-display font-bold text-[26px] md:text-[42px] leading-[1.06] tracking-[-.02em] mb-5 balance">
              {c.title}
            </h2>
            <p className="text-base leading-relaxed text-[#4a5257] max-w-[440px] mb-8">
              {c.subtitle}
            </p>
            <div className="font-mono text-[13px] tracking-[.14em] uppercase text-brand mb-3">
              {c.reachOut}
            </div>
            <div className="flex flex-col gap-4 mb-8">
              <div className="flex flex-col gap-1 border-t border-[#d3d9d8] pt-3.5">
                <span className="font-mono text-[11px] tracking-[.1em] uppercase text-[#8a9291]">
                  {c.phoneLabel}
                </span>
                <a href={`tel:${contact.phoneHref}`} className="text-base text-ink no-underline hover:text-brand">
                  {contact.phone}
                </a>
              </div>
              <div className="flex flex-col gap-1 border-t border-[#d3d9d8] pt-3.5">
                <span className="font-mono text-[11px] tracking-[.1em] uppercase text-[#8a9291]">
                  {c.emailLabel}
                </span>
                <a href={`mailto:${contact.email}`} className="text-base text-ink no-underline hover:text-brand break-all">
                  {contact.email}
                </a>
              </div>
              <div className="flex flex-col gap-1 border-t border-[#d3d9d8] pt-3.5">
                <span className="font-mono text-[11px] tracking-[.1em] uppercase text-[#8a9291]">
                  {c.addressLabel}
                </span>
                <span className="text-base text-ink">{contact.address}</span>
              </div>
            </div>
          </Reveal>

          <Reveal className="flex-[1_1_420px] min-w-[280px] md:flex md:flex-col" delay={100}>
            {sent ? (
              <div className="bg-white border border-[#cfe0d7] rounded-xl p-8 md:p-11 text-center">
                <div className="w-[52px] h-[52px] rounded-full bg-brand-light flex items-center justify-center mx-auto mb-5 text-brand text-2xl">
                  ✓
                </div>
                <h3 className="font-display font-bold text-xl mb-2.5">{c.sentTitle}</h3>
                <p className="text-[15px] leading-relaxed text-[#4a5257] m-0">
                  {c.sentBody}
                </p>
              </div>
            ) : (
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const form = e.currentTarget;
                  const data = new FormData(form);
                  const email = String(data.get("email") ?? "").trim();
                  const name = String(data.get("name") ?? "").trim();
                  const party = String(data.get("party") ?? "").trim();
                  const interest = String(data.get("interest") ?? "").trim();

                  setError(false);
                  setSending(true);
                  try {
                    // Web3Forms se llama directamente desde el navegador: su
                    // access key es pública, y su API solo acepta peticiones
                    // como FormData (como un <form> normal) — un cuerpo JSON
                    // dispara un preflight CORS que Web3Forms no responde.
                    const fd = new FormData();
                    fd.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "");
                    fd.append("subject", `${name} requiere de más información a través de la web de AVIZOR Fauna`);
                    fd.append("from_name", "AVIZOR Fauna · Formulario web");
                    fd.append("email", email);
                    fd.append("Nombre", name);
                    fd.append("Tipo de interesado", party);
                    fd.append("Información solicitada y finalidad", interest);

                    const res = await fetch("https://api.web3forms.com/submit", {
                      method: "POST",
                      body: fd,
                    });
                    const result = await res.json().catch(() => ({}));
                    if (!res.ok || !result.success) throw new Error("send_failed");
                    setSent(true);
                  } catch {
                    setError(true);
                  } finally {
                    setSending(false);
                  }
                }}
                className="bg-white border border-[#dde2e1] rounded-xl p-6 md:p-9 flex flex-col gap-6 md:flex-1 w-full"
              >
                <div>
                  <h3 className="font-display font-bold text-xl mb-2">{c.formTitle}</h3>
                  <p className="text-sm leading-relaxed text-[#6b7378] m-0">{c.formBody}</p>
                </div>

                <ul className="flex flex-col gap-2.5">
                  {c.perks.map((p) => (
                    <li key={p} className="text-sm text-[#3d454a] flex items-center gap-2.5">
                      <span className="flex-none w-5 h-5 rounded-full bg-brand text-white flex items-center justify-center text-[10px] font-bold leading-none">
                        ✓
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-[#3d454a]" htmlFor="name">
                    {c.fName}
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="organization"
                    required
                    disabled={sending}
                    placeholder={c.pName}
                    className={`${inputClass} w-full`}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-[#3d454a]" htmlFor="party">
                    {c.fParty}
                  </label>
                  <select
                    id="party"
                    name="party"
                    required
                    disabled={sending}
                    defaultValue=""
                    className={`${inputClass} w-full cursor-pointer`}
                  >
                    <option value="" disabled>
                      —
                    </option>
                    {c.partyOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-[#3d454a]" htmlFor="email">
                    {c.fEmail}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    disabled={sending}
                    placeholder={c.pEmail}
                    className={`${inputClass} w-full`}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-[#3d454a]" htmlFor="interest">
                    {c.fInterest}
                  </label>
                  <textarea
                    id="interest"
                    name="interest"
                    rows={4}
                    required
                    disabled={sending}
                    placeholder={c.pInterest}
                    className={`${inputClass} w-full resize-y min-h-[96px]`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="inline-flex items-center justify-center gap-2 text-[15px] font-semibold text-white bg-brand hover:bg-brand-dark transition-colors border-none rounded-md px-5 py-3 cursor-pointer disabled:opacity-60 disabled:cursor-wait"
                >
                  {sending ? c.sending : c.submit}
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </button>

                {error && (
                  <p className="text-xs leading-relaxed text-red-600 m-0">
                    {c.error}
                  </p>
                )}

                <p className="text-xs leading-relaxed text-[#8a9291] m-0 md:mt-auto">
                  {c.privacy}
                </p>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
