import { createServerFn } from "@tanstack/react-start";
import { getAllCars, createCar, updateCar, deleteCar } from "./mongodb";
import { type CarDocument } from "../types/car";

// Server RPC to fetch all cars from MongoDB
export const getCarsServerFn = createServerFn({ method: "GET" }).handler(async () => {
  const cars = await getAllCars();
  return cars;
});

// Server RPC to fetch cars specifically featured on the storefront home page
export const getHomeFeaturedCarsServerFn = createServerFn({ method: "GET" }).handler(async () => {
  const cars = await getAllCars();
  return cars.filter((c) => c.featuredOnHome !== false);
});

// Server RPC to create a new car in MongoDB
export const createCarServerFn = createServerFn({ method: "POST" })
  .validator((data: Omit<CarDocument, "id" | "createdAt" | "updatedAt">) => data)
  .handler(async ({ data }) => {
    const newCar = await createCar(data);
    return newCar;
  });

// Server RPC to update a car in MongoDB
export const updateCarServerFn = createServerFn({ method: "POST" })
  .validator((data: { id: string; updates: Partial<CarDocument> }) => data)
  .handler(async ({ data }) => {
    const updated = await updateCar(data.id, data.updates);
    return updated;
  });

// Server RPC to toggle featured on home page
export const toggleFeaturedHomeServerFn = createServerFn({ method: "POST" })
  .validator((data: { id: string; featuredOnHome: boolean }) => data)
  .handler(async ({ data }) => {
    const updated = await updateCar(data.id, { featuredOnHome: data.featuredOnHome });
    return updated;
  });

// Server RPC to toggle / update flash sale
export const toggleFlashSaleServerFn = createServerFn({ method: "POST" })
  .validator((data: {
    id: string;
    active: boolean;
    discountPercent?: number;
    dealPrice?: number;
    badgeText?: string;
  }) => data)
  .handler(async ({ data }) => {
    const updated = await updateCar(data.id, {
      flashSale: {
        active: data.active,
        discountPercent: data.discountPercent ?? 25,
        dealPrice: data.dealPrice,
        badgeText: data.badgeText ?? `${data.discountPercent ?? 25}% FLASH SALE`
      }
    });
    return updated;
  });

// Server RPC to delete a car from MongoDB
export const deleteCarServerFn = createServerFn({ method: "POST" })
  .validator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    const success = await deleteCar(data.id);
    return { success };
  });

// Server RPC to authenticate Admin
export const loginAdminServerFn = createServerFn({ method: "POST" })
  .validator((data: { email: string; password: string }) => data)
  .handler(async ({ data }) => {
    if (data.email === "admin@luxoradrive.com" && data.password === "admin123") {
      return {
        success: true,
        user: {
          email: "admin@luxoradrive.com",
          role: "Fleet Director & Super Admin",
          name: "Luxora Master Admin"
        },
        token: `luxora-jwt-token-${Date.now()}`
      };
    }
    return {
      success: false,
      message: "Invalid credentials. Please use demo email: admin@luxoradrive.com and password: admin123"
    };
  });
