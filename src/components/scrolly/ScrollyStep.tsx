export type ScrollyStepData = {
  eyebrow?: string;
  title: React.ReactNode;
  body: React.ReactNode;
};

export function ScrollyStep({
  step,
  index,
  active,
}: {
  step: ScrollyStepData;
  index: number;
  active: boolean;
}) {
  return (
    <article className={`scrolly-step ${active ? "is-active" : ""}`} data-step-index={index}>
      <p className="font-mono text-xs text-[var(--accent)] sm:text-sm">{String(index + 1).padStart(2, "0")}</p>
      {step.eyebrow ? <p className="eyebrow mt-3 text-[var(--muted)] sm:mt-4">{step.eyebrow}</p> : null}
      <h3 className="mt-2 text-lg font-semibold sm:mt-3 sm:text-2xl">{step.title}</h3>
      <div className="mt-3 space-y-3 text-sm leading-6 text-[var(--muted)] sm:mt-4 sm:space-y-4 sm:text-base sm:leading-8">
        {step.body}
      </div>
    </article>
  );
}
