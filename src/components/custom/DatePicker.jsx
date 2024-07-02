import Calendar from "react-calendar"
import 'react-calendar/dist/Calendar.css'
import { useState } from "react"
import { cn } from "@/lib/utils.ts"
import {Button, Popover, PopoverContent, PopoverTrigger } from "@/components/ui";
import {format} from "date-fns";
import {CalendarIcon} from "@radix-ui/react-icons";
import { useDetectClickOutside } from 'react-detect-click-outside';

const CustomDatePicker2 = ( { styles }) => {
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const ref = useDetectClickOutside({ onTriggered : () => {
    setOpen(false)
    }})
  return (
    <div ref={ref}>
      <Popover open={open}>
        <PopoverTrigger asChild>
          <Button
            onClick={() => setOpen(true)}
            variant="outline"
            className={cn(
              "w-[280px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 bg-none border-none shadow-none">
          <Calendar
            onChange={(e) => {
              setDate(e)
              setOpen(false)
            }}
            value={date}
            className={cn("absolute z-10 p-4 rounded-md !border-gray-300", styles?.calendar)}/>
        </PopoverContent>
      </Popover>
      
      
    </div>
  )
}

export default CustomDatePicker2