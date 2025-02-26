"use client";

import React, { useState } from 'react';
import { Tabs, Tab } from "@heroui/tabs";
import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Select, SelectSection, SelectItem } from "@heroui/select";
import { DatePicker } from "@heroui/react";
import { Autocomplete, AutocompleteSection, AutocompleteItem } from "@heroui/autocomplete";

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

  const sellers = ['@Realty', 'ASL', "Abercromby's", 'Ace', 'Alexkarbon', 'Allens',
    'Anderson', 'Appleby', 'Aquire', 'Area', 'Ascend', 'Ash', 'Asset',
    'Assisi', 'Australian', 'Barlow', 'Barry', 'Bayside', 'Bekdon',
    'Beller', 'Bells', 'Besser', 'Better', 'Biggin', 'Blue',
    'Boutique', 'Bowman', 'Brace', 'Brad', 'Buckingham', 'Bullen',
    'Burnham', 'Buxton', 'Buxton/Advantage', 'Buxton/Find', 'C21',
    'CASTRAN', 'Caine', 'Calder', 'Carter', 'Castran', 'Cayzer',
    'Century', 'Chambers', 'Changing', 'Charlton', 'Chisholm',
    'Christopher', 'Clairmont', 'Collins', 'Community', 'Compton',
    'Conquest', 'Considine', 'Coventry', 'Craig', 'Crane', "D'Aprano",
    'Daniel', 'Darras', 'Darren', 'David', 'Del', 'Dingle', 'Direct',
    'Dixon', 'Domain', 'Douglas', 'Edward', 'Elite', 'Eview', 'FN',
    'First', 'Fletchers', 'Fletchers/One', 'Follett', 'Frank', 'Free',
    'GL', 'Galldon', 'Gardiner', 'Garvey', 'Gary', 'Geoff', 'Grantham',
    'Greg', 'Gunn&Co', 'HAR', 'Hall', 'Ham', 'Harcourts', 'Harrington',
    'Haughton', 'Hayeswinckle', 'Hodges', 'Holland', 'Homes', 'Hooper',
    'Hoskins', 'Hunter', 'Iconek', 'J', 'JMRE', 'JRW', 'Jas', 'Jason',
    'Jellis', 'Jim', 'Joe', 'Johnston', 'Joseph', 'Kay', 'Kaye',
    'Keatings', 'Kelly', 'Ken', 'L', 'LITTLE', 'LJ', 'LLC', 'Langwell',
    'Le', 'Leading', 'Leased', 'Leeburn', 'Leyton', 'Lindellas',
    'Love', 'Lucas', 'Luxe', 'Luxton', 'M.J', 'MICM', 'Maddison',
    'Mandy', 'Marshall', 'Mason', 'Matthew', 'Max', 'McDonald',
    'McGrath', 'McLennan', 'McNaughton', 'Meadows', 'Melbourne',
    'Metro', 'Miles', 'Millership', 'Mindacom', 'Mitchell', 'Moonee',
    'Morleys', 'Morrison', 'Naison', 'Nardella', 'Nelson', 'New',
    'Nguyen', 'Nicholls', 'Nicholson', 'Nick', 'Noel', 'North',
    "O'Brien", "O'Donoghues", 'Oak', 'Obrien', 'One', 'Only',
    'Oriental', 'Owen', 'PRD', 'PRDNationwide', 'Pagan', 'Parkes',
    'Parkinson', 'Paul', 'Peake', 'Peter', 'Philip', 'Point', 'Pride',
    'Prime', "Private/Tiernan's", 'Prof.', 'Property', 'Propertyau',
    'Prowse', 'Purplebricks', 'R&H', 'RE', 'REMAX', 'RT', 'RW',
    'Raine', 'Raine&Horne', 'Ray', 'Re', 'Reach', 'Real', 'Red',
    'Redina', 'Reed', 'Reliance', 'Rendina', 'Rexhepi', 'Ristic',
    'Rodney', 'Roger', 'Rosin', 'Ross', 'Rounds', 'Ryder', 'S&L', 'SN',
    'Schroeder', 'Scott', 'Sell', 'Smart', "Sotheby's", 'Steveway',
    'Stockdale', 'Sweeney', 'Sweeney/Advantage', 'TRUE', 'The',
    'Thomas', 'Thomson', "Tiernan's", 'Tim', 'Trimson', 'Triwest', 'U',
    'Upper', 'VICPROP', 'VICProp', 'Veitch', 'Vic', 'Victory',
    'Village', 'W.B.', 'WHITEFOX', 'Walsh', 'Walshe', 'Weast', 'Weda',
    'Weston', 'Westside', 'White', 'Whiting', 'William', 'Williams',
    'Wilson', 'Win', 'Wood', 'Woodards', 'Xynergy', 'YPA', 'Zahn',
    'buyMyplace', 'hockingstuart', 'hockingstuart/Advantage',
    'hockingstuart/Barry', 'hockingstuart/Village', 'iOne',
    'iProperty', 'iSell', 'iTRAK'].map(seller => ({
      label: seller,
      value: seller
    }));

  const CouncilAreas = ['Banyule', 'Bayside', 'Boroondara', 'Brimbank', 'Cardinia',
    'Casey', 'Darebin', 'Frankston', 'Glen Eira', 'Greater Dandenong',
    'Hobsons Bay', 'Hume', 'Kingston', 'Knox', 'Macedon Ranges',
    'Manningham', 'Maribyrnong', 'Maroondah', 'Melbourne', 'Melton',
    'Monash', 'Moonee Valley', 'Moorabool', 'Moreland', 'Nillumbik',
    'Port Phillip', 'Stonnington', 'Unavailable', 'Whitehorse',
    'Whittlesea', 'Wyndham', 'Yarra', 'Yarra Ranges'].map(area => ({
      label: area,
      value: area
    }));

  // Handle input changes
  const handleInputChange = (e: any) => {
    console.log(e);

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
      setFormValues({
        ...formValues,
        [name]: formattedDate
      });
    } else {
      setFormValues({
        ...formValues,
        [name]: value
      });
    }
  };

  // Handle selection changes for autocomplete components
  const handleSelectionChange = (name: string, value: any) => {
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
          <Tab key="single" title="Housing Price Prediction">
            <Card>
              <CardBody className="py-3 px-4">
                <h3 className="font-semibold text-base mb-2">Housing Price Prediction</h3>
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-3 gap-2">
                    {/* First column */}
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

                    {/* Submit button - spans all columns */}
                    <div className="col-span-3 mt-3">
                      <Button type="submit" color="primary" className="w-full" aria-label="Submit form">
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
