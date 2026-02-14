from fastapi import FastAPI
from pydantic import BaseModel
from app.model_inference import predict_patient_json

app = FastAPI()

class PatientInput(BaseModel):
    age: int
    gender: str
    blood_pressure: int
    heart_rate: int
    temperature: float
    symptoms: list[str]
    conditions: list[str]

@app.post("/predict")
def predict(patient: PatientInput):
    return predict_patient_json(patient.dict())
