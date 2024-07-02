import { flexRender, getCoreRowModel, useReactTable, getPaginationRowModel, getSortedRowModel, getFilteredRowModel } from "@tanstack/react-table"
import React, {useState} from "react";
import {ArrowUpDown, Filter} from "lucide-react";
import {
  DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger,
  Input, Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Checkbox
} from "@/components/ui"

const generateHeader = (dataColumns) => {
  return dataColumns.map((dataColumn) => {
    return {
      id: dataColumn.id,
      accessorKey: dataColumn.key,
      header: ({ column }) => (
        <Button
          className="text-center justify-center hover:bg-transparent shadow-none bg-transparent w-full border-none"
          variant="outline"
          size="md"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          {dataColumn.header}
          <ArrowUpDown className={column.getIsSorted() === "asc" ? "w-4 h-4 text-gray-400" : "w-4 h-4 text-gray-400"} />
        </Button>
      ),
      cell: dataColumn.cell
    }
  })
}
export function DataTable({ columnData, data, properties, states }) {
  const [sorting, setSorting] = useState([])
  const [columnFilters, setColumnFilters] = useState([])
  const [columnVisibility, setColumnVisibility] = useState([])
  const columns = generateHeader(columnData)
  if(properties?.allowSelect){
    columns.unshift({
      id: "select",
      header: ({ table }) => (
       <div className="flex justify-start">
         <Checkbox
           checked={
             table.getIsAllPageRowsSelected() ||
             (table.getIsSomePageRowsSelected() && "indeterminate")
           }
           onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
           aria-label="Select all"
         />
       </div>
      ),
      cell: ({ row }) => (
        <div className="flex justify-start items-center">
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    })
  }
  const table = useReactTable({
    data,
    columns,
    autoResetPageIndex: false,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility
    }
  })
  return (
    <>
      <div className="flex items-center py-4">
        <Input
          placeholder={properties?.filterPlaceholder}
          value={(table.getColumn(properties?.filterId)?.getFilterValue()) ?? ""}
          onChange={(event) => {
            table.getColumn(properties?.filterId)?.setFilterValue(event.target.value)
          }
          
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              <div><Filter height={16} width={16} color="gray"/></div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter(
                (column) => column.getCanHide()
              )
              .map((column, index) => {
                if(columnData[index]?.header !== undefined){
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {columnData[index]?.header}
                    </DropdownMenuCheckboxItem>
                  )
                }
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  {states?.loading ? "Loading data." : "No result."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </>
  )
}
