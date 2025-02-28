# -*- coding: utf-8 -*-
import pandas as pd
from pycaret.regression import load_model, predict_model
from fastapi import APIRouter
import uvicorn
from pydantic import BaseModel

# Create the router
router = APIRouter()

# Load the trained model
model = load_model("best_cb_model")

# Pydantic models for request and response
class CarFeatures(BaseModel):
    Location: str
    Year: int
    Kilometers_Driven: int
    Fuel_Type: str
    Transmission: str
    Owner_Type: str
    Mileage: float
    Engine: float
    Power: float
    Seats: float
    Brand: str

class PredictionResult(BaseModel):
    prediction: float

# Prediction endpoint
@router.post("/predict", response_model=PredictionResult)
def predict_car_price(car_features: CarFeatures):
    features_df = pd.DataFrame([car_features.dict()])
    prediction = predict_model(model, data=features_df)
    return {"prediction": prediction["Label"].iloc[0]}