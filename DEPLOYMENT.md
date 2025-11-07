# Deployment Guide

## Backend Deployment (Render)

1. **Push code to GitHub repository**
2. **Connect to Render:**
   - Go to render.com and create account
   - Click "New Web Service"
   - Connect your GitHub repository
   - Select backend folder as root directory

3. **Configure Environment Variables in Render:**
   - `MONGODB_URI`: Your MongoDB connection string
   - `NODE_ENV`: production
   - `PORT`: 10000 (auto-set by Render)

4. **Deploy:** Render will auto-deploy using render.yaml config

## Client Deployment (Netlify)

1. **Update API URL:**
   - Replace `your-render-app-name` in `.env.production` with actual Render app name
   - Example: `https://product-review-backend-abc123.onrender.com`

2. **Deploy to Netlify:**
   - Go to netlify.com and create account
   - Drag and drop the `client` folder OR connect GitHub
   - Netlify will auto-build using netlify.toml config

3. **Environment Variables in Netlify:**
   - Set `REACT_APP_API_URL` to your Render backend URL

## Important Notes:
- Update CORS in backend if needed for production domain
- Render free tier may have cold starts (first request slower)
- Both services support auto-deployment from GitHub