import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Car,
  Plus,
  Trash2,
  Edit3,
  Search,
  Filter,
  Zap,
  Tag,
  DollarSign,
  ShieldCheck,
  LogOut,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Database,
  Image as ImageIcon,
  KeyRound,
  Lock,
  Layers,
  MapPin,
  Clock,
  Gauge,
  Fuel,
  Info,
  ChevronRight,
  RefreshCw,
  ExternalLink,
  Eye,
  EyeOff,
  Flame,
  Check
} from "lucide-react";
import {
  getCarsServerFn,
  createCarServerFn,
  updateCarServerFn,
  deleteCarServerFn,
  toggleFeaturedHomeServerFn,
  toggleFlashSaleServerFn,
  loginAdminServerFn
} from "../lib/cars-api";
import { type CarDocument, INITIAL_FLEET } from "../types/car";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin")({
  component: AdminDashboardPage,
});

// Supported Brands
const BRAND_OPTIONS = [
  "Porsche",
  "Lamborghini",
  "Ferrari",
  "Rolls Royce",
  "Bentley",
  "Mercedes",
  "BMW",
  "Audi",
  "McLaren",
  "Range Rover",
  "Maserati",
  "Aston Martin",
  "Corvette",
  "Bugatti",
  "Tesla",
  "Nissan",
  "Chevrolet",
  "Ford",
  "Dodge",
  "Mini Cooper",
  "Infiniti",
  "Chrysler",
  "Jeep",
  "Jaguar",
  "GMC",
  "Kia",
  "Toyota",
  "Lincoln",
  "Citroen",
  "Brabus"
];

// Supported Categories
const CATEGORY_OPTIONS = [
  "Rent Supercars",
  "Rent Luxury Cars",
  "Rent Sports Cars",
  "Rent SUV Cars",
  "Rent Convertible",
  "Rent Economy Cars",
  "Rent Chauffeur Cars"
];

// Supported Dubai Locations
const LOCATION_OPTIONS = [
  "Dubai Marina",
  "Downtown Dubai",
  "Palm Jumeirah",
  "Business Bay",
  "Dubai International Airport (DXB)",
  "JBR (Jumeirah Beach)",
  "DIFC",
  "Deira & Old Dubai"
];

// Sample Preset Images for Quick Selection
const PRESET_CAR_IMAGES = [
  {
    name: "Porsche 911 GT3 RS",
    url: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80"
  },
  {
    name: "Lamborghini Huracán STO",
    url: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1200&q=80"
  },
  {
    name: "Ferrari F8 Tributo",
    url: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=1200&q=80"
  },
  {
    name: "Rolls-Royce Cullinan",
    url: "https://images.unsplash.com/photo-1631295868223-63265b40d9e4?auto=format&fit=crop&w=1200&q=80"
  },
  {
    name: "Mercedes-AMG G63",
    url: "https://images.unsplash.com/photo-1520050206274-a1ae44613e6d?auto=format&fit=crop&w=1200&q=80"
  },
  {
    name: "McLaren 720S",
    url: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&q=80"
  }
];

interface FormState {
  id?: string;
  name: string;
  brand: string;
  category: string;
  location: string;
  dailyRate: number;
  originalDailyRate: number;
  weeklyRate: number;
  monthlyRate: number;
  originalMonthlyRate: number;
  images: string[];
  newImageUrl: string;
  description: string;
  specs: {
    engine: string;
    power: string;
    speed: string;
    accel: string;
    gear: string;
    weight: string;
  };
  features: string[];
  newFeatureInput: string;
  flashSale: {
    active: boolean;
    discountPercent: number;
    dealPrice: number;
    badgeText: string;
  };
  featuredOnHome: boolean; // Flag to show on home page
}

const emptyFormState: FormState = {
  name: "",
  brand: "Porsche",
  category: "Rent Supercars",
  location: "Dubai Marina",
  dailyRate: 1500,
  originalDailyRate: 1900,
  weeklyRate: 9000,
  monthlyRate: 30000,
  originalMonthlyRate: 42000,
  images: ["https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80"],
  newImageUrl: "",
  description: "Exquisite performance engineering with unmatched presence on Dubai roads.",
  specs: {
    engine: "4.0L V8 Twin-Turbo",
    power: "650 PS / 641 HP",
    speed: "330 km/h",
    accel: "0-100 km/h in 3.1s",
    gear: "8-Speed Dual-Clutch",
    weight: "1,490 kg"
  },
  features: ["Full Carbon Aerodynamics", "Apple CarPlay & Navigation", "Sport Exhaust System"],
  newFeatureInput: "",
  flashSale: {
    active: false,
    discountPercent: 20,
    dealPrice: 1500,
    badgeText: "20% FLASH DEAL"
  },
  featuredOnHome: true
};

function AdminDashboardPage() {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authEmail, setAuthEmail] = useState<string>("admin@luxoradrive.com");
  const [authPassword, setAuthPassword] = useState<string>("admin123");
  const [loginError, setLoginError] = useState<string>("");
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);

  // Cars & Management State
  const [cars, setCars] = useState<CarDocument[]>(INITIAL_FLEET);
  const [isLoadingCars, setIsLoadingCars] = useState<boolean>(false);
  const [filterBrand, setFilterBrand] = useState<string>("ALL");
  const [filterCategory, setFilterCategory] = useState<string>("ALL");
  const [filterHomeOnly, setFilterHomeOnly] = useState<boolean>(false);
  const [filterFlashOnly, setFilterFlashOnly] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormState>(emptyFormState);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveMessage, setSaveMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Check auth on mount
  useEffect(() => {
    const token = localStorage.getItem("luxora_admin_token");
    if (token) {
      setIsAuthenticated(true);
      fetchCars();
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError("");

    try {
      const res = await loginAdminServerFn({
        data: { email: authEmail, password: authPassword }
      });

      if (res.success && res.token) {
        localStorage.setItem("luxora_admin_token", res.token);
        setIsAuthenticated(true);
        fetchCars();
      } else {
        setLoginError(res.message || "Invalid credentials.");
      }
    } catch {
      // In-browser fallback for demo credentials
      if (authEmail === "admin@luxoradrive.com" && authPassword === "admin123") {
        localStorage.setItem("luxora_admin_token", "demo-token-" + Date.now());
        setIsAuthenticated(true);
        fetchCars();
      } else {
        setLoginError("Invalid credentials. Please use admin@luxoradrive.com / admin123");
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("luxora_admin_token");
    setIsAuthenticated(false);
  };

  const fetchCars = async () => {
    setIsLoadingCars(true);
    try {
      const list = await getCarsServerFn();
      if (list && list.length > 0) {
        setCars(list);
      }
    } catch {
      // fallback to initial fleet if offline
      setCars(INITIAL_FLEET);
    } finally {
      setIsLoadingCars(false);
    }
  };

  const handleOpenAddModal = () => {
    setFormData(emptyFormState);
    setIsEditing(false);
    setIsModalOpen(true);
    setSaveMessage(null);
  };

  const handleOpenEditModal = (car: CarDocument) => {
    setFormData({
      id: car.id,
      name: car.name,
      brand: car.brand,
      category: car.category,
      location: car.location,
      dailyRate: car.dailyRate,
      originalDailyRate: car.originalDailyRate,
      weeklyRate: car.weeklyRate,
      monthlyRate: car.monthlyRate,
      originalMonthlyRate: car.originalMonthlyRate,
      images: [...car.images],
      newImageUrl: "",
      description: car.description,
      specs: { ...car.specs },
      features: [...car.features],
      newFeatureInput: "",
      flashSale: { ...car.flashSale },
      featuredOnHome: car.featuredOnHome !== false
    });
    setIsEditing(true);
    setIsModalOpen(true);
    setSaveMessage(null);
  };

  const handleAddImage = () => {
    if (formData.newImageUrl.trim()) {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, prev.newImageUrl.trim()],
        newImageUrl: ""
      }));
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleAddFeature = () => {
    if (formData.newFeatureInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, prev.newFeatureInput.trim()],
        newFeatureInput: ""
      }));
    }
  };

  const handleRemoveFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const handleSaveCar = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveMessage(null);

    const payload = {
      name: formData.name,
      brand: formData.brand,
      category: formData.category,
      location: formData.location,
      dailyRate: Number(formData.dailyRate) || 0,
      originalDailyRate: Number(formData.originalDailyRate) || Number(formData.dailyRate) || 0,
      weeklyRate: Number(formData.weeklyRate) || (Number(formData.dailyRate) * 6),
      monthlyRate: Number(formData.monthlyRate) || (Number(formData.dailyRate) * 22),
      originalMonthlyRate: Number(formData.originalMonthlyRate) || (Number(formData.dailyRate) * 30),
      images: formData.images.length > 0 ? formData.images : [PRESET_CAR_IMAGES[0].url],
      description: formData.description,
      specs: formData.specs,
      features: formData.features,
      flashSale: {
        active: Boolean(formData.flashSale.active),
        discountPercent: Number(formData.flashSale.discountPercent) || 0,
        dealPrice: Number(formData.flashSale.dealPrice) || Number(formData.dailyRate),
        badgeText: formData.flashSale.badgeText || `${formData.flashSale.discountPercent}% FLASH DEAL`
      },
      featuredOnHome: Boolean(formData.featuredOnHome)
    };

    try {
      if (isEditing && formData.id) {
        await updateCarServerFn({
          data: { id: formData.id, updates: payload }
        });
        setSaveMessage({ type: "success", text: "Vehicle listing updated successfully in MongoDB!" });
      } else {
        await createCarServerFn({
          data: payload
        });
        setSaveMessage({ type: "success", text: "New vehicle created successfully in MongoDB!" });
      }
      await fetchCars();
      setTimeout(() => {
        setIsModalOpen(false);
      }, 1000);
    } catch (err) {
      console.error(err);
      setSaveMessage({ type: "error", text: "Failed to persist to MongoDB. Please check database connection." });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteCar = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to remove "${name}" from MongoDB database?`)) return;

    try {
      await deleteCarServerFn({ data: { id } });
      setCars((prev) => prev.filter((c) => c.id !== id));
    } catch {
      setCars((prev) => prev.filter((c) => c.id !== id));
    }
  };

  // Toggle Featured on Home Page directly from the table
  const handleToggleFeaturedHome = async (car: CarDocument) => {
    const newStatus = car.featuredOnHome === false ? true : false;
    try {
      await toggleFeaturedHomeServerFn({
        data: { id: car.id, featuredOnHome: newStatus }
      });
      setCars((prev) =>
        prev.map((c) => (c.id === car.id ? { ...c, featuredOnHome: newStatus } : c))
      );
    } catch {
      setCars((prev) =>
        prev.map((c) => (c.id === car.id ? { ...c, featuredOnHome: newStatus } : c))
      );
    }
  };

  // Toggle Flash Sale & Offers directly from the table
  const handleToggleFlashSale = async (car: CarDocument) => {
    const updatedStatus = !car.flashSale?.active;
    const discount = car.flashSale?.discountPercent || 25;
    const dealPrice = updatedStatus
      ? Math.round(car.dailyRate * (1 - discount / 100))
      : car.dailyRate;
    const badgeText = updatedStatus ? `${discount}% FLASH SALE` : "";

    try {
      await toggleFlashSaleServerFn({
        data: {
          id: car.id,
          active: updatedStatus,
          discountPercent: discount,
          dealPrice: dealPrice,
          badgeText: badgeText
        }
      });
      setCars((prev) =>
        prev.map((c) =>
          c.id === car.id
            ? {
                ...c,
                flashSale: {
                  ...c.flashSale,
                  active: updatedStatus,
                  discountPercent: discount,
                  dealPrice: dealPrice,
                  badgeText: badgeText
                }
              }
            : c
        )
      );
    } catch {
      setCars((prev) =>
        prev.map((c) =>
          c.id === car.id
            ? {
                ...c,
                flashSale: {
                  ...c.flashSale,
                  active: updatedStatus,
                  discountPercent: discount,
                  dealPrice: dealPrice,
                  badgeText: badgeText
                }
              }
            : c
        )
      );
    }
  };

  // Filter cars
  const filteredCars = cars.filter((c) => {
    const matchesBrand = filterBrand === "ALL" || c.brand.toLowerCase() === filterBrand.toLowerCase();
    const matchesCategory = filterCategory === "ALL" || c.category.toLowerCase() === filterCategory.toLowerCase();
    const matchesHome = !filterHomeOnly || c.featuredOnHome !== false;
    const matchesFlash = !filterFlashOnly || c.flashSale?.active;
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesBrand && matchesCategory && matchesHome && matchesFlash && matchesSearch;
  });

  const totalVehicles = cars.length;
  const activeFlashSales = cars.filter((c) => c.flashSale?.active).length;
  const homeFeaturedCount = cars.filter((c) => c.featuredOnHome !== false).length;
  const avgDailyRate = Math.round(
    cars.reduce((sum, c) => sum + (c.dailyRate || 0), 0) / (cars.length || 1)
  );

  // If not logged in, show Luxury Admin Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#07080a] text-white flex flex-col justify-center items-center p-4 relative overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#FFE600]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-red-500/10 rounded-full blur-[140px] pointer-events-none" />

        {/* Back to website button */}
        <div className="absolute top-6 left-6 z-20">
          <Link
            to="/"
            className="flex items-center gap-2 text-white/70 hover:text-[#FFE600] text-sm transition-colors py-2 px-4 rounded-lg bg-white/5 border border-white/10 hover:border-[#FFE600]/40 backdrop-blur-md"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Showroom
          </Link>
        </div>

        {/* Admin Card */}
        <div className="w-full max-w-md bg-[#0d0f14]/90 border border-white/15 rounded-2xl p-8 backdrop-blur-xl shadow-2xl relative z-10">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#FFE600]/15 border border-[#FFE600]/30 text-[#FFE600] mb-3">
              <KeyRound className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-black tracking-wide uppercase font-poster text-white">
              Luxora Admin Portal
            </h1>
            <p className="text-xs text-white/60 mt-1 uppercase tracking-widest">
              Fleet Management & Flash Sale Control
            </p>
          </div>

          {/* Demo Credentials Box */}
          <div className="mb-6 p-4 rounded-xl bg-[#141822] border border-[#FFE600]/30 text-xs">
            <div className="flex items-center justify-between font-semibold text-[#FFE600] mb-2">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" /> Demo Credentials
              </span>
              <button
                type="button"
                onClick={() => {
                  setAuthEmail("admin@luxoradrive.com");
                  setAuthPassword("admin123");
                }}
                className="text-[11px] underline text-white/80 hover:text-[#FFE600]"
              >
                Auto-fill
              </button>
            </div>
            <div className="space-y-1 text-white/80">
              <div className="flex justify-between">
                <span className="text-white/50">Email:</span>
                <span className="font-mono text-white">admin@luxoradrive.com</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Password:</span>
                <span className="font-mono text-white">admin123</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-white/10">
                <span className="text-white/50">Database:</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <Database className="w-3 h-3" /> MongoDB Connected
                </span>
              </div>
            </div>
          </div>

          {loginError && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/20 border border-red-500/40 text-red-300 text-xs text-center">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-white/70 mb-1.5 uppercase tracking-wider">
                Admin Email Address
              </label>
              <input
                type="email"
                required
                value={authEmail}
                onChange={(e) => setAuthEmail(e.target.value)}
                placeholder="admin@luxoradrive.com"
                className="w-full px-4 py-2.5 rounded-lg bg-[#12151e] border border-white/15 text-white text-sm focus:outline-none focus:border-[#FFE600] transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-white/70 mb-1.5 uppercase tracking-wider">
                Admin Password
              </label>
              <input
                type="password"
                required
                value={authPassword}
                onChange={(e) => setAuthPassword(e.target.value)}
                placeholder="admin123"
                className="w-full px-4 py-2.5 rounded-lg bg-[#12151e] border border-white/15 text-white text-sm focus:outline-none focus:border-[#FFE600] transition-colors"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3 bg-[#FFE600] hover:bg-[#ebd300] text-black font-bold uppercase tracking-wider text-xs rounded-lg transition-all shadow-lg shadow-[#FFE600]/20 mt-2"
            >
              {isLoggingIn ? "Authenticating..." : "Sign In to Admin Panel"}
            </Button>
          </form>

          <div className="mt-6 text-center text-[11px] text-white/40">
            Backend API: /backend &bull; MongoDB luxoradrive
          </div>
        </div>
      </div>
    );
  }

  // Logged-in Admin Dashboard View
  return (
    <div className="min-h-screen bg-[#07080a] text-white flex flex-col font-sans selection:bg-[#FFE600] selection:text-black">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#0d0f14]/95 border-b border-white/10 backdrop-blur-md px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#FFE600] text-black flex items-center justify-center font-black text-xl shadow-lg shadow-[#FFE600]/20">
              L
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold tracking-tight text-white font-poster uppercase">
                  Luxora Fleet Admin
                </h1>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#FFE600]/20 text-[#FFE600] border border-[#FFE600]/40 uppercase tracking-widest">
                  Live Control
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-white/50">
                <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                  <Database className="w-3 h-3" /> MongoDB Connected
                </span>
                <span>&bull;</span>
                <span>Backend: backend/server.js</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="hidden sm:flex items-center gap-1.5 text-xs text-white/80 hover:text-[#FFE600] px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-[#FFE600]/40 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              View Live Storefront
            </Link>

            <Button
              onClick={handleOpenAddModal}
              className="bg-[#FFE600] hover:bg-[#ebd300] text-black font-bold text-xs uppercase tracking-wider px-4 py-2 rounded-lg flex items-center gap-1.5 shadow-lg shadow-[#FFE600]/20"
            >
              <Plus className="w-4 h-4 stroke-[3]" /> Add New Car
            </Button>

            <button
              onClick={handleLogout}
              title="Sign Out"
              className="p-2 text-white/60 hover:text-red-400 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/10"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 space-y-6">
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#0e1118] border border-white/10 rounded-xl p-5 shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-between text-white/50 text-xs font-semibold uppercase tracking-wider mb-2">
              <span>Total Fleet Vehicles</span>
              <Car className="w-4 h-4 text-[#FFE600]" />
            </div>
            <div className="text-3xl font-extrabold text-white font-poster">
              {totalVehicles} <span className="text-xs font-sans text-white/50 font-normal">Supercars</span>
            </div>
            <div className="mt-2 text-[11px] text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Ready for immediate reservation
            </div>
          </div>

          <div className="bg-[#190a10] border border-red-500/40 rounded-xl p-5 shadow-lg shadow-red-950/30 relative overflow-hidden">
            <div className="flex items-center justify-between text-red-300 text-xs font-semibold uppercase tracking-wider mb-2">
              <span className="flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-red-400 fill-red-400 animate-pulse" /> Active Flash Sales
              </span>
              <Zap className="w-4 h-4 text-red-400" />
            </div>
            <div className="text-3xl font-extrabold text-red-400 font-poster">
              {activeFlashSales} <span className="text-xs font-sans text-red-300 font-normal">Promotional</span>
            </div>
            <div className="mt-2 text-[11px] text-red-300/80">
              Rendered in distinct fiery crimson card styling on storefront
            </div>
          </div>

          <div className="bg-[#0e1118] border border-white/10 rounded-xl p-5 shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-between text-white/50 text-xs font-semibold uppercase tracking-wider mb-2">
              <span>Home Showcase</span>
              <Eye className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-extrabold text-white font-poster">
              {homeFeaturedCount} <span className="text-xs font-sans text-white/50 font-normal">Visible</span>
            </div>
            <div className="mt-2 text-[11px] text-white/60">
              Vehicles actively selected to display on Home Page
            </div>
          </div>

          <div className="bg-[#0e1118] border border-white/10 rounded-xl p-5 shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-between text-white/50 text-xs font-semibold uppercase tracking-wider mb-2">
              <span>Avg Daily Rate</span>
              <DollarSign className="w-4 h-4 text-[#FFE600]" />
            </div>
            <div className="text-3xl font-extrabold text-white font-poster">
              {avgDailyRate} <span className="text-xs font-sans text-white/50 font-normal">AED / Day</span>
            </div>
            <div className="mt-2 text-[11px] text-white/60">
              Fleet average across all categories
            </div>
          </div>
        </div>

        {/* Card Styling Visual Comparison Bar */}
        <div className="bg-[#0e1118] border border-white/10 rounded-xl p-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#FFE600]" />
              <span className="font-bold text-white uppercase tracking-wider">Storefront Card Color System</span>
            </div>
            <span className="text-white/50 text-[11px]">Flash Sale cards feature high-visibility crimson gradients & glowing deal badges</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Regular Card Demo */}
            <div className="p-3 bg-[#12141c] border border-neutral-800 rounded-lg flex items-center justify-between">
              <div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/10 text-white/70 uppercase">
                  Normal Vehicle Card
                </span>
                <div className="text-xs font-bold text-white mt-1">Dark Luxury Theme (#12141c)</div>
                <div className="text-[10px] text-white/40">Default elegant charcoal styling for standard fleet</div>
              </div>
              <div className="text-right font-poster text-white text-sm">AED 1,850/day</div>
            </div>

            {/* Flash Sale Card Demo */}
            <div className="p-3 bg-gradient-to-r from-[#2c0d16] via-[#1a0e1c] to-[#120e18] border-2 border-red-500/70 shadow-[0_0_20px_rgba(239,68,68,0.25)] rounded-lg flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-black bg-red-600 text-white uppercase tracking-wider flex items-center gap-1">
                    <Zap className="w-3 h-3 fill-white" /> 25% FLASH SALE
                  </span>
                  <span className="text-[10px] text-red-400 font-bold uppercase">Distinct Color</span>
                </div>
                <div className="text-xs font-bold text-red-200 mt-1">Fiery Crimson & Center White Light Burst</div>
                <div className="text-[10px] text-red-300/60">Emits luminous white beam from center covering the car</div>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-white/40 line-through mr-1.5">AED 2,400</span>
                <span className="font-poster text-[#FFE600] font-black text-sm">AED 1,800/day</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-[#0e1118] border border-white/10 rounded-xl p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by car name, brand, or location..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#141722] border border-white/10 text-white text-xs focus:outline-none focus:border-[#FFE600] transition-colors"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Quick Home Page Toggle Filter */}
            <button
              type="button"
              onClick={() => setFilterHomeOnly(!filterHomeOnly)}
              className={`px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors border ${
                filterHomeOnly
                  ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
                  : "bg-[#141722] text-white/60 border-white/10 hover:text-white"
              }`}
            >
              <Eye className="w-3.5 h-3.5" /> Home Page Only
            </button>

            {/* Quick Flash Sale Filter */}
            <button
              type="button"
              onClick={() => setFilterFlashOnly(!filterFlashOnly)}
              className={`px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors border ${
                filterFlashOnly
                  ? "bg-red-500/20 text-red-300 border-red-500/50"
                  : "bg-[#141722] text-white/60 border-white/10 hover:text-white"
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-red-400" /> Flash Sales Only
            </button>

            {/* Brand Filter */}
            <select
              value={filterBrand}
              onChange={(e) => setFilterBrand(e.target.value)}
              className="px-3 py-2 rounded-lg bg-[#141722] border border-white/10 text-white text-xs focus:outline-none focus:border-[#FFE600] transition-colors"
            >
              <option value="ALL">All Brands ({BRAND_OPTIONS.length})</option>
              {BRAND_OPTIONS.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>

            {/* Category Filter */}
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 rounded-lg bg-[#141722] border border-white/10 text-white text-xs focus:outline-none focus:border-[#FFE600] transition-colors"
            >
              <option value="ALL">All Categories</option>
              {CATEGORY_OPTIONS.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            <Button
              onClick={fetchCars}
              variant="outline"
              size="sm"
              className="border-white/10 text-white/80 hover:text-white text-xs"
            >
              <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${isLoadingCars ? "animate-spin" : ""}`} />
              Reload
            </Button>
          </div>
        </div>

        {/* Cars Inventory Table */}
        <div className="bg-[#0e1118] border border-white/10 rounded-xl overflow-hidden shadow-xl">
          <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-white font-poster flex items-center gap-2">
              <Car className="w-4 h-4 text-[#FFE600]" /> Fleet Inventory ({filteredCars.length})
            </h2>
            <span className="text-xs text-white/50">
              Click &quot;Show on Home&quot; or &quot;Flash Sale&quot; to toggle live storefront visibility
            </span>
          </div>

          {filteredCars.length === 0 ? (
            <div className="p-12 text-center text-white/50">
              <Car className="w-12 h-12 mx-auto mb-3 opacity-30 text-white" />
              <p className="text-sm font-semibold">No vehicles found matching filters</p>
              <p className="text-xs text-white/40 mt-1">Try resetting search filters or add a new supercar to MongoDB.</p>
              <Button
                onClick={handleOpenAddModal}
                className="mt-4 bg-[#FFE600] text-black font-bold text-xs uppercase tracking-wider"
              >
                + Add Car Now
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#141722] text-white/60 uppercase tracking-wider text-[10px] border-b border-white/10">
                  <tr>
                    <th className="py-3 px-4">Vehicle & Images</th>
                    <th className="py-3 px-4">Brand & Category</th>
                    <th className="py-3 px-4">Daily Rate</th>
                    <th className="py-3 px-4">Home Showcase</th>
                    <th className="py-3 px-4">Flash Sale Offer (Distinct Color)</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredCars.map((car) => {
                    const isFlash = Boolean(car.flashSale?.active);
                    const isHome = car.featuredOnHome !== false;

                    return (
                      <tr
                        key={car.id}
                        className={`transition-colors ${
                          isFlash
                            ? "bg-red-950/20 hover:bg-red-950/30 border-l-4 border-l-red-500"
                            : "hover:bg-white/[0.02]"
                        }`}
                      >
                        {/* Vehicle & Image */}
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-16 h-12 rounded-lg bg-black/40 border border-white/10 overflow-hidden flex-shrink-0 relative">
                              {car.images && car.images[0] ? (
                                <img
                                  src={car.images[0]}
                                  alt={car.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-white/20">
                                  <Car className="w-6 h-6" />
                                </div>
                              )}
                              {car.images && car.images.length > 1 && (
                                <span className="absolute bottom-1 right-1 bg-black/80 px-1 py-0.2 rounded text-[9px] text-[#FFE600] font-bold">
                                  +{car.images.length}
                                </span>
                              )}
                            </div>
                            <div>
                              <div className="font-bold text-white text-sm flex items-center gap-1.5">
                                {car.name}
                                {isFlash && (
                                  <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-red-600 text-white uppercase tracking-wider flex items-center gap-0.5 animate-pulse">
                                    <Zap className="w-2.5 h-2.5 fill-white" /> FLASH
                                  </span>
                                )}
                              </div>
                              <div className="text-[11px] text-white/50 line-clamp-1 max-w-[200px]">
                                {car.location} &bull; {car.specs?.engine || "V8"}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Brand & Category */}
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FFE600]/15 text-[#FFE600] border border-[#FFE600]/30 mr-2">
                            {car.brand}
                          </span>
                          <div className="text-[11px] text-white/60 mt-1">{car.category}</div>
                        </td>

                        {/* Daily Rate */}
                        <td className="py-3 px-4">
                          <div className="font-bold text-[#FFE600] text-sm font-poster">
                            AED {car.dailyRate?.toLocaleString()}
                          </div>
                          {car.originalDailyRate && car.originalDailyRate > car.dailyRate && (
                            <div className="text-[10px] text-white/40 line-through">
                              AED {car.originalDailyRate?.toLocaleString()}
                            </div>
                          )}
                        </td>

                        {/* Home Showcase Toggle */}
                        <td className="py-3 px-4">
                          <button
                            type="button"
                            onClick={() => handleToggleFeaturedHome(car)}
                            title="Click to toggle Home Page visibility"
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1.5 transition-all border ${
                              isHome
                                ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30"
                                : "bg-neutral-800/60 text-neutral-400 border-neutral-700 hover:text-white"
                            }`}
                          >
                            {isHome ? (
                              <>
                                <Eye className="w-3.5 h-3.5 text-emerald-400" />
                                <span>SHOW ON HOME</span>
                              </>
                            ) : (
                              <>
                                <EyeOff className="w-3.5 h-3.5 text-neutral-500" />
                                <span>HIDDEN FROM HOME</span>
                              </>
                            )}
                          </button>
                        </td>

                        {/* Flash Sale Offer (Distinct Color) */}
                        <td className="py-3 px-4">
                          <button
                            type="button"
                            onClick={() => handleToggleFlashSale(car)}
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 transition-all ${
                              isFlash
                                ? "bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md shadow-red-900/40 hover:brightness-110"
                                : "bg-white/5 text-white/40 border border-white/10 hover:border-white/20"
                            }`}
                          >
                            <Zap className={`w-3 h-3 ${isFlash ? "fill-white animate-bounce" : ""}`} />
                            {isFlash ? "FLASH SALE ACTIVE" : "Regular (No Offer)"}
                          </button>
                          {isFlash && (
                            <div className="text-[10px] text-red-300 font-semibold mt-1">
                              {car.flashSale.discountPercent}% OFF &bull; Deal AED {car.flashSale.dealPrice}
                            </div>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleOpenEditModal(car)}
                              title="Edit Vehicle"
                              className="p-1.5 rounded-lg bg-white/5 hover:bg-[#FFE600]/20 text-white/80 hover:text-[#FFE600] border border-white/10 transition-colors"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteCar(car.id, car.name)}
                              title="Delete Car from MongoDB"
                              className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-white/80 hover:text-red-400 border border-white/10 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Comprehensive Add / Edit Car Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="bg-[#0d0f15] border border-white/15 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden my-auto">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-[#12151e]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#FFE600]/20 text-[#FFE600] flex items-center justify-center">
                  <Car className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-white uppercase font-poster text-base">
                    {isEditing ? `Edit Vehicle: ${formData.name}` : "Add New Vehicle to MongoDB Fleet"}
                  </h3>
                  <p className="text-[11px] text-white/50">
                    Set pricing, Home Page visibility, and Flash Sale promotions
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-white/60 hover:text-white p-1 rounded-lg hover:bg-white/10"
              >
                &times;
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveCar} className="p-6 space-y-6 overflow-y-auto flex-1 text-xs">
              {saveMessage && (
                <div
                  className={`p-3 rounded-lg border text-xs font-semibold ${
                    saveMessage.type === "success"
                      ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-300"
                      : "bg-red-500/20 border-red-500/40 text-red-300"
                  }`}
                >
                  {saveMessage.text}
                </div>
              )}

              {/* 1. Basic Information & Home Page Showcase Switch */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
                  <h4 className="text-[#FFE600] uppercase font-bold tracking-wider text-[11px] flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5" /> 1. Vehicle Details & Showcase
                  </h4>
                </div>

                {/* Home Page Showcase Toggle Box */}
                <div className="p-3 rounded-xl bg-[#141b27] border border-emerald-500/30 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-white text-xs flex items-center gap-1.5">
                      <Eye className="w-4 h-4 text-emerald-400" /> Show on Storefront Home Page
                    </span>
                    <p className="text-[11px] text-white/60 mt-0.5">
                      Enable this so visitors can see and rent this vehicle on the home page showcase grid
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.featuredOnHome}
                      onChange={(e) => setFormData({ ...formData, featuredOnHome: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-neutral-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/70 mb-1 font-semibold uppercase">Car Title / Model Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Porsche 911 GT3 RS"
                      className="w-full px-3 py-2 rounded-lg bg-[#141722] border border-white/15 text-white focus:outline-none focus:border-[#FFE600]"
                    />
                  </div>

                  <div>
                    <label className="block text-white/70 mb-1 font-semibold uppercase">Brand</label>
                    <select
                      value={formData.brand}
                      onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-[#141722] border border-white/15 text-white focus:outline-none focus:border-[#FFE600]"
                    >
                      {BRAND_OPTIONS.map((b) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-white/70 mb-1 font-semibold uppercase">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-[#141722] border border-white/15 text-white focus:outline-none focus:border-[#FFE600]"
                    >
                      {CATEGORY_OPTIONS.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-white/70 mb-1 font-semibold uppercase">Location</label>
                    <select
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-[#141722] border border-white/15 text-white focus:outline-none focus:border-[#FFE600]"
                    >
                      {LOCATION_OPTIONS.map((loc) => (
                        <option key={loc} value={loc}>{loc}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-white/70 mb-1 font-semibold uppercase">Description</label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Enter detailed description, driving characteristics, and luxury amenities..."
                    className="w-full px-3 py-2 rounded-lg bg-[#141722] border border-white/15 text-white focus:outline-none focus:border-[#FFE600]"
                  />
                </div>
              </div>

              {/* 2. Rates & Pricing (Daily, Weekly, Monthly) */}
              <div className="space-y-4">
                <h4 className="text-[#FFE600] uppercase font-bold tracking-wider text-[11px] flex items-center gap-1.5 border-b border-white/10 pb-1.5">
                  <DollarSign className="w-3.5 h-3.5" /> 2. Rental Pricing (AED)
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-white/70 mb-1 font-semibold uppercase">Daily Price (AED/day)</label>
                    <input
                      type="number"
                      required
                      min={0}
                      value={formData.dailyRate}
                      onChange={(e) => setFormData({ ...formData, dailyRate: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-lg bg-[#141722] border border-white/15 text-white focus:outline-none focus:border-[#FFE600]"
                    />
                  </div>

                  <div>
                    <label className="block text-white/70 mb-1 font-semibold uppercase">Original Daily Price (Strike-through)</label>
                    <input
                      type="number"
                      min={0}
                      value={formData.originalDailyRate}
                      onChange={(e) => setFormData({ ...formData, originalDailyRate: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-lg bg-[#141722] border border-white/15 text-white focus:outline-none focus:border-[#FFE600]"
                    />
                  </div>

                  <div>
                    <label className="block text-white/70 mb-1 font-semibold uppercase">Weekly Price (AED/week)</label>
                    <input
                      type="number"
                      min={0}
                      value={formData.weeklyRate}
                      onChange={(e) => setFormData({ ...formData, weeklyRate: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-lg bg-[#141722] border border-white/15 text-white focus:outline-none focus:border-[#FFE600]"
                    />
                  </div>

                  <div>
                    <label className="block text-white/70 mb-1 font-semibold uppercase">Monthly Price (AED/month)</label>
                    <input
                      type="number"
                      min={0}
                      value={formData.monthlyRate}
                      onChange={(e) => setFormData({ ...formData, monthlyRate: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-lg bg-[#141722] border border-white/15 text-white focus:outline-none focus:border-[#FFE600]"
                    />
                  </div>

                  <div>
                    <label className="block text-white/70 mb-1 font-semibold uppercase">Original Monthly Price</label>
                    <input
                      type="number"
                      min={0}
                      value={formData.originalMonthlyRate}
                      onChange={(e) => setFormData({ ...formData, originalMonthlyRate: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-lg bg-[#141722] border border-white/15 text-white focus:outline-none focus:border-[#FFE600]"
                    />
                  </div>
                </div>
              </div>

              {/* 3. Flash Sale & Special Offers (With Distinct Card Color Indicator) */}
              <div className="space-y-4 bg-gradient-to-r from-red-950/30 via-rose-950/20 to-amber-950/20 p-4 rounded-xl border-2 border-red-500/50">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-red-400 uppercase font-black tracking-wider text-[11px] flex items-center gap-1.5">
                      <Zap className="w-4 h-4 fill-red-400 text-red-400 animate-pulse" /> 3. Flash Sale & Special Offers
                    </h4>
                    <span className="text-[10px] text-red-300/70 block mt-0.5">
                      Card will be styled with a distinctive radiant crimson background & glowing border
                    </span>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer bg-red-600 hover:bg-red-500 text-white px-3 py-1.5 rounded-lg transition-colors">
                    <input
                      type="checkbox"
                      checked={formData.flashSale.active}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          flashSale: { ...formData.flashSale, active: e.target.checked }
                        })
                      }
                      className="w-4 h-4 rounded text-black focus:ring-0"
                    />
                    <span className="font-bold text-xs uppercase">
                      {formData.flashSale.active ? "Flash Sale Enabled" : "Enable Flash Sale"}
                    </span>
                  </label>
                </div>

                {formData.flashSale.active && (
                  <div className="space-y-3 pt-2">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-white/70 mb-1 font-semibold uppercase">Discount Percentage (%)</label>
                        <input
                          type="number"
                          min={1}
                          max={90}
                          value={formData.flashSale.discountPercent}
                          onChange={(e) => {
                            const pct = Number(e.target.value);
                            const deal = Math.round(formData.dailyRate * (1 - pct / 100));
                            setFormData({
                              ...formData,
                              flashSale: {
                                ...formData.flashSale,
                                discountPercent: pct,
                                dealPrice: deal,
                                badgeText: `${pct}% FLASH SALE`
                              }
                            });
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-[#141722] border border-red-500/50 text-white focus:outline-none focus:border-red-400"
                        />
                      </div>

                      <div>
                        <label className="block text-white/70 mb-1 font-semibold uppercase">Special Deal Price (AED)</label>
                        <input
                          type="number"
                          value={formData.flashSale.dealPrice}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              flashSale: { ...formData.flashSale, dealPrice: Number(e.target.value) }
                            })
                          }
                          className="w-full px-3 py-2 rounded-lg bg-[#141722] border border-red-500/50 text-white focus:outline-none focus:border-red-400"
                        />
                      </div>

                      <div>
                        <label className="block text-white/70 mb-1 font-semibold uppercase">Offer Badge Tag</label>
                        <input
                          type="text"
                          value={formData.flashSale.badgeText}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              flashSale: { ...formData.flashSale, badgeText: e.target.value }
                            })
                          }
                          placeholder="e.g. 25% FLASH SALE"
                          className="w-full px-3 py-2 rounded-lg bg-[#141722] border border-red-500/50 text-white focus:outline-none focus:border-red-400"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 4. Specifications */}
              <div className="space-y-4">
                <h4 className="text-[#FFE600] uppercase font-bold tracking-wider text-[11px] flex items-center gap-1.5 border-b border-white/10 pb-1.5">
                  <Gauge className="w-3.5 h-3.5" /> 4. Technical Specifications
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-white/70 mb-1 font-semibold uppercase">Engine</label>
                    <input
                      type="text"
                      value={formData.specs.engine}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          specs: { ...formData.specs, engine: e.target.value }
                        })
                      }
                      placeholder="e.g. 4.0L Twin-Turbo Flat-6"
                      className="w-full px-3 py-2 rounded-lg bg-[#141722] border border-white/15 text-white focus:outline-none focus:border-[#FFE600]"
                    />
                  </div>

                  <div>
                    <label className="block text-white/70 mb-1 font-semibold uppercase">Power / HP</label>
                    <input
                      type="text"
                      value={formData.specs.power}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          specs: { ...formData.specs, power: e.target.value }
                        })
                      }
                      placeholder="e.g. 525 PS / 518 HP"
                      className="w-full px-3 py-2 rounded-lg bg-[#141722] border border-white/15 text-white focus:outline-none focus:border-[#FFE600]"
                    />
                  </div>

                  <div>
                    <label className="block text-white/70 mb-1 font-semibold uppercase">0-100 km/h</label>
                    <input
                      type="text"
                      value={formData.specs.accel}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          specs: { ...formData.specs, accel: e.target.value }
                        })
                      }
                      placeholder="e.g. 3.2s"
                      className="w-full px-3 py-2 rounded-lg bg-[#141722] border border-white/15 text-white focus:outline-none focus:border-[#FFE600]"
                    />
                  </div>

                  <div>
                    <label className="block text-white/70 mb-1 font-semibold uppercase">Top Speed</label>
                    <input
                      type="text"
                      value={formData.specs.speed}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          specs: { ...formData.specs, speed: e.target.value }
                        })
                      }
                      placeholder="e.g. 330 km/h"
                      className="w-full px-3 py-2 rounded-lg bg-[#141722] border border-white/15 text-white focus:outline-none focus:border-[#FFE600]"
                    />
                  </div>

                  <div>
                    <label className="block text-white/70 mb-1 font-semibold uppercase">Transmission / Gearbox</label>
                    <input
                      type="text"
                      value={formData.specs.gear}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          specs: { ...formData.specs, gear: e.target.value }
                        })
                      }
                      placeholder="e.g. 8-Speed Dual-Clutch"
                      className="w-full px-3 py-2 rounded-lg bg-[#141722] border border-white/15 text-white focus:outline-none focus:border-[#FFE600]"
                    />
                  </div>

                  <div>
                    <label className="block text-white/70 mb-1 font-semibold uppercase">Weight / Seats</label>
                    <input
                      type="text"
                      value={formData.specs.weight}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          specs: { ...formData.specs, weight: e.target.value }
                        })
                      }
                      placeholder="e.g. 1,450 kg / 2 Seats"
                      className="w-full px-3 py-2 rounded-lg bg-[#141722] border border-white/15 text-white focus:outline-none focus:border-[#FFE600]"
                    />
                  </div>
                </div>
              </div>

              {/* 5. Product Images */}
              <div className="space-y-4">
                <h4 className="text-[#FFE600] uppercase font-bold tracking-wider text-[11px] flex items-center gap-1.5 border-b border-white/10 pb-1.5">
                  <ImageIcon className="w-3.5 h-3.5" /> 5. Product Images & Gallery
                </h4>

                <div className="flex gap-2">
                  <input
                    type="url"
                    value={formData.newImageUrl}
                    onChange={(e) => setFormData({ ...formData, newImageUrl: e.target.value })}
                    placeholder="Enter image URL (https://...)"
                    className="flex-1 px-3 py-2 rounded-lg bg-[#141722] border border-white/15 text-white focus:outline-none focus:border-[#FFE600]"
                  />
                  <Button
                    type="button"
                    onClick={handleAddImage}
                    variant="outline"
                    className="border-white/15 text-white hover:bg-white/10"
                  >
                    + Add URL
                  </Button>
                </div>

                {/* Quick Presets */}
                <div>
                  <span className="text-[10px] text-white/50 block mb-1.5 uppercase tracking-wider">
                    Or select quick luxury preset image:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {PRESET_CAR_IMAGES.map((preset) => (
                      <button
                        key={preset.name}
                        type="button"
                        onClick={() => {
                          if (!formData.images.includes(preset.url)) {
                            setFormData((prev) => ({
                              ...prev,
                              images: [...prev.images, preset.url]
                            }));
                          }
                        }}
                        className="px-2 py-1 rounded bg-white/5 hover:bg-[#FFE600]/20 hover:text-[#FFE600] text-white/70 text-[10px] border border-white/10 transition-colors"
                      >
                        + {preset.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Current Image Thumbnails */}
                {formData.images.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                    {formData.images.map((img, idx) => (
                      <div
                        key={idx}
                        className="relative rounded-lg overflow-hidden border border-white/15 group aspect-video bg-black/40"
                      >
                        <img src={img} alt={`Car ${idx + 1}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(idx)}
                          className="absolute top-1 right-1 p-1 rounded-full bg-red-600/90 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 6. Key Features */}
              <div className="space-y-3">
                <h4 className="text-[#FFE600] uppercase font-bold tracking-wider text-[11px] flex items-center gap-1.5 border-b border-white/10 pb-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> 6. Key Features
                </h4>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.newFeatureInput}
                    onChange={(e) => setFormData({ ...formData, newFeatureInput: e.target.value })}
                    placeholder="e.g. Ceramic Brakes, Carbon Aerodynamics, Apple CarPlay..."
                    className="flex-1 px-3 py-2 rounded-lg bg-[#141722] border border-white/15 text-white focus:outline-none focus:border-[#FFE600]"
                  />
                  <Button
                    type="button"
                    onClick={handleAddFeature}
                    variant="outline"
                    className="border-white/15 text-white hover:bg-white/10"
                  >
                    + Add Feature
                  </Button>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {formData.features.map((feat, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/90 text-[11px] flex items-center gap-1.5"
                    >
                      {feat}
                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(idx)}
                        className="text-white/40 hover:text-red-400"
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                  className="border-white/15 text-white hover:bg-white/10"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSaving}
                  className="bg-[#FFE600] hover:bg-[#ebd300] text-black font-bold uppercase tracking-wider text-xs px-6 shadow-lg shadow-[#FFE600]/20"
                >
                  {isSaving ? "Saving to MongoDB..." : isEditing ? "Update Vehicle" : "Create Vehicle"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
