import {Card, CardDescription, CardHeader, CardTitle, Avatar, AvatarFallback, AvatarImage} from "@/components/ui";
import React from "react";
import {useAuth} from "@/providers/AuthProvider.jsx";
import Skeleton from "react-loading-skeleton";

const Welcome = ({ children } ) => {
  const { auth } = useAuth()
  return (
    <>
      <Card className="w-full dark:bg-gray-900">
        <CardHeader>
          <CardTitle>Welcome back!</CardTitle>
          <div className="block md:flex pt-2 justify-between">
            <div className="flex">
              {auth.email === '' ? (
                <Skeleton height="45px" width="45px" className="!rounded-full"></Skeleton>
              ) : (
                <>
                <Avatar>
                    <AvatarImage src={auth?.image_url} />
                </Avatar>
                </>
              )}
              <CardDescription className="ml-4 w-full">
                {auth.email === '' ? (
                  <>
                    <Skeleton height={16} width="300px"/>
                    <Skeleton height={16} width="80%"/>
                  </>
                ) : (
                  <>
                    <span
                      className="block text-zinc-900 dark:text-white font-semibold">{auth?.lname}, {auth?.fname}</span>
                    <span className="block text-sm">{auth?.email}</span>
                  </>
                )}
              </CardDescription>
            </div>
            <div className="mt-4 md:mt-0 flex md:block justify-center">
            {children}
            </div>
          </div>
        </CardHeader>
      </Card>
    </>
  )
}
export default Welcome