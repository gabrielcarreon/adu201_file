import {AppPage, Navbar} from "@/layouts";
import React, {useEffect, useState} from "react";
import {useAuth} from "@/providers";
import {cn, colorCodeStatus, getAvatar, handleErrors, ucwords} from "@/lib/utils.ts";
import {
  Avatar, AvatarImage,
  Badge,
  Button,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui";
import {DropdownMenu} from "@radix-ui/react-dropdown-menu";
import {MoreHorizontal} from "lucide-react";
import instance from "@/inc/axios_config.ts";
import {CustomPuffLoader} from "@/components/custom/index.js";
import {useApplication} from "@/providers/ApplicationProvider.jsx";

const PendingApplicationPage = ({ }) => {
  const [applicationData, setApplicationData] = useState({})
  const [dialogOpen, setDialogOpen] = useState(false)
  const { auth: { _csrf_token } } = useAuth()
  const [ loading, setLoading ] = useState(false)
  
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
      key: 'full_name',
      header: "Applied by",
      cell: ({ row }) => {
        const { full_name, image_id, emp_no } = row.original
        return (
          <div className="flex gap-2">
            <Avatar>
              <AvatarImage loading="lazy" src={getAvatar({id: image_id, accessLvl: '2'})}/>
            </Avatar>
            <div>
              <p className="font-semibold text-center text-sm">{ucwords(full_name)}</p>
              <p className="font-normal mb-0 text-xs">{emp_no}</p>
            </div>
          </div>
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
                  {<CustomPuffLoader text={<MoreHorizontal className="h-4 w-4" />} state={loading}/>}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={async () => {
                    setLoading(true)
                    try{
                      const response = await instance.get(`/?api=201.application_info&ctrl_no=${ctrl_no}&_csrf_token=${_csrf_token}`)
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
                        const response = await instance.get(`/?api=201.application_info&ctrl_no=${ctrl_no}&_csrf_token=${_csrf_token}`)
                        response.data.message_open = true
                        response.data.row_id = row.id
                        setApplicationData(response.data)
                        setDialogOpen(true)
                        setLoading(false)
                      }catch (error) {
                        handleErrors(error, "Something went wrong.")
                        setLoading(false)
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

export default PendingApplicationPage