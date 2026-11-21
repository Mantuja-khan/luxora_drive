# 🏎️ Luxora Drive - Supercar Rental Backend API

Node.js, Express & MongoDB backend powering the Luxora Drive Supercar Showcase & Admin Panel.

---

## 🚀 Features

- **MongoDB / Mongoose Database**: Collections for fleet inventory, technical specifications, and promotional campaigns.
- **Flash Sale Offer Management**: Instant flash sale activation, discount percentage calculations, and custom promotional badges.
- **Home Page Showcase Filtering**: Toggle whether individual cars appear on the storefront Home Page (`featuredOnHome`).
- **Admin JWT Authentication**: Secure admin endpoints with demo credentials (`admin@luxoradrive.com` / `admin123`).
- **RESTful Endpoints**: Full CRUD for vehicles, specifications, multi-image galleries, and pricing.

---

## 🛠️ Quick Start

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/luxoradrive
JWT_SECRET=luxora_super_secret_jwt_token_2026
ADMIN_EMAIL=admin@luxoradrive.com
ADMIN_PASSWORD=admin123
```

### 3. Seed Initial Supercar Fleet
```bash
npm run seed
```

### 4. Start the Backend Server
```bash
# Production start
npm start

# Development mode with auto-reload
npm run dev
```

---

## 📡 API Endpoints

### 🔐 Authentication
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/login` | Login as Admin (`admin@luxoradrive.com` / `admin123`) |
| `GET` | `/api/auth/verify` | Verify active JWT token |

### 🚗 Vehicle Inventory
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/cars` | Get all cars (Supports `?brand=`, `?category=`, `?flashOnly=true`, `?homeOnly=true`, `?search=`) |
| `GET` | `/api/cars/:id` | Get details for single vehicle |
| `POST` | `/api/cars` | Create new vehicle listing *(Admin Protected)* |
| `PUT` | `/api/cars/:id` | Update vehicle details *(Admin Protected)* |
| `PATCH` | `/api/cars/:id/flash-sale` | Toggle Flash Sale active/inactive & set discount *(Admin Protected)* |
| `PATCH` | `/api/cars/:id/featured` | Toggle Home Page visibility (`featuredOnHome`) *(Admin Protected)* |
| `DELETE` | `/api/cars/:id` | Delete vehicle from MongoDB *(Admin Protected)* |
