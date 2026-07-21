export function ChapterTransition({
  number,
  label,
  statement,
  dark = false,
}: {
  number: string;
  label: string;
  statement: string;
  dark?: boolean;
}) {
  return (
    <section className={`chapter-transition ${dark ? "dark-chapter" : ""}`}>
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12">
        <p className="font-serif text-8xl text-[var(--accent)]">{number}</p>
        <p className="eyebrow mt-4 text-[var(--muted)]">{label}</p>
        <h2 className="mt-5 max-w-4xl font-serif text-4xl leading-tight sm:text-6xl">{statement}</h2>
      </div>
    </section>
  );
}
