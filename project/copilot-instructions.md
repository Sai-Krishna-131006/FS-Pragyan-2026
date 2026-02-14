# Copilot Agent Instructions
Project: AI-Powered Smart Patient Triage System
Stack: React (Frontend) + FastAPI (Backend) + MongoDB + ML Model
Environment: 30-Hour Hackathon MVP
Goal: Clean, scalable, production-ready prototype with AI explainability

---

## 1. Core Development Philosophy

You are building a healthcare AI MVP. Code must be:

- Modular
- Readable
- Extensible
- Testable
- Deterministic
- Production-structured (even if simplified)

Avoid:
- Monolithic files
- Hardcoded values
- Repeated logic
- Over-engineering
- Unnecessary abstractions

Follow SOLID principles wherever reasonable.

---

## 2. Architecture Guidelines

Follow layered architecture:

Frontend:
- Components
- Services (API layer)
- Utilities
- State management (minimal, clean)

Backend:
- Routes layer
- Service layer (business logic)
- Model layer (ML inference only)
- Database layer
- Validation layer
- Explainability module

Never mix:
- DB logic inside route handlers
- ML logic inside route handlers
- UI logic inside services

---

## 3. Backend (FastAPI) Rules

- Use Pydantic schemas for all request/response validation
- All endpoints must return structured JSON
- Add type hints everywhere
- Use async where possible
- Add error handling with HTTPException
- Add basic logging

Folder Structure:

server/
    main.py
    routes/
    services/
    models/
    database/
    schemas/
    utils/

---

## 4. Frontend (React) Rules

- Functional components only
- Use hooks
- No class components
- Separate UI from API logic
- Use Axios for API calls
- Keep state minimal and predictable
- No inline complex logic inside JSX

Folder Structure:

client/
    src/
        components/
        pages/
        services/
        utils/
        hooks/

---

## 5. AI Model Integration Rules

- Model inference must be isolated in a service module
- No training logic inside backend runtime
- Load model once at startup
- Add confidence score to every prediction
- Include top contributing factors (SHAP or feature importance)

Response format must always include:
{
  risk_level,
  department,
  confidence,
  explanation
}

---

## 6. Database Rules (MongoDB)

- Use a single connection manager
- No raw DB calls in routes
- Store timestamps
- Store model version with prediction
- Ensure schema consistency

Collections:
- users
- patients
- predictions

---

## 7. Validation Rules

- Validate vitals ranges
- Validate required fields
- Handle missing values gracefully
- Return meaningful error messages

Never allow:
- Crashes on bad input
- Silent failures

---

## 8. Security & Safety (MVP Level)

- Sanitize file uploads
- Limit file size
- Validate file type (PDF only)
- Never execute uploaded content

---

## 9. Performance & Scalability

- Keep functions small and reusable
- Avoid synchronous blocking code
- Structure code for containerization
- Make API stateless

---

## 10. Code Quality Standards

- Use descriptive variable names
- Add docstrings for functions
- Add comments for non-obvious logic
- Avoid magic numbers
- Keep functions under 40 lines where possible

---

## 11. Hackathon Constraint Awareness

This is an MVP.

Prioritize:
- Working AI pipeline
- Explainability
- Clean dashboard
- Stable API

Do NOT:
- Add unnecessary features
- Add authentication complexity unless stable
- Build microservices unless required

---

## 12. Testing Philosophy

- Add basic endpoint tests
- Manually test edge cases
- Validate AI outputs
- Ensure deterministic demo behavior

---

## 13. Output Expectations

Final product must include:
- Risk classification
- Department recommendation
- Confidence score
- Explainability layer
- Clean dashboard
- Document upload capability

The system must be demo-ready within 30 hours.

Maintain clarity, stability, and structured implementation.
