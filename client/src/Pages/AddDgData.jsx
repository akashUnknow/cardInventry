import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

const AddDgData = () => {
  const navigate = useNavigate();
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
    response: "",
    userName: "akash", // prefilled as per your example
    arff: "",
  });

  const handleChange = (key, value) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:8080/api/dg/add-card", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formState),
    });

    const data = await response.json(); // 👈 always parse JSON

    if (!response.ok) {
      toast.error(data.message || "Failed to save data");
      console.error("Backend error:", data);
      return;
    }

    toast.success("Data saved successfully!");
    navigate("/");

    // Reset form
    setFormState({
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
      response: "",
      userName: "akash",
      arff: "",
    });
  } catch (error) {
    console.error("Network or JSON error:", error);
    toast.error("Something went wrong!");
  }
};

  const fields = [
    { name: "month", label: "Month" },
    { name: "orderNo", label: "Order No." },
    { name: "gdIndia", label: "GDINDIA Internal" },
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
                    value={formState[name]}
                    onChange={(e) => handleChange(name, e.target.value)}
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
              Save
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

export default AddDgData;
