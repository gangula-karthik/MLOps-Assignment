import pandas as pd
import mlflow
import mlflow.sklearn
from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional

# Initialize FastAPI
app = FastAPI()

# 🔹 Set the remote MLflow tracking URI (DAGsHub)
mlflow.set_tracking_uri("https://dagshub.com/gangula-karthik/MLOps-Assignment.mlflow")  

# 🔹 Load the latest registered model from MLflow
MODEL_NAME = "HousePricingModel_Karthik"
MODEL_VERSION = "latest"  # Change to specific version if needed
model = mlflow.sklearn.load_model(f"models:/{MODEL_NAME}/{MODEL_VERSION}")

# 🔹 Define the input data model
class HouseFeatures(BaseModel):
    Suburb: str
    Rooms: int
    Type: str
    Method: str
    Seller: str
    Date: str  # Keep as string, can be converted to datetime if needed
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

# 🔹 Define the output data model
class PredictionOutput(BaseModel):
    prediction: float

# 🔹 Prediction Endpoint
@app.post("/predict", response_model=PredictionOutput)
def predict_price(data: HouseFeatures):
    df = pd.DataFrame([data.dict()])  # Convert input to DataFrame
    prediction = model.predict(df)  # Make prediction
    return {"prediction": prediction[0]}  # Return JSON response

# Run the app
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
