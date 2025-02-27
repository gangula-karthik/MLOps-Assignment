# -*- coding: utf-8 -*-
import pandas as pd
from pycaret.regression import load_model, predict_model
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn

# Create the FastAPI app
app = FastAPI()

# Allow CORS from all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load trained Pipeline
model = load_model("backend/best_cb_model")

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
@app.post("/car_sales_weijun/predict", response_model=OutputModel)
def predict(data: InputModel):
    data_df = pd.DataFrame([data.dict()])
    predictions = predict_model(model, data=data_df)
    return {"prediction": predictions["prediction_label"].iloc[0]}

# Run the app
if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)