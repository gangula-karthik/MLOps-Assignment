import pandas as pd
from pycaret.regression import load_model, predict_model
from fastapi import FastAPI, File, UploadFile, APIRouter
from fastapi.responses import FileResponse
import os
from io import StringIO
from pydantic import BaseModel
import uuid

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

class PredictionResult(BaseModel):
    prediction: float

# Load the trained model
# model = load_model("best_cb_model")
# print('car ok')


# Load environment variables
load_dotenv(find_dotenv())

# Set MLflow credentials
mlflow_username = os.getenv("MLFLOW_TRACKING_USERNAME")
mlflow_password = os.getenv("MLFLOW_TRACKING_PASSWORD")

mlflow.set_tracking_uri("https://dagshub.com/gangula-karthik/MLOps-Assignment.mlflow")

MODEL_NAME = "CarPricingModel"
MODEL_VERSION = "latest"  # You can specify a version like "1" if needed
local_model_path = f"./local_models/{MODEL_NAME}/{MODEL_VERSION}"

# Ensure local model directory exists
os.makedirs(local_model_path, exist_ok=True)

model = mlflow.sklearn.load_model(f"models:/{MODEL_NAME}/{MODEL_VERSION}")
mlflow.sklearn.save_model(model, local_model_path)
# Create the router
router = APIRouter()

# Define prediction endpoint for single prediction
@router.post("/car_sales_weijun/predict", response_model=PredictionResult)
def predict(data: InputModel):
    data_df = pd.DataFrame([data.dict()])
    predictions = predict_model(model, data=data_df)
    return {"prediction": predictions["prediction_label"].iloc[0]}


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
