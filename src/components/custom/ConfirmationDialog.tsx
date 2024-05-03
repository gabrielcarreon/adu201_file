import {
  AlertDialog,
  AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader, AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog.tsx";
import {Dispatch, SetStateAction} from "react";
import {b} from "vite/dist/node/types.d-aGj9QkWt";

interface DialogData{
  title?:string,
  description?: string,
  action?: () => void,
}
interface States{
  dialogState: boolean,
  setDialogState: Dispatch<SetStateAction<boolean>>
}
const ConfirmationDialog = (
  { states, dialogData } :
  { states: States, dialogData: DialogData }
) => {
  return(
    <AlertDialog open={states?.dialogState}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{dialogData?.title}</AlertDialogTitle>
          <AlertDialogDescription>{dialogData?.description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => {
            states?.setDialogState(false)
          }}>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ConfirmationDialog