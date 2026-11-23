import { type CarDocument, INITIAL_FLEET } from "../types/car";

export * from "../types/car";

const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://mantujak_db_user:FA63NeJOeabcPEPE@luxoradrives.1rkfccj.mongodb.net/luxoradrive?retryWrites=true&w=majority&appName=luxoradrives";
const DB_NAME = process.env.MONGODB_DB || "luxoradrive";

let cachedDb: any = null;
let isConnected = false;

// Helper to sanitize MongoDB BSON documents into pure, Seroval-serializable plain objects
function toPlainCar(doc: any): CarDocument {
  if (!doc) return doc;
  const { _id, ...rest } = doc;
  return JSON.parse(
    JSON.stringify({
      ...rest,
      id: rest.id || (_id ? String(_id) : `car-${Date.now()}`),
    })
  );
}

function toPlainCars(docs: any[]): CarDocument[] {
  if (!Array.isArray(docs)) return [];
  return docs.map(toPlainCar);
}

// Dynamic loader that prevents bundler (rolldown/vite) from failing on Node-only binary packages during edge build
async function getMongoModule() {
  try {
    const dynamicImport = new Function("moduleName", "return import(moduleName)");
    const mod = await dynamicImport("mongodb");
    return mod;
  } catch (err) {
    return null;
  }
}

export async function getCarsDb() {
  if (cachedDb) return cachedDb;

  try {
    const mongo = await getMongoModule();
    if (!mongo || !mongo.MongoClient) {
      return null;
    }

    const client = new mongo.MongoClient(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
    });
    await client.connect();
    isConnected = true;
    console.log(`[MongoDB] Connected successfully to: ${DB_NAME}`);
    cachedDb = client.db(DB_NAME);
    return cachedDb;
  } catch (err) {
    console.warn(`[MongoDB] Operating in resilient memory mode (server not reachable):`, err);
    return null;
  }
}

// In-memory fleet cache (cloned to avoid mutations)
let memoryFleet: CarDocument[] = INITIAL_FLEET.map((c) => ({ ...c }));

export async function getAllCars(): Promise<CarDocument[]> {
  try {
    const db = await getCarsDb();
    if (db) {
      const collection = db.collection("cars");
      const count = await collection.countDocuments();
      if (count === 0) {
        // Deep clone to prevent mutating INITIAL_FLEET with BSON ObjectIds
        const seedData = INITIAL_FLEET.map((c) => ({ ...c }));
        await collection.insertMany(seedData);
      }
      const mongoCars = await collection.find({}).sort({ createdAt: -1 }).toArray();
      if (mongoCars && mongoCars.length > 0) {
        const clean = toPlainCars(mongoCars);
        memoryFleet = clean;
        return clean;
      }
    }
  } catch (err) {
    console.error("[MongoDB getAllCars error, using fallback]:", err);
  }
  return toPlainCars(memoryFleet);
}

export async function createCar(
  carData: Omit<CarDocument, "id" | "createdAt" | "updatedAt">
): Promise<CarDocument> {
  const newCar: CarDocument = {
    ...carData,
    featuredOnHome: carData.featuredOnHome ?? true,
    id: `car-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  try {
    const db = await getCarsDb();
    if (db) {
      const collection = db.collection("cars");
      // Clone to ensure newCar object stays clean without _id: ObjectId
      await collection.insertOne({ ...newCar });
    }
  } catch (err) {
    console.error("[MongoDB createCar error, saving to memory]:", err);
  }

  const clean = toPlainCar(newCar);
  memoryFleet = [clean, ...memoryFleet];
  return clean;
}

export async function updateCar(
  id: string,
  updates: Partial<CarDocument>
): Promise<CarDocument | null> {
  const updatedAt = new Date().toISOString();
  try {
    const db = await getCarsDb();
    if (db) {
      const collection = db.collection("cars");
      await collection.updateOne({ id }, { $set: { ...updates, updatedAt } });
      const updatedDoc = await collection.findOne({ id });
      if (updatedDoc) {
        const clean = toPlainCar(updatedDoc);
        const idx = memoryFleet.findIndex((c) => c.id === id);
        if (idx !== -1) {
          memoryFleet[idx] = clean;
        }
        return clean;
      }
    }
  } catch (err) {
    console.error("[MongoDB updateCar error, updating memory]:", err);
  }

  const idx = memoryFleet.findIndex((c) => c.id === id);
  if (idx !== -1) {
    memoryFleet[idx] = toPlainCar({ ...memoryFleet[idx], ...updates, updatedAt });
    return memoryFleet[idx];
  }
  return null;
}

export async function deleteCar(id: string): Promise<boolean> {
  try {
    const db = await getCarsDb();
    if (db) {
      const collection = db.collection("cars");
      await collection.deleteOne({ id });
    }
  } catch (err) {
    console.error("[MongoDB deleteCar error, deleting from memory]:", err);
  }

  const initialLen = memoryFleet.length;
  memoryFleet = memoryFleet.filter((c) => c.id !== id);
  return memoryFleet.length < initialLen;
}
