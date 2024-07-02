import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Dialog,
  DialogPortal,
  DialogClose, Button
} from "@/components/ui";
import React from "react";
import {cn} from "@/lib/utils.ts";

export const CustomDialog = ({ states, styles, data, children }) => {
  return (
    <Dialog open={states.dialogOpen} onOpenChange={states.setDialogOpen}>
      <DialogContent className={cn("overflow-y-auto max-h-[95vh]", styles?.dialogContent)}>
        <DialogHeader>
          {data?.title && (
            <DialogTitle>{data.title}</DialogTitle>
          )}
          {data?.description && (
            <DialogDescription>{data.description}</DialogDescription>
          )}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}

