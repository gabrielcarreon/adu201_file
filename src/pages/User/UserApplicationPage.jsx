import React, {useEffect, useState} from "react";
import instance from "@/inc/axios_config.ts";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  Badge,
  Button, toast, DropdownMenuSeparator
} from "@/components/ui";
import { MoreHorizontal } from "lucide-react";
import {cn, colorCodeStatus, handleErrors, ucwords} from "@/lib/utils.ts";
import {useAuth} from "@/providers/index.js";
import {FileViewerProvider} from "@/providers/FileViewerProvider.jsx";
import {AppPage} from "@/layouts/AppPage.jsx";
import {CustomPuffLoader} from "@/components/custom/index.js";
const UserApplicationPage = ({ }) => {
  const [applicationData, setApplicationData] = useState({})
  const [dialogOpen, setDialogOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  
  const { auth } = useAuth()
  const columns = [
    {
      key: "ctrl_no",
      header: "Control #",
      cell: ({ row }) => {
        const value = row.original.ctrl_no
        return (
          <p className="font-semibold text-center">{value}</p>
        )
      }
    },
    {
      key: "status",
      header: "Status",
      cell: ({ row }) =>{
        const value = row.original.status
        const { style } = colorCodeStatus(value)
        return (
          <div className="flex justify-center">
            <Badge className={cn("pointer-events-none min-w-20 flex justify-center", style)}>{ucwords(value)}</Badge>
          </div>
        )
      }
    },
    {
      key: "actions",
      cell: ({ row }) => {
        const { ctrl_no, message_cnt } = row.original
        
        return (
          <div className="flex justify-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0 relative">
                  {message_cnt > 0 && (
                    <Badge className="pointer-events-none h-[12px] w-[12px] p-2 text-xs rounded-full bg-red-600 flex justify-center absolute -right-1.5 -top-1.5">{message_cnt}</Badge>
                  )}
                  <span className="sr-only">Open menu</span>
                  {<CustomPuffLoader text={<MoreHorizontal className="h-4 w-4"/>} state={loading}/>}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={async () => {
                    setLoading(true)
                    try{
                      const response = await instance.get(`/?api=201.application_info&ctrl_no=${ctrl_no}&_csrf_token=${auth._csrf_token}`)
                      response.data.row_id = row.id
                      setApplicationData(response.data)
                      setDialogOpen(true)
                      setLoading(false)
                    }catch (error) {
                      handleErrors(error, "Something went wrong.")
                      setLoading(false)
                    }
                  }}
                >
                  View
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-center"
                  onClick={async () => {
                    setLoading(true)
                    try{
                      const response = await instance.get(`/?api=201.application_info&ctrl_no=${ctrl_no}&_csrf_token=${auth._csrf_token}`)
                      response.data.message_open = true
                      response.data.row_id = row.id
                      setApplicationData(response.data)
                      setDialogOpen(true)
                      setLoading(false)
                    }catch (error) {
                      handleErrors(error, "Something went wrong.")
                    }
                  }}>
                  Messages
                  {message_cnt > 0 && (
                    <Badge className="ms-2 pointer-events-none h-[12px] w-[12px] p-2 text-xs rounded-full bg-red-600 flex justify-center">{message_cnt}</Badge>
                  )}</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )
      },
    }
  ]
  return (
    <>
      <AppPage
        states={{
          dialogOpen: dialogOpen,
          setDialogOpen: setDialogOpen,
          setApplicationData: setApplicationData,
        }}
        dataTable={{
          columns: columns,
        }}
        appContent={{
          applicationData: applicationData
        }}
      />
    </>
  )
}

export default UserApplicationPage