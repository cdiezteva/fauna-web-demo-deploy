export default function SectionLabel({
  num,
  label,
  dark = false,
}: {
  num: string;
  label: string;
  dark?: boolean;
}) {
  return (
    <div
      className={`flex items-baseline gap-3 font-mono text-[17px] tracking-[.12em] uppercase mb-6 ${
        dark ? "text-accent" : "text-brand"
      }`}
    >
      <span>{num}</span>
      <span className={dark ? "text-[#3a4441]" : "text-[#c6cccb]"}>/</span>
      <span>{label}</span>
    </div>
  );
}
