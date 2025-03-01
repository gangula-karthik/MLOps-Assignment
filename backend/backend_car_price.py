import pandas as pd
from pycaret.regression import load_model, predict_model
from fastapi import FastAPI, File, UploadFile, APIRouter
from fastapi.responses import FileResponse
import os
from io import StringIO
from pydantic import BaseModel
import uuid

# Create the router
router = APIRouter()

# Load the trained model
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

class PredictionResult(BaseModel):
    prediction: float


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

