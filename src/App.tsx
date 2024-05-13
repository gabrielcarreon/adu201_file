import React, {useEffect, useRef, useState} from 'react'
import { global, Auth } from "@/inc/global.ts";
import '../app/globals.css'
import { Navbar } from "@/layouts"
import instance from "@/inc/axios_config.ts";
import { Toaster } from "@/components/ui/toaster"
import { toast } from "@/components/ui/use-toast.ts";
import { Welcome, ConfirmationDialog } from "@/components/custom";
import ApplicationPage from "@/pages/User/ApplicationPage.tsx";
import {Button} from "@/components/ui/button.tsx";
import { Pencil2Icon } from "@radix-ui/react-icons";
import EditPage from "@/pages/User/EditPage.tsx";
import {useForm} from "react-hook-form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader
} from "@/components/ui/alert-dialog.tsx";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel.tsx";
import {Card, CardContent} from "@/components/ui/card.tsx";


/**
 * Fetches user information and sets up the initial state of the component.
 *
 * @return {React.ReactElement} The JSX to render the component.
 */
function App(): React.ReactElement {
  const [initialLoad, setInitialLoad] = useState<boolean>(true)
  const [selectionState, setSelectionState] = useState<boolean>(false)
  const [confirmationDialog, setConfirmationDialog] = useState<boolean>(false)
  const applicationPageRef = useRef()
  const editPageRef = useRef()
  const [editState, setEditState] = useState<boolean>(false)
  const [auth, setAuth] = useState<Auth>({
    fname: '',
    lname: '',
    email: '',
    _csrf_token: '',
    image_url: '',
    user_access: '',
  })
  const submitForm = useForm({
    mode: "onChange",
  })
  const [uploadState, setUploadState] = useState(false)
  const [requiredFiles, setRequiredFiles] = useState([])
  const [response, setResponse] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState<[]>([])
  useEffect(() => {
    const fetchUser = async () => {
      const sessionToken =  await instance.get('?api=session.create')
      const authInfo = await instance.get('?api=session')
      return { sessionToken, authInfo }
    }

    fetchUser().then(({sessionToken, authInfo}: {
      sessionToken: { data: { message: string } },
      authInfo: { data: { message: [] } }
    }) => {
      const { data: { message } } = sessionToken
      const { data: { ...authObject } } = authInfo
      const { user_info, access_info } = {...authObject.message}
      setAuth({
        ...auth,
        email: user_info[0]?.adamsonmail,
        fname: user_info[0]?.fname,
        lname: user_info[0]?.lname,
        _csrf_token: message,
        image_url: `https://learn.adamson.edu.ph/primarypicavatar/getuserimg.php?x=${user_info[0]?.id}_2`,
        user_access: access_info[0]?.user_access
      })
      setInitialLoad(false)
    }).catch((error) => {
      toast({
        variant: "destructive",
        title: "Failed to load",
        description: error.response.data.message,
      })
      setTimeout(() => {
        window.location.href = global.appUrl
      }, 1000)
    })

    setInterval(async () => {
      try{
        await instance.get('?api=session.check')
      }catch (error){
        toast({
          variant: "destructive",
          title: "Session expired.",
          description: error.response.data.message,
        })
        setTimeout(() => {
          window.location.href = global.appUrl
        }, 2000)
      }
    }, 30000)
  }, []);

  const handleSelection = () => {
    if(selectionState){
      if(selectedGroup.length === 0){
        toast({
          variant: "destructive",
          title: "Failed",
          description: "Must check at least one checkbox to proceed!"
        })
        return
      }
      setConfirmationDialog(true)
    }else{
      if(!confirmationDialog){
        setSelectionState(!selectionState)
      }
    }
  }

  const confirmationData = {
    title: 'Confirmation',
    description: 'Are you sure you want to edit these data?',
    action: () => {
      setEditState(true)
      setConfirmationDialog(false)
    }
  }

  return (
    <div className=" overflow-x-hidden">
      {initialLoad ? (
        <div className="h-screen flex justify-center items-center bg-blue-950">
          <div>
            <h1 className="mx-4 md:mx-0 text-3xl lg:text-7xl text-center font-bold text-white">Adamson University - 201 File</h1>
            <p className="text-white text-center text-md lg:text-3xl mt-4">Loading...</p>
          </div>
        </div>
      ) : (
        <div>
          <Navbar/>
          <div className="m-4">
            {!initialLoad && (
              <>
                <Welcome data={{
                  fname: auth?.fname,
                  lname: auth?.lname,
                  email: auth?.email,
                  image_url: auth?.image_url
                }}>
                  <div>
                    {selectionState && (
                      <Button variant="outline" className="me-2"
                        onClick={() => {
                          setSelectionState(false)
                          setEditState(false)
                        }}>
                        Cancel
                      </Button>
                    )}
                    {!editState ? (
                      <Button
                        onClick={() => handleSelection()}
                        className="dark:bg-white">
                        {!selectionState ? (
                          <Pencil2Icon/>
                        ) : (
                          <>Apply</>
                        )}
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        onClick={() => {
                          const submitData = submitForm.getValues()
                          Object.keys(submitData).map((data) => {
                            if(submitData[data].changed){
                              submitData[data].attachments.map((attachment) => {
                                if(!requiredFiles.includes(attachment.attachment_id)){
                                  setRequiredFiles([...requiredFiles, attachment.attachment_id])
                                }
                              })
                            }
                          })
                          setUploadState(true)

                          console.log(requiredFiles)
                        }}>
                        Next
                      </Button>
                    )}
                  </div>
                </Welcome>
                <div className="mt-2">
                  {editState && response ? (
                    <EditPage
                      submitForm={submitForm}
                      states={{
                        uploadState: uploadState,
                        setUploadState: setUploadState,
                        response: response,
                        selectedGroup: selectedGroup
                      }}
                    />
                  ) : (
                    <ApplicationPage
                      states={{
                        response,
                        setResponse,
                        selectedGroup,
                        setSelectedGroup,
                        selectionState,
                      }}/>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
  <Toaster/>
  <ConfirmationDialog
    states={{
      dialogState: confirmationDialog,
      setDialogState: setConfirmationDialog
    }}
    dialogData={confirmationData}/>
  <AlertDialog open={uploadState}>
    <AlertDialogContent>
      <AlertDialogHeader>
        <Carousel className="w-full">
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <span className="text-4xl font-semibold">{index + 1}</span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel onClick={() => {
          setUploadState(false)
        }}>Cancel</AlertDialogCancel>
        <AlertDialogAction
          onClick={() => {
          }}
        >Continue</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</div>
)
}

export default App
