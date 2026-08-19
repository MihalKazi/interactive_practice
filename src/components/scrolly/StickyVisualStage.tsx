import { Button } from "@/components/ui/Button";
import { VisualCaption } from "@/components/scrolly/VisualCaption";

export function StickyVisualStage({
  title,
  source,
  caption,
  children,
  hideHeader = false,
}: {
  title: string;
  source: string;
  caption?: React.ReactNode;
  children: React.ReactNode;
  hideHeader?: boolean;
}) {
  return (
    <figure className="scrolly-stage">
      {hideHeader ? null : (
        <figcaption className="flex flex-wrap items-start justify-between gap-3">
          <span>
            <span className="block text-lg font-semibold">{title}</span>
            <span className="mt-1 block font-mono text-xs uppercase tracking-[0.12em] text-[var(--muted)]">{source}</span>
          </span>
          <Button href="#methodology" variant="ghost" className="min-h-9 px-3 py-1 text-xs">
            Methodology
          </Button>
        </figcaption>
      )}
      <div className={hideHeader ? "lg:min-h-[32rem]" : "mt-5 lg:min-h-[32rem]"}>{children}</div>
      {caption ? <VisualCaption>{caption}</VisualCaption> : null}
    </figure>
  );
}
