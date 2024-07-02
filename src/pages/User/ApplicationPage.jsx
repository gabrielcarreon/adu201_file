import React, {useEffect, useState} from "react";
import instance from "@/inc/axios_config.ts";
import EmployeeDetails from "@/pages/User/EmployeeDetails.jsx";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import {Accordion, AccordionItem, toast, Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import {handleErrors} from "@/lib/utils.ts";

const ApplicationPage = ({ states }) => {
  const [error, setError] = useState(false)


  useEffect( () => {
     (async () => {
      try{
        const apiResponse = await instance.get('/?api=201.info')
        const data = apiResponse.data.message
        states?.setResponse(data)
      }catch (error){
        handleErrors(error, "Failed")
        setError(!error)
      }
    })()
  }, [error]);

  return (
    <div className="flex flex-col gap-2">
      {states?.response ? (
        <form>
          {Object.keys(states?.response).map((entry, key) => {
            return (
              <Card key={key} className="mb-2 dark:bg-gray-900">
                <CardHeader>
                  <CardTitle>{states?.response[entry].name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <EmployeeDetails states={{
                    selectionState: states?.selectionState,
                    setSelectedGroup: states?.setSelectedGroup,
                    selectedGroup: states?.selectedGroup
                  }}
                  keyNumber={`${key}_${Date.now()}`}
                  response={states?.response[entry]}/>
                </CardContent>
              </Card>
            )
          })}
        </form>
        )
        : (
          <>
            <Card>
              <CardHeader>
                <CardTitle>
                  <Skeleton height={24} width="30%"/>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1" className="my-2">
                    <Skeleton height={48} width="80%"/>
                  </AccordionItem>
                  <AccordionItem value="item-1" className="my-2">
                    <Skeleton height={64} width="50%"/>
                  </AccordionItem>
                  <AccordionItem value="item-1" className="my-2">
                    <Skeleton height={24} width="100%"/>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>
                  <Skeleton height={24} width="30%"/>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1" className="my-2">
                    <Skeleton height={64} width="100%"/>
                  </AccordionItem>
                  <AccordionItem value="item-1" className="my-2">
                    <Skeleton height={48} width="30%"/>
                  </AccordionItem>
                  <AccordionItem value="item-1" className="my-2">
                    <Skeleton height={24} width="60%"/>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </>
        )}
    </div>
  )
}

export default ApplicationPage