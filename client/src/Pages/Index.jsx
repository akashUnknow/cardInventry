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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ChartDashboard = () => {
  const API_BASE = import.meta.env.VITE_API_URL;
  const [category, setCategory] = useState("All");
  const [user, setUser] = useState("All");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [dgData, setDgData] = useState({ labels: [], datasets: [] });
  const [bapData, setBapData] = useState({ labels: [], datasets: [] });

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
    },
  };

  // Fetch default (yearly) chart data for DG and BAP
  useEffect(() => {
    const fetchDefaultYearData = async () => {
      try {
        // DG default data
        const dgRes = await fetch(`${API_BASE}/api/dg/dg-inventory/monthly-count/2024`);
        const dgJson = await dgRes.json();
        const dgLabels = dgJson.map((item) => item.monthName.trim());
        const dgValues = dgJson.map((item) => item.count);
        setDgData({
          labels: dgLabels,
          datasets: [
            {
              label: "Data Generation",
              data: dgValues,
              backgroundColor: "rgba(59, 130, 246, 0.7)",
              borderRadius: 8,
            },
          ],
        });

        // BAP default data
        const bapRes = await fetch(`${API_BASE}/api/bap/monthly-count/2025`);
        const bapJson = await bapRes.json();
        const bapLabels = bapJson.map((item) => item.monthName.trim());
        const bapValues = bapJson.map((item) => item.count);
        setBapData({
          labels: bapLabels,
          datasets: [
            {
              label: "BAP Profiles",
              data: bapValues,
              backgroundColor: "rgba(34, 197, 94, 0.7)",
              borderRadius: 8,
            },
          ],
        });
      } catch (error) {
        console.error("Failed to fetch default chart data:", error);
      }
    };

    fetchDefaultYearData();
  }, []);

  // Handle filter by date range
  const handleFilter = async () => {
    if (!dateFrom || !dateTo) {
      alert("Please select both From and To dates.");
      return;
    }

    try {
      // DG filtered data
      const dgRes = await fetch(
        `${API_BASE}/api/dg/dg-inventory/monthly-count?startDate=${dateFrom}&endDate=${dateTo}`
      );
      const dgJson = await dgRes.json();
      setDgData({
        labels: dgJson.map((d) => d.monthName.trim()),
        datasets: [
          {
            label: "Data Generation",
            data: dgJson.map((d) => d.count),
            backgroundColor: "rgba(59, 130, 246, 0.7)",
            borderRadius: 8,
          },
        ],
      });

      // BAP filtered data
      const bapRes = await fetch(
        `${API_BASE}/api/bap/bap/monthly-count?startDate=${dateFrom}&endDate=${dateTo}`
      );
      const bapJson = await bapRes.json();
      setBapData({
        labels: bapJson.map((d) => d.monthName.trim()),
        datasets: [
          {
            label: "BAP Profiles",
            data: bapJson.map((d) => d.count),
            backgroundColor: "rgba(34, 197, 94, 0.7)",
            borderRadius: 8,
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching filtered chart data:", error);
    }
  };

  return (
    <div className="w-full min-h-screen p-4 bg-gray-100 space-y-6">
      {/* Filters Section */}
      <Card className="max-w-7xl mx-auto p-4 space-y-2 sm:space-y-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
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

          <div>
            <label className="block text-sm font-medium mb-1">From</label>
            <Input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">To</label>
            <Input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
          </div>

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
            <CardTitle>Data Generation (DG)</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] sm:h-[450px] w-full">
            <div className="h-full w-full">
              <Bar data={dgData} options={options} />
            </div>
          </CardContent>
        </Card>

        <Card className="h-full">
          <CardHeader>
            <CardTitle>BAP Monthly Count</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] sm:h-[450px] w-full">
            <div className="h-full w-full">
              <Bar data={bapData} options={options} />
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
