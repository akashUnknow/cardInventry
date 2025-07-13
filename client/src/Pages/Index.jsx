import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ChartDashboard = () => {
  const [category, setCategory] = useState("All");
  const [user, setUser] = useState("All");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [dgData, setDgData] = useState({
    labels: [],
    datasets: [],
  });

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
    },
  };

  // 📦 Fetch default yearly data
  useEffect(() => {
    const fetchDefaultYearData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/dg/dg-inventory/monthly-count/2024"
        );
        const data = await response.json();

        const labels = data.map((item) => item.monthName.trim());
        const values = data.map((item) => item.count);

        setDgData({
          labels,
          datasets: [
            {
              label: "Data Generation",
              data: values,
              backgroundColor: "rgba(59, 130, 246, 0.7)",
              borderRadius: 8,
            },
          ],
        });
      } catch (error) {
        console.error("Failed to fetch chart data:", error);
      }
    };

    fetchDefaultYearData();
  }, []);

  // 📦 Fetch filtered data by date
  const handleFilter = async () => {
    if (!dateFrom || !dateTo) {
      alert("Please select both From and To dates.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/dg/dg-inventory/monthly-count?startDate=${dateFrom}&endDate=${dateTo}`
      );
      const data = await response.json();

      const labels = data.map((item) => item.monthName.trim());
      const values = data.map((item) => item.count);

      setDgData({
        labels,
        datasets: [
          {
            label: "Data Generation",
            data: values,
            backgroundColor: "rgba(59, 130, 246, 0.7)",
            borderRadius: 8,
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching filtered chart data:", error);
    }
  };

  return (
    <div className="w-full min-h-screen p-4 bg-gray-100 space-y-4">
      {/* Filters */}
      <Card className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
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
            <Input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
            />
          </div>

          {/* Date To */}
          <div>
            <label className="block text-sm font-medium mb-1">To</label>
            <Input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
            />
          </div>

          {/* Filter Button */}
          <div className="flex items-end">
            <Button onClick={handleFilter} className="w-full">
              Filter
            </Button>
          </div>
        </div>
      </Card>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-7xl mx-auto">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Data Generation</CardTitle>
          </CardHeader>
          <CardContent className="h-[450px] w-full">
            <div className="h-full w-full">
              <Bar data={dgData} options={options} />
            </div>
          </CardContent>
        </Card>

        <Card className="h-full">
          <CardHeader>
            <CardTitle>BAP (Static Example)</CardTitle>
          </CardHeader>
          <CardContent className="h-[450px] w-full">
            <div className="h-full w-full">
              <Bar
                data={{
                  labels: ["Jan", "Feb", "Mar", "Apr", "May"],
                  datasets: [
                    {
                      label: "BAP",
                      data: [700, 1100, 500, 800, 300],
                      backgroundColor: "rgba(34, 197, 94, 0.7)",
                      borderRadius: 8,
                    },
                  ],
                }}
                options={options}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="w-full text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} Your Company Name. All rights reserved.
      </footer>
    </div>
  );
};

export default ChartDashboard;
