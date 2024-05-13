import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import React, {useEffect, useState} from "react";
import instance from "@/inc/axios_config.ts";
import {toast} from "@/components/ui/use-toast.ts";
import EmployeeDetails from "@/pages/User/EmployeeDetails.tsx";

const ApplicationPage = ({ states }) => {
  // const [response, setResponse] = useState(false)
  // const [selectedGroup, setSelectedGroup] = useState<[]>([])
  const [error, setError] = useState(false)


  useEffect(() => {
    const personalInfo = async () => await instance.get('/?api=201.info')

    personalInfo().then((apiResponse) => {
      const data = apiResponse.data.message
      states?.setResponse(data)
    }).catch((error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
      setError(!error)
    })
  }, [error]);

  // React.useImperativeHandle(ref, () => ({
  //   selectedGroup, response
  // }))


  return (
    <div className="flex flex-col gap-2">
      {states?.response ? (
        <form>
          {Object.keys(states?.response).map((entry, key) => {
            return (
              <Card key={key} className="mb-2">
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
          <> Loading</>
        )}
    </div>
  )
}

export default ApplicationPage