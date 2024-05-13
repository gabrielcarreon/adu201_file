import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {cn} from "@/lib/utils.ts";
import {Input} from "@/components/ui/input.tsx";
import {act} from "react-dom/test-utils";
import {useState} from "react";

const FormItemTextField = ({ form, data, attr, style, actions, ...rest }) => {
  return (
    <FormField
      control={form.control}
      name={data?.name}
      key={data?.id}
      render={({ field }) => (
        <FormItem className={cn('space-y-1', style?.formItem)}>
          {console.log(style)}

          <FormLabel className={cn("",style?.label)} htmlFor={data?.id}>{data?.label}</FormLabel>
          <FormControl>
            <div className="grid w-full gap-1.5">
              <Input disabled={attr?.disabled}
                     defaultValue={field.value}
                     onChange={(e)=>{
                       field.onChange(e.target.value)
                     }}
                     pattern={attr?.pattern}
                     type={attr?.type}
                     className={style?.input}
                     placeholder={data?.placeholder}
                     id={data?.id}
                     readOnly={attr?.readOnly}/>
            </div>
          </FormControl>
          <FormDescription>{data?.description}</FormDescription>
          <FormMessage>{data?.message}</FormMessage>
        </FormItem>
      )}/>
  )
}

export default FormItemTextField