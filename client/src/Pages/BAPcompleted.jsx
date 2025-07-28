import React, { useState } from "react";
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

const initialData = [
  {
    fs: "FS-001",
    profile: "Profile A",
    status: "In Review",
    configurator: "Akash",
    comment: "Initial data",
    edd: "2025-07-24",
  },
  {
    fs: "FS-002",
    profile: "Profile B",
    status: "Pending",
    configurator: "Ravi",
    comment: "In progress",
    edd: "2025-08-01",
  },
];

const BAPcompleted = () => {
  const [data, setData] = useState(initialData);
  const [editRowId, setEditRowId] = useState(null);

  const handleSave = (rowId, updatedRow) => {
    const newData = data.map((item) => (item.fs === rowId ? updatedRow : item));
    setData(newData);
    setEditRowId(null);
    toast.success("Row updated successfully!");
  };

  const handleCancel = () => {
    setEditRowId(null);
    toast.info("Edit cancelled.");
  };

  const columns = [
    {
      accessorKey: "fs",
      header: "FS",
      cell: ({ row }) =>
        row.original.fs === editRowId ? (
          <Input
            defaultValue={row.original.fs}
            onChange={(e) => (row.original.fs = e.target.value)}
          />
        ) : (
          row.original.fs
        ),
    },
    {
      accessorKey: "profile",
      header: "Profile",
      cell: ({ row }) =>
        row.original.fs === editRowId ? (
          <Input
            defaultValue={row.original.profile}
            onChange={(e) => (row.original.profile = e.target.value)}
          />
        ) : (
          row.original.profile
        ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) =>
        row.original.fs === editRowId ? (
          <select
            defaultValue={row.original.status}
            onChange={(e) => (row.original.status = e.target.value)}
            className="w-full px-2 py-1 rounded border text-sm"
          >
            <option value="In Review">In Review</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        ) : (
          row.original.status
        ),
    },
    {
      accessorKey: "configurator",
      header: "Configurator",
      cell: ({ row }) =>
        row.original.fs === editRowId ? (
          <Input
            defaultValue={row.original.configurator}
            onChange={(e) => (row.original.configurator = e.target.value)}
          />
        ) : (
          row.original.configurator
        ),
    },
    {
      accessorKey: "comment",
      header: "Comment",
      cell: ({ row }) =>
        row.original.fs === editRowId ? (
          <Input
            defaultValue={row.original.comment}
            onChange={(e) => (row.original.comment = e.target.value)}
          />
        ) : (
          row.original.comment
        ),
    },
    {
      accessorKey: "edd",
      header: "EDD",
      cell: ({ row }) =>
        row.original.fs === editRowId ? (
          <Input
            type="date"
            defaultValue={row.original.edd}
            onChange={(e) => (row.original.edd = e.target.value)}
          />
        ) : (
          row.original.edd
        ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const isEditing = row.original.fs === editRowId;
        return isEditing ? (
          <div className="flex gap-2">
            <Button
              onClick={() => handleSave(row.original.fs, row.original)}
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
            onClick={() => setEditRowId(row.original.fs)}
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
      <h2 className="text-xl font-bold mb-4">IDSP Data - Completed</h2>
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
                    {flexRender(header.column.columnDef.header, header.getContext())}
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

export default BAPcompleted;
