# 🚀 Deployment Guide for Render

## Prerequisites

1. **GitHub Repository**: Your code should be pushed to GitHub
2. **Render Account**: Sign up at [render.com](https://render.com)
3. **MongoDB Database**: You'll need a MongoDB database (MongoDB Atlas recommended)

## Deployment Steps

### 1. Prepare Your Repository

Make sure your repository includes:

- ✅ `package.json` with correct engines specification
- ✅ `.nvmrc` file with Node.js version
- ✅ `render.yaml` configuration file
- ✅ `.gitignore` file
- ✅ All source code files

### 2. Set Up MongoDB Database

#### Option A: MongoDB Atlas (Recommended)

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free cluster
3. Get your connection string
4. Format: `mongodb+srv://username:password@cluster.mongodb.net/burgers_db`

#### Option B: Render MongoDB

1. In Render dashboard, create a new MongoDB service
2. Use the provided connection string

### 3. Deploy to Render

#### Method 1: Using Render Dashboard

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `burgers-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Node Version**: `18.18.0` (or latest LTS)

#### Method 2: Using render.yaml (Automatic)

1. Push your code to GitHub
2. Render will automatically detect the `render.yaml` file
3. Follow the prompts to create the service

### 4. Environment Variables

Set these in Render dashboard under "Environment":

```env
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/burgers_db
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=24h
API_RATE_LIMIT_WINDOW_MS=900000
API_RATE_LIMIT_MAX_REQUESTS=100
LOG_LEVEL=info
```

### 5. Database Seeding

After deployment, you can seed the database by running:

```bash
# In Render shell or locally
npm run seed
```

## Post-Deployment

### 1. Test Your API

Your API will be available at:

- **Base URL**: `https://your-app-name.onrender.com`
- **API Documentation**: `https://your-app-name.onrender.com/api-docs`
- **Health Check**: `https://your-app-name.onrender.com/health`

### 2. Monitor Your Application

- Check Render logs for any errors
- Monitor database connections
- Set up uptime monitoring

### 3. Custom Domain (Optional)

1. Go to your service settings
2. Add your custom domain
3. Update DNS records as instructed

## Troubleshooting

### Common Issues

1. **Build Fails**: Check Node.js version compatibility
2. **Database Connection**: Verify MongoDB URI and network access
3. **Environment Variables**: Ensure all required variables are set
4. **Memory Issues**: Upgrade to paid plan if needed

### Debug Commands

```bash
# Check logs
render logs

# Access shell
render shell

# Check environment
echo $NODE_ENV
echo $MONGODB_URI
```

## Performance Optimization

1. **Enable Caching**: Add Redis for session storage
2. **Database Indexing**: Ensure proper MongoDB indexes
3. **CDN**: Use CloudFlare for static assets
4. **Monitoring**: Set up application monitoring

## Security Checklist

- [ ] Environment variables are secure
- [ ] Database access is restricted
- [ ] Rate limiting is configured
- [ ] CORS is properly set
- [ ] Input validation is in place
- [ ] Error handling doesn't leak information

## Cost Optimization

- **Free Tier**: 750 hours/month
- **Sleep Mode**: App sleeps after 15 minutes of inactivity
- **Cold Start**: First request may be slow
- **Upgrade**: Consider paid plans for production

---

**🎉 Your Burgers API is now live on Render!**

For more help, check the [Render Documentation](https://render.com/docs).
