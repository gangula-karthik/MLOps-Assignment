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
@router.post("/car_sales_weijun/predict", response_model=CarFeatures)
def predict(data: PredictionResult):
    data_df = pd.DataFrame([data.dict()])
    predictions = predict_model(model, data=data_df)
    return {"prediction": predictions["prediction_label"].iloc[0]}  