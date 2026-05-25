"use client";

import { Button } from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4">
      <h2 className="font-display text-2xl text-nfs-heat">Algo falló en la pista</h2>
      <p className="text-sm text-nfs-chrome">{error.message}</p>
      <Button onClick={reset}>Reintentar</Button>
    </section>
  );
}
