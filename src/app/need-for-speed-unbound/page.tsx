import type { Metadata } from "next";
import { UnboundCollection } from "@/components/unbound/UnboundCollection";
import { UnboundFeatures } from "@/components/unbound/UnboundFeatures";
import { UnboundHero } from "@/components/unbound/UnboundHero";
import { UnboundNews } from "@/components/unbound/UnboundNews";
import { UnboundSpotlight } from "@/components/unbound/UnboundSpotlight";

export const metadata: Metadata = {
  title: "Need for Speed™ Unbound",
  description:
    "Carreras callejeras con estilo graffiti en Lakeshore. Colección definitiva, pases de velocidad y noticias.",
};

export default function NeedForSpeedUnboundPage() {
  return (
    <>
      <UnboundHero />
      <UnboundSpotlight />
      <UnboundCollection />
      <UnboundFeatures />
      <UnboundNews />
    </>
  );
}
