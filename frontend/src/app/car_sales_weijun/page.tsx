"use client";

import React, { useState } from "react";
import { Tabs, Tab } from "@heroui/tabs";
import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Alert } from "@heroui/alert"; // To display alerts like "Processing..." or errors

export default function Home() {
  const [formValues, setFormValues] = useState({
    Location: "",
    Year: 2017,
    Kilometers_Driven: 0,
    Fuel_Type: "",
    Transmission: "",
    Owner_Type: "",
    Mileage: 0,
    Engine: 0,
    Power: 0,
    Seats: 5,
    Brand: "",
  });

  const [prediction, setPrediction] = useState<string | null>(null);
  const [batchPredictionFile, setBatchPredictionFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormValues((prev) => ({
      ...prev,
      [name]: ["Year", "Kilometers_Driven", "Mileage", "Engine", "Power", "Seats"].includes(name)
        ? value === "" ? "" : Number(value)
        : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file && file.type === "text/csv") {
      setBatchPredictionFile(file);
    } else {
      alert("Please upload a valid CSV file.");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Values:", formValues);

    try {
      const response = await fetch(
        "https://mlops-assignment-734580083911.us-central1.run.app/api2/car_sales_weijun/predict",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formValues),
        }
      );

      const data: PredictionResponse = await response.json(); 
      setPrediction((data.prediction).toString());
    } catch (error) {
      console.error("Error:", error);
      setPrediction("Failed to fetch prediction");
    }
  };

  const handleSubmitBatch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!batchPredictionFile) {
      alert("Please upload a CSV file for batch prediction.");
      return;
    }

    setIsLoading(true);
    setApiError(null);
    const formData = new FormData();
    formData.append("file", batchPredictionFile);

    try {
      const response = await fetch(
        "https://mlops-assignment-734580083911.us-central1.run.app/api2/car_sales_weijun/batch_predict",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (data.success) {
        setDownloadUrl(data.downloadUrl); // Assuming the API sends a URL to download the results
      } else {
        setApiError("Failed to process the file. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setApiError("Error uploading file. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const locations = ["Mumbai", "Pune", "Chennai", "Coimbatore", "Hyderabad", "Jaipur", "Kochi", "Kolkata", "Delhi", "Bangalore", "Ahmedabad"];
  const fuelTypes = ["CNG", "Diesel", "Petrol", "LPG", "Electric"];
  const transmissions = ["Manual", "Automatic"];
  const ownerTypes = ["First", "Second", "Third", "Fourth & Above"];
  const brands = [
    "Maruti", "Hyundai", "Honda", "Audi", "Nissan", "Toyota", "Volkswagen", "Tata",
    "Land", "Mitsubishi", "Renault", "Mercedes-Benz", "BMW", "Mahindra", "Ford",
    "Porsche", "Datsun", "Jaguar", "Volvo", "Chevrolet", "Skoda", "Mini", "Fiat",
    "Jeep", "Ambassador", "ISUZU", "Force", "Bentley", "Lamborghini",
  ];

  return (
    <main className="h-full w-full grid place-items-center p-4">
      <div className="w-full max-w-lg">
        <Tabs aria-label="Car Price Prediction" color="primary" variant="solid" radius="lg" size="lg">
          <Tab key="predict" title="Predict Price">
            <Card>
              <CardBody>
                <form onSubmit={handleSubmit} className="space-y-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Brand</label>
                    <Select name="Brand" value={formValues.Brand} onChange={handleInputChange} required>
                      {brands.map((brand) => (
                        <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                      ))}
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Location</label>
                    <Select name="Location" value={formValues.Location} onChange={handleInputChange} required>
                      {locations.map((loc) => (
                        <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                      ))}
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Fuel Type</label>
                    <Select name="Fuel_Type" value={formValues.Fuel_Type} onChange={handleInputChange} required>
                      {fuelTypes.map((fuel) => (
                        <SelectItem key={fuel} value={fuel}>{fuel}</SelectItem>
                      ))}
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Transmission</label>
                    <Select name="Transmission" value={formValues.Transmission} onChange={handleInputChange} required>
                      {transmissions.map((trans) => (
                        <SelectItem key={trans} value={trans}>{trans}</SelectItem>
                      ))}
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Owner Type</label>
                    <Select name="Owner_Type" value={formValues.Owner_Type} onChange={handleInputChange} required>
                      {ownerTypes.map((owner) => (
                        <SelectItem key={owner} value={owner}>{owner}</SelectItem>
                      ))}
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Engine (CC)</label>
                    <Input type="number" name="Engine" value={formValues.Engine} onChange={handleInputChange} required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Power (bhp)</label>
                    <Input type="number" name="Power" value={formValues.Power} onChange={handleInputChange} required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Mileage (km/l)</label>
                    <Input type="number" step="0.1" name="Mileage" value={formValues.Mileage} onChange={handleInputChange} required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Seats</label>
                    <Input type="number" name="Seats" value={formValues.Seats} onChange={handleInputChange} required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Year</label>
                    <Input type="number" name="Year" value={formValues.Year} onChange={handleInputChange} required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Kilometers Driven</label>
                    <Input type="number" name="Kilometers_Driven" value={formValues.Kilometers_Driven} onChange={handleInputChange} required />
                  </div>
                  <Button type="submit" color="primary" className="w-full">Get Prediction</Button>
                </form>
                {prediction !== null && (
                  <div className="mt-4 p-4 bg-gray-100 rounded-lg text-center">
                    <p className="text-lg font-bold">Predicted Price:</p>
                    <p className="text-2xl text-blue-600">₹{prediction}</p>
                  </div>
                )}
              </CardBody>
            </Card>
          </Tab>

          <Tab key="batch" title="Batch Prediction">
            <Card>
              <CardBody className="py-3 px-4">
                <h3 className="font-semibold text-base mb-2">Batch Prediction</h3>
                <form onSubmit={handleSubmitBatch}>
                  <div className="mb-4">
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Upload CSV File
                    </label>
                    <input
                      type="file"
                      accept=".csv"
                      onChange={handleFileChange}
                      className="text-sm"
                      aria-label="Upload CSV file"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <Button
                      type="submit"
                      size="sm"
                      color="primary"
                      disabled={isLoading}
                      className="w-full"
                    >
                      {isLoading ? "Processing..." : "Upload File"}
                    </Button>
                  </div>

                  {apiError && <Alert color="error">{apiError}</Alert>}
                  {downloadUrl && (
                    <div className="mt-2">
                      <a
                        href={downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600"
                      >
                        Download the Results
                      </a>
                    </div>
                  )}
                </form>
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </main>
  );
}
