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

const IdspBap = () => {
  const API_BASE = import.meta.env.VITE_API_URL;

  const [formState, setFormState] = useState({
    Profile: "",
    PartnerCode: "",
    Version: "",
    FSno: "",
    Configurator: "",
    EDD: "",
    Comment: "",
    Type: "",
    userName: "akash",
  });

  const handleChange = (key, value) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  const handleSearch = async () => {
    if (!formState.FSno) {
      toast.warning("Please enter FS No to search");
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE}/api/idsp/search?fs=${formState.FSno}`
      );

      if (!response.ok) {
        toast.info("No record found. You can add new.");
        return;
      }

      const data = await response.json();

      setFormState({
        ...formState,
        Profile: data.profile,
        PartnerCode: data.partnerCode,
        Version: data.version,
        FSno: data.fs,
        Configurator: data.configurator,
        EDD: data.edd,
        Comment: data.comment,
        Type: data.type,
      });

      toast.success("Record found.");
    } catch (error) {
      console.error("Search error:", error);
      toast.error("Error while searching for FS No");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      profile: formState.Profile,
      partnerCode: formState.PartnerCode,
      version: formState.Version,
      fs: formState.FSno,
      configurator: formState.Configurator,
      edd: formState.EDD,
      comment: formState.Comment,
      type: formState.Type,
    };

    try {
      const response = await fetch(`${API_BASE}/api/idsp/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Failed to save data");
        return;
      }

      toast.success("Data saved successfully!");
      setFormState({
        Profile: "",
        PartnerCode: "",
        Version: "",
        FSno: "",
        Configurator: "",
        EDD: "",
        Comment: "",
        Type: "",
      });
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("Something went wrong!");
    }
  };

  const fields = [
    { name: "Profile", label: "Profile" },
    { name: "PartnerCode", label: "Partner code" },
    { name: "Version", label: "Version" },
    { name: "FSno", label: "FS No" },
    { name: "Configurator", label: "Configurator" },
    { name: "EDD", label: "EDD", type: "date" },
    { name: "Comment", label: "Comment" },
    { name: "Type", label: "Type" },
  ];

  return (
    <div className="min-h-screen flex justify-center items-start bg-gray-100 px-4 pt-6 pb-20">
      <Card className="w-full max-w-4xl shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl sm:text-3xl font-bold">
            IDSP (Add / Search)
          </CardTitle>
        </CardHeader>

        <CardContent className="px-4 sm:px-6">
          {/* FS No Search */}
          <div className="flex flex-col sm:flex-row gap-2 mb-6">
            <Input
              placeholder="Enter FS No to Search"
              value={formState.FSno}
              onChange={(e) => handleChange("FSno", e.target.value)}
              className="w-full"
            />
            <Button
              type="button"
              onClick={handleSearch}
              className="bg-green-600 hover:bg-green-500 w-full sm:w-auto"
            >
              Search
            </Button>
          </div>

          {/* Form Fields */}
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {fields.map(({ name, label, type = "text" }) => (
              <div key={name} className="flex flex-col gap-1">
                <label className="font-medium">{label}:</label>
                {name === "Type" ? (
                  <select
                    value={formState.Type}
                    onChange={(e) => handleChange("Type", e.target.value)}
                    className="border rounded px-2 py-2 text-sm"
                  >
                    <option value="">Select Type</option>
                    <option value="In Review">In Review</option>
                    <option value="Pending">Pending</option>
                    <option value="Hold">Hold</option>
                  </select>
                ) : (
                  <Input
                    type={type}
                    value={formState[name] || ""}
                    onChange={(e) => handleChange(name, e.target.value)}
                    placeholder={label}
                  />
                )}
              </div>
            ))}
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-4 py-6">
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-500 w-full sm:w-auto"
            >
              Save
            </Button>
            <Link to="/" className="w-full sm:w-auto">
              <Button variant="destructive" className="w-full sm:w-auto">
                Cancel
              </Button>
            </Link>
          </div>
          <p className="text-center text-sm text-gray-400">akash</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default IdspBap;
