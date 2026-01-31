# Deploy to Render with MongoDB Atlas

This guide will walk you through deploying your MERN stack project to Render using MongoDB Atlas as your database.

## Prerequisites

- [MongoDB Atlas Account](https://www.mongodb.com/cloud/atlas) (free tier)
- [Render Account](https://render.com) (free tier)
- [GitHub/GitLab Account](https://github.com) to host your code

---

## Step 1: Set Up MongoDB Atlas

### 1.1 Create a MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for a free account
3. Verify your email address

### 1.2 Create a Cluster
1. Click "Create a Cluster"
2. Choose the free tier (M0)
3. Select your preferred cloud provider (AWS, Google Cloud, or Azure)
4. Choose a region closest to your users
5. Click "Create Cluster" (this takes a few minutes)

### 1.3 Create Database User
1. Go to "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Create a user with:
   - Username: `flowsync_user` (or any name you prefer)
   - Password: Click "Auto-generate Password" and save it somewhere safe!
   - Database User Privileges: "Read and Write to any database"
4. Click "Add User"

### 1.4 Configure Network Access
1. Go to "Network Access" in the left sidebar
2. Click "Add IP Address"
3. For testing, click "Allow Access from Anywhere" (0.0.0.0/0)
4. For production, add your Render service IP later
5. Click "Confirm"

### 1.5 Create Database and Get Connection String
1. Go to "Database" in the left sidebar
2. Click "Connect" on your cluster
3. Click "Connect your application"
4. Copy the connection string (it looks like `mongodb+srv://...`)
5. Replace `<password>` with your database user's password
6. Replace `<database_name>` with `project_management` or your preferred name
7. Save this connection string for later

---

## Step 2: Push Your Code to GitHub

### 2.1 Create a GitHub Repository
1. Go to [GitHub](https://github.com)
2. Click the "+" icon and select "New repository"
3. Name it `flowsync` (or your preferred name)
4. Make it public or private
5. Click "Create repository"

### 2.2 Push Your Code
If you haven't already, run these commands in your project directory:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

---

## Step 3: Deploy to Render

### 3.1 Create a Web Service
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" and select "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - Name: `flowsync-app`
   - Environment: `Node`
   - Build Command: `npm run install-all && npm run build`
   - Start Command: `npm run start`
   - Plan: `Free`

### 3.2 Configure Environment Variables
In the "Environment Variables" section, add:

| Key | Value | Note |
|-----|-------|------|
| `MONGODB_URI` | Your MongoDB Atlas connection string | From Step 1.5 |
| `JWT_SECRET` | A strong random string (32+ characters) | Or click "Generate" |
| `NODE_ENV` | `production` | |

### 3.3 Configure Disk (for static files)
1. Scroll down to "Disks"
2. Click "Add Disk"
3. Configure:
   - Name: `public`
   - Mount Path: `/app/backend/public`
   - Size: `1 GB`
4. Click "Create Disk"

### 3.4 Deploy
1. Click "Create Web Service"
2. Render will now build and deploy your application
3. This may take 5-10 minutes
4. Once complete, you'll see a success message and your app URL

---

## Step 4: Verify Deployment

### 4.1 Check Your Application
1. Visit your app URL (e.g., `https://flowsync-app.onrender.com`)
2. You should see your FlowSync application
3. Try registering a new user

### 4.2 Check Logs
1. Go to your Render service dashboard
2. Click "Logs" to view deployment logs
3. Check for any errors

---

## Step 5: Update MongoDB Atlas Network (Production)

For better security, restrict MongoDB access to only Render:

1. Get your Render service IP:
   - Check your Render service logs or settings
   - Or temporarily allow 0.0.0.0/0 access for testing

2. Add Render IP to MongoDB Atlas:
   - Go to MongoDB Atlas > Network Access
   - Click "Add IP Address"
   - Add your Render service's IP range

---

## Troubleshooting

### Issue: "MongoNetworkError" or Connection Failed
- **Cause**: MongoDB Atlas IP whitelist doesn't include Render
- **Fix**: Add 0.0.0.0/0 to MongoDB Atlas network access (for testing) or find Render's IP

### Issue: "Failed to fetch" when registering/login
- **Cause**: Frontend can't reach backend API
- **Fix**: Check that `api.js` uses relative paths (`/api`) in production

### Issue: Build fails with "Cannot find module"
- **Cause**: Missing dependencies
- **Fix**: Ensure `npm run install-all` runs successfully

### Issue: Static files not loading
- **Cause**: Disk not mounted correctly
- **Fix**: Check that disk is mounted at `/app/backend/public`

---

## Additional Resources

- [Render Documentation](https://render.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com)
- [MERN Stack Tutorial](https://www.mongodb.com/languages/mern-stack-tutorial)

---

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `MONGODB_URI` | Yes | MongoDB Atlas connection string |
| `JWT_SECRET` | Yes | Secret key for JWT tokens (min 32 chars) |
| `NODE_ENV` | Yes | Set to `production` for production |
| `PORT` | No | Port for server (default: 5000, set by Render) |

---

## Important Security Notes

1. **Never commit `.env` files** with real credentials to GitHub
2. **Use strong JWT secrets** (at least 32 random characters)
3. **Restrict MongoDB access** to specific IPs in production
4. **Enable SSL/TLS** on MongoDB Atlas (enabled by default)
5. **Use environment variables** for all sensitive data in Render
