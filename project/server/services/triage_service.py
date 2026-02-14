import logging
from schemas.triage_schema import TriageRequest, TriageResponse
from services.ai_service import call_ai_predict

logger = logging.getLogger(__name__)


def _parse_systolic_bp(blood_pressure: str) -> int:
    """Extract systolic (first number) from 'systolic/diastolic' string."""
    try:
        return int(blood_pressure.strip().split("/")[0])
    except (ValueError, IndexError):
        logger.warning("Could not parse blood_pressure '%s', defaulting to 120", blood_pressure)
        return 120


def _build_ai_payload(data: TriageRequest) -> dict:
    """Transform a TriageRequest into the AI backend's PatientInput format."""
    return {
        "age": data.age,
        "gender": data.gender,
        "blood_pressure": _parse_systolic_bp(data.blood_pressure),
        "heart_rate": data.heart_rate,
        "temperature": data.temperature,
        "symptoms": data.symptoms,
        "conditions": data.conditions,
    }


async def run_triage(data: TriageRequest) -> TriageResponse:
    """
    Call the AI microservice and transform its response
    into the TriageResponse expected by the frontend.
    """
    payload = _build_ai_payload(data)
    ai_result = await call_ai_predict(payload)

    explanation_strings = [
        f"{item['feature']} (impact: {item['impact']})"
        for item in ai_result.get("explanation", [])
    ]

    return TriageResponse(
        risk_level=ai_result["risk_level"],
        department=ai_result["recommended_department"],
        confidence=round(ai_result["confidence"] / 100.0, 4),
        explanation=explanation_strings,
    )


async def run_triage_raw(data: TriageRequest) -> dict:
    """
    Call the AI microservice and return the raw structured response
    with risk_level, recommended_department, confidence_score, explanation.
    """
    payload = _build_ai_payload(data)
    ai_result = await call_ai_predict(payload)

    return {
        "risk_level": ai_result["risk_level"],
        "recommended_department": ai_result["recommended_department"],
        "confidence_score": ai_result["confidence"],
        "explanation": ai_result.get("explanation", []),
    }
