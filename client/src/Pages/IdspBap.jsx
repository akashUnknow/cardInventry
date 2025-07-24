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

const IdspBap = () => {
  const navigate = useNavigate();
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [formState, setFormState] = useState({
    Profile: "",
    PartnerCode: "",
    Version: "",
    FSno: "",
    Configurator: "",
    EDD: "",
    HOLD: "",
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
        `http://localhost:8080/api/dg/get-card/${formState.FSno}`
      );

      if (!response.ok) {
        toast.info("No record found. You can add new.");
        setIsUpdateMode(false);
        return;
      }

      const data = await response.json();
      setFormState({ ...data });
      setIsUpdateMode(true);
      toast.success("Record loaded. You can update now.");
    } catch (error) {
      console.error("Search error:", error);
      toast.error("Error while searching for FS No");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isUpdateMode
      ? `http://localhost:8080/api/dg/update-card/${formState.FSno}`
      : "http://localhost:8080/api/dg/add-card";

    const method = isUpdateMode ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Failed to save/update data");
        return;
      }

      toast.success(
        isUpdateMode ? "Data updated successfully!" : "Data saved successfully!"
      );
      navigate("/");

      setFormState({
        Profile: "",
        PartnerCode: "",
        Version: "",
        FSno: "",
        Configurator: "",
        EDD: "",
        HOLD: "",
        Comment: "",
        Type: "",
        userName: "akash",
      });
      setIsUpdateMode(false);
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
    { name: "HOLD", label: "HOLD", type: "number" },
    { name: "Comment", label: "Comment" },
    { name: "Type", label: "Type" },
  ];

  return (
    <div className="min-h-screen flex justify-center bg-gray-100 px-4 pt-4 pb-20">
      <Card className="w-full max-w-6xl flex flex-col mb-16 shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            IDSP  ({isUpdateMode ? "Update" : "Add"})
          </CardTitle>
        </CardHeader>

        <div className="px-6">
          {/* Search bar for FSno */}
          <div className="flex gap-2 mb-6">
            <Input
              placeholder="Enter FS No to Search"
              value={formState.FSno}
              onChange={(e) => handleChange("FSno", e.target.value)}
            />
            <Button
              type="button"
              onClick={handleSearch}
              className="bg-green-600 hover:bg-green-500"
            >
              Search
            </Button>
          </div>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-2"
          >
            {fields.map(({ name, label, type = "text" }) => (
              <div key={name} className="flex flex-col gap-1">
                <label className="font-medium">{label}:</label>

                {name === "Type" ? (
                  <select
                    value={formState.Type}
                    onChange={(e) => handleChange("Type", e.target.value)}
                    className="border rounded px-2 py-1 text-sm"
                  >
                    <option value="">Select type</option>
                    <option value="Euicc">In Progress</option>
                    <option value="Classic">Completed</option>
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
        </div>

        <CardFooter className="flex flex-col gap-2 py-3">
          <div className="flex justify-center gap-5 py-3">
            <Button
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-500"
            >
              {isUpdateMode ? "Update" : "Save"}
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

export default IdspBap;
