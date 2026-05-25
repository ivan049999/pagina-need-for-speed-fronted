import { NextResponse } from "next/server";
import { getCarBySlug } from "@/features/cars/services/carService";

type Params = { params: Promise<{ slug: string }> };

export async function GET(_request: Request, { params }: Params) {
  const { slug } = await params;
  const car = await getCarBySlug(slug);
  if (!car) {
    return NextResponse.json({ error: "Coche no encontrado" }, { status: 404 });
  }
  return NextResponse.json(car);
}
