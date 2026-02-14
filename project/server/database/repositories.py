"""
Database repository layer for CRUD operations.
Handles all MongoDB interactions for the Smart Patient Triage System.
"""
from datetime import datetime
from typing import Optional, List, Dict
from bson import ObjectId
from database.connection import get_db
from database.models import PatientDocument, PredictionDocument, UserDocument


class PatientRepository:
    """Repository for patient data operations."""
    
    @staticmethod
    async def create(patient_data: dict) -> str:
        """
        Insert a new patient document.
        
        Args:
            patient_data: Dictionary containing patient information
            
        Returns:
            str: Inserted patient document ID
        """
        db = get_db()
        patient_data["created_at"] = datetime.utcnow()
        patient_data["updated_at"] = datetime.utcnow()
        
        result = await db.patients.insert_one(patient_data)
        return str(result.inserted_id)
    
    @staticmethod
    async def find_by_id(patient_id: str) -> Optional[dict]:
        """Find patient by ID."""
        db = get_db()
        patient = await db.patients.find_one({"_id": ObjectId(patient_id)})
        if patient:
            patient["_id"] = str(patient["_id"])
        return patient
    
    @staticmethod
    async def find_all(limit: int = 100, skip: int = 0) -> List[dict]:
        """Get all patients with pagination."""
        db = get_db()
        cursor = db.patients.find().sort("created_at", -1).skip(skip).limit(limit)
        patients = await cursor.to_list(length=limit)
        
        for patient in patients:
            patient["_id"] = str(patient["_id"])
        
        return patients
    
    @staticmethod
    async def update(patient_id: str, update_data: dict) -> bool:
        """Update patient information."""
        db = get_db()
        update_data["updated_at"] = datetime.utcnow()
        
        result = await db.patients.update_one(
            {"_id": ObjectId(patient_id)},
            {"$set": update_data}
        )
        return result.modified_count > 0
    
    @staticmethod
    async def delete(patient_id: str) -> bool:
        """Delete patient by ID."""
        db = get_db()
        result = await db.patients.delete_one({"_id": ObjectId(patient_id)})
        return result.deleted_count > 0


class PredictionRepository:
    """Repository for prediction data operations."""
    
    @staticmethod
    async def create(prediction_data: dict) -> str:
        """
        Insert a new prediction document.
        
        Args:
            prediction_data: Dictionary containing prediction information
            
        Returns:
            str: Inserted prediction document ID
        """
        db = get_db()
        prediction_data["created_at"] = datetime.utcnow()
        
        # Convert patient_id to ObjectId if it's a string
        if isinstance(prediction_data.get("patient_id"), str):
            prediction_data["patient_id"] = ObjectId(prediction_data["patient_id"])
        
        result = await db.predictions.insert_one(prediction_data)
        return str(result.inserted_id)
    
    @staticmethod
    async def find_by_id(prediction_id: str) -> Optional[dict]:
        """Find prediction by ID."""
        db = get_db()
        prediction = await db.predictions.find_one({"_id": ObjectId(prediction_id)})
        if prediction:
            prediction["_id"] = str(prediction["_id"])
            prediction["patient_id"] = str(prediction["patient_id"])
        return prediction
    
    @staticmethod
    async def find_by_patient_id(patient_id: str, limit: int = 50) -> List[dict]:
        """Get all predictions for a specific patient."""
        db = get_db()
        cursor = db.predictions.find(
            {"patient_id": ObjectId(patient_id)}
        ).sort("created_at", -1).limit(limit)
        
        predictions = await cursor.to_list(length=limit)
        
        for pred in predictions:
            pred["_id"] = str(pred["_id"])
            pred["patient_id"] = str(pred["patient_id"])
        
        return predictions
    
    @staticmethod
    async def find_all(limit: int = 100, skip: int = 0) -> List[dict]:
        """Get all predictions with pagination."""
        db = get_db()
        cursor = db.predictions.find().sort("created_at", -1).skip(skip).limit(limit)
        predictions = await cursor.to_list(length=limit)
        
        for pred in predictions:
            pred["_id"] = str(pred["_id"])
            pred["patient_id"] = str(pred["patient_id"])
        
        return predictions
    
    @staticmethod
    async def find_by_risk_level(risk_level: str, limit: int = 100) -> List[dict]:
        """Find predictions by risk level."""
        db = get_db()
        cursor = db.predictions.find(
            {"risk_level": risk_level}
        ).sort("created_at", -1).limit(limit)
        
        predictions = await cursor.to_list(length=limit)
        
        for pred in predictions:
            pred["_id"] = str(pred["_id"])
            pred["patient_id"] = str(pred["patient_id"])
        
        return predictions
    
    @staticmethod
    async def update_review(prediction_id: str, reviewer_id: str, notes: str) -> bool:
        """Update prediction with review information."""
        db = get_db()
        result = await db.predictions.update_one(
            {"_id": ObjectId(prediction_id)},
            {
                "$set": {
                    "reviewed_by": ObjectId(reviewer_id),
                    "review_notes": notes
                }
            }
        )
        return result.modified_count > 0


class UserRepository:
    """Repository for user data operations."""
    
    @staticmethod
    async def create(user_data: dict) -> str:
        """Insert a new user document."""
        db = get_db()
        user_data["created_at"] = datetime.utcnow()
        user_data["is_active"] = user_data.get("is_active", True)
        
        result = await db.users.insert_one(user_data)
        return str(result.inserted_id)
    
    @staticmethod
    async def find_by_id(user_id: str) -> Optional[dict]:
        """Find user by ID."""
        db = get_db()
        user = await db.users.find_one({"_id": ObjectId(user_id)})
        if user:
            user["_id"] = str(user["_id"])
        return user
    
    @staticmethod
    async def find_by_email(email: str) -> Optional[dict]:
        """Find user by email address."""
        db = get_db()
        user = await db.users.find_one({"email": email})
        if user:
            user["_id"] = str(user["_id"])
        return user
    
    @staticmethod
    async def find_all(limit: int = 100, skip: int = 0) -> List[dict]:
        """Get all users with pagination."""
        db = get_db()
        cursor = db.users.find().sort("created_at", -1).skip(skip).limit(limit)
        users = await cursor.to_list(length=limit)
        
        for user in users:
            user["_id"] = str(user["_id"])
        
        return users
    
    @staticmethod
    async def update_last_login(user_id: str) -> bool:
        """Update user's last login timestamp."""
        db = get_db()
        result = await db.users.update_one(
            {"_id": ObjectId(user_id)},
            {"$set": {"last_login": datetime.utcnow()}}
        )
        return result.modified_count > 0
    
    @staticmethod
    async def update(user_id: str, update_data: dict) -> bool:
        """Update user information."""
        db = get_db()
        result = await db.users.update_one(
            {"_id": ObjectId(user_id)},
            {"$set": update_data}
        )
        return result.modified_count > 0
    
    @staticmethod
    async def delete(user_id: str) -> bool:
        """Delete user by ID."""
        db = get_db()
        result = await db.users.delete_one({"_id": ObjectId(user_id)})
        return result.deleted_count > 0
