import pandas as pd
import mlflow
import mlflow.sklearn
from pycaret.regression import load_model
from pydantic import BaseModel
import os
from typing import Optional
from dotenv import load_dotenv, find_dotenv
from fastapi import APIRouter


router = APIRouter()

load_dotenv(find_dotenv())
mlflow_username = os.environ["MLFLOW_TRACKING_USERNAME"]
mlflow_password = os.environ["MLFLOW_TRACKING_PASSWORD"]

# mlflow.set_tracking_uri("https://dagshub.com/gangula-karthik/MLOps-Assignment.mlflow")  

# MODEL_NAME = "HousePricingModel_Karthik"
# MODEL_VERSION = "latest"  # Change to specific version if needed
# model = mlflow.sklearn.load_model(f"models:/{MODEL_NAME}/{MODEL_VERSION}")

model = load_model("./house_pricing_pipeline") # due to out of memory errors, the model will be stored here

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
    prediction = model.predict(df)
    return {"prediction": prediction[0]}
