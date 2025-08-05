import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Update = () => {
  const [formState, setFormState] = useState({
    month: "",
    orderNo: "",
    gdIndia: "",
    salesSub: "",
    orderDate: "",
    customerDelivery: "",
    schedule: "",
    profileData: "",
    lagTime: "",
    customer: "",
    profile: "",
    reference: "",
    orderDetails: "",
    status: "",
    qty: "",
    factory: "",
    processor: "",
    validator: "",
    arff: "",
    response: "",
  });

  const API_BASE = import.meta.env.VITE_API_URL;

  const handleChange = (key, value) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  const fields = [
    { name: "gdIndia", label: "GDINDIA Internal" },
    { name: "orderNo", label: "Order No." },
    { name: "month", label: "Month" },
    { name: "salesSub", label: "Sales SUB" },
    { name: "orderDate", label: "Order Date", type: "date" },
    { name: "customerDelivery", label: "Customer Delivery", type: "date" },
    { name: "schedule", label: "Schedule", type: "date" },
    { name: "profileData", label: "Profile Data" },
    { name: "lagTime", label: "Lag Time" },
    { name: "customer", label: "Customer" },
    { name: "profile", label: "Profile" },
    { name: "reference", label: "Reference" },
    { name: "orderDetails", label: "Order Details" },
    { name: "status", label: "Status" },
    { name: "qty", label: "Quantity", type: "number" },
    { name: "factory", label: "Factory" },
    { name: "processor", label: "Processor" },
    { name: "validator", label: "Validator" },
    { name: "arff", label: "ARFF / Voucher Upload" },
    { name: "response", label: "Response / Production Upload" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE}/api/dg/update-by-gdindia`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      if (!response.ok) throw new Error("Failed to update record");

      const data = await response.json();
      console.log("Update successful:", data);
    } catch (error) {
      console.error("Error updating record:", error);
    }
  };

  const handlegdIndia = async (gdIndiaValue) => {
    try {
      const response = await fetch(
        `${API_BASE}/api/dg/search?GdIndia=${gdIndiaValue}`
      );

      if (!response.ok) throw new Error("GDINDIA not found");

      const data = await response.json();
      setFormState((prev) => ({ ...prev, ...data }));
    } catch (error) {
      console.error("Error fetching gdIndia:", error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center bg-gray-100 px-4 py-6 pt-20">
      <Card className="w-full max-w-6xl h-full max-h-[95vh] flex flex-col shadow-xl rounded-lg">
        <CardHeader className="text-center px-4 pt-6">
          <CardTitle className="text-xl sm:text-2xl font-bold">
            DG Form Update
          </CardTitle>
        </CardHeader>

        <CardContent className="overflow-y-auto px-4 pb-6">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {fields.map(({ name, label, type = "text" }) => (
              <div key={name} className="flex flex-col">
                <label
                  htmlFor={name}
                  className="font-medium text-sm mb-1 text-gray-700"
                >
                  {label}:
                </label>

                {name === "status" ? (
                  <select
                    id={name}
                    value={formState.status}
                    onChange={(e) => handleChange("status", e.target.value)}
                    className="border rounded-md px-2 py-2 text-sm w-full"
                  >
                    <option value="">Select status</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                ) : (
                  <Input
                    id={name}
                    type={type}
                    value={formState[name]}
                    onChange={(e) => handleChange(name, e.target.value)}
                    onKeyDown={(e) => {
                      if (name === "gdIndia" && e.key === "Enter") {
                        handlegdIndia(formState[name]);
                      }
                    }}
                    placeholder={label}
                    className="w-full"
                  />
                )}
              </div>
            ))}
          </form>
        </CardContent>

        <CardFooter className="flex flex-col sm:flex-row justify-center items-center gap-4 py-4 border-t px-4">
          <Button
            onClick={handleSubmit}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500"
          >
            Update
          </Button>

          <Link to="/" className="w-full sm:w-auto">
            <Button variant="destructive" className="w-full sm:w-auto">
              Cancel
            </Button>
          </Link>

        </CardFooter>
      </Card>
    </div>
  );
};

export default Update;
