import React, { useState } from "react"
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Pencil, Save, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const initialData = [
  { id: "1", name: "Project A", status: "In Review", assignedTo: "Akash" },
  { id: "2", name: "Project B", status: "Pending", assignedTo: "Ravi" },
  { id: "3", name: "Project C", status: "Completed", assignedTo: "Neha" },
]

const BAPcompleted = () => {
  const [data, setData] = useState(initialData)
  const [editRowId, setEditRowId] = useState(null)
  const [editRowCopy, setEditRowCopy] = useState({})

  const handleEditClick = (row) => {
    setEditRowId(row.original.id)
    setEditRowCopy({ ...row.original })
  }

  const handleInputChange = (field, value) => {
    setEditRowCopy((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    const updatedData = data.map((item) =>
      item.id === editRowId ? editRowCopy : item
    )
    setData(updatedData)
    setEditRowId(null)
    toast.success("Row updated successfully!")
  }

  const handleCancel = () => {
    setEditRowId(null)
    setEditRowCopy({})
    toast.info("Edit cancelled.")
  }

  const columns = [
    {
      accessorKey: "id",
      header: "ID",
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
      header: "Project Name",
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
          </select>
        ) : (
          row.original.status
        ),
    },
    {
      accessorKey: "assignedTo",
      header: "Assigned To",
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
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const isEditing = row.original.id === editRowId
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
        )
      },
    },
  ]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <Card className="p-4">
      <h2 className="text-xl font-bold mb-4">BAP - Completed</h2>
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
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </ScrollArea>
    </Card>
  )
}

export default BAPcompleted
