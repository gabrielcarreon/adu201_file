import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import React from "react";

interface Data{
  fname:string,
  lname:string,
  email:string,
  image_url:string
}
const Welcome = ({ data, children }: {data: Data, children: React.ReactNode}) => {

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Welcome back!</CardTitle>
          <div className="flex pt-2 justify-between">
            <div className="flex">
              <Avatar>
                <AvatarImage src={data?.image_url} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <CardDescription className="ml-4">

                <span className="block text-zinc-900 dark:text-white font-semibold">{data?.lname}, {data?.fname}</span>
                <span className="block text-sm">{data?.email}</span>
              </CardDescription>
            </div>
            {children}
          </div>
        </CardHeader>
      </Card>
    </>
  )
}
export default Welcome