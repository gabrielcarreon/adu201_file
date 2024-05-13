import {Checkbox} from "@/components/ui/checkbox.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion.tsx";
import {multiEntryForm} from "@/inc/global.ts";


const SingleEntry = ({ data }) => (
  <div className="ms-4 md:ms-8 mt-4">
    <div className="grid grid-cols-3">
      <div className="col-span-1">
        <p>{data.descript}</p>
      </div>
      <div className="col-span-2">
        <p className="font-bold">{data.data}</p>
      </div>
    </div>
    <Separator className='bg-gray-300 my-4'/>
  </div>
)

const MultiEntry = ({ data }) => {
  return (
    <div className="ms-4 md:ms-8 mt-4">
      <div className="grid grid-cols-3">
        <div className="col-span-1">
          <p>{data.descript}</p>
        </div>
        <div className="col-span-2">
          <p className="font-bold">{data.data}</p>
        </div>
      </div>
    </div>
  )
}
const EmployeeRows = (data, key) => {
  const newData = data?.data
  const elements = []
  if (multiEntryForm.includes(newData?.id)) {
    let initCnt = 0
    const objectKeys = Object.keys(newData.data)
    while (initCnt < newData.number_of_entries) {
      objectKeys.forEach((objectKey, index) => (
        elements.push(
          <MultiEntry
            key={`${key}_${index}_${initCnt}`}
            data={newData.data[objectKey][initCnt]}/>
        )
      ))
      elements.push(<Separator key={initCnt} className='bg-gray-300 my-4'/>)
      initCnt++
    }

    return (
      <>
        {elements}
      </>
    )
  }
  return (
    <div key={key}>
      {newData.is_multiple_entries === 0 ? (
        <>{newData?.data.map((data, index) =>  <SingleEntry data={data} key={index}/>)}</>
      ) : (
        <>
          {Object.keys(newData.data).map((data) => {
            return newData.data[data].map((dataForm, index) =>
              <SingleEntry data={dataForm} key={index}/>
            )
            }

          )}
        </>
      )}
    </div>
  )
}
const EmployeeDetails = (
    {response, states, keyNumber} :
    {
      response: object,
      states: object,
      keyNumber: string | number
    }
) => (
  <>
    {response.sub_groups ? (
      <>
        {Object.keys(response.sub_groups).map((sub_group, key) => {
          const subGroupId = response.sub_groups[sub_group].id
          const subGroupName = response.sub_groups[sub_group].name
          return (
            <Accordion className="md:ps-4 mb-1" type="single" collapsible key={key}>
              <AccordionItem  value={subGroupId}>
                <div className="flex items-center gap-2">
                  <Checkbox
                    onCheckedChange={(checkedState) => {
                      checkedState
                        ? states?.setSelectedGroup([...states?.selectedGroup, subGroupId])
                        : states?.setSelectedGroup(removeValue => {return removeValue.filter(selected => selected !== subGroupId)})
                    }}
                    defaultValue={subGroupId}
                    value={subGroupId}
                    className={`${states?.selectionState ? `opacity-100` : `opacity-0 w-0`} transition-all focus-visible:ring-primary !focus-visible:outline-primary`} id={`checkbox-${subGroupId}`}/>
                  <AccordionTrigger className="px-4 font-semibold bg-blue-50 dark:bg-transparent dark:border-blue-900 border-blue-200 focus-visible:ring-primary focus-visible:ring-1">{subGroupName}</AccordionTrigger>
                </div>
                <AccordionContent className="pb-0">
                 <EmployeeRows data={response.sub_groups[sub_group]} key={key}/>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )
        })}
      </>
    ) : (
      <>
      </>
    )}
  </>
)
export default EmployeeDetails


// return (
//   <>
//     {newData && newData.constructor === Object && (
//       <>
//         <EmployeeRows data={newData.data} key={key}/>
//       </>
//     )}
//     {newData && newData.constructor === Array && (
//       <>
//         {newData.map((dataMap, key)=> (
//           <div key={key}>
//             {dataMap?.data && dataMap?.data.constructor === Array ? (
//               <EmployeeRows data={dataMap.data} key={key}/>
//             ): (
//               <div key={key}>
//                 {dataMap && dataMap.constructor === Array && (
//                   <>
//                     <EmployeeRows data={dataMap} key={key}/>
//                   </>
//                 )}
//                 {dataMap.group_id ? (
//                   <>
//                     {dataMap?.data && (
//                       <div className="ms-4 md:ms-8 mt-4">
//                         <div className="grid grid-cols-3">
//                           <div className="col-span-1">
//                             <p>{dataMap.descript}</p>
//                           </div>
//                           <div className="col-span-2">
//                             <p className="font-bold">{dataMap.data}</p>
//                           </div>
//                         </div>
//                         <Separator className='bg-gray-300 my-4'/>
//                       </div>
//                     )}
//                   </>
//                 ) : (
//                   <>
//                     {Object.keys(dataMap).map((objectKey, key2) => (
//                       <div key={key2}>
//                         {dataMap[objectKey].constructor === Object ? (
//                           <EmployeeRows data={dataMap[objectKey]} key={key}/>
//                         ) : (
//                           <div className="ms-4 md:ms-8 mt-4">
//                             <div className="grid grid-cols-3">
//                               <div className="col-span-1">
//                                 <p>{objectKey}</p>
//                               </div>
//                               <div className="col-span-2">
//                                 <p className="font-bold">{dataMap[objectKey]}</p>
//                               </div>
//                             </div>
//                           </div>
//                         )}
//                       </div>
//                     ))}
//                     <Separator className='bg-gray-300 my-4'/>
//                   </>
//                 )}
//               </div>
//             )}
//           </div>
//         ))}
//       </>
//     )}
//   </>
// )