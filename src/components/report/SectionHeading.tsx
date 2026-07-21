import { Badge } from "@/components/ui/Badge";

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? <Badge>{eyebrow}</Badge> : null}
      <h2 className="headline-lg mt-5 max-w-4xl font-serif text-[var(--foreground)]">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-8 text-[var(--muted)] sm:text-lg">{description}</p>
      ) : null}
    </div>
  );
}
