import { MOCK_LEADERBOARD } from "@/features/leaderboard/data/mockLeaderboard";

export function LeaderboardTable() {
  return (
    <div className="overflow-x-auto rounded-lg border border-white/10">
      <table className="w-full text-left text-sm">
        <thead className="bg-white/5 text-nfs-chrome">
          <tr>
            <th className="px-4 py-3">#</th>
            <th className="px-4 py-3">Piloto</th>
            <th className="px-4 py-3">Coche</th>
            <th className="px-4 py-3">Tiempo</th>
          </tr>
        </thead>
        <tbody>
          {MOCK_LEADERBOARD.map((entry) => (
            <tr key={entry.rank} className="border-t border-white/10">
              <td className="px-4 py-3 font-display text-nfs-neon">{entry.rank}</td>
              <td className="px-4 py-3">{entry.pilot}</td>
              <td className="px-4 py-3">{entry.car}</td>
              <td className="px-4 py-3">{entry.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
