# Contributing to LearnHub (CareerForge)

Thank you for your interest in contributing to **LearnHub**! This document provides all the instructions, requirements, and troubleshooting tips you need to set up the project locally and run it without any errors.

---

## 📋 System Requirements & Prerequisites

Before starting, ensure your system has the following tools installed:

- **Node.js**: `v18.0.0` or higher (Recommended: LTS 20.x or 22.x)  
  *Verify by running:* `node -v`
- **npm**: `v9.0.0` or higher (Comes bundled with Node.js)  
  *Verify by running:* `npm -v`
- **MongoDB**: Community Edition (`v6.0+`) running locally on port `27017` OR a free cloud cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Git**: Installed and configured on your machine  
  *Verify by running:* `git --version`

> **Note**: This is a **Node.js / React / Express (MERN)** stack project. All dependencies are managed using `npm` and `package.json`. A summary of all dependencies can also be found in [requirements.txt](file:///d:/Projects/LearnHub/requirements.txt).

---

## 🚀 Quick Setup & Installation (Step-by-Step)

### 1. Clone the Repository
```bash
git clone https://github.com/prajwal2430/CareerForge.git
cd LearnHub
```

### 2. Configure Environment Variables
Both client and server require `.env` files with proper configurations. Example templates are provided:

#### **Server Environment Setup:**
Create a `.env` file in the `server` directory:
```bash
# On Windows PowerShell:
Copy-Item server/.env.example server/.env

# On Linux / macOS / Git Bash:
cp server/.env.example server/.env
```
Default `server/.env`:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/learnhub
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

#### **Client Environment Setup:**
Create a `.env` file in the `client` directory:
```bash
# On Windows PowerShell:
Copy-Item client/.env.example client/.env

# On Linux / macOS / Git Bash:
cp client/.env.example client/.env
```
Default `client/.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

---

### 3. Install Dependencies

#### Install Server Dependencies:
```bash
cd server
npm install
```

#### Install Client Dependencies:
```bash
cd ../client
npm install
```

---

### 4. Ensure MongoDB is Running
- **Local MongoDB**: Ensure the MongoDB service is active.
  - Windows: Run `net start MongoDB` in an Administrator terminal or start via `services.msc`.
  - Linux/macOS: `sudo systemctl start mongod` or `brew services start mongodb-community`.
- **Cloud MongoDB Atlas**: If using MongoDB Atlas, replace `MONGO_URI` in `server/.env` with your connection string.

---

### 5. Running the Application

#### Option A: Quick Start (Windows)
Double-click the `start.bat` file in the root folder, or run:
```bat
start.bat
```
This automatically launches both backend and frontend servers in separate windows.

#### Option B: Manual Start (Two Terminals)

**Terminal 1 — Start Backend Server:**
```bash
cd server
npm run dev
```
*Backend will start on:* `http://localhost:5000`

**Terminal 2 — Start Frontend Server:**
```bash
cd client
npm run dev
```
*Frontend will start on:* `http://localhost:5173`

---

## 🛠️ Common Errors & Troubleshooting

| Issue / Error | Cause | Solution |
|---|---|---|
| `MongooseServerSelectionError: connect ECONNREFUSED 127.0.0.1:27017` | MongoDB service is not running | Start your local MongoDB service (`net start MongoDB` on Windows) or check your `MONGO_URI` in `server/.env`. |
| `Error: listen EADDRINUSE: address already in use :::5000` | Port 5000 is occupied by another process | Either stop the existing process or change `PORT=5001` in `server/.env` and update `VITE_API_URL` in `client/.env`. |
| `Network Error` / `CORS error` when calling API from frontend | Backend is offline or API URL mismatch | Ensure backend is running and `VITE_API_URL` in `client/.env` points to `http://localhost:5000/api`. |
| `Module not found` / missing packages | Incomplete installation | Run `npm install` inside both `server/` and `client/` directories. |
| `jwt must be provided` / `invalid signature` | Missing or mismatched JWT secret | Ensure `JWT_SECRET` is defined in `server/.env`. |

---

## 🤝 Contribution Workflow

1. **Fork** the repository on GitHub.
2. **Create a branch** for your feature or bug fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Commit your changes** with a descriptive message:
   ```bash
   git commit -m "feat: add user profile picture upload"
   ```
4. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```
5. **Open a Pull Request (PR)** against the `main` branch with a clear summary of your changes.
