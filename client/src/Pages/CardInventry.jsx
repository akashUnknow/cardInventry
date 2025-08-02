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

  // Map UI label to field in API
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
      toast.warning("Please select both card description and form factor.")
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE}/api/cards/search?description=${encodeURIComponent(
          selectedDescription
        )}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setCardCount(data);
    } catch (error) {
      console.error("Error fetching card inventory:", error);
      alert("Failed to fetch card inventory. Please try again later.");
    }
  };

  return (
    <div className="flex justify-center mt-[20px] bg-gray-100 min-h-[calc(100vh-20vh)] ">
      <Card className="w-[900px] shadow-lg hover:shadow-xl h-[calc(100vh-65vh)] transition-shadow duration-300 ">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold">
            Card Inventory
          </CardTitle>
        </CardHeader>

        {/* Count display */}
        <CardContent className="flex flex-col items-center gap-2 text-xl font-semibold">
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
            <p>No data to display</p>
          )}
        </CardContent>

        {/* Search section */}
        <CardFooter className="flex flex-wrap gap-4 justify-center">
          <div className="flex items-center gap-2">
            <label className="font-medium">Card Description</label>
            <select
              className="w-[300px] p-2 border border-gray-300 rounded-md"
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

          <div className="flex items-center gap-2">
            <label className="font-medium">Form Factor</label>
            <select
              className="w-[150px] p-2 border border-gray-300 rounded-md"
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
            className="bg-blue-800 hover:bg-blue-400"
          >
            Search
          </Button>
        </CardFooter>

        {/* Action buttons */}
        <CardContent className="flex flex-row items-center gap-4 justify-center">
          <Link to={RouteAddInventory}>
            <Button className="bg-blue-800 hover:bg-blue-400">
              Add Inventory
            </Button>
          </Link>
          <Link to={RoutePersoCard}>
            <Button className="bg-blue-800 hover:bg-blue-400">
              Perso Card
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default CardInventry;
