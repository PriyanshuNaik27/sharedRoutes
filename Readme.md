# SharedRoutes

A fullstack web application for sharing travel locations and experiences, built with **React (Vite) frontend** and an **Express/MongoDB backend**.  
Includes modern authentication with JWT and secure HTTP-only cookies, user reviews, image upload (Cloudinary), and more.

---

## Features

- **User Authentication:** Register/Login with password, JWT tokens stored as secure cookies.
- **Locations & Places:** Add, view, and review travel locations and places.
- **Image Upload:** Upload location images, stored securely via Cloudinary.
- **Protected Routes:** Backend routes protected by JWT/cookie-based authentication.
- **Dark Mode:** Frontend supports light/dark themes.
- **API:** RESTful, modular Express backend.
- **Modern Frontend:** Built with React, Vite, Tailwind CSS.
- **Database:** MongoDB with Mongoose models.

---

## Folder Structure

```
sharedRoutes/
│
├── backend/           # Express API and all backend code
│   ├── app.js
│   ├── index.js
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   └── utils/
│
├── frontend/          # React (Vite) frontend
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── assets/
│   │   └── ...
│   └── index.html
│
├── README.md
└── ...
```

---

## Getting Started

### 1. Clone this repo
```sh
git clone <repo-url>
cd sharedRoutes
```

---

### 2. Backend Setup

```sh
cd backend
npm install
```
- Copy `.env.example` to `.env` and fill in:
  ```
  MONGO_URI=your_mongodb_uri
  ACCESS_TOKEN_SECRET=your_jwt_secret
  REFRESH_TOKEN_SECRET=your_refresh_secret
  ACCESS_TOKEN_EXPIRY=15m
  REFRESH_TOKEN_EXPIRY=7d
  CLOUDINARY_CLOUD_NAME=your_cloudinary_name
  CLOUDINARY_API_KEY=your_cloudinary_key
  CLOUDINARY_API_SECRET=your_cloudinary_secret
  FRONTEND_URL=http://localhost:5173
  NODE_ENV=development
  ```
- Start server:
  ```
  npm start
  ```

---

### 3. Frontend Setup

```sh
cd frontend
npm install
npm run dev
```
The frontend runs by default at [http://localhost:5173](http://localhost:5173).

---

## Key API Endpoints

- `POST   /api/v1/user/register` – Register a new user
- `POST   /api/v1/user/login` – Login (sets httpOnly cookies)
- `POST   /api/v1/user/logout` – Logout (clears cookies)
- `GET    /api/v1/user/me` – Get current user (protected)
- `POST   /api/v1/fromLocation/` – Add new location (protected)
- `GET    /api/v1/fromLocation/allLocations` – List all locations
- More in `/backend/routes/`

---

## Auth Flow (JWT & Cookies)

- On login/registration, server issues JWT tokens as **httpOnly, secure cookies**.
- Browser stores and sends cookies automatically with each request.
- Protected routes verify tokens in cookies for authentication.

---

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, Axios, React Router
- **Backend:** Express, Mongoose, JWT, Cookie-Parser, Cloudinary, Multer, Zod (validation)
- **Database:** MongoDB Atlas/local

---

## Notes

- For local dev, make sure backend `FRONTEND_URL` matches your frontend origin (for CORS/cookie support).
- See code comments and `/backend/backend.notes.txt` for more tips.

---


