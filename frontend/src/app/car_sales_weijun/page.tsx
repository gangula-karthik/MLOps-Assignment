"use client";

import React, { useState } from "react";
import { Tabs, Tab } from "@heroui/tabs";
import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";

export default function Home() {
  const [formValues, setFormValues] = useState({
    Location: "",
    Year: "",
    Kilometers_Driven: "",
    Fuel_Type: "",
    Transmission: "",
    Owner_Type: "",
    Mileage: "",
    Engine: "",
    Power: "",
    Seats: "5",  // Change Seats default value to string
    Brand: "",
  });
  const [prediction, setPrediction] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: name === "Seats" ? Math.max(1, parseInt(value)).toString() : value, // Ensure Seats value is stored as a string
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Values:", formValues);
    try {
      const response = await fetch("https://mlops-assignment-734580083911.asia-east1.run.app//api2/car_sales_weijun/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formValues,
          Year: parseInt(formValues.Year),
          Kilometers_Driven: parseInt(formValues.Kilometers_Driven),
          Mileage: parseFloat(formValues.Mileage),
          Engine: parseFloat(formValues.Engine),
          Power: parseFloat(formValues.Power),
          Seats: parseInt(formValues.Seats), // Convert Seats back to number for API request
        }),
      });

      const data:any = await response.json();
      setPrediction(Math.round(data.prediction).toString()); // Convert prediction to string before setting state
    } catch (error) {
      console.error("Error:", error);
      setPrediction("Failed to fetch prediction");
    }
  };

  const locations = ['Mumbai', 'Pune', 'Chennai', 'Coimbatore', 'Hyderabad', 'Jaipur', 'Kochi', 'Kolkata', 'Delhi', 'Bangalore', 'Ahmedabad'];
  const fuelTypes = ['CNG', 'Diesel', 'Petrol', 'LPG', 'Electric'];
  const transmissions = ['Manual', 'Automatic'];
  const ownerTypes = ['First', 'Second', 'Fourth & Above', 'Third'];
  const brands = ['Maruti', 'Hyundai', 'Honda', 'Audi', 'Nissan', 'Toyota', 'Volkswagen', 'Tata', 'Land', 'Mitsubishi', 'Renault', 'Mercedes-Benz', 'BMW', 'Mahindra', 'Ford', 'Porsche', 'Datsun', 'Jaguar', 'Volvo', 'Chevrolet', 'Skoda', 'Mini', 'Fiat', 'Jeep', 'Ambassador', 'ISUZU', 'Force', 'Bentley', 'Lamborghini'];

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
                    <Input type="number" name="Engine" value={formValues.Engine} onChange={handleInputChange} required min="1"/>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Power (bhp)</label>
                    <Input type="number" name="Power" value={formValues.Power} onChange={handleInputChange} required min="1"/>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Mileage (km/l)</label>
                    <Input type="number" name="Mileage" value={formValues.Mileage} onChange={handleInputChange} required min="1"/>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Seats</label>
                    <Input type="number" name="Seats" value={formValues.Seats.toString()} onChange={handleInputChange} required min="1" /> {/* Ensure Seats value is converted to string for Input */}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Year</label>
                    <Input
                      type="number"
                      name="Year"
                      value={formValues.Year}
                      onChange={handleInputChange}
                      required
                      min="1900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Kilometers Driven</label>
                    <Input
                      type="number"
                      name="Kilometers_Driven"
                      value={formValues.Kilometers_Driven}
                      onChange={handleInputChange}
                      required
                      min="1"
                    />
                  </div>
                  <Button type="submit" color="primary" className="w-full">
                    Get Prediction
                  </Button>
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
        </Tabs>
      </div>
    </main>
  );
}
