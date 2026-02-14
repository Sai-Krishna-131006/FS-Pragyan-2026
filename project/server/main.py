from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.triage import router as triage_router

app = FastAPI(title="Smart Patient Triage API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(triage_router)


@app.get("/")
async def health_check():
    return {"status": "ok"}
