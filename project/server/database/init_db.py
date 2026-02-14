"""
MongoDB Database Initialization Script
Run this script to set up indexes and optionally create sample data.

Usage:
    python -m database.init_db
"""
import asyncio
import os
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime


MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
DB_NAME = "smart_triage"


async def create_indexes():
    """Create indexes for better query performance."""
    client = AsyncIOMotorClient(MONGO_URI)
    db = client[DB_NAME]
    
    print("🔧 Creating indexes...")
    
    # PATIENTS INDEXES
    await db.patients.create_index([("created_at", -1)])
    await db.patients.create_index([("age", 1)])
    await db.patients.create_index([("gender", 1)])
    print("✅ Patient indexes created")
    
    # PREDICTIONS INDEXES
    await db.predictions.create_index([("patient_id", 1)])
    await db.predictions.create_index([("created_at", -1)])
    await db.predictions.create_index([("risk_level", 1)])
    await db.predictions.create_index([("recommended_department", 1)])
    await db.predictions.create_index([("confidence_score", -1)])
    await db.predictions.create_index([("patient_id", 1), ("created_at", -1)])
    print("✅ Prediction indexes created")
    
    # USERS INDEXES
    await db.users.create_index([("email", 1)], unique=True)
    await db.users.create_index([("role", 1)])
    await db.users.create_index([("is_active", 1)])
    print("✅ User indexes created")
    
    client.close()


async def create_sample_data():
    """Create sample data for testing."""
    client = AsyncIOMotorClient(MONGO_URI)
    db = client[DB_NAME]
    
    print("📝 Creating sample data...")
    
    # Sample Patient
    patient_id = await db.patients.insert_one({
        "age": 45,
        "gender": "male",
        "blood_pressure": "140/90",
        "heart_rate": 88,
        "temperature": 37.5,
        "symptoms": ["chest pain", "shortness of breath"],
        "conditions": ["hypertension"],
        "notes": "Patient arrived via ambulance",
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    })
    print(f"✅ Sample patient created: {patient_id.inserted_id}")
    
    # Sample Prediction
    prediction_id = await db.predictions.insert_one({
        "patient_id": patient_id.inserted_id,
        "risk_level": "High",
        "recommended_department": "Emergency",
        "confidence_score": 87.5,
        "explanation": [
            {"feature": "chest_pain", "impact": 0.35},
            {"feature": "age", "impact": 0.22},
            {"feature": "heart_rate", "impact": 0.18}
        ],
        "model_version": "1.0.0",
        "input_data": {
            "age": 45,
            "gender": "male",
            "blood_pressure": 140,
            "heart_rate": 88,
            "temperature": 37.5,
            "symptoms": ["chest pain", "shortness of breath"],
            "conditions": ["hypertension"]
        },
        "created_at": datetime.utcnow()
    })
    print(f"✅ Sample prediction created: {prediction_id.inserted_id}")
    
    # Sample User
    user_id = await db.users.insert_one({
        "email": "doctor@hospital.com",
        "full_name": "Dr. Sarah Johnson",
        "role": "doctor",
        "department": "Emergency",
        "is_active": True,
        "created_at": datetime.utcnow(),
        "last_login": datetime.utcnow()
    })
    print(f"✅ Sample user created: {user_id.inserted_id}")
    
    client.close()


async def init_database(include_sample_data=False):
    """Initialize database with indexes and optionally sample data."""
    print(f"🚀 Initializing {DB_NAME} database...")
    print(f"📍 MongoDB URI: {MONGO_URI[:50]}...")
    
    await create_indexes()
    
    if include_sample_data:
        await create_sample_data()
    
    print("✅ Database initialization complete!")


if __name__ == "__main__":
    import sys
    
    # Check if --sample flag is provided
    include_samples = "--sample" in sys.argv
    
    # Load environment variables
    from dotenv import load_dotenv
    load_dotenv()
    
    MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
    
    asyncio.run(init_database(include_sample_data=include_samples))
