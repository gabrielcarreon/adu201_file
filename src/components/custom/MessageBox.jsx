import {Avatar, AvatarImage, Button, Card, CardContent, Form, Textarea, toast} from "@/components/ui";
import {cn, getAvatar, handleErrors} from "@/lib/utils.ts";
import moment from "moment";
import {useForm} from "react-hook-form";
import {CustomPuffLoader, NormalTextArea} from "@/components/custom";
import {PaperPlaneIcon} from "@radix-ui/react-icons";
import instance from "@/inc/axios_config.ts";
import {useAuth} from "@/providers/index.js";
import {useEffect, useRef, useState} from "react";
import {useApplication} from "@/providers/ApplicationProvider.jsx";
import {useLocation} from "react-router-dom";
import path from "path";
export const MessageBox = ({ states, data }) => {
  const { data: dtData, pending, setData, setPending } = useApplication()
  const { pathname } = useLocation()
  const dataTableData = pathname === '/pending' ? pending: dtData
  const setDataTableData = pathname === '/pending' ? setPending: setData
  const { app_info, messages, row_id } = data
  const [ messagesState, setMessagesState ] = useState(messages)
  const [ loading, setLoading ] = useState(false)
  const { auth: { _csrf_token, fname, lname, mname, emp_no  } }  = useAuth()
  const form = useForm({
    mode: "onChange",
    defaultValues: {
      message: '',
      ctrl_no: app_info.ctrl_no,
    }
  })
  
  useEffect(() => {
    (async () => {
      states?.setUnreadState(0)
      await instance.post(`/?api=message/seen&_csrf_token=${_csrf_token}`, {
        ctrl_no: app_info.ctrl_no
      })
    })()
    const newData = []
    
    dataTableData.forEach((data, index) => {
      if(index === (row_id * 1)){
        data.message_cnt = 0
      }
      newData.push(data)
    })
    setDataTableData(newData)
  }, [])
  const handleSendMessage = async ({ e }) => {
    setLoading(true)
    try{
      setMessagesState([...messagesState, {
        application_id: app_info.id,
        date_created: moment(),
        emp_no: emp_no,
        full_name: `${lname}, ${fname} ${mname}`,
        id: `placehold`,
        image_id: null,
        message: form.getValues('message'),
        sender: 1
      }])
      const response = await instance.post(`/?api=message/send&_csrf_token=${_csrf_token}`, form.getValues())
      setLoading(false)
      
      form.reset()
      setMessagesState(response.data.messages)
      toast({
        variant: "success",
        title: 'Success',
        description: 'Message was successfully sent!'
      })
    }catch (error){
      setLoading(false)
      handleErrors(error, 'Send message failed!')
    }
  }
  return (
    <Card>
      <CardContent className="py-4">
        <p className="font-bold mb-4 transition-all duration-500 ease-in-out">Messages</p>
        
        <div className="overflow-y-auto flex flex-col-reverse max-h-80 scroll-smooth">
          <div className="flex flex-col text-sm bg-gray-100 shadow shadow-inshadow rounded-md">
            {messagesState.map((message, index )=> (
              <div key={index} className="mx-4 my-2 flex flex-col">
                {message.sender === 0 ?
                  (
                    <div className="max-w-[90%] min-w-[20%] w-fit flex flex-col">
                      <div
                        className="w-full flex flex-col bg-gray-300 overflow-hidden p-4 rounded-md self-start me-8 shadow shadow-sketch">
                          <span className="mb-2 flex items-center">
                          <Avatar>
                            <AvatarImage src={getAvatar({id: message.image_id, accessLvl: 2})}/>
                          </Avatar>
                          <span className="ms-2">
                            <p className="font-semibold text-sm">{message.full_name}</p>
                            <p className="text-xs">{message.emp_no}</p>
                          </span>
                        </span>
                        <p
                          className={cn("whitespace-pre-wrap", states?.messageOpen ? "" : "whitespace-nowrap")}>{message.message}</p>
                      </div>
                      <span
                        className="text-gray-600 text-xs mt-2 italic self-end">{moment(message.date_created).format("MMMM D, YYYY | h:mm A")}</span>
                    </div>
                  
                  ) :
                  (
                    <div className="max-w-[90%] min-w-[20%] flex flex-col ms-auto">
                      <div
                        className="bg-blue-300 w-full overflow-x-hidden p-4 rounded-md self-end ms-8 shadow shadow-sketch">
                        <p
                          className={cn("whitespace-pre-wrap", states?.messageOpen ? "" : "whitespace-nowrap")}>{message.message}</p>
                      </div>
                      <span
                        className="text-gray-600 text-xs italic mt-2 self-end">{moment(message.date_created).format("MMMM D, YYYY | h:mm A")}</span>
                    </div>
                  
                  )}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 bg-white">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSendMessage)}>
              <NormalTextArea
                data={{
                  name: 'message',
                  placeholder: 'Type in your message here'
                }}
                form={form}
              />
              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={form.getValues('message').length <= 0 || loading}
                ><CustomPuffLoader
                  text={<PaperPlaneIcon/>}
                  state={loading}/>
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  )
}