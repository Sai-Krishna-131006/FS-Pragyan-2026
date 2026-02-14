import httpx
import logging
from fastapi import HTTPException

logger = logging.getLogger(__name__)

AI_BACKEND_URL = "http://localhost:8001"
PREDICT_ENDPOINT = f"{AI_BACKEND_URL}/predict"
REQUEST_TIMEOUT = 30.0


async def call_ai_predict(payload: dict) -> dict:
    """
    Calls the AI microservice POST /predict endpoint.

    Args:
        payload: Dict matching the AI backend's PatientInput schema:
            {age, gender, blood_pressure (int), heart_rate, temperature, symptoms, conditions}

    Returns:
        Dict with: {risk_level, confidence, recommended_department, explanation}

    Raises:
        HTTPException on timeout, connection error, or unexpected AI response.
    """
    try:
        async with httpx.AsyncClient(timeout=REQUEST_TIMEOUT) as client:
            response = await client.post(PREDICT_ENDPOINT, json=payload)
            response.raise_for_status()
            return response.json()

    except httpx.TimeoutException:
        logger.error("AI service request timed out after %ss", REQUEST_TIMEOUT)
        raise HTTPException(
            status_code=504,
            detail="AI prediction service timed out. Please try again.",
        )
    except httpx.ConnectError:
        logger.error("Cannot connect to AI service at %s", AI_BACKEND_URL)
        raise HTTPException(
            status_code=503,
            detail="AI prediction service is unavailable. Ensure it is running on port 8001.",
        )
    except httpx.HTTPStatusError as exc:
        logger.error(
            "AI service returned status %s: %s",
            exc.response.status_code,
            exc.response.text,
        )
        raise HTTPException(
            status_code=502,
            detail=f"AI service error: {exc.response.text}",
        )
    except Exception as exc:
        logger.error("Unexpected error calling AI service: %s", exc)
        raise HTTPException(
            status_code=500,
            detail="Internal error while contacting AI prediction service.",
        )
