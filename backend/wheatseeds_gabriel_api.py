import pandas as pd
import mlflow
import mlflow.sklearn
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import os
from dotenv import load_dotenv, find_dotenv
from fastapi import APIRouter


# Initialize FastAPI app
router = APIRouter()


# Load environment variables
load_dotenv(find_dotenv())  # Ensure .env file is found and loaded

# Fetch MLflow credentials from the environment variables
mlflow_username = os.getenv("MLFLOW_TRACKING_USERNAME")
mlflow_password = os.getenv("MLFLOW_TRACKING_PASSWORD")

# Set MLflow tracking URI for model registry
mlflow.set_tracking_uri("https://dagshub.com/loheegenegabriel/MLOps-Assignment.mlflow")  # Replace with your project URI

# Model details (adjust model name and version accordingly)
MODEL_NAME = "WheatSeedModel_Gabriel"  # Update this to match your model name
MODEL_VERSION = "latest"  # Update this to a specific version or "latest"

# Load the model
try:
    model = mlflow.sklearn.load_model(f"models:/{MODEL_NAME}/{MODEL_VERSION}")
except Exception as e:
    raise RuntimeError(f"Failed to load model: {e}")

# Input model: Wheat features
class WheatFeatures(BaseModel):
    Area: float
    Perimeter: float
    Compactness: float
    Length: float
    Width: float
    AsymmetryCoeff: float
    Groove: float

# Output model: Prediction result
class PredictionOutput(BaseModel):
    prediction: str  # Wheat type (Kama, Rosa, or Canadian)

# Prediction endpoint
@router.post("/wheat_type_gabriel/predict", response_model=PredictionOutput)
def predict_wheat(data: WheatFeatures):
    try:
        # Convert input to DataFrame
        data_df = pd.DataFrame([data.dict()])
        
        # Predict using the loaded model
        predictions = model.predict(data_df)  # Directly use the model's predict method
        
        # Map the prediction to wheat type
        wheat_types = {1: "Kama", 2: "Rosa", 3: "Canadian"}
        predicted_label = predictions[0]  # Get the first prediction
        
        # Return predicted wheat type
        predicted_type = wheat_types.get(int(predicted_label), "Unknown")
        return {"prediction": predicted_type}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
