"use client";

import React, { useState } from 'react';
import { Tabs, Tab } from "@heroui/tabs";
import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";

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

  // Handle input changes
  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log("Form values:", formValues);
    // Add your submission logic here
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
                        />
                      </div>
                    </div>

                    {/* Submit button - spans all columns */}
                    <div className="col-span-3 mt-3">
                      <Button type="submit" color="primary" className="w-full">
                        Submit
                      </Button>
                    </div>
                  </div>
                </form>
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </main>
  );
}