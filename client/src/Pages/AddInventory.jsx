import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Routecardinventry } from "@/helper/RouteName";
import { toast } from "react-toastify";

const AddInventory = () => {
  const [cardDescription, setCardDescription] = useState("");
  const [formFactor, setFormFactor] = useState("");
  const [quantity, setQuantity] = useState("");
  const navigate = useNavigate();

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

  // Form Factor
  const formFactors = ["TRI", "2FF", "3FF", "4FF", "MFF2", "B4"];

  // form handel
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data={
      description: cardDescription,
      formFactor,
      quantity,
    }
    // console.log("Form Data:", data);
    try {
      const response = await fetch("http://localhost:8080/api/cards/add-card", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        // alert("Card added successfully!");
        toast.success("Card added successfully!");
        // Redirect to the card inventory page
        navigate(Routecardinventry);

      } else {
        toast.error("Failed to add card. Please try again.");
      }

    } catch (error) {
       console.error("Error:", error);
      alert("An error occurred while adding the card.");
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-[600px] p-6 shadow-lg bg-white">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold">
            Add Inventory
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Row: Card Description */}
            <div className="flex items-center gap-4">
              <label className="w-48 text-right font-medium">
                Card Description:
              </label>
              <select
                className="flex-1 p-2 border border-gray-300 rounded-md"
                value={cardDescription}
                onChange={(e) => setCardDescription(e.target.value)}
                required
              >
                <option value="">-- Select --</option>
                {cardDescriptions.map((description, index) => (
                  <option key={index} value={description}>
                    {description}
                  </option>
                ))}
              </select>
            </div>

            {/* Row: Form Factor */}
            <div className="flex items-center gap-4">
              <label className="w-48 text-right font-medium">
                Form Factor:
              </label>
              <select
                className="flex-1 p-2 border border-gray-300 rounded-md"
                value={formFactor}
                onChange={(e) => setFormFactor(e.target.value)}
                required
              >
                <option value="">-- Select --</option>
                {formFactors.map((factor, index) => (
                  <option key={index} value={factor}>
                    {factor}
                  </option>
                ))}
              </select>
            </div>

            {/* Input Rows */}
            {[["Quantity", "Quantity"]].map(([labelText, placeholder]) => (
              <div key={labelText} className="flex items-center gap-4">
                <label className="w-48 text-right font-medium">
                  {labelText}:
                </label>
                <Input
                  className="flex-1"
                  type="text"
                  placeholder={placeholder}
                  min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
                />
              </div>
            ))}
             <CardFooter className="flex justify-center gap-4 mt-6">
          <Button type="submit" className="bg-blue-600 hover:bg-blue-500">Save</Button>
          <Link to={Routecardinventry}>
            <Button type="button"  className="bg-red-600 hover:bg-red-500">Cancel</Button>
          </Link>
        </CardFooter>
          </form>
        </CardContent>

       
      </Card>
    </div>
  );
};

export default AddInventory;
