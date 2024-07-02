import {createContext, useContext, useEffect, useState} from "react";
import instance from "@/inc/axios_config.ts";
import {CustomDialog, ImageViewer, PDFViewer} from "@/components/custom";
import {handleErrors} from "@/lib/utils.ts";
import {useAuth} from "@/providers/AuthProvider.jsx";

const FileViewerContext = createContext()
export const useFileViewer = () => useContext(FileViewerContext)
export const FileViewerProvider = ({ children }) => {
  const [openState, setOpenState] = useState(false)
  const [fileState, setFileState] = useState({})
  const [fileData, setFileData] = useState()
  const { auth } = useAuth()
  useEffect(() => {
    if(Object.keys(fileState).length > 0) {
      (async () => {
        try{
          const response = await instance.post(`/?api=getFile&_csrf_token=${auth._csrf_token}`, {
            file: fileState.enc_file_name,
            ctrl_no: fileState.ctrl_no
          },{
            responseType: "arraybuffer"
          })
          const blob = new Blob([response.data], { type: `${fileState.type}/${fileState.subtype}`})
          const blobUrl = URL.createObjectURL(blob)
          setFileData(blobUrl)
          setOpenState(true)
        }catch(error){
          handleErrors(error, "Cannot retrieve file.")
        }
        
      })()
    }
  }, [fileState]);
  
  return(
    <FileViewerContext.Provider value={{ openState, fileState, setFileState }}>
      {children}
      <CustomDialog
        states={{
          dialogOpen: openState,
          setDialogOpen: setOpenState
        }}
        data={{
          title:
            <>
              <p className="text-secondary-foreground mb-1">{fileState.desc}</p>
              <p className="text-base font-normal">{fileState.file_name}</p>
            </>
        }}
        styles={{
          dialogContent: "max-w-6xl"
        }}>
        {fileState.subtype === 'pdf' && (
          <PDFViewer
            pdfData={fileData}
          />
        )}
        {fileState.type === 'image' && (
          <>
            <ImageViewer
              imageData={fileData}
              states={{
                setOpenState: setOpenState
              }}
            />
          </>
        )}
        
      </CustomDialog>
    </FileViewerContext.Provider>
  )
}