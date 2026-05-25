import { describe, expect, it } from "vitest";
import { getCarBySlug, getCars } from "@/features/cars/services/carService";

describe("carService", () => {
  it("returns all cars", async () => {
    const cars = await getCars();
    expect(cars.length).toBeGreaterThan(0);
  });

  it("finds car by slug", async () => {
    const car = await getCarBySlug("porsche-911-gt3");
    expect(car?.name).toContain("Porsche");
  });
});
