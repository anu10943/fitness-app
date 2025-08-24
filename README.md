# Fitness App (Backend + Web + Mobile with Docker)

This zip includes:
- **backend/**: Node.js + Express + PostgreSQL API (Docker-ready), inline migration script.
- **web/**: React (Vite) web app with BMI tracker + interval timer.
- **mobile/**: Expo React Native mobile app with BMI tracker + interval timer.
- **docker-compose.yml**: Spins up Postgres + backend.

## Prereqs
- Node.js 20+ for local dev of web/mobile.
- Docker & Docker Compose for backend + DB.
- (Optional) Expo Go app on your phone, or an emulator for mobile.

---

## 1) Start Backend + DB with Docker
```bash
cp backend/.env.example backend/.env
docker compose up --build -d
# Initialize the database schema (run once)
docker exec -it fitness-backend npm run migrate
```

> The DB starts empty. Migration creates the `bmi_entries` table.

**Backend URL:** http://localhost:3000

---

## 2) Run the Web App
```bash
cd web
cp .env.example .env  # set VITE_API_URL=http://localhost:3000 (or LAN IP)
npm install
npm run dev
# open http://localhost:5173
```

---

## 3) Run the Mobile App (Expo)
```bash
cd mobile
cp .env.example .env  # set EXPO_PUBLIC_API_URL=http://<your-machine-ip>:3000
npm install
npm run start
# press 'a' for Android emulator, 'i' for iOS simulator, or scan QR with Expo Go
```

> IMPORTANT for real device: Use your **LAN IP** (e.g., http://192.168.1.5:3000) in mobile `.env`, not localhost.

---

## Endpoints
- `POST /api/v1/bmi` → body: `{ "height_cm": number, "weight_kg": number }`
- `GET  /api/v1/bmi` → list last 50 BMI entries (most recent first)

Example:
```bash
curl -X POST http://localhost:3000/api/v1/bmi   -H "Content-Type: application/json"   -d '{"height_cm": 175, "weight_kg": 72}'
```

---

## Notes
- No authentication in this MVP; entries are anonymous.
- You can extend the schema later to include users and link BMI entries to a user_id.
- Timer runs entirely on the frontend (web/mobile); no backend support required.
