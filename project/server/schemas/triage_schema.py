from pydantic import BaseModel


class TriageRequest(BaseModel):
    age: int
    gender: str
    symptoms: list[str]
    blood_pressure: str
    heart_rate: int
    temperature: float
    notes: str | None = None


class TriageResponse(BaseModel):
    risk_level: str
    department: str
    confidence: float
    explanation: list[str]


class FeatureExplanation(BaseModel):
    feature: str
    impact: float


class AITriagePredictResponse(BaseModel):
    risk_level: str
    recommended_department: str
    confidence_score: float
    explanation: list[FeatureExplanation]
