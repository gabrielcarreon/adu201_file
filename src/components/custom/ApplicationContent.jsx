import { Avatar, AvatarImage, Badge, Button, Card, CardContent, DropdownMenuContent, DropdownMenuItem, DropdownMenu, DropdownMenuTrigger, Form, FormControl, FormField, FormItem, Input, Label, Separator, Toggle, toast } from "@/components/ui";
import {cn, colorCodeStatus, getAvatar, handleErrors, ucwords} from "@/lib/utils.ts";
import {
  CheckIcon,
  EnvelopeClosedIcon,
  EnvelopeOpenIcon,
  ChevronDownIcon,
  DotsHorizontalIcon
} from "@radix-ui/react-icons";
import {useEffect, useState } from "react";
import {MessageBox} from "@/components/custom/MessageBox.jsx";
import {useAuth, useConfirmDialog} from "@/providers/index.js";
import {useForm} from "react-hook-form";
import {ToggleState} from "@/components/custom/CustomForms.jsx";
import {useFileViewer} from "@/providers/FileViewerProvider.jsx";
import instance from "@/inc/axios_config.ts";
import {useLocation} from "react-router-dom";
import path from "path";
import {useApplication} from "@/providers/ApplicationProvider.jsx";
export const ApplicationContent = ({ data, states }) => {
  const { app_info, app_fields, app_attachments, messages, unread_cnt, row_id } = data
  const [messageOpen, setMessageOpen] = useState(data?.message_open)
  const [loading, setLoading] = useState(false)
  const [unreadState, setUnreadState] = useState(unread_cnt)
  const { setConfirmData, setConfirmState } = useConfirmDialog()
  const { setFileState } = useFileViewer()
  const { pathname } = useLocation()
  const { updateData } = useApplication()
  const { auth } = useAuth()
  const path = pathname.substring(1)
  const viewFunc = (e) => {
    const [ type, subtype ] = e.filetype.split('/')
    setFileState({
      ctrl_no: app_info.ctrl_no,
      enc_file_name: e.enc_file_name,
      file_name: e.file_name,
      desc: e.descript,
      type: type,
      subtype: subtype
    })
  }
  const form = useForm({
    mode: "onChange",
    defaultValues: {
      ctrl_no: app_info.ctrl_no,
      fields: (() => {
        return app_fields.map((field, index) => {
          return field
        })
      })()
    }
  })
  return (
    <div className="md:px-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Avatar>
            <AvatarImage src={getAvatar({id: app_info.image_id, accessLvl: 2})}/>
          </Avatar>
          <div className="ms-2 md:ms-4">
            <span className="flex gap-1 md:gap-2">
              <p className="m-0 font-semibold text-sm md:text-base">{`${app_info.lname}, ${app_info.fname} ${app_info.mname}`}</p>
              <Badge className={cn("pointer-events-none h-fit", colorCodeStatus(app_info.status).style)}>{ucwords(app_info.status)}</Badge>
            </span>
            <p className="m-0 text-xs md:text-sm text-secondary-foreground">{app_info.emp_no}</p>
          </div>
        </div>
        <Button
          className="relative"
          onClick={() => setMessageOpen(!messageOpen)}>
          {messageOpen ? (
            <EnvelopeOpenIcon/>
          ) : <EnvelopeClosedIcon/>}
          {unreadState > 0 && (
            <span
              className="rounded-full absolute -top-2.5 -right-2.5 bg-red-600 h-[20px] w-[20px] text-xs flex items-center justify-center">{unreadState}</span>
          )}
        </Button>
      </div>
      <Separator className="bg-zinc-300 my-4"/>
      <div>
        {messageOpen ? (
          <MessageBox
            states={{
              messageOpen: messageOpen,
              setUnreadState: setUnreadState,
              setApplicationData: states?.setApplicationData,
              dataTable: states?.dataTable,
              setDataTableData: states?.setDataTableData
            }}
            data={{
              row_id: row_id,
              app_info: app_info,
              messages: messages
            }}
          />
        ) : (
          <>
            <ProposedChanges
              path={path}
              form={form}
              data={{
                app_info: app_info
              }}
            />
          </>
        )}
      </div>
      <div className="mt-4 ">
        <FileSection
          attachments={app_attachments}
          actions={{
            view: viewFunc
          }}/>
      </div>
      <Separator className="bg-zinc-300 my-4"/>
      <div className="flex justify-end mt-4">
        {app_info.status === 'pending' && path === 'pending' && auth.user_access === 'hr' && !messageOpen &&(
          <Button
            disabled={loading}
            onClick={() => {
              setConfirmData({
                title: 'Confirmation',
                description: 'Are you sure you want to apply these changes?',
                states: {
                  loadingState: loading
                },
                action: async () => {
                  try{
                    setLoading(true)
                    await instance.post(`/?api=201.hr_submit_changes&_csrf_token=${auth._csrf_token}`, form.getValues())
                    updateData()
                    setLoading(false)
                    setConfirmState(false)
                    states?.setDialogOpen(false)
                    toast({
                      description: "Request approved successfully",
                      title: "Success",
                      variant: "success"
                    })
                  }catch (error){
                    handleErrors(error, "Failed")
                    setLoading(false)
                  }
                }
              })
              setConfirmState(true)
            }}>Submit</Button>
        )}
        {app_info.status === 'pending' && path === 'applications' && (
          <Button
            className="hover:bg-red-500 hover:text-white hover:border-red-500"
            variant="outline"
            disabled={loading}
            onClick={() => {
              setConfirmData({
                title: 'Confirmation',
                description: 'Are you sure you want to cancel your application?',
                states: {
                  loadingState: loading
                },
                variant: 'destructive',
                action: async () => {
                  try{
                    setLoading(true)
                    await instance.post(`/?api=application/cancel&_csrf_token=${auth._csrf_token}`, {
                      ctrl_no: app_info.ctrl_no
                    })
                    updateData()
                    setLoading(false)
                    setConfirmState(false)
                    states?.setDialogOpen(false)
                    toast({
                      description: "Request cancelled successfully",
                      title: "Success",
                      variant: "success"
                    })
                  }catch (error){
                    handleErrors(error, "Failed")
                    setLoading(false)
                  }
                }
              })
              setConfirmState(true)
              console.log(app_info)
            }}
          >Cancel</Button>
        )}
        
      </div>
    </div>
  )
}
const FileSection = ({ attachments, actions }) => {
  return (
    <>
      <p className="font-bold mb-4">Attached files</p>
      <div className="flex flex-wrap justify-start gap-2">
        {attachments.map((attachment, index) => {
          return (
            <div key={index}>
              <div className="shadow shadow-sketch rounded-md border border-gray-300 min-h-12 max-h-16 p-4 flex items-center justify-between min-w-60 max-w-32">
                <div className="w-[80%]">
                  <p className="text-xs text-gray-500">{attachment.descript}</p>
                  <p
                    className="font-semibold overflow-x-hidden whitespace-nowrap overflow-ellipsis text-xs">{attachment.file_name}</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    className="border-gray-500 h-4 w-4 rounded-full flex items-center justify-center">
                    <ChevronDownIcon className="text-zinc-900"/></DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={(e) => actions?.view({
                      descript: attachment.descript,
                      file_name: attachment.file_name,
                      enc_file_name: attachment.encrypted_file_name,
                      filetype: attachment.file_type
                    })}>View</DropdownMenuItem>
                    <DropdownMenuItem>Download</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
const GroupField = (props) => {
  const { parts, path } = props
  const [toggled, setToggled] = useState(false)
  
  /*
    on mount function
   */
  useEffect(() => {
    let isApproved = true
    parts.forEach(({ data, field, form, index }) => {
      if(!isApproved) return
      const value = form.getValues(`fields[${[index]}]`)
      if(value.is_approved === 0) isApproved = false
    })
    setToggled(isApproved)
  }, [])
  
  
  const changeValue = () => {
    setToggled(!toggled)
  }
  useEffect(() => {
    parts.forEach(({ data, field, form, index }) => {
      if(data.app_info.status === 'done' || data.app_info.status === 'cancelled') return
      const value = form.getValues(`fields[${index}]`)
      value.is_approved = toggled ? 1 : 0
      form.setValue(`fields[${index}]`, value)
    })
  },[toggled])
  return (
    <>
      {parts.map(({ field, index}) => (
        <div key={index}>
          <div className="grid w-full items-center gap-1.5 my-4">
            <Label htmlFor={field.field_name}>{field.descript}</Label>
            <Input id={field.field_name}
                   readOnly={true}
                   type="text"
                   defaultValue={field.value}/>
          </div>
        </div>
      ))}
      <div className="flex justify-end">
        <Toggle
          disabled={parts[0].data.app_info.status === 'done' || parts[0].data.app_info.status === 'cancelled'  || path !== 'pending'}
          onClick={e => {
            changeValue()
          }}
          className={cn("border-blue-400", toggled ? "!bg-green-600 !text-white" : null)}
          aria-label="Toggle approval" variant="outline">
          {toggled
            ? (<><CheckIcon/>Approved</>)
            : (<><DotsHorizontalIcon className="text-inherit"/>Pending</>)
          }
        </Toggle>
      </div>
    </>
  )
}
const SingleField = (props) => {
  const { form, index, field, data, path } = props
  return (
    <FormField
      control={form.control}
      name={`fields[${index}]`}
      render={({ }) => (
        <div className="grid w-full items-center gap-1.5 my-4">
          <Label htmlFor={field.field_name}>{field.descript}</Label>
          <div className="flex">
            <Input id={field.field_name}
                   className="border-e-0 rounded-e-none" readOnly={true}
                   type="text"
                   defaultValue={field.value}/>
            <FormItem>
              <FormControl>
                <ToggleState
                  form={form}
                  states={{
                    value: field.value.value
                  }}
                  attr={{
                    disabled: data?.app_info.status !== 'pending' || path !== 'pending'
                  }}
                  field_name='fields'
                  index={index}
                  data={{
                    buttonName: {
                      on: (<><CheckIcon className="text-inherit"/>Approved</>),
                      off: (<><DotsHorizontalIcon className="text-inherit"/>Pending</>)
                    },
                    name: field.field_name,
                    value: field.value,
                    defaultValue: field.value,
                  }}
                />
              </FormControl>
            </FormItem>
          </div>
        </div>
      )}
    />
  )
}

const ProposedChanges = ({ form, data, path }) => {
  const [partitionState, setPartitionState] = useState({})
  useEffect(() => {
    const placehold = {}
    form.getValues('fields').map((field, index) => {
      if(field.partition === 0){
        placehold[`${field.field_name}_${index}`] = {
          partition: false,
          parts: {
            form: form,
            index: index,
            field: field,
            data: data,
          }
        }
      }else{
        const partitionParent = []
        if(`group_${field.partition}` in placehold){
          placehold[`group_${field.partition}`].parts = [...placehold[`group_${field.partition}`].parts, {
            form: form,
            index: index,
            field: field,
            data: data,
          }]
        }else{
          placehold[`group_${field.partition}`] = {
            partition: true,
            parts: [{
              form: form,
              index: index,
              field: field,
              data: data,
            }]
          }
        }
      }
    })
    setPartitionState(placehold)
  }, [])
  return (
    <Card className="shadow shadow-sketch">
      <CardContent className="py-4 shadow-sketch shadow bg-gray-50">
        <p className="font-bold mb-4 text-">Proposed changes</p>
        <Form {...form}>
          {Object.keys(partitionState).map((part, index) => {
            return (
              <Card key={index} className="shadow shadow-sketch mb-4">
                <CardContent className="pt-3">
                  {partitionState[part].partition
                    ? <GroupField path={path} {...partitionState[part]}/>
                    : <SingleField path={path} {...partitionState[part].parts}/>
                  }
                </CardContent>
              </Card>
            )
          })}
        </Form>
      </CardContent>
    </Card>
  )
}