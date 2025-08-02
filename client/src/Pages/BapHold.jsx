import React, { useEffect, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Pencil, Save, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BapHold = () => {
  const API_BASE = import.meta.env.VITE_API_URL;
  const [data, setData] = useState([]);
  const [editRowId, setEditRowId] = useState(null);
  const [editRowCopy, setEditRowCopy] = useState({});

  useEffect(() => {
    fetchHoldData();
  }, []);

  const fetchHoldData = async () => {
    try {
      const response = await fetch(
        `${API_BASE}/idsp/type?type=Hold`
      );
      const json = await response.json();

      if (!response.ok) {
        toast.error(json.message || "Failed to fetch Hold data");
        return;
      }

      const formatted = json.map((item) => ({
        id: item.fs,
        profile: item.profile,
        configurator: item.configurator,
        type: item.type,
        edd: item.edd,
        comment: item.comment,
        partnerCode: item.partnerCode,
        version: item.version,
      }));

      setData(formatted);
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Failed to load Hold records.");
    }
  };

  const handleEditClick = (row) => {
    setEditRowId(row.original.id);
    setEditRowCopy({ ...row.original });
  };

  const handleInputChange = (field, value) => {
    setEditRowCopy((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      const payload = {
        fs: editRowCopy.id,
        profile: editRowCopy.profile,
        partnerCode: editRowCopy.partnerCode,
        version: editRowCopy.version,
        configurator: editRowCopy.configurator,
        edd: editRowCopy.edd,
        comment: editRowCopy.comment,
        type: editRowCopy.type,
      };

      const response = await fetch(
        `${API_BASE}/idsp/update-by-fs`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const json = await response.json();

      if (!response.ok) {
        toast.error(json.message || "Failed to update profile.");
        return;
      }

      const updatedItem = {
        id: json.data.fs,
        profile: json.data.profile,
        configurator: json.data.configurator,
        type: json.data.type,
        edd: json.data.edd,
        comment: json.data.comment,
        partnerCode: json.data.partnerCode,
        version: json.data.version,
      };

      const updatedData = data.map((item) =>
        item.id === editRowId ? updatedItem : item
      );

      setData(updatedData);
      setEditRowId(null);
      toast.success(json.message || "Updated successfully!");
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Error updating row.");
    }
  };

  const handleCancel = () => {
    setEditRowId(null);
    setEditRowCopy({});
    toast.info("Edit cancelled.");
  };

  const columns = [
    {
      accessorKey: "id",
      header: "FS No",
      cell: ({ row }) =>
        row.original.id === editRowId ? (
          <Input
            value={editRowCopy.id}
            onChange={(e) => handleInputChange("id", e.target.value)}
          />
        ) : (
          row.original.id
        ),
    },
    {
      accessorKey: "profile",
      header: "Project Name",
      cell: ({ row }) =>
        row.original.id === editRowId ? (
          <Input
            value={editRowCopy.profile}
            onChange={(e) => handleInputChange("profile", e.target.value)}
          />
        ) : (
          row.original.profile
        ),
    },
    {
      accessorKey: "configurator",
      header: "Assigned To",
      cell: ({ row }) =>
        row.original.id === editRowId ? (
          <Input
            value={editRowCopy.configurator}
            onChange={(e) => handleInputChange("configurator", e.target.value)}
          />
        ) : (
          row.original.configurator
        ),
    },
    {
      accessorKey: "type",
      header: "Status",
      cell: ({ row }) =>
        row.original.id === editRowId ? (
          <select
            value={editRowCopy.type}
            onChange={(e) => handleInputChange("type", e.target.value)}
            className="w-full px-2 py-1 rounded border text-sm"
          >
            <option value="In Review">In Review</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Hold">Hold</option>
          </select>
        ) : (
          row.original.type
        ),
    },
    {
      accessorKey: "edd",
      header: "EDD",
      cell: ({ row }) =>
        row.original.id === editRowId ? (
          <Input
            type="date"
            value={editRowCopy.edd}
            onChange={(e) => handleInputChange("edd", e.target.value)}
          />
        ) : (
          row.original.edd
        ),
    },
    {
      accessorKey: "comment",
      header: "Comment",
      cell: ({ row }) =>
        row.original.id === editRowId ? (
          <Input
            value={editRowCopy.comment}
            onChange={(e) => handleInputChange("comment", e.target.value)}
          />
        ) : (
          row.original.comment
        ),
    },
    {
      accessorKey: "partnerCode",
      header: "Partner Code",
      cell: ({ row }) =>
        row.original.id === editRowId ? (
          <Input
            value={editRowCopy.partnerCode}
            onChange={(e) => handleInputChange("partnerCode", e.target.value)}
          />
        ) : (
          row.original.partnerCode
        ),
    },
    {
      accessorKey: "version",
      header: "Version",
      cell: ({ row }) =>
        row.original.id === editRowId ? (
          <Input
            value={editRowCopy.version}
            onChange={(e) => handleInputChange("version", e.target.value)}
          />
        ) : (
          row.original.version
        ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const isEditing = row.original.id === editRowId;
        return isEditing ? (
          <div className="flex gap-2">
            <Button
              onClick={handleSave}
              variant="outline"
              size="icon"
              className="text-green-600"
            >
              <Save className="w-4 h-4" />
            </Button>
            <Button
              onClick={handleCancel}
              variant="outline"
              size="icon"
              className="text-red-600"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <Button
            onClick={() => handleEditClick(row)}
            variant="outline"
            size="icon"
            className="text-blue-600"
          >
            <Pencil className="w-4 h-4" />
          </Button>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">BAP - Hold</h2>
        <Button onClick={fetchHoldData} variant="outline" size="sm">
          Refresh
        </Button>
      </div>
      <ScrollArea className="w-full overflow-auto">
        <table className="w-full text-sm border-collapse">
          <thead className="bg-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="border px-4 py-2 text-left font-medium"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="border px-4 py-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </ScrollArea>
    </Card>
  );
};

export default BapHold;
