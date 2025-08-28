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
- Must be in the top most folder that contains docker-compose.yml, while running below command
- Docker Desktop must be on, run the app once, else it throws error saying 'unable to get image 'fitness-app-backend': error during connect '
- To check docker is running, try 'docker run hello-world'
- IF same error comes, Docker is not running in background or started
docker compose up --build -d
# Initialize the database schema (run once)
- Below command works if Docker is run and you see the image built
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
- To get expo to run in your mobile with this code (if it is not already working after scanning the qr code
- generated after running 'npm run dev', follow below commands
  npm i expo@^53.0.0
  npm expo install --fix
  npx expo-doctor
- If it suggests some packages to install, install that, eg: npx expo install react-native-safe-area-context react-native-screen


## 4) To build an apk file without expo

cd mobile
cp .env.example .env  
npm install
- power on virtual device/emulator and then only try
npm run android
- did not generate .apk file if emulator is not up and running
- in mobile/android/app/build/outputs/apk/debug/app-debug.apk
- not showing up though?


## 5) To run the emulator in Android Studio

- Goto Device manager (search in android studio only)
- Install Medium Phone API 36.0 (or any other device - not sure if it will work on others though)
- Turn on the device once installed
- Run below command in terminal:
npm run start
- Within terminal,
(press) 'a'
- It will download Expo Go app on the phone and show the app.
- Stop the emulator/device by pressing the power button
- **'emulator' or 'expo' commands only work after running 'npm run start'

> IMPORTANT for real device: Use your **LAN IP** (e.g., http://192.168.1.5:3000) in mobile `.env`, not localhost.

---

## Endpoints
- `POST /api/v1/bmi` → body: `{ "height_cm": number, "weight_kg": number }`
- `GET  /api/v1/bmi` → list last 50 BMI entries (most recent first)

Example:
```bash
curl -X POST http://localhost:3000/api/v1/bmi   -H "Content-Type: application/json"   -d '{"height_cm": 175, "weight_kg": 72}'
```
To add all changes
- git add .
To reset all changes
- git reset HEAD
To make branch and move to that branch
- git branch <name of dev>/<branch_name>
- git checkout <name of dev>/<branch_name>
To commit
- git commit -m "first commit"
To push
- git push origin <user>/<branch_name>
- git push origin emily/deploy-app
---

## Notes
- No authentication in this MVP; entries are anonymous.
- You can extend the schema later to include users and link BMI entries to a user_id.
- Timer runs entirely on the frontend (web/mobile); no backend support required.
