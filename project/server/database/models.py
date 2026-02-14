"""
MongoDB document models for the Smart Patient Triage System.
These define the structure and validation for database collections.
"""
from datetime import datetime
from typing import Optional, List, Dict
from pydantic import BaseModel, Field, EmailStr
from bson import ObjectId


class PyObjectId(ObjectId):
    """Custom type for MongoDB ObjectId serialization."""
    
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid ObjectId")
        return ObjectId(v)

    @classmethod
    def __modify_schema__(cls, field_schema):
        field_schema.update(type="string")


class PatientDocument(BaseModel):
    """Patient demographic and medical information."""
    
    id: Optional[PyObjectId] = Field(default=None, alias="_id")
    age: int = Field(..., ge=0, le=150)
    gender: str = Field(..., pattern="^(male|female|other)$")
    blood_pressure: str = Field(..., pattern=r"^\d+/\d+$")
    heart_rate: int = Field(..., ge=30, le=250)
    temperature: float = Field(..., ge=30.0, le=45.0)
    symptoms: List[str] = Field(default_factory=list)
    conditions: List[str] = Field(default_factory=list)
    notes: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}


class FeatureExplanationDocument(BaseModel):
    """AI model feature explanation."""
    
    feature: str
    impact: float


class PredictionDocument(BaseModel):
    """Triage prediction and AI assessment."""
    
    id: Optional[PyObjectId] = Field(default=None, alias="_id")
    patient_id: PyObjectId
    risk_level: str = Field(..., pattern="^(Low|Medium|High|Critical)$")
    recommended_department: str
    confidence_score: float = Field(..., ge=0.0, le=100.0)
    explanation: List[FeatureExplanationDocument] = Field(default_factory=list)
    model_version: Optional[str] = "1.0.0"
    input_data: Dict = Field(default_factory=dict)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    reviewed_by: Optional[PyObjectId] = None
    review_notes: Optional[str] = None

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}


class UserDocument(BaseModel):
    """Healthcare workers and system users."""
    
    id: Optional[PyObjectId] = Field(default=None, alias="_id")
    email: EmailStr
    full_name: str = Field(..., min_length=2)
    role: str = Field(..., pattern="^(admin|doctor|nurse|triage_staff)$")
    department: Optional[str] = None
    is_active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)
    last_login: Optional[datetime] = None

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
