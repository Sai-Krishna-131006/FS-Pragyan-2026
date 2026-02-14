from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.triage import router as triage_router
from routes.data import router as data_router
from database.connection import connect_db, close_db

app = FastAPI(title="Smart Patient Triage API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(triage_router)
app.include_router(data_router)


@app.on_event("startup")
async def startup_event():
    """Initialize database connection on application startup."""
    await connect_db()
    print("✅ Connected to MongoDB")


@app.on_event("shutdown")
async def shutdown_event():
    """Close database connection on application shutdown."""
    await close_db()
    print("❌ Disconnected from MongoDB")


@app.get("/")
async def health_check():
    return {"status": "ok"}
