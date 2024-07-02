import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Textarea
} from "@/components/ui";
import {cn} from "@/lib/utils.ts";
import React from "react";

export const NormalTextArea = ({ form, states, styles, data }) => {
  return (
    <FormField
      control={form.control}
      name={data?.name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{data?.label}</FormLabel>
          <FormControl>
            <Textarea
              placeholder={data?.placeholder}
              className={cn("resize-none", styles?.textArea)}
              {...field}
            />
          </FormControl>
          <FormDescription>{data?.desc}</FormDescription>
          <FormMessage>{data?.message}</FormMessage>
        </FormItem>
      )}
    />
  )
}