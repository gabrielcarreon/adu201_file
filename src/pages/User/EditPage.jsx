import React, { useEffect, useState } from "react";
import { CustomDatePicker, CustomTextField, CustomSelect } from "@/components/custom";
import { multiEntryForm } from "@/inc/global.ts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Button, Form } from "@/components/ui";
import { TrashIcon } from "@radix-ui/react-icons";

const EditPage = ({submitForm, states}) => {
  const responseRef = states?.response
  const selectedGroup = states?.selectedGroup
  const reference = responseRef
  const [done, setDone] = useState(false)
  const [tempField, setTempField] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [formIndex, setFormIndex] = useState([])
  useEffect(() => {
    Object.keys(reference).map((obj) => {
      Object.keys(reference[obj].sub_groups).map((sub_group) => {
        if (selectedGroup.includes(sub_group)) {
          const numberOfEntries = reference[obj].sub_groups[sub_group].number_of_entries
          if (reference[obj].sub_groups[sub_group].data.constructor === Object) {
            const tempArray = []
            if (numberOfEntries > 0) {
              Object.keys(reference[obj].sub_groups[sub_group].data).map((dataArr) => {
                let initCnt = 0
                const tempArray = []
                while (initCnt < numberOfEntries) {
                  const data = reference[obj].sub_groups[sub_group].data[dataArr][initCnt]
                  tempArray.push({
                    changed: false,
                    trueVal: data.data,
                    val: data.data,
                    is_for_approval: data.is_for_approval,
                    attachments: data.attachments,
                  })
                  initCnt++
                  
                }
                submitForm.setValue(reference[obj].sub_groups[sub_group].data[dataArr][0].field_id, tempArray)
              })
            } else {
              Object.keys(reference[obj].sub_groups[sub_group].data).map((dataArr, key) => {
                reference[obj].sub_groups[sub_group].data[dataArr].forEach((data, index) => {
                  submitForm.setValue(`${data.field_id}[${index}]`, {
                    changed: false,
                    trueVal: data.data,
                    val: data.data,
                    is_for_approval: data.is_for_approval,
                    attachments: data.attachments,
                  })
                })
              })
            }
          } else {
            reference[obj].sub_groups[sub_group].data.map((data) => {
              submitForm.setValue(data.field_id, {
                changed: false,
                trueVal: data.data,
                val: data.data,
                is_for_approval: data.is_for_approval,
                attachments: data.attachments,
              })
            })
          }
        }
      })
    })
    setDone(true)
  }, [])
  const DataTypeSwitch = ({name, form}) => {
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
      case 'combo':
        return (
          <CustomComboBox
            />
        )
    }
  }
  const handleNewItem = (subGroup) => {
    const newFields = []
    const cardMaker = []
    Object.keys(subGroup.fields).forEach((field, iteration) => {
      const subGroupFields = subGroup.fields[field]
      switch (subGroupFields.data_type) {
        case 'select-group':
          const options = subGroupFields.selection.map((option) => ({
            value: option.field_id,
            label: option.label,
          }))
          cardMaker.push(
            <div key={currentIndex} className="w-full">
              <div className="grid grid-cols-3 items-center gap-2">
                <div>
                  <CustomSelect
                    data={{
                      options,
                      name: `new_${field}_selection[${currentIndex}]`,
                    }}
                    submitForm={submitForm}
                    form={{
                      ...subGroup.fields[field],
                      field_name: `new_${field}_selection[${currentIndex}]`,
                    }}
                    styles={{formItem: 'w-full'}}
                  />
                </div>
                <div className="col-span-2">
                  <CustomTextField
                    data={{
                      name: `new_${field}[${currentIndex}]`,
                    }}
                    submitForm={submitForm}
                    form={{
                      ...subGroup.fields[field],
                      field_name: `new_${field}[${currentIndex}]`,
                    }}
                    styles={{formItem: 'space-y-2 mb-0 w-full'}}
                  />
                
                </div>
              </div>
            </div>
          )
          
          
          submitForm.setValue(`new_${field}[${currentIndex}]`, {
            attachments: [],
            changed: true,
            is_for_approval: subGroupFields.is_for_approval,
            trueVal: '',
            val: '',
            partition: {
              id: currentIndex + 1,
              type: 'select-group',
              part: 'text'
            },
          })
          submitForm.setValue(`new_${field}_selection[${currentIndex}]`, {
            attachments: [],
            changed: true,
            is_for_approval: subGroupFields.is_for_approval,
            trueVal: '',
            val: '',
            partition: {
              id: currentIndex + 1,
              type: 'select-group',
              part: 'selection'
            },
          })
          break
        case 'text':
          cardMaker.push(
            <div key={`${currentIndex}_${iteration}`}>
              <CustomTextField
                data={{
                  name: `new_${subGroupFields.field_id}[${currentIndex}]`,
                }}
                submitForm={submitForm}
                form={{
                  ...subGroup.fields[field],
                  name: `new_${subGroupFields.field_id}[${currentIndex}]`
                }}
                styles={{formItem: 'space-y-2 mb-0 w-full'}}
              />
            </div>
          )
          submitForm.setValue(`new_${subGroupFields.field_id}[${currentIndex}]`, {
            attachments: subGroupFields.attachments,
            changed: true,
            is_for_approval: subGroupFields.is_for_approval,
            trueVal: '',
            val: '',
            partition: {
              id: currentIndex + 1,
              type: 'text',
            },
          })
          break
        case 'date':
          cardMaker.push(
            <div key={`${currentIndex}_${iteration}`}>
              <CustomDatePicker
                data={{
                  name: `new_${subGroupFields.field_id}[${currentIndex}]`,
                }}
                submitForm={submitForm}
                form={{
                  ...subGroup.fields[field],
                  name: `new_${subGroupFields.field_id}[${currentIndex}]`,
                  field_name: `new_${subGroupFields.field_id}[${currentIndex}]`
                  
                }}
                styles={{
                  formItem: 'space-y-2 mb-0 w-full'
                }}
              />
            </div>
          )
          submitForm.setValue(`new_${subGroupFields.field_id}[${currentIndex}]`, {
            attachments: subGroupFields.attachments,
            changed: true,
            is_for_approval: subGroupFields.is_for_approval,
            trueVal: '',
            val: '',
            partition: {
              id: currentIndex + 1,
              type: 'text',
            },
          })
          break
        default:
          break
      }
    })
    setFormIndex([...formIndex, currentIndex])
    newFields.push(
      {
        id: subGroup.id,
        jsx: <>
          <Card className="w-full mb-4">
            <CardHeader>
              <CardTitle>New entry</CardTitle>
              <CardDescription>Please fill in necessary details</CardDescription>
            </CardHeader>
            <CardContent>
              {cardMaker}
            </CardContent>
          </Card>
        </>
      }
    )
    setCurrentIndex(currentIndex + 1)
    setTempField((prevFields) => [...prevFields, ...newFields])
    
    // console.log(tempField)
    // return
  }
  const handleRemoveItem = (indexToRemove, subGroup) => {
    setTempField((prevFields) => {
      const updatedFields = prevFields.filter((_, index) => index !== (indexToRemove))
      Object.keys(subGroup.fields).map((field, index) => {
        const subGroupField = subGroup.fields[field]
        switch (subGroupField.data_type) {
          case 'select-group':
            submitForm.unregister(`new_${field}[${formIndex[indexToRemove]}]`)
            submitForm.unregister(`new_${field}_selection[${formIndex[indexToRemove]}]`)
            break
          case 'text':
            submitForm.unregister(`new_${subGroupField.field_id}[${formIndex[indexToRemove]}]`)
            break
        }
      })
      return updatedFields
    })
    setFormIndex((prevFields) => {
      return prevFields.filter((_, index) => index !== (indexToRemove))
    })
  }
  
  const manageRender = () => {
    return Object.keys(responseRef).map((obj, iteration) => {
      const parentElement = []
      Object.keys(responseRef[obj].sub_groups).map((sub_group, index) => {
        const elements = []
        if (selectedGroup.includes(sub_group)) {
          parentElement.push(
            <div key={`${iteration}_${index}`} className="mb-4 font-semibold text-xl">
              {responseRef[obj].sub_groups[sub_group].name}
            </div>
          )
          const subGroup = responseRef[obj].sub_groups[sub_group];
          
          if (subGroup.is_multiple_entries === 1 && multiEntryForm.includes(subGroup.id)) {
            let initCnt = 0
            const objectKeys = Object.keys(subGroup.data)
            if (subGroup.number_of_entries === 0) {
              elements.push(
                <div key={iteration} className="my-4 text-xl">
                  <p className="text-center font-light">
                    Looks like this section is empty! Let's start by adding new fields by clicking <strong
                    className="font-bold">"Add new field"</strong> button below
                  </p>
                </div>
              )
            }
            while (initCnt < subGroup.number_of_entries) {
              const tempArr = []
              
              objectKeys.forEach((objectKey, index) => {
                console.log(subGroup.data[objectKey])
                
                tempArr.push(
                  <div key={`${subGroup.data[objectKey][initCnt].field_id}_${index}_${initCnt}`}>
                    <DataTypeSwitch
                      form={subGroup.data[objectKey][initCnt]}
                      name={`${subGroup.data[objectKey][initCnt].field_id}[${initCnt}]`}/>
                  </div>
                );
              });
              elements.push(
                <Card key={`${initCnt}_${iteration}`} className="mb-4">
                  <CardContent className="mt-8">
                    {tempArr}
                  </CardContent>
                </Card>
              );
              initCnt++;
            }
          } else {
            if (subGroup.data.constructor === Object) {
              Object.keys(subGroup.data).forEach((multiObject) => {
                subGroup.data[multiObject].forEach((data, index) => {
                  elements.push(
                    <div key={`${data.field_id}_${index}`}>
                      <DataTypeSwitch form={data} name={`${data.field_id}[${index}]`}/>
                    </div>
                  );
                });
              });
            } else {
              subGroup.data.forEach((data, index) => {
                elements.push(
                  <div key={`${data.field_id}_${index}`}>
                    <DataTypeSwitch form={data} name={`${data.field_id}`}/>
                  </div>
                );
              });
            }
          }
          if (subGroup.fields) {
            tempField.forEach((field, s) => {
              if (subGroup.id === field.id) {
                elements.push(
                  <div key={`${s}_${index}`} className="flex items-center gap-2">
                    {field.jsx}
                    <Button
                      className="bg-red-500 hover:bg-red-600"
                      onClick={() => {
                        handleRemoveItem(s, subGroup)
                      }}>
                      <TrashIcon/>
                    </Button>
                  </div>
                )
              }
            })
            elements.push(
              <div className="flex justify-center" key={index}>
                <Button onClick={() => {
                  handleNewItem(subGroup, index)
                }}>Add new field</Button>
              </div>
            )
          }
        }
        parentElement.push(
          <div key={index} className="mb-4">
            {elements}
          </div>
        )
      });
      return (
        <div key={iteration}>
          {parentElement}
        </div>
      )
    })
  }
  
  return (
    <div className="mt-4">
      <div className="mb-4 mx-4">
        <p>Legend</p>
        <p className="text-xs font-arial italic"> (Blank) - Unchanged</p>
        <p className="text-xs font-arial italic"> (Green) - Auto approve</p>
        <p className="text-xs font-arial italic"> (Orange) - For approval.</p>
        <p className="text-xs font-arial italic">Note: Click <span className="font-bold">save</span> to apply
          for adjustment of 201 file.</p>
      </div>
      {done && (
        <Form {...submitForm}>
          {manageRender()}
        </Form>
      )}
    
    </div>
  )
}
export default EditPage
