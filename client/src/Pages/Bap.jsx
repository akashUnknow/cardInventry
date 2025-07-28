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

const Bap = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    orderNo: "",
    SAPno: "",
    CPSSno: "",
    DGcateg: "",
    Priority: "",
    profile: "",
    RequestType: "",
    Developer: "",
    Validator: "",
    ValidationStatus: "",
    OrderReceive: "",
    SLAscheduledFinishDate: "",
    StartDate: "",
    FinishDate: "",
    lagTime: "",
    PreRequisitesStatus: "",
    Status: "",
    Remarks: "",
    userName: "akash",
  });

  const handleChange = (key, value) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Failed to save data");
        console.error("Backend error:", data);
        return;
      }

      toast.success("Data saved successfully!");
      navigate("/");

      setFormState({
        orderNo: "",
        SAPno: "",
        CPSSno: "",
        DGcateg: "",
        Priority: "",
        profile: "",
        RequestType: "",
        Developer: "",
        Validator: "",
        ValidationStatus: "",
        OrderReceive: "",
        SLAscheduledFinishDate: "",
        StartDate: "",
        FinishDate: "",
        lagTime: "",
        PreRequisitesStatus: "",
        Status: "",
        Remarks: "",
        userName: "akash",
      });
    } catch (error) {
      console.error("Network or JSON error:", error);
      toast.error("Something went wrong!");
    }
  };

  const fields = [
    { name: "orderNo", label: "Order No." },
    { name: "SAPno", label: "SAP No" },
    { name: "CPSSno", label: "CPSS No" },
    { name: "DGcateg", label: "DG Categ" },
    { name: "Priority", label: "Priority" },
    { name: "profile", label: "Profile Name" },
    { name: "RequestType", label: "Request Type" },
    { name: "Developer", label: "Developer" },
    { name: "Validator", label: "Validator" },
    { name: "ValidationStatus", label: "Validation Status" },
    { name: "OrderReceive", label: "Order Receive", type: "date" },
    { name: "SLAscheduledFinishDate", label: "SLA/ Scheduled", type: "date" },
    { name: "StartDate", label: "Start Date", type: "date" },
    { name: "FinishDate", label: "Finish Date", type: "date" },
    // { name: "lagTime", label: "Factory" },
    // { name: "PreRequisitesStatus", label: "Pre Requisites" },
    { name: "Status", label: "Status" },
    { name: "Remarks", label: "Remarks" },
  ];

  const dropdownOptions = {
    Priority: ["High", "Medium", "Low"],
    DGcateg: ["Identical", "Major", "Minor", "Test Profile"],
    RequestType: ["Test Card", "DG Only"],
    PreRequisitesStatus: ["Completed", "In Progress", "Hold"],
    Status: ["In Progress", "Completed"],
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
                    className="border rounded px-2 py-1 text-sm"
                  >
                    <option value="">Select {label.toLowerCase()}</option>
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

export default Bap;
