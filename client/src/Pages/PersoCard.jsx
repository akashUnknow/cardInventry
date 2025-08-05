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

const PersoCard = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cardDescription: "",
    formFactor: "",
    usedQuantity: "",
    profile: "",
    configurator: "",
    issuedTo: "",
    customer: "",
    rst: "",
    telcaPersoTest: "",
    shredCard: "",
  });

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
  const API_BASE = import.meta.env.VITE_API_URL;

  const formFactors = ["TRI", "2FF", "3FF", "4FF", "MFF2", "B4"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      cardDescription,
      formFactor,
      usedQuantity,
      profile,
      configurator,
      issuedTo,
      customer,
      rst,
      telcaPersoTest,
      shredCard,
    } = formData;
    if (
      !cardDescription ||
      !formFactor ||
      !usedQuantity ||
      isNaN(usedQuantity)
    ) {
      toast.warn("Please enter all required fields correctly.");
      return;
    }
    try {
      const persoData = {
        cardDescription,
        usedQuantity,
        formFactor,
        profile,
        configurator,
        issuedTo,
        customer,
        rst,
        telcaPersoTest,
        shredCard,
      };
      if (
        parseInt(rst) + parseInt(telcaPersoTest) + parseInt(shredCard) !==
        parseInt(usedQuantity)
      ) {
        toast.warn(
          "Total of RST, TelcaPerso Test, and Shred Card must equal Used Quantity."
        );
        return;
      }

      const response = await fetch(
        `${API_BASE}/api/cards/perso-card`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(persoData), // replace with actual state
        }
      );

      if (!response.ok) {
        const errorText = await response.text(); // get plain text message
        throw new Error(errorText); // this will go to catch block
      }

      const result = await response.json();
      toast.success("Card details saved successfully!");
      navigate(Routecardinventry); // redirect to card inventory page
      console.log(result);
    } catch (err) {
      alert(`❌ Error: ${err.message}`);
    }
  };

  return (
    <div className="flex justify-center mt-[20px] bg-gray-100 min-h-[calc(100vh-20vh)]">
      <Card className="w-[600px] p-6 shadow-lg bg-white h-[calc(95vh)]">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold">
            Perso Card Details
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Card Description */}
            <div className="flex items-center gap-4">
              <label className="w-48 text-right font-medium">
                Card Description:
              </label>
              <select
                name="cardDescription"
                value={formData.cardDescription}
                onChange={handleChange}
                className="flex-1 p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">-- Select --</option>
                {cardDescriptions.map((desc, index) => (
                  <option key={index} value={desc}>
                    {desc}
                  </option>
                ))}
              </select>
            </div>

            {/* Form Factor */}
            <div className="flex items-center gap-4">
              <label className="w-48 text-right font-medium">
                Form Factor:
              </label>
              <select
                name="formFactor"
                value={formData.formFactor}
                onChange={handleChange}
                className="flex-1 p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">-- Select --</option>
                {formFactors.map((f, index) => (
                  <option key={index} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <label className="w-48 text-right font-medium">
                Used Quantity:
              </label>
              <Input
                type="number"
                name="usedQuantity"
                value={formData.usedQuantity}
                onChange={handleChange}
                min="1"
                className="flex-1"
                placeholder="Used Quantity"
                required
              />
            </div>

            {/* Other Fields */}
            {[
              ["profile", "Profile"],
              ["configurator", "Configurator (Name)"],
              ["issuedTo", "Issued To (Name)"],
              ["customer", "Customer"],
              ["rst", "RST"],
              ["telcaPersoTest", "TelcaPerso Test"],
              ["shredCard", "Shred Card"],
            ].map(([name, label]) => (
              <div key={name} className="flex items-center gap-4">
                <label className="w-48 text-right font-medium">{label}:</label>
                <Input
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className="flex-1"
                  type="text"
                  placeholder={label}
                />
              </div>
            ))}

            {/* Actions */}
            <CardFooter className="flex justify-center gap-4 mt-6">
              <Button type="submit" className="bg-blue-600 hover:bg-blue-500">
                Save & Use
              </Button>
              <Link to={Routecardinventry}>
                <Button type="button" className="bg-red-600 hover:bg-red-500">
                  Cancel
                </Button>
              </Link>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersoCard;
