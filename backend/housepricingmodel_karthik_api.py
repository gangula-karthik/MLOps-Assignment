import os
import pandas as pd
import io
import mlflow
import mlflow.sklearn
import functools
from fastapi import APIRouter, UploadFile, File
from pydantic import BaseModel
from typing import Optional
from dotenv import load_dotenv, find_dotenv
from pycaret.regression import load_model, predict_model

# Load environment variables
load_dotenv(find_dotenv())

# Set MLflow credentials
mlflow_username = os.getenv("MLFLOW_TRACKING_USERNAME")
mlflow_password = os.getenv("MLFLOW_TRACKING_PASSWORD")

mlflow.set_tracking_uri("https://dagshub.com/gangula-karthik/MLOps-Assignment.mlflow")

MODEL_NAME = "HousePricingModel_Karthik"
MODEL_VERSION = "latest"  # Change if you want a specific version
local_model_path = f"./local_models/{MODEL_NAME}/{MODEL_VERSION}"

# Ensure local model directory exists
os.makedirs(local_model_path, exist_ok=True)

# Lazy load function for the model
@functools.lru_cache(maxsize=1)
def get_model():
    """Loads and caches the ML model on first use"""
    # First try to load from local cache
    try:
        return mlflow.sklearn.load_model(local_model_path)
    except Exception as e:
        print(f"Local model not found, downloading from registry: {str(e)}")
        model = mlflow.sklearn.load_model(f"models:/{MODEL_NAME}/{MODEL_VERSION}")
        mlflow.sklearn.save_model(model, local_model_path)
        return model

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
    """Predicts house price using the ML model."""
    model = get_model()  # Load model lazily
    df = pd.DataFrame([data.dict()])
    df['Date'] = pd.to_datetime(df['Date'], format='%m/%d/%Y', errors='coerce')
    
    prediction = model.predict(df)
    return {"prediction": prediction[0]}


@router.post("/house_pricing_karthik/predict_batch")
def predict_batch(file: UploadFile = File(...)):
    """Predicts house prices for a batch of inputs from a CSV file and returns a CSV file with predictions."""
    model = get_model()

    contents = file.file.read()
    df = pd.read_csv(io.StringIO(contents.decode("utf-8")))

    if 'Date' in df.columns:
        df['Date'] = pd.to_datetime(df['Date'], format='%d/%m/%Y', errors='coerce')

    predictions = predict_model(model, data=df)

    output = io.StringIO()
    predictions.to_csv(output, index=False)
    output.seek(0)

    return {"filename": "predictions.csv", "content": output.getvalue()}
