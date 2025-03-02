# import pandas as pd
# from pycaret.regression import load_model, predict_model
# from fastapi import FastAPI, File, UploadFile, APIRouter
# from fastapi.responses import FileResponse
# import os
# from io import StringIO
# from pydantic import BaseModel
# import uuid

# import os
# import pandas as pd
# import io
# import mlflow
# import mlflow.sklearn
# import functools
# from fastapi import APIRouter, UploadFile, File
# from pydantic import BaseModel
# from typing import Optional
# from dotenv import load_dotenv, find_dotenv
# from pycaret.regression import load_model, predict_model

import pandas as pd
from pycaret.regression import load_model, predict_model
from fastapi import APIRouter
import uvicorn
from pydantic import BaseModel
from functools import lru_cache
# from fastapi.logger import logger
import logging
import os
# Create the router
router = APIRouter()
# Load the trained model



@lru_cache()
def get_model():
    model_path = "./best_cb_model"
    logging.info("Loading model from: %s", model_path,flush=True)
    logging.info("Model exists: %s", os.path.exists(model_path),flush=True)
    try:
        model = load_model(model_path)
        logging.info("Model loaded successfully")
        return model
    except Exception as e:
        logging.error(f"Error loading model: {str(e)}")
        raise
model = get_model()


print("Current working directory:", os.getcwd(),flush=True)
# backend_car_price.py
print("backend_car_price.py loaded successfully")

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
@router.post("/car_sales_weijun/predict", response_model=PredictionResult)
def predict(data: CarFeatures):
    data_df = pd.DataFrame([data.dict()])
    predictions = predict_model(model, data=data_df)
    return {"prediction": predictions["prediction_label"].iloc[0]}  

@router.post("/car_sales_weijun/predict_V2", response_model=PredictionResult)
def predict(data: CarFeatures):
    data_df = pd.DataFrame([data.dict()])
    predictions = predict_model(model, data=data_df)
    return {"prediction": predictions["prediction_label"].iloc[0]}  
@router.post("/test")
def test_endpoint():
    return {"status": "ok"}
# # Define prediction endpoint for batch prediction
# @router.post("/car_sales_weijun/batch_predict")
# async def batch_predict(file: UploadFile = File(...)):
#     # Ensure the uploaded file is CSV
#     if not file.filename.endswith(".csv"):
#         return {"error": "Invalid file type. Please upload a CSV file."}

#     # Read the file content
#     content = await file.read()
    
#     try:
#         # Decode the CSV content
#         df = pd.read_csv(StringIO(content.decode("utf-8")))
#     except Exception as e:
#         return {"error": f"Error reading the file: {str(e)}"}

#     # Required columns
#     required_columns = [
#         "Location", "Year", "Kilometers_Driven", "Fuel_Type", "Transmission", 
#         "Owner_Type", "Mileage", "Engine", "Power", "Seats", "Brand"
#     ]
    
#     # Validate columns
#     missing_columns = [col for col in required_columns if col not in df.columns]
#     if missing_columns:
#         return {"error": f"Missing required columns: {missing_columns}"}

#     try:
#         predictions = predict_model(model, data=df)
#         df["Prediction"] = predictions["prediction_label"]
#         # Convert DataFrame to JSON and return it
#         return df.to_dict(orient="records")
#     except Exception as e:
#         return {"error": f"Error during prediction: {str(e)}"}

    
#     #return df.to_dict(orient="records")

# # Run the FastAPI server
# if __name__ == "__main__":
#     uvicorn.run(app, host="127.0.0.1", port=8000)
