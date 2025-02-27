from fastapi import FastAPI
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
import os
from housepricingmodel_karthik_api import router as api1_router
from backend_car_price import router as api2_router
from wheatseeds_gabriel_api import router as api3_router

# Create FastAPI app
app = FastAPI(title="MLOps Merged Backend Application")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Include all routers
app.include_router(api1_router, prefix="/api1", tags=["API 1"])
app.include_router(api2_router, prefix="/api2", tags=["API 2"])
app.include_router(api3_router, prefix="/api3", tags=["API 3"])

# Root endpoint
@app.get("/")
def home():
    return {"message": "Welcome to the Merged FastAPI App!"}

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
