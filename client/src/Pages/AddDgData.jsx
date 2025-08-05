import React, { useEffect } from "react";
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
import { useSelector } from "react-redux";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const API_BASE = import.meta.env.VITE_API_URL;

// ✅ Zod schema
const dgFormSchema = z.object({
  month: z.string().min(1, "Month is required"),
  orderNo: z.string().min(1, "Order No. is required"),
  gdIndia: z.string().min(1, "GDINDIA Internal is required"),
  salesSub: z.string().min(1, "Sales SUB is required"),
  orderDate: z.string().min(1, "Order Date is required"),
  customerDelivery: z.string().min(1, "Customer Delivery is required"),
  schedule: z.string().min(1, "Schedule is required"),
  profileData: z.string().min(1, "Profile Data is required"),
  lagTime: z.string().min(1, "Lag Time is required"),
  customer: z.string().min(1, "Customer is required"),
  profile: z.string().min(1, "Profile is required"),
  reference: z.string().min(1, "Reference is required"),
  orderDetails: z.string().min(1, "Order Details is required"),
  status: z.enum(["in-progress", "completed"], {
    errorMap: () => ({ message: "Status is required" }),
  }),
  qty: z.string().min(1, "Quantity is required"),
  factory: z.string().min(1, "Factory is required"),
  processor: z.string().min(1, "Processor is required"),
  validator: z.string().min(1, "Validator is required"),
  response: z.string().min(1, "Response is required"),
  userName: z.string().min(1, "Username is required"),
  arff: z.string().min(1, "ARFF/Voucher Upload is required"),
});

const AddDgData = () => {
  const navigate = useNavigate();
  const userName = useSelector((state) => state.auth.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(dgFormSchema),
  });

  useEffect(() => {
    if (userName) {
      setValue("userName", userName);
    }
  }, [userName, setValue]);

  const onFormSubmit = async (data) => {
    try {
      const response = await fetch(`${API_BASE}/dg/add-card`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message || "Failed to save data");
        return;
      }

      toast.success("Data saved successfully!");
      reset();
      navigate("/");
    } catch (error) {
      console.error("Submit Error:", error);
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
    <div className="min-h-screen flex justify-center bg-gray-100 px-4 py-6">
      <Card className="w-full max-w-6xl flex flex-col">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">DG Form</CardTitle>
        </CardHeader>

        {/* Scrollable Form */}
        <div className="overflow-y-auto px-6 py-2 max-h-[70vh]">
          <form
            onSubmit={handleSubmit(onFormSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <Input type="hidden" {...register("userName")} />

            {fields.map(({ name, label, type = "text" }) => (
              <div key={name} className="flex flex-col gap-1">
                <label className="font-medium text-sm">{label}:</label>

                {name === "status" ? (
                  <select
                    {...register(name)}
                    className="border rounded px-2 py-1 text-sm"
                  >
                    <option value="">Select status</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                ) : (
                  <Input type={type} {...register(name)} placeholder={label} />
                )}

                {errors[name] && (
                  <p className="text-sm text-red-500">
                    {errors[name].message}
                  </p>
                )}
              </div>
            ))}
          </form>
        </div>

        <CardFooter className="flex flex-col gap-4 mt-auto py-4">
          <div className="flex flex-col sm:flex-row justify-center gap-4 w-full">
            <Button
              onClick={handleSubmit(onFormSubmit)}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500"
            >
              Save
            </Button>
            <Link to="/" className="w-full sm:w-auto">
              <Button variant="destructive" className="w-full sm:w-auto">
                Cancel
              </Button>
            </Link>
          </div>
          <p className="text-center text-sm text-gray-400">{userName}</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AddDgData;
