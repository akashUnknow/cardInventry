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

const BapUnderReview = () => {
  const API_BASE = import.meta.env.VITE_API_URL;
  const [data, setData] = useState([]);
  const [editRowId, setEditRowId] = useState(null);
  const [editRowCopy, setEditRowCopy] = useState({});

  useEffect(() => {
    fetchUnderReviewData();
  }, []);

  const fetchUnderReviewData = async () => {
    try {
      const response = await fetch(
        `${API_BASE}/api/idsp/type?type=In Review`
      );
      const json = await response.json();

      if (!response.ok) {
        toast.error(json.message || "Failed to fetch data.");
        return;
      }

      const formatted = json.map((item) => ({
        id: item.fs,
        name: item.profile,
        assignedTo: item.configurator,
        comment: item.comment,
        edd: item.edd,
        status: item.type,
        partnerCode: item.partnerCode,
        version: item.version,
      }));

      setData(formatted);
    } catch (error) {
      console.error("Error loading under-review data:", error);
      toast.error("Error loading data.");
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
        profile: editRowCopy.name,
        configurator: editRowCopy.assignedTo,
        comment: editRowCopy.comment,
        edd: editRowCopy.edd,
        type: editRowCopy.status,
        partnerCode: editRowCopy.partnerCode,
        version: editRowCopy.version,
      };

      const response = await fetch(
        `${API_BASE}/api/idsp/update-by-fs`,
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
        name: json.data.profile,
        assignedTo: json.data.configurator,
        comment: json.data.comment,
        edd: json.data.edd,
        status: json.data.type,
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
      accessorKey: "name",
      header: "Profile",
      cell: ({ row }) =>
        row.original.id === editRowId ? (
          <Input
            value={editRowCopy.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
        ) : (
          row.original.name
        ),
    },
    {
      accessorKey: "assignedTo",
      header: "Configurator",
      cell: ({ row }) =>
        row.original.id === editRowId ? (
          <Input
            value={editRowCopy.assignedTo}
            onChange={(e) => handleInputChange("assignedTo", e.target.value)}
          />
        ) : (
          row.original.assignedTo
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
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) =>
        row.original.id === editRowId ? (
          <select
            value={editRowCopy.status}
            onChange={(e) => handleInputChange("status", e.target.value)}
            className="w-full px-2 py-1 rounded border text-sm"
          >
            <option value="In Review">In Review</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Hold">Hold</option>
          </select>
        ) : (
          row.original.status
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
      <h2 className="text-xl font-bold mb-4">BAP - Under Review</h2>
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

export default BapUnderReview;
