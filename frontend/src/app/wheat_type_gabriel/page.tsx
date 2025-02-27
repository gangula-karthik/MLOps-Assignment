"use client";

import React, { SetStateAction, useState } from 'react';
import { Tabs, Tab } from "@heroui/tabs";
import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import {Alert} from "@heroui/alert";

export default function Home() {
  // State for form input values
  const [formValues, setFormValues] = useState({
    Area: "",
    Perimeter: "",
    Compactness: "",
    Length: "",
    Width: "",
    AsymmetryCoeff: "",
    Groove: ""
  });

  // State for API response
  const [prediction, setPrediction] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle input changes
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  // Make API call to predict wheat type
  const predictWheatType = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('https://mlops-assignment-734580083911.us-central1.run.app/api3/wheat_type_gabriel/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      setPrediction(data as SetStateAction<null>);
    } catch (err: any) {
      setError(err.message || 'An error occurred during prediction');
      console.error('Prediction error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = (e: any) => {
    e.preventDefault();
    predictWheatType();
  };

  return (
    <main className="h-screen w-full flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <Tabs aria-label="Options" color="primary" variant="solid" radius="lg" size="lg">
          <Tab key="single" title="Wheat Type Prediction">
            <Card>
              <CardBody className="py-3 px-4">
                <h3 className="font-semibold text-base mb-2">Wheat Type Prediction</h3>
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-3 gap-2">
                    {/* First column */}
                    <div>
                      <div className="mb-1">
                        <label className="block text-xs font-medium text-gray-700 mb-0.5">
                          Area
                        </label>
                        <Input
                          type="number"
                          name="Area"
                          value={formValues.Area}
                          onChange={handleInputChange}
                          size="sm"
                          required
                          placeholder="e.g. 14.8"
                          step="0.01"
                        />
                      </div>

                      <div className="mb-1">
                        <label className="block text-xs font-medium text-gray-700 mb-0.5">
                          Perimeter
                        </label>
                        <Input
                          type="number"
                          name="Perimeter"
                          value={formValues.Perimeter}
                          onChange={handleInputChange}
                          size="sm"
                          required
                          placeholder="e.g. 14.5"
                          step="0.01"
                        />
                      </div>

                      <div className="mb-1">
                        <label className="block text-xs font-medium text-gray-700 mb-0.5">
                          Compactness
                        </label>
                        <Input
                          type="number"
                          name="Compactness"
                          value={formValues.Compactness}
                          onChange={handleInputChange}
                          size="sm"
                          required
                          placeholder="e.g. 0.88"
                          step="0.001"
                        />
                      </div>
                    </div>

                    {/* Second column */}
                    <div>
                      <div className="mb-1">
                        <label className="block text-xs font-medium text-gray-700 mb-0.5">
                          Length
                        </label>
                        <Input
                          type="number"
                          name="Length"
                          value={formValues.Length}
                          onChange={handleInputChange}
                          size="sm"
                          required
                          placeholder="e.g. 5.7"
                          step="0.01"
                        />
                      </div>

                      <div className="mb-1">
                        <label className="block text-xs font-medium text-gray-700 mb-0.5">
                          Width
                        </label>
                        <Input
                          type="number"
                          name="Width"
                          value={formValues.Width}
                          onChange={handleInputChange}
                          size="sm"
                          required
                          placeholder="e.g. 3.2"
                          step="0.01"
                        />
                      </div>
                    </div>

                    {/* Third column */}
                    <div>
                      <div className="mb-1">
                        <label className="block text-xs font-medium text-gray-700 mb-0.5">
                          Asymmetry Coefficient
                        </label>
                        <Input
                          type="number"
                          name="AsymmetryCoeff"
                          value={formValues.AsymmetryCoeff}
                          onChange={handleInputChange}
                          size="sm"
                          required
                          placeholder="e.g. 2.4"
                          step="0.01"
                        />
                      </div>

                      <div className="mb-1">
                        <label className="block text-xs font-medium text-gray-700 mb-0.5">
                          Groove
                        </label>
                        <Input
                          type="number"
                          name="Groove"
                          value={formValues.Groove}
                          onChange={handleInputChange}
                          size="sm"
                          required
                          placeholder="e.g. 5.1"
                          step="0.01"
                        />
                      </div>
                    </div>

                    {/* Submit button - spans all columns */}
                    <div className="col-span-3 mt-3">
                      <Button 
                        type="submit" 
                        color="primary" 
                        className="w-full"
                        disabled={loading}
                      >
                        {loading ? "Predicting..." : "Predict Wheat Type"}
                      </Button>
                    </div>
                  </div>
                </form>

                {/* Results Section */}
                {(loading || error || prediction) && (
                  <div className="mt-4 border-t pt-4">
                    <h4 className="font-medium text-sm mb-2">Prediction Results</h4>
                    
                    {loading && (
                      <div className="flex justify-center items-center py-4">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                      </div>
                    )}
                    
                    {error && (
                      <div className="bg-red-50 border-l-4 border-red-500 p-3 text-sm">
                        <p className="text-red-700">{error}</p>
                      </div>
                    )}
                    
                    {prediction && !loading && (
                      <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                        <div className="flex flex-col">
                          <div className="flex justify-between items-center">
                            <h5 className="font-semibold text-gray-800">Predicted Wheat Type:</h5>
                            <span className="text-lg font-bold text-green-700">
                              {prediction.prediction}
                            </span>
                          </div>
                          
                          <div className="mt-3 text-xs text-gray-600">
                            <p>Based on the provided measurements, the model predicts this sample belongs to the {prediction.prediction} wheat variety.</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </main>
  );
}
