# MyPortfolio (Assignment 2) – Quick Start

## 1) Install
```bash
cd MyPortfolio
cp .env.example .env
npm install
```

## 2) Run MongoDB
- Local: start MongoDB service (default port 27017)
- Or edit `.env` to use your Atlas connection string

## 3) Start server
```bash
npm start
```
You should see: `✅ Server on http://localhost:5000`

## 4) Open client
Open `client/index.html` in your browser (or with the **Live Server** VS Code extension).
Use the buttons to call the APIs.

## Endpoints to test
- GET `/` → "Portfolio API is running"
- Contacts CRUD at `/api/contacts` (and by id)
- Projects at `/api/projects`
- Qualifications at `/api/qualifications`
- Users at `/api/users`
- Auth:
  - POST `/auth/signin` with `{ "email": "...", "password": "..." }`
  - GET `/auth/signout`
