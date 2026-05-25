import type { Metadata } from "next";
import { LeaderboardTable } from "@/features/leaderboard/components/LeaderboardTable";

export const metadata: Metadata = {
  title: "Clasificación",
  description: "Ranking global de pilotos y tiempos récord.",
};

export default function LeaderboardPage() {
  return (
    <section className="container mx-auto px-4 py-16">
      <h1 className="font-display text-4xl mb-8">Clasificación</h1>
      <LeaderboardTable />
    </section>
  );
}
