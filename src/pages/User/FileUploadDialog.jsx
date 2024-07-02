import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, toast } from "@/components/ui";
import React, { useState} from "react";
import {cn, handleErrors} from "@/lib/utils.ts";
import {FileUploader} from "@/components/custom";
import { useFile, useConfirmDialog } from "@/providers"
import {CheckCheck, ChevronsRight, Ellipsis} from "lucide-react";
import instance from "@/inc/axios_config.ts";

const allowedFileTypes = [
  'image/png', 'image/jpg', 'image/jpeg', 'application/pdf', 'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
const FileUploadDialog = ({ states, form }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const { fileStates, resetFiles } = useFile()
  const [ files, setFiles ] = useState([])
  const fileLength = states?.requiredFiles.length
  const { confirmData, setConfirmData, confirmState, setConfirmState } = useConfirmDialog()
  return (
    <AlertDialog open={states?.uploadState}>
      <AlertDialogContent className="!max-w-4xl">
        <AlertDialogTitle>
          Upload required files to proceed.
        </AlertDialogTitle>
        <AlertDialogHeader>
          <div className="grid grid-cols-3 gap-2">
            <div className="col-span-1">
              <ol className="space-y-4 w-full">
                {states?.requiredFiles.map((file, index) => (
                  <li key={index} className={cn('', fileStates[index] && fileStates[index].length > 0 ? 'cursor-pointer' : null)} onClick={() => {
                    if(fileStates[index] && fileStates[index].length > 0) {
                      setCurrentIndex(index)
                    }
                  }}>
                    <div
                      className={cn(`transition-all duration-300 w-full p-4 border rounded-lg dark:bg-gray-800`,
                        `${currentIndex === index
                          ? "text-blue-700 bg-blue-100 border-blue-300  dark:border-blue-800 dark:text-blue-400"
                          : "text-gray-900 bg-gray-100 border-gray-300  dark:border-gray-700 dark:text-gray-400"}
                         ${fileStates[index] && fileStates[index].length > 0 ? 'hover:bg-blue-50 hover:border-blue-200' : null}`)}
                      role="alert">
                      <div className="flex items-center justify-between">
                        <span className="sr-only">{file.descript}</span>
                        <h3 className="font-medium text-sm">{index + 1}. {file.descript}</h3>
                        {fileStates[index] && fileStates[index].length > 0  ? (
                          <CheckCheck />
                          ) : (
                          <>
                            {currentIndex === index ? (
                              <ChevronsRight />
                            ) : (
                              <Ellipsis />
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div className="col-span-2 flex flex-col justify-center">
              {states?.requiredFiles.map((file, index) => (
                <div key={index}>
                  {index === currentIndex && (
                    <FileUploader id={index} options={{
                      fileTypes: allowedFileTypes
                    }}/>
                  )}
                </div>
              ))}
            </div>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <div className="flex justify-between w-full">
            <AlertDialogCancel onClick={() => {
              states?.setUploadState(false)
              setFiles([])
              setCurrentIndex(0)
            }}>Cancel</AlertDialogCancel>
            <div className="flex gap-2">
              {currentIndex > 0 && (
                <AlertDialogAction
                  className="bg-white border-gray-300 text-black hover:border-blue-500 hover:bg-white"
                  onClick={() => { setCurrentIndex(currentIndex - 1) }}
                >Back</AlertDialogAction>
              )}
              {currentIndex < (fileLength - 1) && (
                <AlertDialogAction
                  onClick={() => { setCurrentIndex(currentIndex + 1) }}
                  disabled={(fileStates[currentIndex] && fileStates[currentIndex].length <= 0)}
                >Next</AlertDialogAction>
              )}
              {currentIndex === (fileLength - 1) && (
                <AlertDialogAction
                  onClick={() => {
                    setConfirmData({
                      title: 'Confirmation',
                      description: 'Are you sure you want to edit these data?',
                      action:  async () => {
                        try {
                          Object.keys(fileStates).map((file, index) => {
                            form.setValue(`files[${index}]`, {
                              attachment_id: states?.requiredFiles[index].attachment_id,
                              attachment: fileStates[file]
                            })
                          })
                          await instance.post('?api=201.apply', form.getValues())
                          let forApproval = false
                          Object.keys(form.getValues()).map((value) => {
                            if(form.getValues()[value].changed && form.getValues()[value].is_for_approval){
                              forApproval = true
                            }
                          })
                          states?.setSelectedGroup([])
                          states?.setRequiredFiles([])
                          states?.setEditState(false)

                          setConfirmState(false)

                          states?.setUploadState(false)
                          states?.setSelectionState(false)
                          form.reset()
                          resetFiles()
                          toast({
                            title: 'Success',
                            variant: 'success',
                            description: `${!forApproval
                              ? 'Applied successfully. Changes might take minutes to reflect'
                              : 'Applied successfully. Please wait for HR approval.'}`})
                        }catch (error){
                          handleErrors(error, "Failed.")
                        }
                      }
                    })
                    setConfirmState(true)
                    form.setValue('files[]', files)
                  }}
                  disabled={(fileStates[currentIndex] && fileStates[currentIndex].length <= 0)}
                >Continue</AlertDialogAction>
              )}
            </div>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
export default FileUploadDialog
