"use client";

import { useState } from "react";
import type { GamePageContent } from "@/content/games/game-page-content";

type Props = {
  requirements: GamePageContent["systemRequirements"];
};

function SpecColumn({
  title,
  rows,
}: {
  title: string;
  rows: GamePageContent["systemRequirements"]["minimum"];
}) {
  return (
    <div>
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-white">
        {title}
      </h3>
      <dl className="space-y-3">
        {rows.map((row) => (
          <div key={row.label}>
            <dt className="text-xs font-medium text-white/90">{row.label}</dt>
            <dd className="mt-0.5 text-xs leading-relaxed text-white/65">{row.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function GameSystemRequirements({ requirements }: Props) {
  const [expanded, setExpanded] = useState(true);

  return (
    <section className="border border-white/10 bg-[#111820]">
      <h2 className="border-b border-white/10 px-5 py-4 text-xl font-semibold text-white">
        {requirements.title}
      </h2>

      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="flex w-full items-center justify-between border-b border-white/10 px-5 py-3 text-left text-sm font-medium text-white hover:bg-white/5"
        aria-expanded={expanded}
      >
        <span className="flex items-center gap-2">
          <span className="text-white/70" aria-hidden>
            ⊞
          </span>
          {requirements.osLabel}
        </span>
        <span aria-hidden>{expanded ? "▴" : "▾"}</span>
      </button>

      {expanded ? (
        <div className="grid gap-6 px-5 py-5 sm:grid-cols-2">
          <SpecColumn title="Mínimos" rows={requirements.minimum} />
          <SpecColumn title="Recomendados" rows={requirements.recommended} />
        </div>
      ) : null}
    </section>
  );
}
