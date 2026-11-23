import { createServerFn } from "@tanstack/react-start";
import { getAllCars, createCar, updateCar, deleteCar } from "./mongodb";
import { type CarDocument } from "../types/car";

const cleanJson = <T>(val: T): T => {
  if (val === null || val === undefined) return val;
  return JSON.parse(JSON.stringify(val));
};

// Server RPC to fetch all cars from MongoDB
export const getCarsServerFn = createServerFn({ method: "GET" }).handler(async () => {
  const cars = await getAllCars();
  return cleanJson(cars);
});

// Server RPC to fetch cars specifically featured on the storefront home page
export const getHomeFeaturedCarsServerFn = createServerFn({ method: "GET" }).handler(async () => {
  const cars = await getAllCars();
  return cleanJson(cars.filter((c) => c.featuredOnHome !== false));
});

// Server RPC to create a new car in MongoDB
export const createCarServerFn = createServerFn({ method: "POST" })
  .validator((data: Omit<CarDocument, "id" | "createdAt" | "updatedAt">) => cleanJson(data))
  .handler(async ({ data }) => {
    const newCar = await createCar(data);
    return cleanJson(newCar);
  });

// Server RPC to update a car in MongoDB
export const updateCarServerFn = createServerFn({ method: "POST" })
  .validator((data: { id: string; updates: Partial<CarDocument> }) => cleanJson(data))
  .handler(async ({ data }) => {
    const updated = await updateCar(data.id, data.updates);
    return cleanJson(updated);
  });

// Server RPC to toggle featured on home page
export const toggleFeaturedHomeServerFn = createServerFn({ method: "POST" })
  .validator((data: { id: string; featuredOnHome: boolean }) => cleanJson(data))
  .handler(async ({ data }) => {
    const updated = await updateCar(data.id, { featuredOnHome: data.featuredOnHome });
    return cleanJson(updated);
  });

// Server RPC to toggle / update flash sale
export const toggleFlashSaleServerFn = createServerFn({ method: "POST" })
  .validator((data: {
    id: string;
    active: boolean;
    discountPercent?: number;
    dealPrice?: number;
    badgeText?: string;
  }) => cleanJson(data))
  .handler(async ({ data }) => {
    const updated = await updateCar(data.id, {
      flashSale: {
        active: data.active,
        discountPercent: data.discountPercent ?? 25,
        dealPrice: data.dealPrice,
        badgeText: data.badgeText ?? `${data.discountPercent ?? 25}% FLASH SALE`
      }
    });
    return cleanJson(updated);
  });

// Server RPC to delete a car from MongoDB
export const deleteCarServerFn = createServerFn({ method: "POST" })
  .validator((data: { id: string }) => cleanJson(data))
  .handler(async ({ data }) => {
    const success = await deleteCar(data.id);
    return cleanJson({ success });
  });

// Server RPC to authenticate Admin
export const loginAdminServerFn = createServerFn({ method: "POST" })
  .validator((data: { email: string; password: string }) => cleanJson(data))
  .handler(async ({ data }) => {
    if (data.email === "admin@luxoradrive.com" && data.password === "admin123") {
      return cleanJson({
        success: true,
        user: {
          email: "admin@luxoradrive.com",
          role: "Fleet Director & Super Admin",
          name: "Luxora Master Admin"
        },
        token: `luxora-jwt-token-${Date.now()}`
      });
    }
    return cleanJson({
      success: false,
      message: "Invalid credentials"
    });
  });
