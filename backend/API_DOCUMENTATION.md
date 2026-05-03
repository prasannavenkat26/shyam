# ReLink Backend API Documentation

## Overview
Complete REST API specification for the ReLink E-Waste Management Platform. This document outlines all required endpoints, request/response formats, and authentication requirements.

## Base URL
```
http://localhost:5000/api
```

## Authentication
All protected endpoints require JWT token in Authorization header:
```
Authorization: Bearer <token>
```

---

## Authentication Endpoints

### POST /auth/signup
Register a new user account
```json
Request:
{
  "email": "user@example.com",
  "password": "securepassword",
  "firstName": "John",
  "lastName": "Doe",
  "role": "user", // user, collector, recycler
  "phone": "+91 9876543210",
  "address": {
    "street": "123 Main St",
    "city": "Bangalore",
    "state": "Karnataka",
    "pincode": "560001"
  }
}

Response (200):
{
  "success": true,
  "user": { ... },
  "token": "jwt_token_here"
}
```

### POST /auth/login
Authenticate user
```json
Request:
{
  "email": "user@example.com",
  "password": "securepassword"
}

Response (200):
{
  "success": true,
  "user": { ... },
  "token": "jwt_token_here"
}
```

### POST /auth/logout
Logout user (protected)
```
Response (200): { "success": true }
```

### POST /auth/refresh
Refresh authentication token (protected)
```
Response (200): { "token": "new_jwt_token" }
```

### GET /auth/me
Get current user profile (protected)
```
Response (200): { ... user data ... }
```

---

## User Management Endpoints

### GET /users/:id
Get user profile by ID
```
Response (200): { ... user data ... }
```

### PUT /users/:id
Update user profile (protected)
```json
Request:
{
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+91 9876543210",
  "address": { ... }
}

Response (200): { ... updated user data ... }
```

### DELETE /users/:id
Delete user account (protected)
```
Response (200): { "success": true }
```

---

## Pickup Request Endpoints

### POST /pickups
Create new pickup request (protected)
```json
Request:
{
  "devices": [
    {
      "name": "Dell Laptop",
      "category": "Laptop",
      "weight": 2.5,
      "condition": "not-working",
      "photos": ["url1", "url2"],
      "description": "Screen is broken"
    }
  ],
  "pickupAddress": {
    "street": "123 Main St",
    "city": "Bangalore",
    "state": "Karnataka",
    "pincode": "560001",
    "latitude": 12.9716,
    "longitude": 77.5946
  },
  "pickupDate": "2024-05-20",
  "pickupTimeSlot": "10:00 AM - 12:00 PM",
  "notes": "Call before arriving"
}

Response (201):
{
  "success": true,
  "pickup": { ... pickup data with QR code ... }
}
```

### GET /pickups/user/:userId
Get all pickups for user (protected)
```
Response (200): { "pickups": [ ... ] }
```

### GET /pickups/:id
Get specific pickup request by ID
```
Response (200): { ... pickup data ... }
```

### PATCH /pickups/:id
Update pickup request status (protected)
```json
Request:
{
  "status": "in-transit",
  "collectorId": "collector_id_here"
}

Response (200): { ... updated pickup ... }
```

### POST /pickups/:id/cancel
Cancel pickup request (protected)
```json
Request:
{
  "reason": "Change of plans"
}

Response (200): { "success": true }
```

### GET /pickups/collector/:collectorId
Get pickups assigned to collector (protected)
```
Response (200): { "pickups": [ ... ] }
```

---

## Collector Endpoints

### GET /collectors/available
Get available collectors near location
```
Query: ?latitude=12.9716&longitude=77.5946&radius=10

Response (200):
{
  "collectors": [
    {
      "id": "...",
      "name": "...",
      "distance": 2.5,
      "rating": 4.8,
      "availability": [...]
    }
  ]
}
```

### POST /pickups/:id/assign
Assign pickup to collector
```json
Request:
{
  "collectorId": "collector_id_here"
}

Response (200): { "success": true }
```

### GET /collectors/:id/analytics
Get collector performance analytics (protected)
```
Response (200):
{
  "totalPickups": 150,
  "completedPickups": 148,
  "earnings": 25000,
  "rating": 4.8,
  "weeklyRevenue": [ ... ]
}
```

---

## Rewards Endpoints

### GET /rewards/user/:userId
Get user rewards (protected)
```
Response (200): { "rewards": [ ... ] }
```

### GET /rewards/points/:userId
Get user reward points balance (protected)
```
Response (200): { "points": 2450 }
```

### POST /rewards/:userId/redeem
Redeem reward points (protected)
```json
Request:
{
  "points": 500,
  "rewardType": "discount"
}

Response (200): { "success": true }
```

### GET /rewards/leaderboard
Get global leaderboard (top users by points)
```
Query: ?limit=10

Response (200):
{
  "leaderboard": [
    {
      "rank": 1,
      "userId": "...",
      "name": "John Doe",
      "points": 5000
    }
  ]
}
```

### GET /rewards/achievements/:userId
Get user achievements and badges (protected)
```
Response (200): { "badges": [ ... ] }
```

---

## Analytics Endpoints

### GET /analytics/user/:userId
Get user analytics dashboard (protected)
```
Response (200):
{
  "totalPickups": 24,
  "totalDevices": 45,
  "carbonOffset": 1200,
  "rewardPoints": 2450,
  "weeklyPickups": [ ... ],
  "categoryDistribution": [ ... ]
}
```

### GET /analytics/collector/:collectorId
Get collector analytics (protected)
```
Response (200):
{
  "totalPickups": 150,
  "completedPickups": 148,
  "earnings": 25000,
  "rating": 4.8,
  "weeklyRevenue": [ ... ]
}
```

### GET /analytics/recycler/:recyclerId
Get recycler analytics (protected)
```
Response (200):
{
  "wasteProcessed": 500,
  "recyclingRate": 92,
  "materialsRecovered": [ ... ],
  "monthlyProcessing": [ ... ]
}
```

### GET /analytics/impact
Get global environmental impact metrics
```
Response (200):
{
  "totalEWasteCollected": 50000,
  "carbonPreventated": 5000000,
  "activeUsers": 10000,
  "certifiedRecyclers": 500
}
```

### GET /analytics/stats/:role
Get dashboard statistics by role (protected)
```
Query: ?role=user

Response (200): { ... role-specific stats ... }
```

---

## Notification Endpoints

### GET /notifications/user/:userId
Get user notifications (protected)
```
Response (200): { "notifications": [ ... ] }
```

### PATCH /notifications/:id
Mark notification as read (protected)
```json
Request:
{
  "read": true
}

Response (200): { "success": true }
```

### POST /notifications/user/:userId/mark-all-read
Mark all notifications as read (protected)
```
Response (200): { "success": true }
```

### DELETE /notifications/:id
Delete notification (protected)
```
Response (200): { "success": true }
```

---

## Recycler/Admin Endpoints

### POST /recyclers/verify
Admin endpoint to verify recycler (protected - admin only)
```json
Request:
{
  "recyclerId": "recycler_id_here",
  "status": "approved"
}

Response (200): { "success": true }
```

### GET /recyclers/pending
Get pending recycler applications (protected - admin only)
```
Response (200): { "recyclers": [ ... ] }
```

### GET /admin/users
Get all users with filtering (protected - admin only)
```
Query: ?role=user&limit=10&offset=0

Response (200): { "users": [ ... ], "total": 1000 }
```

### GET /admin/analytics/dashboard
Admin dashboard analytics (protected - admin only)
```
Response (200):
{
  "totalUsers": 10000,
  "totalPickups": 50000,
  "totalCarbonOffset": 5000000,
  "activeCollectors": 500,
  "systemHealth": { ... }
}
```

---

## Error Responses

All endpoints return standard error format:
```json
{
  "success": false,
  "error": "Error message",
  "statusCode": 400
}
```

Common error codes:
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

---

## Rate Limiting

API implements rate limiting:
- 100 requests per minute for authenticated users
- 20 requests per minute for unauthenticated users

---

## WebSocket Events (Real-time)

Connect to: `ws://localhost:5000/socket.io`

### Events:
- `pickup:assigned` - New pickup assigned to collector
- `pickup:status_update` - Pickup status changed
- `reward:earned` - User earned reward points
- `notification:new` - New notification for user
- `collector:location_update` - Collector location update

---

## File Upload Endpoints

### POST /upload
Upload device photos or documents
```
Content-Type: multipart/form-data
File: image or document

Response (200):
{
  "success": true,
  "url": "https://cdn.relink.eco/uploads/filename.jpg"
}
```

---

## Implementation Notes

1. All timestamps are in ISO 8601 format
2. All monetary amounts are in INR (₹)
3. All distances are in kilometers
4. Carbon offset is in kg CO₂ equivalent
5. All IDs are MongoDB ObjectIds
6. Use pagination for large result sets (limit: 50, offset: 0)
7. Implement caching for analytics endpoints
8. Use middleware to verify JWT tokens
9. Implement rate limiting to prevent abuse
10. Log all API accesses for audit trail

---

## Socket.io Real-time Features

Implement real-time features using Socket.io:
- Live pickup location tracking
- Real-time notifications
- Live collector availability updates
- Notification badges
- Dashboard live updates

---

## Security Considerations

1. Always validate input data
2. Use HTTPS in production
3. Implement CORS properly
4. Sanitize all user inputs
5. Hash all passwords with bcrypt
6. Implement proper JWT expiration
7. Use environment variables for secrets
8. Implement API key rotation
9. Monitor for suspicious activities
10. Regular security audits

---

## Testing

Use provided Postman collection for API testing:
- Import `ReLink_API.postman_collection.json`
- Set up environment variables
- Run tests for each endpoint group

---

## Version History

- v1.0 - Initial API specification
- Future: v2.0 with GraphQL support
