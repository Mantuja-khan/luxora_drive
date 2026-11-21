import { Car } from "../models/Car.js";

// GET /api/cars (Query filters: brand, category, flashOnly, homeOnly)
export const getCars = async (req, res) => {
  try {
    const { brand, category, flashOnly, homeOnly, search } = req.query;
    const filter = {};

    if (brand && brand !== "ALL") {
      filter.brand = new RegExp(brand, "i");
    }
    if (category && category !== "ALL") {
      filter.category = new RegExp(category, "i");
    }
    if (flashOnly === "true") {
      filter["flashSale.active"] = true;
    }
    if (homeOnly === "true") {
      filter.featuredOnHome = { $ne: false };
    }
    if (search) {
      filter.$or = [
        { name: new RegExp(search, "i") },
        { brand: new RegExp(search, "i") },
        { location: new RegExp(search, "i") }
      ];
    }

    const cars = await Car.find(filter).sort({ createdAt: -1 });
    return res.json({ success: true, count: cars.length, data: cars });
  } catch (error) {
    console.error("[Get Cars Error]:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/cars/:id
export const getCarById = async (req, res) => {
  try {
    const car = await Car.findOne({ id: req.params.id });
    if (!car) {
      return res.status(404).json({ success: false, message: "Car not found" });
    }
    return res.json({ success: true, data: car });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/cars (Create new car)
export const createCar = async (req, res) => {
  try {
    const carData = req.body;
    const newId = carData.id || `car-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

    const car = new Car({
      ...carData,
      id: newId,
      featuredOnHome: carData.featuredOnHome ?? true
    });

    await car.save();
    return res.status(201).json({ success: true, message: "Car created in MongoDB", data: car });
  } catch (error) {
    console.error("[Create Car Error]:", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

// PUT /api/cars/:id (Update car)
export const updateCar = async (req, res) => {
  try {
    const car = await Car.findOneAndUpdate(
      { id: req.params.id },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!car) {
      return res.status(404).json({ success: false, message: "Car not found" });
    }

    return res.json({ success: true, message: "Car updated in MongoDB", data: car });
  } catch (error) {
    console.error("[Update Car Error]:", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

// PATCH /api/cars/:id/featured (Toggle featured on Home Page)
export const toggleFeaturedHome = async (req, res) => {
  try {
    const { featuredOnHome } = req.body;
    const car = await Car.findOneAndUpdate(
      { id: req.params.id },
      { $set: { featuredOnHome } },
      { new: true }
    );

    if (!car) {
      return res.status(404).json({ success: false, message: "Car not found" });
    }

    return res.json({ success: true, message: "Home showcase updated", data: car });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

// PATCH /api/cars/:id/flash-sale (Toggle or configure Flash Sale & Offers)
export const toggleFlashSale = async (req, res) => {
  try {
    const { active, discountPercent, dealPrice, badgeText } = req.body;
    const car = await Car.findOne({ id: req.params.id });

    if (!car) {
      return res.status(404).json({ success: false, message: "Car not found" });
    }

    const discount = discountPercent ?? car.flashSale?.discountPercent ?? 25;
    const price = dealPrice ?? Math.round(car.dailyRate * (1 - discount / 100));

    car.flashSale = {
      active: Boolean(active),
      discountPercent: discount,
      dealPrice: price,
      badgeText: badgeText || `${discount}% FLASH SALE`
    };

    await car.save();
    return res.json({ success: true, message: "Flash Sale offer updated in MongoDB", data: car });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

// DELETE /api/cars/:id
export const deleteCar = async (req, res) => {
  try {
    const car = await Car.findOneAndDelete({ id: req.params.id });
    if (!car) {
      return res.status(404).json({ success: false, message: "Car not found" });
    }
    return res.json({ success: true, message: "Car deleted from MongoDB" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
