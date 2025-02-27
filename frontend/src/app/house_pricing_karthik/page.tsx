"use client";

import React, { useState } from 'react';
import { Tabs, Tab } from "@heroui/tabs";
import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { DatePicker } from "@heroui/react";
import { Alert } from "@heroui/alert";
import { sellers, CouncilAreas } from '../../components/data';
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";

export default function Home() {
  const [formValues, setFormValues] = useState({
    Suburb: "",
    Rooms: "",
    Type: "",
    Method: "",
    Seller: "",
    Date: "",
    Distance: "",
    Bedroom2: "",
    Bathroom: "",
    Car: "",
    Landsize: "", 
    YearBuilt: "",
    CouncilArea: "",
    Lattitude: "",
    Longtitude: "",
    Region: ""
  });
  const [apiResponse, setApiResponse] = useState<any>(null);
  const [apiError, setApiError] = useState(false);

  // Handle input changes
  const handleInputChange = (e: any) => {
    const name = e.target?.name || e;
    const value = e.target?.value || e;

    // Convert date to dd/mm/yyyy format if the field is Date
    if (name === "Date" && value) {
      const date = new Date(value);
      const formattedDate = date.toLocaleDateString('en-AU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
      setFormValues(prevState => ({
        ...prevState,
        [name]: formattedDate
      }));
    } else {
      setFormValues(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleSelectionChange = (name: string, value: any) => {
    setFormValues(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setApiResponse(null);
    setApiError(false);
    try {
      const response = await fetch('https://mlops-assignment-734580083911.asia-east1.run.app/api1/house_pricing_karthik/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      });
      const data = await response.json();
      setApiResponse(data);
    } catch (error) {
      console.error("Error fetching prediction:", error);
      setApiError(true);
    }
  };

  return (
    <main className="h-screen w-full flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <Tabs aria-label="Options" color="primary" variant="solid" radius="lg" size="lg">
          <Tab key="single" title="Housing Price Prediction">
            <Card>
              <CardBody className="py-3 px-4">
                <h3 className="font-semibold text-base mb-2">Housing Price Prediction</h3>
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-3 gap-2">
                    {/* Form fields */}
                    <div>
                      <div className="mb-1">
                      <label className="block text-xs font-medium text-gray-700 mb-0.5">
                        Suburb
                      </label>
                      <Select
                        name="Suburb"
                        value={formValues.Suburb}
                        onChange={handleInputChange}
                        size="sm"
                        aria-label="Select suburb"
                        isRequired
                      >
                        <SelectItem key="Airport West">Airport West</SelectItem>
                        <SelectItem key="Albert Park">Albert Park</SelectItem>
                        <SelectItem key="Alphington">Alphington</SelectItem>
                        <SelectItem key="Altona">Altona</SelectItem>
                        <SelectItem key="Altona North">Altona North</SelectItem>
                        <SelectItem key="Armadale">Armadale</SelectItem>
                        <SelectItem key="Ascot Vale">Ascot Vale</SelectItem>
                        <SelectItem key="Ashburton">Ashburton</SelectItem>
                        <SelectItem key="Ashwood">Ashwood</SelectItem>
                        <SelectItem key="Avondale Heights">Avondale Heights</SelectItem>
                      </Select>
                      </div>

                      <div className="mb-1">
                      <label className="block text-xs font-medium text-gray-700 mb-0.5">
                        Type
                      </label>
                      <Select
                        name="Type"
                        value={formValues.Type}
                        onChange={handleInputChange}
                        size="sm"
                        aria-label="Select property type"
                        isRequired
                      >
                        <SelectItem key="br">Bedroom(s)</SelectItem>
                        <SelectItem key="h">House/Cottage/Villa/Semi/Terrace</SelectItem>
                        <SelectItem key="u">Unit/Duplex</SelectItem>
                        <SelectItem key="t">Townhouse</SelectItem>
                        <SelectItem key="dev site">Development Site</SelectItem>
                        <SelectItem key="o res">Other Residential</SelectItem>
                      </Select>
                      </div>

                      <div className="mb-1">
                      <label className="block text-xs font-medium text-gray-700 mb-0.5">
                        Seller
                      </label>
                      <Autocomplete
                        className="max-w-xs"
                        defaultItems={sellers}
                        selectedKey={formValues.Seller}
                        onSelectionChange={(key) => handleSelectionChange("Seller", key)}
                        size="sm"
                        aria-label="Select seller"
                        isRequired
                      >
                        {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
                      </Autocomplete>
                      </div>

                      <div className="mb-1">
                      <label className="block text-xs font-medium text-gray-700 mb-0.5">
                        Distance
                      </label>
                      <Input
                        type="number"
                        name="Distance"
                        value={formValues.Distance}
                        onChange={handleInputChange}
                        size="sm"
                        aria-label="Enter distance"
                        isRequired
                        min="0"
                      />
                      </div>

                      <div className="mb-1">
                      <label className="block text-xs font-medium text-gray-700 mb-0.5">
                        Car
                      </label>
                      <Input
                        type="number"
                        name="Car"
                        value={formValues.Car}
                        onChange={handleInputChange}
                        size="sm"
                        aria-label="Enter number of car spaces"
                        isRequired
                        min="0"
                      />
                      </div>

                      <div className="mb-1">
                      <label className="block text-xs font-medium text-gray-700 mb-0.5">
                        CouncilArea
                      </label>
                      <Autocomplete
                        className="max-w-xs"
                        defaultItems={CouncilAreas}
                        selectedKey={formValues.CouncilArea}
                        onSelectionChange={(key) => handleSelectionChange("CouncilArea", key)}
                        size="sm"
                        aria-label="Select council area"
                        isRequired
                      >
                        {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
                      </Autocomplete>
                      </div>
                    </div>

                    {/* Second column */}
                    <div>
                      <div className="mb-1">
                      <label className="block text-xs font-medium text-gray-700 mb-0.5">
                        Rooms
                      </label>
                      <Input
                        type="number"
                        name="Rooms"
                        value={formValues.Rooms}
                        onChange={handleInputChange}
                        size="sm"
                        aria-label="Enter number of rooms"
                        isRequired
                        min="0"
                      />
                      </div>

                      <div className="mb-1">
                      <label className="block text-xs font-medium text-gray-700 mb-0.5">
                        Method
                      </label>
                      <Select
                        name="Method"
                        value={formValues.Method}
                        onChange={handleInputChange}
                        size="sm"
                        aria-label="Select sale method"
                        isRequired
                      >
                        <SelectItem key="S">property sold</SelectItem>
                        <SelectItem key="SP">property sold prior</SelectItem>
                        <SelectItem key="PI">property passed in</SelectItem>
                        <SelectItem key="PN">sold prior not disclosed</SelectItem>
                        <SelectItem key="SN">sold not disclosed</SelectItem>
                        <SelectItem key="NB">no bid</SelectItem>
                        <SelectItem key="VB">vendor bid</SelectItem>
                        <SelectItem key="W">withdrawn prior to auction</SelectItem>
                        <SelectItem key="SA">sold after auction</SelectItem>
                        <SelectItem key="SS">sold after auction (n/a price)</SelectItem>
                        <SelectItem key="N/A">price/bid not available</SelectItem>
                      </Select>
                      </div>

                      <div className="mb-1">
                      <label className="block text-xs font-medium text-gray-700 mb-0.5">
                        Date
                      </label>
                      <DatePicker                           
                        name="Date"
                        onChange={(date) => {
                        handleInputChange({
                          target: {
                          name: "Date",
                          value: date
                          }
                        });
                        }}
                        size="sm"
                        aria-label="Select date"
                        isRequired
                      />
                      </div>

                      <div className="mb-1">
                      <label className="block text-xs font-medium text-gray-700 mb-0.5">
                        Bedroom2
                      </label>
                      <Input
                        type="number"
                        name="Bedroom2"
                        value={formValues.Bedroom2}
                        onChange={handleInputChange}
                        size="sm"
                        aria-label="Enter number of bedrooms"
                        isRequired
                        min="0"
                      />
                      </div>

                      <div className="mb-1">
                      <label className="block text-xs font-medium text-gray-700 mb-0.5">
                        Landsize
                      </label>
                      <Input
                        type="number"
                        name="Landsize"
                        value={formValues.Landsize}
                        onChange={handleInputChange}
                        size="sm"
                        aria-label="Enter land size"
                        isRequired
                        min="0"
                      />
                      </div>

                      <div className="mb-1">
                      <label className="block text-xs font-medium text-gray-700 mb-0.5">
                        Lattitude
                      </label>
                      <Input
                        type="number"
                        name="Lattitude"
                        value={formValues.Lattitude}
                        onChange={handleInputChange}
                        size="sm"
                        aria-label="Enter latitude"
                        isRequired
                      />
                      </div>
                    </div>

                    {/* Third column */}
                    <div>
                      <div className="mb-1">
                      <label className="block text-xs font-medium text-gray-700 mb-0.5">
                        Bathroom
                      </label>
                      <Input
                        type="number"
                        name="Bathroom"
                        value={formValues.Bathroom}
                        onChange={handleInputChange}
                        size="sm"
                        aria-label="Enter number of bathrooms"
                        isRequired
                        min="0"
                      />
                      </div>

                      <div className="mb-1">
                      <label className="block text-xs font-medium text-gray-700 mb-0.5">
                        YearBuilt
                      </label>
                      <Input
                        type="number"
                        name="YearBuilt"
                        value={formValues.YearBuilt}
                        onChange={handleInputChange}
                        size="sm"
                        aria-label="Enter year built"
                        isRequired
                        min="0"
                      />
                      </div>

                      <div className="mb-1">
                      <label className="block text-xs font-medium text-gray-700 mb-0.5">
                        Longtitude
                      </label>
                      <Input
                        type="number"
                        name="Longtitude"
                        value={formValues.Longtitude}
                        onChange={handleInputChange}
                        size="sm"
                        aria-label="Enter longitude"
                        isRequired
                      />
                      </div>

                      <div className="mb-1">
                      <label className="block text-xs font-medium text-gray-700 mb-0.5">
                        Region
                      </label>
                      <Select
                        name="Region"
                        value={formValues.Region}
                        onChange={handleInputChange}
                        size="sm"
                        aria-label="Select region"
                        isRequired
                      >
                        <SelectItem key="Eastern Metropolitan">Eastern Metropolitan</SelectItem>
                        <SelectItem key="Eastern Victoria">Eastern Victoria</SelectItem>
                        <SelectItem key="Northern Metropolitan">Northern Metropolitan</SelectItem>
                        <SelectItem key="Northern Victoria">Northern Victoria</SelectItem>
                        <SelectItem key="South-Eastern Metropolitan">South-Eastern Metropolitan</SelectItem>
                        <SelectItem key="Southern Metropolitan">Southern Metropolitan</SelectItem>
                        <SelectItem key="Western Metropolitan">Western Metropolitan</SelectItem>
                        <SelectItem key="Western Victoria">Western Victoria</SelectItem>
                      </Select>
                      </div>
                    </div>
                    <div className="col-span-3 mt-3 mb-3">
                      <Button type="submit" color="primary" className="w-full" isLoading={apiError === false && apiResponse === null} aria-label="Submit form">
                        Submit
                      </Button>
                    </div>
                  </div>
                  {/* API response display */}
                  {apiResponse && (
                    <Alert color="success" title="Your house has been valued to be:" variant="faded">
                      <span style={{ fontSize: '20px', fontWeight: 'bold' }}>$ {apiResponse.prediction.toLocaleString()}</span>
                    </Alert>
                  )}
                  {apiError && (
                    <Alert color="danger" title="This is a danger alert">
                      Error fetching prediction
                    </Alert>
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
