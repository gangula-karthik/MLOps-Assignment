import os
import logging
from functools import lru_cache
import pandas as pd
from pycaret.regression import load_model, predict_model
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

# Initialize FastAPI router
router = APIRouter()

# Set up logging
logging.basicConfig(level=logging.INFO)

# Load the trained model using caching to ensure it's loaded only once
@lru_cache()
def get_model():
    model_path = "./best_cb_model"
    logging.info(f"Loading model from: {model_path}")
    
    if not os.path.exists(model_path):
        logging.error(f"Model not found at {model_path}")
        raise FileNotFoundError(f"Model not found at {model_path}")
    
    try:
        model = load_model(model_path)
        logging.info("Model loaded successfully")
        return model
    except Exception as e:
        logging.error(f"Error loading model: {e}")
        raise HTTPException(status_code=500, detail="Error loading model")

# Load the model
model = get_model()

# Define Pydantic models for request and response
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
@router.post("/car_sales_weijun/predict", response_model=PredictionResult)
async def predict(data: CarFeatures):
    try:
        # Convert input data to dataframe for prediction
        data_df = pd.DataFrame([data.dict()])
        
        # Perform prediction using the loaded model
        predictions = predict_model(model, data=data_df)
        
        # Return prediction result
        return {"prediction": predictions["prediction_label"].iloc[0]}
    
    except Exception as e:
        logging.error(f"Prediction error: {e}")
        raise HTTPException(status_code=500, detail="Error in prediction")


@router.post("/car_sales_weijun/predict_V2", response_model=PredictionResult)
def predict(data: CarFeatures):
    data_df = pd.DataFrame([data.dict()])
    predictions = predict_model(model, data=data_df)
    return {"prediction": predictions["prediction_label"].iloc[0]}  
@router.post("/test")
def test_endpoint():
    return {"status": "ok"}
