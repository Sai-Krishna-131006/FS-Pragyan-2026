from fastapi import APIRouter
from schemas.triage_schema import TriageRequest, TriageResponse, AITriagePredictResponse
from services.triage_service import run_triage, run_triage_raw

router = APIRouter()


@router.post("/triage", response_model=TriageResponse)
async def triage(data: TriageRequest):
    return await run_triage(data)


@router.post("/api/triage/predict", response_model=AITriagePredictResponse)
async def triage_predict(data: TriageRequest):
    return await run_triage_raw(data)
