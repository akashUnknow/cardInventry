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

// const API_BASE = "http://localhost:8080/api/bap";\
const API_BASE = import.meta.env.VITE_API_URL + "/api/bap"; // Adjust this to your actual API base URL

const Bap = () => {
  const navigate = useNavigate();

  const defaultFormState = {
    orderNo: "",
    sapNo: "",
    cpssNo: "",
    dgCateg: "",
    priority: "",
    profile: "",
    requestType: "",
    developer: "",
    validator: "",
    validationStatus: "",
    orderReceive: "",
    slascheduledFinishDate: "",
    startDate: "",
    finishDate: "",
    status: "",
    remarks: "",
  };

  const [formState, setFormState] = useState(defaultFormState);
  const [isExisting, setIsExisting] = useState(false);

  const handleChange = (key, value) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  const handleOrderNoEnter = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      try {
        const res = await fetch(`${API_BASE}/search?orderNo=${formState.orderNo}`);
        if (!res.ok) throw new Error("Not Found");
        const data = await res.json();

        if (data?.orderNo) {
          toast.success("Order found. Form pre-filled.");
          setFormState(data);
          setIsExisting(true);
        } else {
          toast.info("No existing order found.");
          setIsExisting(false);
        }
      } catch (error) {
        toast.error("Order not found or API error: " + error.message);
        setIsExisting(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isExisting
      ? `${API_BASE}/update-by-orderNo`
      : `${API_BASE}/add-profile`;
    const method = isExisting ? "PUT" : "POST";

    try {
      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Failed to save");
        return;
      }

      toast.success(isExisting ? "Profile updated successfully" : "Profile added successfully");
      setFormState(defaultFormState);
      setIsExisting(false);
      navigate("/");
    } catch (error) {
      toast.error("Network or server error");
      console.error(error);
    }
  };

  const fields = [
    { name: "orderNo", label: "Order No." },
    { name: "sapNo", label: "SAP No" },
    { name: "cpssNo", label: "CPSS No" },
    { name: "dgCateg", label: "DG Categ" },
    { name: "priority", label: "Priority" },
    { name: "profile", label: "Profile Name" },
    { name: "requestType", label: "Request Type" },
    { name: "developer", label: "Developer" },
    { name: "validator", label: "Validator" },
    { name: "validationStatus", label: "Validation Status" },
    { name: "orderReceive", label: "Order Receive", type: "date" },
    { name: "slascheduledFinishDate", label: "SLA / Scheduled", type: "date" },
    { name: "startDate", label: "Start Date", type: "date" },
    { name: "finishDate", label: "Finish Date", type: "date" },
    { name: "status", label: "Status" },
    { name: "remarks", label: "Remarks" },
  ];

  const dropdownOptions = {
    priority: ["High", "Medium", "Low"],
    dgCateg: ["Identical", "Major", "Minor", "Test Profile", "Profile Creation"],
    requestType: ["New", "DG Only", "Test Card"],
    validationStatus: ["Pending", "Validated"],
    status: ["In Progress", "Completed", "Under Review"],
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

                {dropdownOptions[name] ? (
                  <select
                    value={formState[name]}
                    onChange={(e) => handleChange(name, e.target.value)}
                    className={`border rounded px-2 py-1 text-sm ${
                      isExisting ? "bg-green-100" : ""
                    }`}
                  >
                    <option value="">Select {label}</option>
                    {dropdownOptions[name].map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <Input
                    type={type}
                    value={formState[name]}
                    onChange={(e) => handleChange(name, e.target.value)}
                    onKeyDown={name === "orderNo" ? handleOrderNoEnter : undefined}
                    placeholder={label}
                    className={isExisting ? "bg-green-100" : ""}
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
              className={`${
                isExisting ? "bg-yellow-500 hover:bg-yellow-400" : "bg-blue-600 hover:bg-blue-500"
              }`}
            >
              {isExisting ? "Update" : "Save"}
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

export default Bap;
