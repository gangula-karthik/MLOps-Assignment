import pandas as pd
from pycaret.regression import load_model, predict_model
from fastapi import FastAPI, File, UploadFile, APIRouter
from fastapi.responses import FileResponse
import os
from io import StringIO
from pydantic import BaseModel
import uuid

# Create the app
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


class OutputModel(BaseModel):
    prediction: float


# Define prediction endpoint for single prediction
@router.post("/car_sales_weijun/predict", response_model=OutputModel)
def predict(data: InputModel):
    data_df = pd.DataFrame([data.dict()])
    predictions = predict_model(model, data=data_df)
    return {"prediction": predictions["prediction_label"].iloc[0]}


# Define prediction endpoint for batch prediction
@router.post("/car_sales_weijun/batch_predict")
async def batch_predict(file: UploadFile = File(...)):
    # Ensure the uploaded file is CSV
    if not file.filename.endswith(".csv"):
        return {"error": "Invalid file type. Please upload a CSV file."}

    # Read the file into a DataFrame
    try:
        content = await file.read()
        df = pd.read_csv(StringIO(content.decode('utf-8')))
    except Exception as e:
        return {"error": f"Error reading the file: {str(e)}"}

    # Check if the CSV has required columns
    required_columns = [
        "Location", "Year", "Kilometers_Driven", "Fuel_Type", "Transmission", 
        "Owner_Type", "Mileage", "Engine", "Power", "Seats", "Brand"
    ]
    if not all(col in df.columns for col in required_columns):
        return {"error": f"Missing required columns. Expected columns: {required_columns}"}

    # Make predictions
    predictions = predict_model(model, data=df)
    
    # Add predictions to the DataFrame
    df['Prediction'] = predictions["prediction_label"]

    # Generate a unique filename for the result CSV
    result_filename = f"batch_predictions_{uuid.uuid4()}.csv"
    result_path = os.path.join("results", result_filename)

    # Save the DataFrame with predictions
    os.makedirs("results", exist_ok=True)
    df.to_csv(result_path, index=False)

    # Return the file as a response
    return FileResponse(result_path, filename=result_filename, media_type="text/csv")
