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
import { toast } from "react-toastify";

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
    arff: "", // ✅ Added
    response: "", // ✅ Added
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
    console.log("Submitted", formState);
    try {
      const response = await fetch(`${API_BASE}/api/dg/update-by-gdindia`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });
      if (!response.ok) {
        throw new Error("Failed to update record");
      }
      const data = await response.json();
      console.log("Update successful:", data);
    } catch (error) {
      console.error("Error updating record:", error);
    }
  };

  const handlegdIndia = async (gdIndiaValue) => {
    console.log("Searching for GDINDIA:", gdIndiaValue);
    try {
      const response = await fetch(
        `http://localhost:8080/api/dg/search?GdIndia=${gdIndiaValue}`
      );
      if (!response.ok) {
        throw new Error("GDINDIA not found");
      }
      const data = await response.json();
      console.log("Found record:", data);
      setFormState((prev) => ({
        ...prev,
        ...data,
      }));
    } catch (error) {
      toast.error("GDINDIA not found: " + error.message);
      console.error("Error fetching gdIndia:", error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-6xl h-[90vh] flex flex-col">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            DG Form
          </CardTitle>
        </CardHeader>

        <div className="overflow-y-auto px-6">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {fields.map(({ name, label, type = "text" }) => (
              <div key={name} className="flex flex-col gap-1">
                <label className="font-medium">{label}:</label>
                {name === "status" ? (
                  <select
                    value={formState.status}
                    onChange={(e) => handleChange("status", e.target.value)}
                    className="border rounded px-2 py-1 text-sm"
                  >
                    <option value="">Select status</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                ) : (
                  <Input
                    type={type}
                    value={formState[name] ?? ""} // ✅ Prevent uncontrolled warning
                    onChange={(e) => handleChange(name, e.target.value)}
                    onKeyDown={(e) => {
                      if (name === "gdIndia" && e.key === "Enter") {
                        handlegdIndia(formState[name]);
                      }
                    }}
                    placeholder={label}
                  />
                )}
              </div>
            ))}
          </form>
        </div>

        <CardFooter className="flex flex-col gap-4 mt-auto py-4">
          <div className="flex justify-center gap-4">
            <Button
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-500"
            >
              Update
            </Button>
            <Link to="/">
              <Button variant="destructive">Cancel</Button>
            </Link>
          </div>
          <p className="text-center text-sm text-gray-400">akash</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Update;
