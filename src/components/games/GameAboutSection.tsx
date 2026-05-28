import type { GamePageContent } from "@/content/games/need-for-speed-underground";

type Props = {
  about: GamePageContent["about"];
};

export function GameAboutSection({ about }: Props) {
  return (
    <section>
      <h2 className="mb-4 text-2xl font-semibold text-white">{about.title}</h2>
      <p className="mb-6 text-sm leading-relaxed text-white/80">{about.description}</p>

      <dl className="space-y-4 text-sm">
        <div>
          <dt className="mb-1 font-semibold text-white">Plataformas</dt>
          <dd className="text-white/75">{about.platforms}</dd>
        </div>
        <div>
          <dt className="mb-1 font-semibold text-white">Idiomas</dt>
          <dd className="text-white/75">{about.languages}</dd>
        </div>
        <div>
          <dt className="mb-1 font-semibold text-white">Distribuidor</dt>
          <dd className="text-white/75">{about.publisher}</dd>
        </div>
        <div>
          <dt className="mb-1 font-semibold text-white">Fecha de publicación</dt>
          <dd className="text-white/75">{about.releaseDate}</dd>
        </div>
      </dl>
    </section>
  );
}
