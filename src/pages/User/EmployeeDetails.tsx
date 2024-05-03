import {Checkbox} from "@/components/ui/checkbox.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion.tsx";

const EmployeeDetails = (
  // { keyNumber, field, states }: { keyNumber :number, field: object, states: object}
  {response, states, keyNumber} : { response: object, states: object, keyNumber: string | number}
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
                 <EmployeeDetails
                    response={response.sub_groups[sub_group]}
                    states={{
                      selectionState: states?.selectionState,
                      setSelectedGroup: states?.setSelectedGroup,
                      selectedGroup: states?.selectedGroup
                    }}
                    keyNumber={key}/>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )
        })}
      </>
    ) : (
      <div key={keyNumber}>
        {response.data.length > 0 && (
          <>
            {response.data.map((data, key) => {
              if(data.constructor === Array){
                return (
                  <div key={key}></div>
                )
              }else if(data.constructor === Object){
                return (
                  <EmployeeDetails
                    response={data}   states={{
                    selectionState: states?.selectionState,
                    setSelectedGroup: states?.setSelectedGroup,
                    selectedGroup: states?.selectedGroup
                  }}
                  keyNumber={key}/>
                )
              }else{
                return (
                  <div className="ms-4 md:ms-8 mt-4" key={key}>
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
              }
            })}
          </>
        )}
      </div>
    )}
  </>
)
export default EmployeeDetails


// {response.constructor === Object ? (
//   <>{Object.keys(response).map((data, key) => (
//     <div key={key}>
//       {data !== "NG" ? (
//         <Accordion className="md:ps-4 mb-1" type="single" collapsible key={key}>
//           <AccordionItem value={data}>
//             <div className="flex items-center gap-2">
//               <Checkbox
//                 onCheckedChange={(checkedState) => {
//                   checkedState
//                     ? states?.setSelectedGroup([...states?.selectedGroup, response[data].sub_group])
//                     : states?.setSelectedGroup(removeValue => {return removeValue.filter(selected => selected !== response[data].sub_group)})
//                 }}
//                 defaultValue={response[data].sub_group}
//                 value={response[data].sub_group}
//                 className={`${states?.selectionState ? `opacity-100` : `opacity-0 w-0`} transition-all focus-visible:ring-primary !focus-visible:outline-primary`} id={`checkbox-${key}`}/>
//
//               {/*{states?.selectionState && (*/}
//               {/*)}*/}
//               <AccordionTrigger className="px-4 font-semibold bg-blue-50 dark:bg-transparent dark:border-blue-900 border-blue-200 focus-visible:ring-primary focus-visible:ring-1">{data}</AccordionTrigger>
//
//             </div>
//             <AccordionContent>
//               {response[data].constructor === Object ? (
//                 <>
//                   {response[data]['data'].length > 0 ? (
//                     <EmployeeDetails states={{ selectionState: states?.selectionState}} response={response[data]['data']}/>
//                   ) : (  <p className="text-center mt-4 font-bold">No entry</p> )}
//                 </>
//               ) : (
//                 <>
//                   {response[data].length > 0 ? (
//                     <EmployeeDetails states={{ selectionState: states?.selectionState}} response={response[data]}/>
//                   ) : (  <p className="text-center mt-4 font-bold">No entry</p> )}
//                 </>
//               )}
//               {/*{response[data].length > 0 ? (*/}
//               {/*  <EmployeeDetails states={{ selectionState: states?.selectionState}} response={response[data]}/>*/}
//               {/*) : (  <p className="text-center mt-4 font-bold">No entry</p> )}*/}
//             </AccordionContent>
//           </AccordionItem>
//         </Accordion>
//       ) : (
//         <div>
//           <EmployeeDetails states={{ selectionState: states?.selectionState}} response={response[data].data}/>
//         </div>
//       )}
//     </div>
//   ))}</>
// ): (
//   <>
//     {response.map((data: object,key: number) => {
//       const timestamp = Date.now()
//       return (
//         <div key={key} className="mt-4">
//           {data.descript ? (
//             <div className="ms-4 md:ms-8 grid grid-cols-1 md:grid-cols-3 ">
//               <div className="flex items-center space-x-2 col-span-1">
//                 {/*{states?.selectionState && (*/}
//                 {/*  <Checkbox className="transition-all focus-visible:ring-primary !focus-visible:outline-primary" id={`checkbox-${key}_${timestamp}`}/>*/}
//                 {/*)}*/}
//                 <div className="grid gap-1.5 leading-none">
//                   <label
//                     htmlFor={`checkbox-${key}_${timestamp}`}
//                     className="flex items-center text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//                   >
//                     {data.descript} :
//                   </label>
//                 </div>
//
//               </div>
//               <div className="col-span-2">
//                 {data.data?.constructor === Array ? (
//                   <div>
//                     {data.data.length > 0 && (
//                       <>
//                         {data.data.map((dataField, key2) => {
//                           return (
//                             <div key={key2}>
//                               <p className="font-bold my-2 text-sm">{dataField.name}</p>
//                             </div>
//                           )
//                         })}
//                       </>
//                     )}
//                   </div>
//                 ) : (
//                   <div>
//                     <span className="font-bold my-2 text-sm">{data.data}</span>
//                   </div>
//                 )}
//               </div>
//             </div>
//           ) : (
//             <div className="ms-4 md:ms-8">
//               {Object.keys(data).map((soloData, key3) => (
//                 <div className="grid grid-cols-1 md:grid-cols-3" key={key3}>
//                   <div className="col-span-1">
//                     <p className="text-sm">{soloData}</p>
//                   </div>
//                   <div className="col-span-2">
//                     <p className="font-bold text-sm">{data[soloData]}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//           <Separator className="dark:bg-blue-800 bg-gray-300 my-4"/>
//         </div>
//       )
//     })}
//   </>
// )}