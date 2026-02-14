"""
API routes for patient and prediction data access.
"""
from fastapi import APIRouter, HTTPException
from typing import List, Optional
from database.repositories import PatientRepository, PredictionRepository, UserRepository

router = APIRouter(prefix="/api", tags=["data"])


# ============================================
# PATIENT ENDPOINTS
# ============================================

@router.get("/patients")
async def get_patients(limit: int = 100, skip: int = 0):
    """Get all patients with pagination."""
    try:
        patients = await PatientRepository.find_all(limit=limit, skip=skip)
        return {"patients": patients, "count": len(patients)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/patients/{patient_id}")
async def get_patient(patient_id: str):
    """Get a specific patient by ID."""
    try:
        patient = await PatientRepository.find_by_id(patient_id)
        if not patient:
            raise HTTPException(status_code=404, detail="Patient not found")
        return patient
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ============================================
# PREDICTION ENDPOINTS
# ============================================

@router.get("/predictions")
async def get_predictions(limit: int = 100, skip: int = 0):
    """Get all predictions with pagination."""
    try:
        predictions = await PredictionRepository.find_all(limit=limit, skip=skip)
        return {"predictions": predictions, "count": len(predictions)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/predictions/{prediction_id}")
async def get_prediction(prediction_id: str):
    """Get a specific prediction by ID."""
    try:
        prediction = await PredictionRepository.find_by_id(prediction_id)
        if not prediction:
            raise HTTPException(status_code=404, detail="Prediction not found")
        return prediction
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/predictions/patient/{patient_id}")
async def get_patient_predictions(patient_id: str, limit: int = 50):
    """Get all predictions for a specific patient."""
    try:
        predictions = await PredictionRepository.find_by_patient_id(patient_id, limit=limit)
        return {"predictions": predictions, "count": len(predictions)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/predictions/risk/{risk_level}")
async def get_predictions_by_risk(risk_level: str, limit: int = 100):
    """Get predictions filtered by risk level."""
    try:
        predictions = await PredictionRepository.find_by_risk_level(risk_level, limit=limit)
        return {"predictions": predictions, "count": len(predictions)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ============================================
# USER ENDPOINTS
# ============================================

@router.get("/users")
async def get_users(limit: int = 100, skip: int = 0):
    """Get all users with pagination."""
    try:
        users = await UserRepository.find_all(limit=limit, skip=skip)
        return {"users": users, "count": len(users)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/users/{user_id}")
async def get_user(user_id: str):
    """Get a specific user by ID."""
    try:
        user = await UserRepository.find_by_id(user_id)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        return user
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/users/email/{email}")
async def get_user_by_email(email: str):
    """Get a user by email address."""
    try:
        user = await UserRepository.find_by_email(email)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        return user
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
