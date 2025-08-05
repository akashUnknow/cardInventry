import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { RouteAddInventory, RoutePersoCard } from "@/helper/RouteName";
import { toast } from "react-toastify";

const CardInventry = () => {
  const API_BASE = import.meta.env.VITE_API_URL;
  const [selectedDescription, setSelectedDescription] = useState("");
  const [selectedFormFactor, setSelectedFormFactor] = useState("");
  const [cardCount, setCardCount] = useState(null);

  const cardDescriptions = [
    "SkySIM Avior 80nm - AV340 BPU",
    "SkySIM Avior 80nm - AV340 non BPU",
    "SkySIM Avior 80nm - AV440",
    "SkySIM Avior 80nm - AV1.2M (QM)",
    "Orion - 480",
    "Orion - 800",
    "Orion - 800 M2M",
    "Dragon/Wega LTE",
    "Phoenix 400",
    "Phoenix 512",
    "Phoenix 512 Pro",
    "Avior 480 Pro",
    "CX 97 1M crypto in-car",
    "Hercules 1.2M in-car",
    "CX 97 1M no-crypto M2M",
    "CX 97 1 M no-crypto in-car",
    "Avior Pro 340",
    "Hercules 1.2M 80nm",
    "Wega",
    "Argo 320",
    "Phoenix 670",
    "Luna 1.3M",
    "Luna 1.3M M2M",
    "Lyral.5M / Polarisl.5M",
    "Luna 1.0M",
    "Argo 512",
    "Argo 512 M2m in Car",
    "M2M AR360 in-car QFN8",
    "Argo 400",
    "AVIOR 560",
    "AVIOR 256",
    "AVIOR 320",
    "AVIOR 420",
    "Avior 700",
    "Avior Pro 700",
    "Dragon III",
    "SkySIM CX - Scorpius 420",
    "SkySIM CX - Scorpius 560 130nm",
    "SkySIM CX - Scorpius 768",
    "SkySIM CX 90nm - Cygnus 1.2M EVO classic",
    "SkySIM CX 90nm - Cygnus 1.2M no Mifare",
    "Aries",
    "Tong Fang-Prism",
    "Zeta 480",
    "Zeta 132",
  ];

  const formFactors = ["TRI", "2FF", "3FF", "4FF", "MFF2", "B4"];

  const mapFormFactorKey = (factor) => {
    switch (factor) {
      case "TRI":
        return "tri";
      case "2FF":
        return "twoFF";
      case "3FF":
        return "threeFF";
      case "4FF":
        return "fourFF";
      case "MFF2":
        return "mff2";
      case "B4":
        return "b4";
      default:
        return "";
    }
  };

  const handleSearch = async () => {
    if (!selectedDescription || !selectedFormFactor) {
      toast.warning("Please select both card description and form factor.");
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE}/api/cards/search?description=${encodeURIComponent(selectedDescription)}`
      );
      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      setCardCount(data);
    } catch (error) {
      console.error("Error fetching card inventory:", error);
      alert("Failed to fetch card inventory. Please try again later.");
    }
  };

  return (
    <div className="flex justify-center bg-gray-100 min-h-[calc(100vh-60vh)] pt-20">
      <Card className="w-full max-w-4xl shadow-lg hover:shadow-xl transition-shadow duration-300 my-6">
        <CardHeader>
          <CardTitle className="text-center text-2xl sm:text-3xl font-bold">
            Card Inventory
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col items-center gap-4 text-base sm:text-lg font-semibold">
          {cardCount ? (
            <>
              <p>
                <strong>Card Description:</strong> {cardCount.cardDescription}
              </p>
              <p>
                <strong>Total Quantity:</strong> {cardCount.totalQuantity}
              </p>
              <p>
                <strong>Form Factor {selectedFormFactor}:</strong>{" "}
                {cardCount[mapFormFactorKey(selectedFormFactor)] ?? 0} cards (
                {(
                  ((cardCount[mapFormFactorKey(selectedFormFactor)] ?? 0) /
                    cardCount.totalQuantity) *
                  100
                ).toFixed(2)}
                % of total)
              </p>
            </>
          ) : (
            <p className="text-gray-500">No data to display</p>
          )}
        </CardContent>

        {/* Search Fields */}
        <CardFooter className="flex flex-col sm:flex-row gap-4 justify-center items-center sm:items-end">
          <div className="flex flex-col gap-1 w-full sm:w-[300px]">
            <label className="font-medium">Card Description</label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              value={selectedDescription}
              onChange={(e) => setSelectedDescription(e.target.value)}
            >
              <option value="">Select Description</option>
              {cardDescriptions.map((desc, idx) => (
                <option key={idx} value={desc}>
                  {desc}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1 w-full sm:w-[150px]">
            <label className="font-medium">Form Factor</label>
            <select
              className="w-full p-2 border border-gray-300 rounded-md"
              value={selectedFormFactor}
              onChange={(e) => setSelectedFormFactor(e.target.value)}
            >
              <option value="">Select Form Factor</option>
              {formFactors.map((factor, idx) => (
                <option key={idx} value={factor}>
                  {factor}
                </option>
              ))}
            </select>
          </div>

          <Button
            onClick={handleSearch}
            className="w-full sm:w-auto bg-blue-800 hover:bg-blue-600 text-white"
          >
            Search
          </Button>
        </CardFooter>

        {/* Navigation Buttons */}
        <CardContent className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4">
          <Link to={RouteAddInventory} className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto bg-blue-800 hover:bg-blue-600">
              Add Inventory
            </Button>
          </Link>
          <Link to={RoutePersoCard} className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto bg-blue-800 hover:bg-blue-600">
              Perso Card
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default CardInventry;
