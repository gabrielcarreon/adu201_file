import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import instance from "@/inc/axios_config.ts";
import {toast} from "@/components/ui/use-toast.ts";
import EmployeeDetails from "@/pages/User/EmployeeDetails.tsx";

const ApplicationPage = ({ states }) => {
  const [response, setResponse] = useState(false)
  const [error, setError] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState<[]>([])
  console.log(selectedGroup)
  // const form = useForm({
  //   mode: "onChange",
  //   defaultValues: {
  //     selected: []
  //   }
  // })

  useEffect(() => {
    const personalInfo = async () => await instance.get('/?api=201.info')

    personalInfo().then((apiResponse) => {
      const data = apiResponse.data.message
      setResponse(data)
      console.log(response)
    }).catch((error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
      setError(!error)
    })
  }, [error]);

  return (
    <div className="flex flex-col gap-2">
      {response ? (
        <form>
          {Object.keys(response).map((entry, key) => {
            return (
              <Card key={key} className="mb-2">
                <CardHeader>
                  <CardTitle>{response[entry].name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <EmployeeDetails states={{
                    selectionState: states?.selectionState,
                    setSelectedGroup: setSelectedGroup,
                    selectedGroup: selectedGroup
                  }}
                  keyNumber={`${key}_${Date.now()}`}
                  response={response[entry]}/>
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