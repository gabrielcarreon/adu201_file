import React, {useEffect, useState} from "react";
import {Form} from "@/components/ui/form.tsx";
import {CustomDatePicker, CustomFields, CustomTextField} from "@/components/custom";
import {CustomSelect} from "@/components/custom/CustomFields.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {multiEntryForm} from "@/inc/global.ts";

const EditPage = ( { submitForm, states } ) => {
  const responseRef = states?.response
  const selectedGroupRef = states?.selectedGroup
  const reference = responseRef

  const [done, setDone] = useState(false)
  useEffect(() => {
    Object.keys(reference).map((obj, key) => {
      Object.keys(reference[obj].sub_groups).map((sub_group, key2) => {
        if(selectedGroupRef.includes(sub_group)){
          const numberOfEntries = reference[obj].sub_groups[sub_group].number_of_entries
          if(reference[obj].sub_groups[sub_group].data.constructor === Object){
            if(numberOfEntries > 0){
              let initCnt = 0
              while (initCnt < numberOfEntries) {
                Object.keys(reference[obj].sub_groups[sub_group].data).map((dataArr, index) => {
                  const data = reference[obj].sub_groups[sub_group].data[dataArr][initCnt]
                  submitForm.setValue(`${data.field_id}[${initCnt}]`, {
                    changed: false,
                    trueVal: data.data,
                    val: data.data,
                    is_for_approval: data.is_for_approval,
                    attachments: data.attachments
                  })
                })
                initCnt++
              }
            }else{
              Object.keys(reference[obj].sub_groups[sub_group].data).map((dataArr) => {
                reference[obj].sub_groups[sub_group].data[dataArr].forEach((data, index) => {
                  submitForm.setValue(`${data.field_id}[${index}]`, {
                    changed: false,
                    trueVal: data.data,
                    val: data.data,
                    is_for_approval: data.is_for_approval,
                    attachments: data.attachments
                  })
                })
              })
            }
          }else{
            reference[obj].sub_groups[sub_group].data.map((data) => {
              submitForm.setValue(data.field_id, {
                changed: false,
                trueVal: data.data,
                val: data.data,
                is_for_approval: data.is_for_approval,
                attachments: data.attachments
              })
            })
          }
        }
      })
    })
    setDone(true)
  }, [])
  const DataTypeSwitch = ({ name, form }) => {
    const [data_type, selection] = form.data_type.split('|')
    switch (data_type) {
      case 'text':
        return (
          <CustomTextField
            data={{
              name: name
            }}
            submitForm={submitForm}
            form={form}
          />
        )
      case 'date':
        return (
          <CustomDatePicker
            data={{
              name: name
            }}
            submitForm={submitForm}
            form={form}
          />
        )
      case 'select':
        return (
          <CustomSelect
            data={{
              options: JSON.parse(selection),
              name: name
            }}
            submitForm={submitForm}
            form={form}
          />
        )
    }
  }

  return (
    <div className="mx-4 mt-4">
      <div className="mb-4">
        <p>Legend</p>
        <p className="text-xs font-arial italic"> (Blank) - Unchanged</p>
        <p className="text-xs font-arial italic"> (Green) - Auto approve</p>
        <p className="text-xs font-arial italic"> (Orange) - For approval.</p>
        <p className="text-xs font-arial italic">Note: Click <span className="font-bold">save</span> to apply for adjustment of 201 file.</p>
      </div>
      {done && (
        <Form {...submitForm}>
          {Object.keys(responseRef).map((obj, key) => {
            return Object.keys(responseRef[obj].sub_groups).map((sub_group, key2) => {
              const elements = []
              if (selectedGroupRef.includes(sub_group)) {
                const subGroup = responseRef[obj].sub_groups[sub_group]
                if(subGroup.is_multiple_entries === 1 &&
                  multiEntryForm.includes(subGroup.id)
                  ){
                  let initCnt = 0
                  const objectKeys = Object.keys(subGroup.data)
                  while (initCnt < subGroup.number_of_entries) {
                    objectKeys.forEach((objectKey, index) => {
                      elements.push(
                        <div key={`${subGroup.data[objectKey][initCnt].field_id}_${index}_${initCnt}`}>
                          <DataTypeSwitch
                            form={subGroup.data[objectKey][initCnt]}
                            name={`${subGroup.data[objectKey][initCnt].field_id}[${index}]`}/>
                        </div>
                      )
                    })
                    elements.push(<Separator key={initCnt} className='bg-gray-300 my-4'/>)
                    initCnt++
                  }
                  //
                  return (
                    <div key={key2}>
                      {elements}
                    </div>
                  )
                }else{
                  if (responseRef[obj].sub_groups[sub_group].data.constructor === Object) {
                    return Object.keys(responseRef[obj].sub_groups[sub_group].data).map((multiObject ) => {
                      return responseRef[obj].sub_groups[sub_group].data[multiObject].map((data, index) => {
                        return (
                          <div key={index}>
                            <DataTypeSwitch form={data} name={`${data.field_id}[${index}]`} />
                          </div>
                        )
                      })
                    })
                  } else {
                    return responseRef[obj].sub_groups[sub_group].data.map((data, index) => {
                      return (
                        <div key={index}>
                          <DataTypeSwitch form={data} name={`${data.field_id}`}/>
                        </div>
                      )
                    })
                  }
                }


                //fields
              }
            })
          })}
        </Form>
      )}

    </div>
  )
}
export default EditPage
