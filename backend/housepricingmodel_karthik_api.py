import os
import pandas as pd
import mlflow
import mlflow.sklearn
from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional
from dotenv import load_dotenv, find_dotenv


# Load environment variables
load_dotenv(find_dotenv())

# Set MLflow credentials
mlflow_username = os.getenv("MLFLOW_TRACKING_USERNAME")
mlflow_password = os.getenv("MLFLOW_TRACKING_PASSWORD")

mlflow.set_tracking_uri("https://dagshub.com/gangula-karthik/MLOps-Assignment.mlflow")

MODEL_NAME = "HousePricingModel_Karthik"
MODEL_VERSION = "latest"  # Change if you want a specific version
local_model_path = f"./local_models/{MODEL_NAME}/{MODEL_VERSION}"

# Load model once at startup
if not os.path.exists(local_model_path):
    os.makedirs(local_model_path, exist_ok=True)
    model = mlflow.sklearn.load_model(f"models:/{MODEL_NAME}/{MODEL_VERSION}")
    mlflow.sklearn.save_model(model, local_model_path)
else:
    model = mlflow.sklearn.load_model(local_model_path)

# Initialize API Router
router = APIRouter()

class HouseFeatures(BaseModel):
    Suburb: str
    Rooms: int
    Type: str
    Method: str
    Seller: str
    Date: str 
    Distance: float
    Bedroom2: int
    Bathroom: int
    Car: Optional[float] = None
    Landsize: Optional[float] = None
    YearBuilt: Optional[float] = None
    CouncilArea: str
    Lattitude: float
    Longtitude: float
    Region: str

class PredictionOutput(BaseModel):
    prediction: float

@router.post("/house_pricing_karthik/predict", response_model=PredictionOutput)
def predict_price(data: HouseFeatures):
    df = pd.DataFrame([data.dict()])
    df['Date'] = pd.to_datetime(df['Date'], format='%d/%m/%Y', errors='coerce')
    prediction = model.predict(df)
    return {"prediction": prediction[0]}
