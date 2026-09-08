# Complete Guide: Deploying LearnHub on Vercel

This guide provides step-by-step instructions to deploy the **LearnHub (CareerForge)** MERN stack application on [Vercel](https://vercel.com).

---

## ⚠️ Crucial Prerequisite: MongoDB Atlas (Cloud Database)

When running locally, MongoDB runs on `mongodb://localhost:27017`. However, Vercel runs in the cloud and **cannot connect to your local computer's MongoDB**. You must use a free cloud MongoDB database:

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create a free account.
2. Create a free shared cluster (M0 sandbox).
3. **Database Access**: Create a database user with a username and password (keep note of them).
4. **Network Access**: Add IP Address `0.0.0.0/0` (Allow access from anywhere). This is required because Vercel uses dynamic cloud IP addresses.
5. Click **Connect** → **Drivers (Node.js)** and copy your connection string:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/learnhub?retryWrites=true&w=majority
   ```

---

## Deployment Architecture Options

There are two popular ways to host this project on Vercel:

| Option | Method | Why Choose It |
|---|---|---|
| **Option A (Recommended)** | **Two Vercel Projects** (`client` & `server`) | Easiest to maintain, clean logs, zero routing conflicts. |
| **Option B** | **Single Monorepo Project** (Root `vercel.json`) | Both frontend and backend live under one single Vercel project domain. |

---

## Option A: Deploy as Two Vercel Projects (Recommended)

### Step 1: Push Code to GitHub
Make sure all your latest code is committed and pushed to your GitHub repository:
```bash
git add .
git commit -m "feat: configure Vercel deployment files"
git push origin main
```

---

### Step 2: Deploy the Backend API (`server`)

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard) and click **"Add New..."** → **"Project"**.
2. Select your `CareerForge` repository and click **Import**.
3. Under **Project Settings**:
   - **Project Name**: `learnhub-api` (or similar)
   - **Framework Preset**: Select **Other**
   - **Root Directory**: Click *Edit* and select **`server`**
4. Expand **Environment Variables** and add the following:

| Key | Example Value | Description |
|---|---|---|
| `MONGO_URI` | `mongodb+srv://user:pass@cluster.mongodb.net/learnhub` | Your MongoDB Atlas connection string |
| `JWT_SECRET` | `a_very_long_random_secure_secret_key_123!` | Secure secret key for JWT tokens |
| `JWT_EXPIRES_IN` | `7d` | Token expiry duration |
| `NODE_ENV` | `production` | Node environment |

5. Click **Deploy**.
6. Once deployed, copy your backend URL (e.g., `https://learnhub-api.vercel.app`).
   - Test it by visiting: `https://learnhub-api.vercel.app/api/health`
   - You should see: `{"status":"ok", "timestamp":"..."}`

---

### Step 3: Deploy the Frontend (`client`)

1. Go back to [Vercel Dashboard](https://vercel.com/dashboard) and click **"Add New..."** → **"Project"**.
2. Import the same repository again.
3. Under **Project Settings**:
   - **Project Name**: `learnhub` (or `careerforge`)
   - **Framework Preset**: Select **Vite**
   - **Root Directory**: Click *Edit* and select **`client`**
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Expand **Environment Variables** and add:

| Key | Value | Description |
|---|---|---|
| `VITE_API_URL` | `https://learnhub-api.vercel.app/api` | Point to your deployed backend URL from Step 2 with `/api` at the end |

5. Click **Deploy**.
6. Once completed, your React app will be live at `https://learnhub.vercel.app`!

---

## Option B: Deploy as a Single Monorepo Project

The repository includes a root [vercel.json](file:///d:/Projects/LearnHub/vercel.json) configured to build the Vite client and serve the Express backend via Vercel serverless functions under `/api/*`.

1. Go to [Vercel Dashboard](https://vercel.com/dashboard) → **"Add New..."** → **"Project"**.
2. Select your repository.
3. Leave **Root Directory** as `./` (the root).
4. Add all environment variables in Vercel:
   - `MONGO_URI` = `mongodb+srv://...`
   - `JWT_SECRET` = `your_secret_key`
   - `JWT_EXPIRES_IN` = `7d`
   - `NODE_ENV` = `production`
   - `VITE_API_URL` = `/api` *(since frontend and backend are on the same domain, relative path `/api` works directly!)*
5. Click **Deploy**.

---

## 🛠️ Configuration Files Added to the Project

The following files have already been prepared and configured for you:

1. **[client/vercel.json](file:///d:/Projects/LearnHub/client/vercel.json)**:
   Configures SPA routing rewrites to `/index.html` so refreshing pages like `/dashboard`, `/courses`, or `/practice/:id` does not produce 404 errors.
2. **[server/vercel.json](file:///d:/Projects/LearnHub/server/vercel.json)**:
   Routes incoming serverless HTTP calls to `server.js` using `@vercel/node`.
3. **[vercel.json](file:///d:/Projects/LearnHub/vercel.json)**:
   Monorepo configuration routing `/api/*` requests to the serverless backend and static assets to the Vite build.
4. **[server/server.js](file:///d:/Projects/LearnHub/server/server.js)**:
   Updated to export `app` and guard `app.listen()` from blocking serverless invocations.
5. **[server/config/db.js](file:///d:/Projects/LearnHub/server/config/db.js)**:
   Updated to cache MongoDB connections across serverless cold starts.

---

## 🔍 Common Deployment Troubleshooting

| Issue | Cause | Fix |
|---|---|---|
| `MongooseServerSelectionError` / timeout | MongoDB IP not whitelisted | In MongoDB Atlas, go to **Network Access** and add `0.0.0.0/0`. |
| 404 on page refresh (`/dashboard`) | Missing client rewrites | Ensure [client/vercel.json](file:///d:/Projects/LearnHub/client/vercel.json) is committed and pushed. |
| Network error / CORS blocked | Frontend URL not allowed | Backend uses `cors()` which allows all origins by default, but verify `VITE_API_URL` has no trailing slash issues. |
| Function execution timed out (504) | Serverless cold start or slow DB connect | Ensure `MONGO_URI` is correct and database user has read/write permissions. |
