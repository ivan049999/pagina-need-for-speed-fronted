"use client";

import { useCallback, useState } from "react";

export function useGarage() {
  const [savedSlugs, setSavedSlugs] = useState<string[]>([]);

  const addToGarage = useCallback((slug: string) => {
    setSavedSlugs((prev) => (prev.includes(slug) ? prev : [...prev, slug]));
  }, []);

  const removeFromGarage = useCallback((slug: string) => {
    setSavedSlugs((prev) => prev.filter((s) => s !== slug));
  }, []);

  return { savedSlugs, addToGarage, removeFromGarage };
}
