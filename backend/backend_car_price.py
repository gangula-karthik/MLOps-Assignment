# -*- coding: utf-8 -*-
import pandas as pd
from pycaret.regression import load_model, predict_model
from fastapi import FastAPI
from fastapi import APIRouter
import uvicorn
from pydantic import BaseModel

# Create the app
router = APIRouter()

# Load trained Pipeline
model = load_model("./best_cb_model")


# Define input/output models using Pydantic
class InputModel(BaseModel):
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


class OutputModel(BaseModel):
    prediction: float


# Define predict function
@router.post("/car_sales_weijun/predict", response_model=OutputModel)
def predict(data: InputModel):
    data_df = pd.DataFrame([data.dict()])
    predictions = predict_model(model, data=data_df)
    return {"prediction": predictions["prediction_label"].iloc[0]}