import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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

  useEffect(() => {
    const fetchDefaultYearData = async () => {
      try {
        const dgRes = await fetch(`${API_BASE}/api/dg/dg-inventory/monthly-count/2024`);
        const dgJson = await dgRes.json();
        setDgData({
          labels: dgJson.map((item) => item.monthName.trim()),
          datasets: [
            {
              label: "Data Generation",
              data: dgJson.map((item) => item.count),
              backgroundColor: "rgba(59, 130, 246, 0.7)",
              borderRadius: 8,
            },
          ],
        });

        const bapRes = await fetch(`${API_BASE}/api/bap/monthly-count/2025`);
        const bapJson = await bapRes.json();
        setBapData({
          labels: bapJson.map((item) => item.monthName.trim()),
          datasets: [
            {
              label: "BAP Profiles",
              data: bapJson.map((item) => item.count),
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

  const handleFilter = async () => {
    if (!dateFrom || !dateTo) {
      alert("Please select both From and To dates.");
      return;
    }

    try {
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
  <div className="w-full min-h-screen pt-20 px-4 bg-gray-100 space-y-6">
    {/* Filters Section */}
    <Card className="max-w-7xl mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">From</label>
          <Input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">To</label>
          <Input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
          />
        </div>
        <div className="sm:col-span-2 md:col-span-1 flex items-end">
          <Button
            onClick={handleFilter}
            className="w-full bg-blue-600 hover:bg-blue-500"
          >
            Apply Filter
          </Button>
        </div>
      </div>
    </Card>

    {/* Charts Section */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
      {/* DG Chart */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-base sm:text-lg font-semibold">
            Data Generation (DG)
          </CardTitle>
        </CardHeader>
        <CardContent className="h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px]">
          <Bar data={dgData} options={options} />
        </CardContent>
      </Card>

      {/* BAP Chart */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-base sm:text-lg font-semibold">
            BAP Monthly Count
          </CardTitle>
        </CardHeader>
        <CardContent className="h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px]">
          <Bar data={bapData} options={options} />
        </CardContent>
      </Card>
    </div>

    {/* Footer */}
    <footer className="text-center text-sm text-gray-500 py-6">
      © {new Date().getFullYear()} Akash MCJJ. All rights reserved.
    </footer>
  </div>
);

};

export default ChartDashboard;
