// MongoDB Models for ReLink E-Waste Management System
// This document provides the MongoDB schema definitions for the ReLink platform

// ============= USER MODEL =============
/**
 * User Model - Represents individual users of the platform
 * Can be a regular user, collector, or recycler
 */
db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["email", "firstName", "lastName", "role", "passwordHash", "createdAt"],
      properties: {
        _id: { bsonType: "objectId" },
        email: { bsonType: "string", pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$" },
        firstName: { bsonType: "string" },
        lastName: { bsonType: "string" },
        phone: { bsonType: "string" },
        role: { enum: ["user", "collector", "recycler", "admin"] },
        passwordHash: { bsonType: "string" },
        avatar: { bsonType: "string" },
        
        // Address Information
        address: {
          bsonType: "object",
          properties: {
            street: { bsonType: "string" },
            city: { bsonType: "string" },
            state: { bsonType: "string" },
            pincode: { bsonType: "string" },
            country: { bsonType: "string" },
            latitude: { bsonType: "double" },
            longitude: { bsonType: "double" }
          }
        },
        
        // Reward & Impact Tracking
        rewardPoints: { bsonType: "int", minimum: 0 },
        carbonOffset: { bsonType: "double", minimum: 0 },
        totalDevicesRecycled: { bsonType: "int", minimum: 0 },
        
        // Account Status
        isVerified: { bsonType: "bool" },
        isActive: { bsonType: "bool" },
        
        // Timestamps
        createdAt: { bsonType: "date" },
        updatedAt: { bsonType: "date" },
        lastLogin: { bsonType: "date" }
      }
    }
  }
});

// Create indexes
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ role: 1 });
db.users.createIndex({ createdAt: -1 });

// ============= COLLECTOR MODEL =============
/**
 * Collector Model - Extends user for pickup service providers
 */
db.createCollection("collectors", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["userId", "registrationNumber", "verificationStatus"],
      properties: {
        _id: { bsonType: "objectId" },
        userId: { bsonType: "objectId" },
        registrationNumber: { bsonType: "string" },
        companyName: { bsonType: "string" },
        verificationStatus: { enum: ["pending", "approved", "rejected"] },
        verificationDocuments: { bsonType: "array", items: { bsonType: "string" } },
        
        // Performance Metrics
        pickupsCompleted: { bsonType: "int", minimum: 0 },
        rating: { bsonType: "double", minimum: 0, maximum: 5 },
        totalEarnings: { bsonType: "double", minimum: 0 },
        
        // Operating Area
        operatingRadius: { bsonType: "int" }, // in km
        serviceArea: {
          bsonType: "object",
          properties: {
            cities: { bsonType: "array", items: { bsonType: "string" } },
            states: { bsonType: "array", items: { bsonType: "string" } }
          }
        },
        
        // Availability
        availableSlots: { bsonType: "array" },
        isActive: { bsonType: "bool" },
        
        createdAt: { bsonType: "date" },
        updatedAt: { bsonType: "date" }
      }
    }
  }
});

db.collectors.createIndex({ userId: 1 }, { unique: true });
db.collectors.createIndex({ verificationStatus: 1 });
db.collectors.createIndex({ rating: -1 });

// ============= RECYCLER MODEL =============
/**
 * Recycler Model - Certified e-waste processing facilities
 */
db.createCollection("recyclers", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["userId", "companyName", "certifications"],
      properties: {
        _id: { bsonType: "objectId" },
        userId: { bsonType: "objectId" },
        companyName: { bsonType: "string" },
        registrationNumber: { bsonType: "string" },
        
        // Certifications
        certifications: { bsonType: "array", items: { bsonType: "string" } }, // ISO, E-Stewards, etc
        certificationDocuments: { bsonType: "array", items: { bsonType: "string" } },
        verificationStatus: { enum: ["pending", "approved", "rejected"] },
        
        // Processing Capabilities
        wasteTypeProcessed: { bsonType: "array", items: { bsonType: "string" } },
        processingCapacity: { bsonType: "double" }, // tons per month
        recyclingRate: { bsonType: "double", minimum: 0, maximum: 100 }, // percentage
        
        // Impact Metrics
        totalWasteProcessed: { bsonType: "double", minimum: 0 },
        materialsRecovered: { bsonType: "array" },
        
        // CSR & Impact
        csrInitiatives: { bsonType: "array", items: { bsonType: "string" } },
        jobsCreated: { bsonType: "int", minimum: 0 },
        
        // Facility Details
        facilityDetails: {
          bsonType: "object",
          properties: {
            address: { bsonType: "string" },
            latitude: { bsonType: "double" },
            longitude: { bsonType: "double" },
            phone: { bsonType: "string" },
            website: { bsonType: "string" }
          }
        },
        
        isActive: { bsonType: "bool" },
        createdAt: { bsonType: "date" },
        updatedAt: { bsonType: "date" }
      }
    }
  }
});

db.recyclers.createIndex({ userId: 1 }, { unique: true });
db.recyclers.createIndex({ verificationStatus: 1 });
db.recyclers.createIndex({ certifications: 1 });

// ============= PICKUP REQUEST MODEL =============
/**
 * Pickup Request Model - Tracks e-waste pickup requests
 */
db.createCollection("pickupRequests", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["userId", "pickupAddress", "pickupDate", "status"],
      properties: {
        _id: { bsonType: "objectId" },
        userId: { bsonType: "objectId" },
        collectorId: { bsonType: "objectId" },
        recyclerId: { bsonType: "objectId" },
        
        // Devices Information
        devices: {
          bsonType: "array",
          items: {
            bsonType: "object",
            properties: {
              _id: { bsonType: "objectId" },
              name: { bsonType: "string" },
              category: { bsonType: "string" },
              weight: { bsonType: "double" },
              condition: { enum: ["working", "not-working", "partially-working"] },
              photos: { bsonType: "array", items: { bsonType: "string" } },
              description: { bsonType: "string" }
            }
          }
        },
        
        // Pickup Details
        pickupAddress: {
          bsonType: "object",
          properties: {
            street: { bsonType: "string" },
            city: { bsonType: "string" },
            state: { bsonType: "string" },
            pincode: { bsonType: "string" },
            latitude: { bsonType: "double" },
            longitude: { bsonType: "double" }
          }
        },
        pickupDate: { bsonType: "date" },
        pickupTimeSlot: { bsonType: "string" },
        notes: { bsonType: "string" },
        
        // Status & Tracking
        status: { enum: ["scheduled", "confirmed", "in-transit", "collected", "processing", "completed", "cancelled"] },
        qrCode: { bsonType: "string" },
        trackingUpdates: { bsonType: "array" },
        
        // Rewards & Impact
        rewardPoints: { bsonType: "int", minimum: 0 },
        carbonOffset: { bsonType: "double", minimum: 0 },
        
        // Financial
        collectorPayment: { bsonType: "double" },
        processingFee: { bsonType: "double" },
        
        createdAt: { bsonType: "date" },
        updatedAt: { bsonType: "date" },
        completedAt: { bsonType: "date" }
      }
    }
  }
});

db.pickupRequests.createIndex({ userId: 1, createdAt: -1 });
db.pickupRequests.createIndex({ collectorId: 1, status: 1 });
db.pickupRequests.createIndex({ status: 1 });
db.pickupRequests.createIndex({ pickupDate: 1 });

// ============= REWARD MODEL =============
/**
 * Reward Model - Track reward points and transactions
 */
db.createCollection("rewards", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["userId", "pointsEarned", "category"],
      properties: {
        _id: { bsonType: "objectId" },
        userId: { bsonType: "objectId" },
        pointsEarned: { bsonType: "int" },
        pointsUsed: { bsonType: "int" },
        description: { bsonType: "string" },
        category: { enum: ["pickup", "referral", "badge", "recycled", "milestone"] },
        referenceId: { bsonType: "objectId" },
        
        // Redemption
        isRedeemed: { bsonType: "bool" },
        redeemedAt: { bsonType: "date" },
        redemptionDetails: { bsonType: "string" },
        
        // Expiry
        expiresAt: { bsonType: "date" },
        
        createdAt: { bsonType: "date" },
        updatedAt: { bsonType: "date" }
      }
    }
  }
});

db.rewards.createIndex({ userId: 1, createdAt: -1 });
db.rewards.createIndex({ isRedeemed: 1 });
db.rewards.createIndex({ expiresAt: 1 });

// ============= NOTIFICATION MODEL =============
/**
 * Notification Model - User notifications and alerts
 */
db.createCollection("notifications", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["userId", "type", "title", "message"],
      properties: {
        _id: { bsonType: "objectId" },
        userId: { bsonType: "objectId" },
        type: { enum: ["pickup", "reward", "alert", "info", "system"] },
        title: { bsonType: "string" },
        message: { bsonType: "string" },
        read: { bsonType: "bool" },
        actionUrl: { bsonType: "string" },
        actionData: { bsonType: "object" },
        
        createdAt: { bsonType: "date" },
        readAt: { bsonType: "date" }
      }
    }
  }
});

db.notifications.createIndex({ userId: 1, createdAt: -1 });
db.notifications.createIndex({ userId: 1, read: 1 });
db.notifications.createIndex({ createdAt: -1 }, { expireAfterSeconds: 2592000 }); // 30 days

// ============= ANALYTICS MODEL =============
/**
 * Analytics Model - System-wide metrics and dashboards
 */
db.createCollection("analytics", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      properties: {
        _id: { bsonType: "objectId" },
        userId: { bsonType: "objectId" },
        metricType: { enum: ["daily", "monthly", "yearly", "cumulative"] },
        
        // Pickup Metrics
        totalPickups: { bsonType: "int" },
        totalDevices: { bsonType: "int" },
        totalWeight: { bsonType: "double" },
        
        // Environmental Impact
        carbonOffset: { bsonType: "double" },
        materialsRecovered: { bsonType: "double" },
        landfillDiverted: { bsonType: "double" },
        
        // Financial
        totalRewardsEarned: { bsonType: "int" },
        totalRewardsRedeemed: { bsonType: "int" },
        
        // Time Period
        period: {
          bsonType: "object",
          properties: {
            startDate: { bsonType: "date" },
            endDate: { bsonType: "date" }
          }
        },
        
        createdAt: { bsonType: "date" },
        updatedAt: { bsonType: "date" }
      }
    }
  }
});

db.analytics.createIndex({ userId: 1, metricType: 1, period: -1 });

// ============= BADGE/ACHIEVEMENT MODEL =============
/**
 * Badge Model - Gamification achievements
 */
db.createCollection("badges", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["userId", "badgeType"],
      properties: {
        _id: { bsonType: "objectId" },
        userId: { bsonType: "objectId" },
        badgeType: { bsonType: "string" },
        title: { bsonType: "string" },
        description: { bsonType: "string" },
        icon: { bsonType: "string" },
        tier: { bsonType: "string" },
        
        // Criteria
        criteria: { bsonType: "object" },
        
        // Progress
        progress: { bsonType: "int" },
        target: { bsonType: "int" },
        
        // Status
        earned: { bsonType: "bool" },
        earnedAt: { bsonType: "date" },
        
        createdAt: { bsonType: "date" }
      }
    }
  }
});

db.badges.createIndex({ userId: 1, earned: 1 });

console.log("ReLink MongoDB models created successfully!");
