# ReLink Backend Setup Guide

## Technology Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: MongoDB 6.0+
- **Authentication**: JWT (JSON Web Tokens)
- **Real-time**: Socket.io
- **File Storage**: AWS S3 or Cloudinary
- **Email**: NodeMailer or SendGrid
- **Validation**: Joi or Zod
- **Testing**: Jest + Supertest

## Installation & Setup

### 1. Initialize Project

```bash
mkdir relink-backend
cd relink-backend
npm init -y
npm install express dotenv mongoose jsonwebtoken bcryptjs cors socket.io axios
npm install --save-dev nodemon jest supertest
```

### 2. Environment Variables (.env)

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/relink
DB_NAME=relink

# Authentication
JWT_SECRET=your-super-secret-key-change-in-production
JWT_EXPIRE=24h
REFRESH_TOKEN_SECRET=refresh-secret-key

# Email Service
SENDGRID_API_KEY=your-sendgrid-key
SENDGRID_FROM_EMAIL=noreply@relink.eco

# File Upload
AWS_ACCESS_KEY=your-aws-key
AWS_SECRET_KEY=your-aws-secret
AWS_BUCKET_NAME=relink-uploads
AWS_REGION=us-east-1

# External APIs
REDIS_URL=redis://localhost:6379
MAPS_API_KEY=your-google-maps-key

# Frontend
FRONTEND_URL=http://localhost:5173
```

### 3. Project Structure

```
backend/
├── config/
│   ├── database.js
│   ├── constants.js
│   └── env.js
├── controllers/
│   ├── authController.js
│   ├── pickupController.js
│   ├── rewardController.js
│   ├── analyticsController.js
│   └── adminController.js
├── middleware/
│   ├── auth.js
│   ├── validation.js
│   ├── errorHandler.js
│   └── rateLimiter.js
├── models/
│   ├── User.js
│   ├── Collector.js
│   ├── Recycler.js
│   ├── PickupRequest.js
│   ├── Reward.js
│   ├── Notification.js
│   └── Analytics.js
├── routes/
│   ├── auth.js
│   ├── pickups.js
│   ├── rewards.js
│   ├── analytics.js
│   ├── collectors.js
│   ├── admin.js
│   └── index.js
├── services/
│   ├── emailService.js
│   ├── uploadService.js
│   ├── locationService.js
│   └── rewardService.js
├── utils/
│   ├── logger.js
│   ├── validators.js
│   └── helpers.js
├── socket/
│   └── events.js
├── .env
├── .env.example
├── .gitignore
├── server.js
└── package.json
```

---

## Core Implementation Examples

### 1. Server Setup (server.js)

```javascript
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const socketIO = require('socket.io');
const http = require('http');

// Import routes and middleware
const authRoutes = require('./routes/auth');
const pickupRoutes = require('./routes/pickups');
const rewardRoutes = require('./routes/rewards');
const analyticsRoutes = require('./routes/analytics');
const adminRoutes = require('./routes/admin');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/pickups', pickupRoutes);
app.use('/api/rewards', rewardRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// Error handler
app.use(errorHandler);

// Socket.io setup
require('./socket/events')(io);

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### 2. Authentication Middleware (middleware/auth.js)

```javascript
const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ 
      success: false, 
      error: 'No token provided' 
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  } catch (error) {
    return res.status(401).json({ 
      success: false, 
      error: 'Invalid token' 
    });
  }
};

exports.verifyAdmin = (req, res, next) => {
  if (req.userRole !== 'admin') {
    return res.status(403).json({ 
      success: false, 
      error: 'Admin access required' 
    });
  }
  next();
};
```

### 3. User Model (models/User.js)

```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  firstName: String,
  lastName: String,
  phone: String,
  role: {
    type: String,
    enum: ['user', 'collector', 'recycler', 'admin'],
    default: 'user'
  },
  
  address: {
    street: String,
    city: String,
    state: String,
    pincode: String,
    latitude: Number,
    longitude: Number
  },
  
  avatar: String,
  rewardPoints: { type: Number, default: 0 },
  carbonOffset: { type: Number, default: 0 },
  totalDevicesRecycled: { type: Number, default: 0 },
  
  isVerified: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  lastLogin: Date
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('passwordHash')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(password) {
  return bcrypt.compare(password, this.passwordHash);
};

module.exports = mongoose.model('User', userSchema);
```

### 4. Auth Controller (controllers/authController.js)

```javascript
const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  try {
    const { email, password, firstName, lastName, role, phone, address } = req.body;
    
    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ 
        success: false, 
        error: 'User already exists' 
      });
    }
    
    // Create new user
    user = new User({
      email,
      passwordHash: password,
      firstName,
      lastName,
      role,
      phone,
      address
    });
    
    await user.save();
    
    // Generate token
    const token = jwt.sign(
      { id: user._id, role: user.role, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );
    
    res.status(201).json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
      },
      token
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        error: 'Invalid credentials' 
      });
    }
    
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ 
        success: false, 
        error: 'Invalid credentials' 
      });
    }
    
    user.lastLogin = new Date();
    await user.save();
    
    const token = jwt.sign(
      { id: user._id, role: user.role, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );
    
    res.json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
      },
      token
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
```

### 5. Auth Routes (routes/auth.js)

```javascript
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verifyToken } = require('../middleware/auth');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/me', verifyToken, authController.getCurrentUser);

module.exports = router;
```

### 6. Socket.io Events (socket/events.js)

```javascript
module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);
    
    // Join user to personal room
    socket.on('join', (userId) => {
      socket.join(`user:${userId}`);
      console.log(`User ${userId} joined`);
    });
    
    // Broadcast pickup assignment
    socket.on('pickup:assigned', (data) => {
      io.to(`user:${data.collectorId}`).emit('notification', {
        type: 'pickup',
        title: 'New Pickup Assigned',
        message: `New pickup request from ${data.userName}`
      });
    });
    
    // Live location update
    socket.on('location:update', (data) => {
      io.to(`user:${data.pickupId}`).emit('location:updated', {
        latitude: data.latitude,
        longitude: data.longitude,
        timestamp: new Date()
      });
    });
    
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
};
```

---

## Database Seeding

Create initial data with seed script (seed.js):

```javascript
const mongoose = require('mongoose');
const User = require('./models/User');
const Recycler = require('./models/Recycler');

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  
  // Clear existing data
  await User.deleteMany({});
  await Recycler.deleteMany({});
  
  // Create admin user
  const admin = new User({
    email: 'admin@relink.eco',
    passwordHash: 'admin123',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin'
  });
  await admin.save();
  
  console.log('Database seeded successfully');
  process.exit(0);
}

seed().catch(err => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
```

---

## Running the Backend

```bash
# Development
npm run dev

# Production
npm start

# Seeding
npm run seed

# Testing
npm test
```

---

## Deployment (Heroku Example)

```bash
# Create Procfile
echo "web: node server.js" > Procfile

# Initialize git
git init
git add .
git commit -m "Initial commit"

# Deploy to Heroku
heroku create relink-backend
git push heroku main

# View logs
heroku logs --tail
```

---

## Key Features to Implement

1. **Email Notifications** - Send pickup confirmations, rewards updates
2. **SMS Alerts** - Real-time pickup status via SMS
3. **Payment Integration** - Razorpay/Stripe for rewards redemption
4. **Image Processing** - Compress and optimize device photos
5. **Caching** - Redis for leaderboard and analytics
6. **Batch Processing** - Scheduled jobs for analytics aggregation
7. **AI Integration** - Device category detection from photos
8. **Reporting** - Monthly CSR/impact reports generation

---

## Security Checklist

- [ ] Enable HTTPS in production
- [ ] Implement rate limiting
- [ ] Use environment variables for secrets
- [ ] Validate all inputs
- [ ] Implement CORS properly
- [ ] Use secure headers (helmet.js)
- [ ] Implement request logging
- [ ] Set up monitoring/alerting
- [ ] Regular backups of MongoDB
- [ ] API documentation with Swagger

---

## Testing

Run tests with:
```bash
npm test
```

Example test (tests/auth.test.js):
```javascript
const request = require('supertest');
const app = require('../server');

describe('Auth', () => {
  it('should signup a user', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send({
        email: 'test@example.com',
        password: 'password123',
        firstName: 'Test',
        lastName: 'User',
        role: 'user'
      });
    
    expect(res.statusCode).toBe(201);
    expect(res.body.token).toBeDefined();
  });
});
```

---

## Support & Resources

- **Docs**: https://relink-docs.example.com
- **Issues**: Report via GitHub Issues
- **Email**: backend@relink.eco
