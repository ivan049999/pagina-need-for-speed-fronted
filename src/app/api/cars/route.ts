import { NextResponse } from "next/server";
import { getCars } from "@/features/cars/services/carService";

export async function GET() {
  const cars = await getCars();
  return NextResponse.json(cars);
}
