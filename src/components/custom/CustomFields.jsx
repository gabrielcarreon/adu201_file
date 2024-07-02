import {cn} from "@/lib/utils.ts";
import {Check, Ellipsis} from "lucide-react";
import React, {useState} from "react";
import {
  Popover, PopoverContent, PopoverTrigger, Input, Button, FormControl, FormDescription,
  FormField, FormItem, FormLabel, FormMessage, Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue
} from "@/components/ui";
import {CalendarIcon} from "@radix-ui/react-icons";
import Calendar from "react-calendar";
import {useDetectClickOutside} from "react-detect-click-outside";
import 'react-calendar/dist/Calendar.css'
import moment from "moment";

const CustomTextField = ({ data, submitForm, form, states, styles }) => {
  return (
    <FormField
      control={form.control}
      name={data?.name}
      key={form.field_name}
      render={({field}) => (
        <FormItem className={cn("space-y-1 mb-4", styles?.formItem)}>
          <FormLabel className="" htmlFor={form.field_name}>{form.descript}</FormLabel>
          <FormControl>
            <div className="relative ml-auto flex-1 md:grow-0">
              <Input
                className={cn("w-full rounded-lg bg-background",
                  `${submitForm.getValues(data?.name).changed && form.is_for_approval 
                    ? "bg-orange-100 active:border-green-200" 
                    : submitForm.getValues(data?.name).changed 
                      ? "bg-green-100"
                      : ""}`)}
                defaultValue={field.value.val}
                onChange={(e) => {
                  // field.onChange(e.target.value)
                  submitForm.setValue(data?.name, {
                    changed: submitForm.getValues(data?.name).trueVal !== e.target.value,
                    trueVal: submitForm.getValues(data?.name).trueVal,
                    val: e.target.value,
                    is_for_approval: submitForm.getValues(data?.name).is_for_approval,
                    attachments: submitForm.getValues(data?.name).attachments,
                    partition: submitForm.getValues(data?.name).partition ?? 0
                  })
                }}
                id={data?.name}/>

              {!!(submitForm.getValues(data?.name).changed && form.is_for_approval) && (
                <Ellipsis className="absolute right-2.5 top-2.5 h-4 w-4 text-orange-500"/>
              )}
              {!!(submitForm.getValues(data?.name).changed && !form.is_for_approval) && (
                <Check className="absolute right-2.5 top-2.5 h-4 w-4 text-green-500"/>
              )}
            </div>
          </FormControl>
          <FormDescription>{data?.description}</FormDescription>
          <FormMessage>{data?.message}</FormMessage>
        </FormItem>
      )}/>
  )
}
const CustomDatePicker = ({ data, submitForm, form, states, styles }) => {
  // const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const ref = useDetectClickOutside({ onTriggered : () => {
      setOpen(false)
    }})
  return (
    <FormField
      control={form.control}
      name={data?.name}
      key={form.field_name}
      render={({field}) => (
        <FormItem className={cn("space-y-1 mb-4 flex flex-col", styles?.formItem)}>
          <FormLabel className="" htmlFor={form.field_name}>{form.descript}</FormLabel>
          <Popover open={open}>
            <PopoverTrigger asChild>
              <Button
                onClick={() => setOpen(true)}
                variant="outline"
                className={cn(
                  "flex justify-start pl-3 text-left font-normal",
                  `${!field.value && "text-muted-foreground"}
                    ${submitForm.getValues(form.field_name).changed && form.is_for_approval
                    ? "bg-orange-100 hover:bg-orange-100 active:border-green-200"
                    : submitForm.getValues(form.field_name).changed
                      ? "hover:bg-green-100 bg-green-100"
                      : ""}`
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {field.value.val !== '' ? (
                  moment(field.value.val, "DD/MM/YYYY").format("MMMM DD, YYYY")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 bg-none border-none shadow-none">
              <Calendar
                onChange={(e) => {
                  submitForm.setValue(form.field_name, {
                    changed: submitForm.getValues(form.field_name).trueVal !== moment(e).format("DD/MM/YYYY"),
                    trueVal: submitForm.getValues(form.field_name).trueVal,
                    val: moment(e).format("DD/MM/YYYY"),
                    is_for_approval: submitForm.getValues(data?.name).is_for_approval,
                    attachments: submitForm.getValues(data?.name).attachments,
                    partition: submitForm.getValues(data?.name).partition ?? 0
                  })
                  setOpen(false)
                }}
                value={field.value.val !== '' ? moment(field.value.val, "DD/MM/YYYY").format() : Date()}
                className={cn("z-10 p-4 rounded-md !border-gray-300", styles?.calendar)}/>
            </PopoverContent>
          </Popover>
          <FormDescription>{data?.description}</FormDescription>
          <FormMessage>{data?.message}</FormMessage>
        </FormItem>
      )}/>
  )
}

const CustomSelect = ({ data, submitForm, form, states, styles }) => {
  return (
    <FormField
      control={form.control}
      name={data?.name}
      key={form.field_name}
      render={({ field }) => (
        <FormItem className={cn('', styles?.formItem)}>
          <FormLabel>{form.descript}</FormLabel>
          <Select onValueChange={(e) => {
            
            if(form.selection) {
              form.selection.forEach((option) => {
                if(e === option.field_id){
                  submitForm.setValue(form.field_name, {
                    changed: submitForm.getValues(form.field_name).trueVal !== e,
                    trueVal: option.field_id,
                    val: e,
                    is_for_approval: submitForm.getValues(data?.name).is_for_approval,
                    attachments: option.attachments,
                    partition: submitForm.getValues(data?.name).partition ?? 0
                  })
                }
              })
            }else {
              submitForm.setValue(form.field_name, {
                changed: submitForm.getValues(form.field_name).trueVal !== e,
                trueVal: submitForm.getValues(form.field_name).trueVal,
                val: e,
                is_for_approval: submitForm.getValues(data?.name).is_for_approval,
                attachments: submitForm.getValues(data?.name).attachments,
                partition: submitForm.getValues(data?.name).partition ?? 0
              })
            }
          }} defaultValue={field.value.val}>
            <FormControl>
              <SelectTrigger className={cn(``,
                `${submitForm.getValues(form.field_name).changed && form.is_for_approval
                  ? "bg-orange-100 hover:bg-orange-100 active:border-green-200"
                  : submitForm.getValues(form.field_name).changed
                    ? "hover:bg-green-100 bg-green-100"
                    : ""}`)}>
                <SelectValue placeholder={data?.placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {data?.options.map((option, key) => (
                <SelectItem key={key} value={option.value}>{option.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormDescription>{data?.description}</FormDescription>
          <FormMessage>{data?.message}</FormMessage>
        </FormItem>
      )}
    />
  )
}

const CustomComboBox = ({ data, submitForm, form, states, styles }) => {
  return (
    <FormField
      control={form.control}
      name={data?.name}
      key={form.field_name}
      render={({ field }) => (
        <FormItem className={cn('', styles?.formItem)}>
          <FormLabel>{form.descript}</FormLabel>
          <Select onValueChange={(e) => {
            
            if(form.selection) {
              form.selection.forEach((option) => {
                if(e === option.field_id){
                  submitForm.setValue(form.field_name, {
                    changed: submitForm.getValues(form.field_name).trueVal !== e,
                    trueVal: option.field_id,
                    val: e,
                    is_for_approval: submitForm.getValues(data?.name).is_for_approval,
                    attachments: option.attachments,
                    partition: submitForm.getValues(data?.name).partition ?? 0
                  })
                }
              })
            }else {
              submitForm.setValue(form.field_name, {
                changed: submitForm.getValues(form.field_name).trueVal !== e,
                trueVal: submitForm.getValues(form.field_name).trueVal,
                val: e,
                is_for_approval: submitForm.getValues(data?.name).is_for_approval,
                attachments: submitForm.getValues(data?.name).attachments,
                partition: submitForm.getValues(data?.name).partition ?? 0
              })
            }
          }} defaultValue={field.value.val}>
            <FormControl>
              <SelectTrigger className={cn(``,
                `${submitForm.getValues(form.field_name).changed && form.is_for_approval
                  ? "bg-orange-100 hover:bg-orange-100 active:border-green-200"
                  : submitForm.getValues(form.field_name).changed
                    ? "hover:bg-green-100 bg-green-100"
                    : ""}`)}>
                <SelectValue placeholder={data?.placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {data?.options.map((option, key) => (
                <SelectItem key={key} value={option.value}>{option.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormDescription>{data?.description}</FormDescription>
          <FormMessage>{data?.message}</FormMessage>
        </FormItem>
      )}
    />
  )
}

export { CustomTextField, CustomDatePicker, CustomSelect }