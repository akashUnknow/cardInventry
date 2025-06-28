import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Routecardinventry } from "@/helper/RouteName";
const PersoCard = () => {
    const cardDescriptions = [
    "SkySIM Avior 80nm - AV340 BPU", "SkySIM Avior 80nm - AV340 non BPU", "SkySIM Avior 80nm - AV440", "SkySIM Avior 80nm - AV1.2M (QM)",
    "Orion - 480", "Orion - 800", "Orion - 800 M2M","Dragon/Wega LTE", "Phoenix 400","Phoenix 512", "Phoenix 512 Pro", "Avior 480 Pro",    "CX 97 1M crypto in-car",
    "Hercules 1.2M in-car", "CX 97 1M no-crypto M2M", "CX 97 1 M no-crypto in-car", "Avior Pro 340", "Hercules 1.2M 80nm", "Wega",
    "Argo 320", "Phoenix 670", "Luna 1.3M", "Luna 1.3M M2M", "Lyral.5M / Polarisl.5M", "Luna 1.0M", "Argo 512", "Argo 512 M2m in Car",
    "M2M AR360 in-car QFN8", "Argo 400","AVIOR 560","AVIOR 256","AVIOR 320", "AVIOR 420", "Avior 700", "Avior Pro 700", "Dragon III",
    "SkySIM CX - Scorpius 420", "SkySIM CX - Scorpius 560 130nm", "SkySIM CX - Scorpius 768", "SkySIM CX 90nm - Cygnus 1.2M EVO classic",
    "SkySIM CX 90nm - Cygnus 1.2M no Mifare", "Aries", "Tong Fang-Prism", "Zeta 480","Zeta 132"
];

// Form Factor
const formFactors = [
    "TRI", "2FF", "3FF", "4FF", "MFF2","B4"
];
  return (
     <div className="flex items-center justify-center min-h-screen">
      <Card className="w-[600px] p-6 shadow-lg bg-white">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold">
            Perso Card Details
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form className="space-y-4">
            {/* Row: Card Description */}
            <div className="flex items-center gap-4">
              <label className="w-48 text-right font-medium">Card Description:</label>
              <select className="flex-1 p-2 border border-gray-300 rounded-md">
                {cardDescriptions.map((description, index) => (
                  <option key={index} value={description}>
                    {description}
                  </option>
                ))}
              </select>
            </div>

            {/* Row: Form Factor */}
            <div className="flex items-center gap-4">
              <label className="w-48 text-right font-medium">Form Factor:</label>
              <select className="flex-1  p-2 border border-gray-300 rounded-md">
                {formFactors.map((factor, index) => (
                  <option key={index} value={factor}>
                    {factor}
                  </option>
                ))}
              </select>
            </div>

            {/* Input Rows */}
            {[
              ["Profile", "Profile"],
              ["Configurator (Name)", "Configurator"],
              ["Issued To (Name)", "Issued to"],
              ["Customer", "Customer"],
              ["RST", "RST"],
              ["TelcaPerso Test", "TelcaPerso Test"],
              ["Shred Card", "Shred Card"],
            ].map(([labelText, placeholder]) => (
              <div key={labelText} className="flex items-center gap-4">
                <label className="w-48 text-right font-medium">{labelText}:</label>
                <Input className="flex-1" type="text" placeholder={placeholder} />
              </div>
            ))}
          </form>
        </CardContent>

        <CardFooter className="flex justify-center gap-4 mt-6">
          <Button className="bg-blue-600 hover:bg-blue-500">Save</Button>
          <Link to={Routecardinventry}>
            <Button className="bg-red-600 hover:bg-red-500">Cancel</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

export default PersoCard
