"use client";

import React, { useState } from 'react';
import { Tabs, Tab } from "@heroui/tabs";
import { Card, CardBody } from "@heroui/card";
import {Button, ButtonGroup} from "@heroui/button";


export default function Home() {
  // State for form input values
  const [singleFlowValues, setSingleFlowValues] = useState({
    Suburb: "",
    Rooms: 0,
    Type: "",
    Method: "",
    Seller: "",
    Date: "",
    Distance: 0,
    Bedroom2: 0,
    Bathroom: 0,
    Car: 0,
    Landsize: 0,
    YearBuilt: 0,
    CouncilArea: "",
    Lattitude: 0,
    Longtitude: 0,
    Region: ""
  });

  const [batchValues, setBatchValues] = useState({
    Suburb: "",
    Rooms: 0,
    Type: "",
    Method: "",
    Seller: "",
    Date: "",
    Distance: 0,
    Bedroom2: 0,
    Bathroom: 0,
    Car: 0,
    Landsize: 0,
    YearBuilt: 0,
    CouncilArea: "",
    Lattitude: 0,
    Longtitude: 0,
    Region: ""
  });

  // Handle input changes for single flow tab
  const handleSingleFlowChange = (e) => {
    const { name, value } = e.target;
    setSingleFlowValues({
      ...singleFlowValues,
      [name]: value
    });
  };

  // Handle input changes for batch processing tab
  const handleBatchChange = (e) => {
    const { name, value } = e.target;
    setBatchValues({
      ...batchValues,
      [name]: value
    });
  };

  // Function to render form fields based on the JSON structure
  const renderFormFields = (values, handleChange) => {
    return (
      <div className="grid grid-cols-3 gap-2">
        {Object.keys(values).map((key) => (
          <div key={key} className="mb-1">
            <label className="block text-xs font-medium text-gray-700 mb-0.5">
              {key}
            </label>
            {typeof values[key] === "number" ? (
              <input
                type="number"
                name={key}
                value={values[key]}
                onChange={handleChange}
                className="w-full p-1.5 border rounded-md text-xs"
              />
            ) : (
              <input
                type="text"
                name={key}
                value={values[key]}
                onChange={handleChange}
                className="w-full p-1.5 border rounded-md text-xs"
              />
            )}
          </div>
        ))}
        <div className="col-span-3 mt-2">
          <Button color="primary" className="w-full">
            Submit
          </Button>
        </div>
      </div>
    );
  };

  return (
    <main className="h-screen w-full flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <Tabs aria-label="Options" color="primary" variant="solid" radius="full" size="sm">
          <Tab key="single" title="one-piece-flow">
            <Card>
              <CardBody className="py-3 px-4">
                <h3 className="font-semibold text-base mb-2">House Price Prediction</h3>
                {renderFormFields(singleFlowValues, handleSingleFlowChange)}
              </CardBody>
            </Card>
          </Tab>
          <Tab key="hello" title="hello">
            <Card>
              <CardBody className="py-3 px-4">
                <h3 className="font-semibold text-base mb-2">Hi</h3>
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </main>
  );
}
