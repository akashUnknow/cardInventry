import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ChartDashboard = () => {
  const [category, setCategory] = useState("All");
  const [user, setUser] = useState("All");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const DgdataByMonth = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Data genration ",
        data: [120, 190, 300, 500, 200],
        backgroundColor: "rgba(59, 130, 246, 0.7)",
        borderRadius: 8,
      },
    ],
  };
   const DgdataByDATE = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Data genration ",
        data: [],
        backgroundColor: "rgba(59, 130, 246, 0.7)",
        borderRadius: 8,
      },
    ],
  };


  const BApdatbyMonth = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "BAP",
        data: [700, 1100, 500, 800, 300],
        backgroundColor: "rgba(34, 197, 94, 0.7)",
        borderRadius: 8,
      },
    ],
  };
   const BapataByDATE = {
    labels: [],
    datasets: [
      {
        label: "BAP",
        data: [],
        backgroundColor: "rgba(34, 197, 94, 0.7)",
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
    },
  };

  return (
    <div className="w-full h-screen p-4 bg-gray-100 space-y-4 overflow-auto">
      {/* Filters */}
      <Card className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="SIM">SIM</SelectItem>
                <SelectItem value="eSIM">eSIM</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* User Filter */}
          <div>
            <label className="block text-sm font-medium mb-1">User</label>
            <Select value={user} onValueChange={setUser}>
              <SelectTrigger>
                <SelectValue placeholder="Select User" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="user">User</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Date From */}
          <div>
            <label className="block text-sm font-medium mb-1">From</label>
            <Input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
          </div>

          {/* Date To */}
          <div>
            <label className="block text-sm font-medium mb-1">To</label>
            <Input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
          </div>
        </div>
      </Card>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-7xl mx-auto h-[calc(100%-180px)]">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Data genration</CardTitle>
          </CardHeader>
          <CardContent className="h-[calc(100%-72px)]">
            <div className="h-full w-full">
              <Bar data={DgdataByMonth} options={options} />
            </div>
          </CardContent>
        </Card>

        <Card className="h-full">
          <CardHeader>
            <CardTitle>BAP</CardTitle>
          </CardHeader>
          <CardContent className="h-[calc(100%-72px)]">
            <div className="h-full w-full">
              <Bar data={BApdatbyMonth} options={options} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChartDashboard;
