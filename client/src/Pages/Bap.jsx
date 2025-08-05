import React, {  useState } from "react";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// API URL
const API_BASE = import.meta.env.VITE_API_URL + "/api/bap";

// Zod Schema
const bapSchema = z.object({
  orderNo: z.string().min(1, "Order No. is required"),
  sapNo: z.string().min(1, "SAP No. is required"),
  cpssNo: z.string().min(1, "CPSS No. is required"),
  dgCateg: z.string().min(1, "DG Categ is required"),
  priority: z.string().min(1, "Priority is required"),
  profile: z.string().min(1, "Profile Name is required"),
  requestType: z.string().min(1, "Request Type is required"),
  developer: z.string().min(1, "Developer is required"),
  validator: z.string().min(1, "Validator is required"),
  validationStatus: z.string().min(1, "Validation Status is required"),
  orderReceive: z.string().min(1, "Order Receive date is required"),
  slascheduledFinishDate: z.string().min(1, "SLA/Scheduled Finish Date is required"),
  startDate: z.string().min(1, "Start Date is required"),
  finishDate: z.string().min(1, "Finish Date is required"),
  status: z.string().min(1, "Status is required"),
  remarks: z.string().min(1, "Remarks are required"),
});

const Bap = () => {
  const navigate = useNavigate();
  const [isExisting, setIsExisting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(bapSchema),
    defaultValues: {
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
    },
  });

  const handleOrderNoEnter = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      try {
        const res = await fetch(`${API_BASE}/search?orderNo=${e.target.value}`);
        if (!res.ok) throw new Error("Not Found");
        const data = await res.json();

        if (data?.orderNo) {
          toast.success("Order found. Form pre-filled.");
          Object.keys(data).forEach((key) => {
            setValue(key, data[key]);
          });
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

  const onSubmit = async (formData) => {
    const endpoint = isExisting
      ? `${API_BASE}/update-by-orderNo`
      : `${API_BASE}/add-profile`;
    const method = isExisting ? "PUT" : "POST";

    try {
      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Failed to save");
        return;
      }

      toast.success(isExisting ? "Profile updated successfully" : "Profile added successfully");
      reset();
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
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {fields.map(({ name, label, type = "text" }) => (
              <div key={name} className="flex flex-col gap-1">
                <label className="font-medium">{label}:</label>

                {dropdownOptions[name] ? (
                  <select
                    {...register(name)}
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
                    {...register(name)}
                    onKeyDown={name === "orderNo" ? handleOrderNoEnter : undefined}
                    placeholder={label}
                    className={isExisting ? "bg-green-100" : ""}
                  />
                )}

                {errors[name] && (
                  <p className="text-sm text-red-500">{errors[name]?.message}</p>
                )}
              </div>
            ))}
          </form>
        </div>

        <CardFooter className="flex flex-col gap-4 mt-auto py-4">
          <div className="flex justify-center gap-4">
            <Button
              onClick={handleSubmit(onSubmit)}
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
