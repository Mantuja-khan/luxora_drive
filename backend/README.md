# 🏎️ Luxora Drive - Supercar Rental Backend API

Node.js, Express & MongoDB backend powering the Luxora Drive Supercar Showcase & Admin Panel.

---

## 🚀 Features

- **MongoDB Atlas Cloud Database**: Fully configured and connected to your cloud cluster (`luxoradrives.1rkfccj.mongodb.net/luxoradrive`).
- **Flash Sale Offer Management**: Instant flash sale activation, discount percentage calculations, and custom promotional badges.
- **Home Page Showcase Filtering**: Toggle whether individual cars appear on the storefront Home Page (`featuredOnHome`).
- **Admin JWT Authentication**: Secure admin endpoints with demo credentials (`admin@luxoradrive.com` / `admin123`).
- **RESTful Endpoints**: Full CRUD for vehicles, specifications, multi-image galleries, and pricing.

---

## 🛠️ Quick Start

### 1. Run the Backend Server
From the main project root folder:
```bash
npm run backend:dev
```
Or from the `backend/` directory:
```bash
cd backend
npm run dev
```

The server will start at: `http://localhost:5000`

### 2. Seed Initial Fleet (Optional)
If you ever want to re-populate sample cars in MongoDB:
```bash
npm run backend:seed
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
| `GET` | `/api/cars` | Fetch all vehicles in MongoDB |
| `GET` | `/api/cars?flashOnly=true` | Fetch only active Flash Deals |
| `GET` | `/api/cars?homeOnly=true` | Fetch only cars selected for Home Page |
| `GET` | `/api/cars/:id` | Fetch single vehicle details |
| `POST` | `/api/cars` | Add a new vehicle (Admin Token required) |
| `PUT` | `/api/cars/:id` | Update vehicle or offer (Admin Token required) |
| `DELETE` | `/api/cars/:id` | Delete vehicle (Admin Token required) |
