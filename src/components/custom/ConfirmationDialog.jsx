import {
  AlertDialog,
  AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui";
import {useConfirmDialog} from "@/providers";
import {CustomPuffLoader} from "@/components/custom/CustomSpinners.jsx";
import {useEffect, useMemo, useState} from "react";
import {cn} from "@/lib/utils.ts";

const ConfirmationDialog = () => {
  const { confirmData, setConfirmData, confirmState, setConfirmState } = useConfirmDialog()
  const variant = useMemo(() => {
    switch (confirmData?.variant){
      case 'destructive':
        return 'transition-all bg-red-500 hover:bg-red-600 border-red-500 hover:border-red-600'
      default:
        return ''
    }
  }, [confirmData]);
  return(
    <AlertDialog open={confirmState}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{confirmData?.title}</AlertDialogTitle>
          <AlertDialogDescription>{confirmData?.description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={confirmData?.states?.loadingState}
            onClick={() => setConfirmState(false) }>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={cn("", variant)}
            disabled={confirmData?.states?.loadingState}
            onClick={() => {
              confirmData?.action()
            }}
          >
            <CustomPuffLoader text="Confirm" state={confirmData?.states?.loadingState}/>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ConfirmationDialog