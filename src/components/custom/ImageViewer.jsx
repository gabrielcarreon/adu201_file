import {Button} from "@/components/ui";
import {useEffect, useState} from "react";
import {ZoomInIcon, ZoomOutIcon} from "lucide-react";

export const ImageViewer = ({ imageData, states }) => {
  return (
    <>
      <div className="flex justify-center">
        <a href={imageData} target="_blank">
          <img src={imageData} alt="Uploaded image requirement"/>
        </a>
      
      </div>
      <div className="flex justify-end">
        <Button onClick={() => states?.setOpenState(false)} variant="outline" className="bg-secondary">Close</Button>
      </div>
    </>
  )
}