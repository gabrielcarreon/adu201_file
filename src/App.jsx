import React, {useEffect, useState} from 'react'
import { global } from "@/inc/global.ts";
import '../app/globals.css'
import './index.css'
import instance from "@/inc/axios_config.ts";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { Navbar } from "@/layouts/index.js"
import { toast, Button } from "@/components/ui";
import { Welcome } from "@/components/custom";
import ApplicationPage from "@/pages/User/ApplicationPage.jsx";
import EditPage from "@/pages/User/EditPage.jsx";
import FileUploadDialog from "@/pages/User/FileUploadDialog.jsx";
import {useForm} from "react-hook-form";
import { useAuth, useConfirmDialog, useFile } from "@/providers";
import 'filepond/dist/filepond.min.css';
import {handleErrors} from "@/lib/utils.ts";

/**
 * Fetches user information and sets up the initial state of the component.
 *
 * @return {React.ReactElement} The JSX to render the component.
 */
function App() {
  const { resetFiles } = useFile()
  const [selectionState, setSelectionState] = useState(false)
  const [editState, setEditState] = useState(false)
  const { confirmData, setConfirmData, confirmState, setConfirmState } = useConfirmDialog()
  const { auth, setAuth } = useAuth()
  const submitForm = useForm({
    mode: "onChange",
  })
  const [uploadState, setUploadState] = useState(false)
  const [requiredFiles, setRequiredFiles] = useState([])
  const [response, setResponse] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState([])
  useEffect(() => {
    setConfirmData({
      title: 'Confirmation',
      description: 'Are you sure you want to edit these data?',
      action: async () => {
        let forApproval = false
        Object.keys(submitForm.getValues()).map((value) => {
          if(submitForm.getValues()[value].changed && submitForm.getValues()[value].is_for_approval){
            forApproval = true
          }
        })
        try{
          await instance.post('?api=201.apply', submitForm.getValues())
          setEditState(false)
          setConfirmState(false)
          setSelectionState(false)
          setSelectedGroup([])
          resetFiles()
          submitForm.reset()
          setRequiredFiles([])
          toast({
            title: 'Success',
            variant: 'success',
            description: `${!forApproval
              ? 'Applied successfully. Changes might take minutes to reflect'
              : 'Applied successfully. Please wait for HR approval.'}`})
        }catch (error){
          handleErrors(error, 'Failed')
        }
      }
    })
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
      setEditState(true)
      setConfirmState(false)
    }else{
      if(!confirmState){
        setSelectionState(!selectionState)
      }
    }
  }

  const determineEditedFields = (data, tempRequiredFiles) => {
    if(data.changed){
      data.attachments.map((attachment) => {
        if(!tempRequiredFiles.find(e => e.attachment_id === attachment.attachment_id)){
          tempRequiredFiles.push({
            attachment_id:  attachment.attachment_id,
            descript: attachment.descript
          })
        }
      })
      return true
    }
  }
  const handleNextButton = () => {
    resetFiles()
    const submitData = submitForm.getValues()
    const tempRequiredFiles = []
    let changed = false
    Object.keys(submitData).map((data) => {

      if(submitData[data].constructor === Array){
        submitData[data].forEach((multipleData, index) => {
          if(determineEditedFields(multipleData, tempRequiredFiles)){
            changed = true
          }
        })
      }else{
        if(determineEditedFields(submitData[data], tempRequiredFiles)){
          changed = true
        }
      }
    })
    if(!changed){
      toast({ title: 'Failed!', description: 'Must be at least one field edited to proceed.', variant: "destructive" })
      return
    }
    setRequiredFiles(tempRequiredFiles)
    if(tempRequiredFiles.length > 0){
      setUploadState(true)
    }else{
      setConfirmState(true)
    }
  }
  return (
    <div className="overflow-x-hidden dark:bg-zinc-900">
      <div>
        <Navbar/>
        <div className="m-4 mx-4 md:mx-20">
          <Welcome>
            <div>
              {selectionState && (
                <Button variant="outline" className="me-2 dark:border-white"
                        onClick={() => {
                          setSelectedGroup([])
                          setSelectionState(false)
                          setEditState(false)
                          setRequiredFiles([])
                          submitForm.reset()
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
                  onClick={() => handleNextButton()}>
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
        </div>
      </div>
      <FileUploadDialog
        states={{
          uploadState: uploadState,
          setUploadState: setUploadState,
          requiredFiles: requiredFiles,
          setEditState: setEditState,
          setSelectionState: setSelectionState,
          setSelectedGroup: setSelectedGroup,
          setRequiredFiles: setRequiredFiles
        }}
        form={submitForm}/>
    </div>
  )
}

export default App
