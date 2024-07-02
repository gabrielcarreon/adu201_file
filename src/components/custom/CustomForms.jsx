import {useEffect, useState} from "react";
import {Toggle} from "@/components/ui";
import {cn} from "@/lib/utils.ts";

export const ToggleState = ({ attr, form, data, field_name, index, states, icon }) => {
  const initVal = form.getValues(field_name)[index]
  const [toggled, setToggled] = useState(initVal.is_approved === 1)
  const changeValue = () => {
    setToggled(!toggled)
  }
  useEffect(() => {
    initVal.is_approved = toggled ? 1 : 0
    form.setValue(`${field_name}[${index}]`, initVal)
  }, [toggled])
  return (
    <>
      <Toggle
        disabled={initVal?.is_for_approval === 0 || attr?.disabled}
        onClick={e => changeValue()}
        value={data?.value}
        defaultValue={data?.defaultValue}
        className={cn("rounded-s-none border-blue-400", toggled || initVal?.is_for_approval === 0 ? "!bg-green-600 !text-white" : null)}
        aria-label="Toggle approval" variant="outline">
        {icon}
        {toggled ? data?.buttonName.on : data?.buttonName.off}
      </Toggle>
    </>
  )
}