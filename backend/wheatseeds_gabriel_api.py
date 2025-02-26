# -*- coding: utf-8 -*-
import pandas as pd
from pycaret.classification import load_model, predict_model
from fastapi import FastAPI
import uvicorn
from pydantic import BaseModel

# Create the FastAPI app
app = FastAPI()

# Load trained PyCaret model (make sure to update the path accordingly)
model = load_model("notebooks/Gabriel/wheat_classifier_model")


# Define input model using Pydantic
class WheatFeatures(BaseModel):
    Area: float
    Perimeter: float
    Compactness: float
    Length: float
    Width: float
    AsymmetryCoeff: float
    Groove: float

# Define output model
class PredictionOutput(BaseModel):
    prediction: str  # Wheat type (Kama, Rosa, or Canadian)

# Define prediction function
@app.post("/predict", response_model=PredictionOutput)
def predict_wheat(data: WheatFeatures):
    data_df = pd.DataFrame([data.dict()])
    
    # Use PyCaret's predict_model to generate predictions
    predictions = predict_model(model, data=data_df)
    
    # Convert numerical prediction to the wheat type
    wheat_types = {1: "Kama", 2: "Rosa", 3: "Canadian"}
    predicted_label = predictions["prediction_label"].iloc[0]
    
    # Return the wheat type based on the predicted label
    predicted_type = wheat_types.get(int(predicted_label), "Unknown")
    
    return {"prediction": predicted_type}

# Run the FastAPI app
if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
