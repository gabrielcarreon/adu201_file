import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {cn} from "@/lib/utils.ts";
import {Check, Ellipsis} from "lucide-react";
import React from "react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Button} from "@/components/ui/button.tsx";
import moment from "moment/moment";
import {CalendarIcon} from "@radix-ui/react-icons";
import {Calendar} from "@/components/ui/calendar.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {Link} from "react-router-dom";

const CustomTextField = ({data, submitForm, form}) => {
  return (
    <FormField
      control={form.control}
      name={data?.name}
      key={form.field_name}
      render={({field}) => (
        <FormItem className="space-y-1 mb-4">
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
                    attachments: submitForm.getValues(data?.name).attachments
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

const CustomDatePicker = ({data, submitForm, form}) => {
  return (
    <FormField
      control={form.control}
      name={data?.name}
      key={form.field_name}
      render={({field}) => (
        <FormItem className="space-y-1 mb-4 flex flex-col">
          <FormLabel className="" htmlFor={form.field_name}>{form.descript}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "pl-3 text-left font-normal",
                    `${!field.value && "text-muted-foreground"} 
                    ${submitForm.getValues(form.field_name).changed && form.is_for_approval
                      ? "bg-orange-100 hover:bg-orange-100 active:border-green-200"
                      : submitForm.getValues(form.field_name).changed 
                        ? "hover:bg-green-100 bg-green-100"
                        : ""}`
                  )}
                >
                  {field.value ? (
                    moment(field.value.val, "DD/MM/YYYY").format("MMMM DD, YYYY")
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value.val}
                onSelect={(e) => {

                  submitForm.setValue(form.field_name, {
                    changed: submitForm.getValues(form.field_name).trueVal !== moment(e).format("MM/DD/YYYY"),
                    trueVal: submitForm.getValues(form.field_name).trueVal,
                    val: moment(e).format("MM/DD/YYYY"),
                    is_for_approval: submitForm.getValues(data?.name).is_for_approval,
                    attachments: submitForm.getValues(data?.name).attachments
                  })
                  // field.onChange()
                }}
                disabled={(date) =>
                  date > new Date() || date < new Date("1900-01-01")
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FormDescription>{data?.description}</FormDescription>
          <FormMessage>{data?.message}</FormMessage>
        </FormItem>
      )}/>
  )
}

const CustomSelect = ({data, submitForm, form }) => (
  <FormField
    control={form.control}
    name={data?.name}
    key={form.field_name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{form.descript}</FormLabel>
        <Select onValueChange={(e) => {
            submitForm.setValue(form.field_name, {
              changed: submitForm.getValues(form.field_name).trueVal !== e,
              trueVal: submitForm.getValues(form.field_name).trueVal,
              val: e,
              is_for_approval: submitForm.getValues(data?.name).is_for_approval,
              attachments: submitForm.getValues(data?.name).attachments
            })
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

export { CustomTextField, CustomDatePicker, CustomSelect }