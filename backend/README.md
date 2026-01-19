# Backend for Elevator Project

This folder contains the Express.js backend that serves the frontend in `frontend/`.

## Requirements
- Node.js 18+
- MongoDB (local or remote)

## Setup
1. Copy `.env.example` to `.env` and fill values.
2. Install dependencies:

```bash
cd backend
npm install
```

3. Run in development (auto-restarts on changes):

```bash
npm run dev
```

4. Start in production:

```bash
npm start
```

## Available endpoints (base `/api/users`)
- `POST /register` — register and send OTP
- `POST /login` — login (returns JWT)
- `POST /verify-otp/:userId` — verify OTP, returns JWT
- `POST /resend-otp` — resend OTP
- `GET /profile` — get profile (protected)
- `PATCH /profile` — update profile (protected)
- `PATCH /change-password` — change password (protected)

## Notes
- Ensure `FRONTEND_URL` in `.env` matches where the frontend runs (default Vite: `http://localhost:5173`).
- Provide `EMAIL_USER` and `EMAIL_PASS` for sending OTP emails (Gmail users should use an app password).
- The backend uses MongoDB; set `MONGO_URL` accordingly.

## Quick curl health check

```bash
curl http://localhost:5000/health
```
