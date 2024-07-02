import {createContext, useContext, useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import instance from "@/inc/axios_config.ts";
import {handleErrors} from "@/lib/utils.ts";
import path from "path";
import {useNotification} from "@/providers/NotificationProvider.jsx";

const ApplicationProviderContext = createContext()
export const useApplication = () => useContext(ApplicationProviderContext)
export const ApplicationProvider = ({ children }) => {
  const [data, setData] = useState([])
  const [pending, setPending] = useState([])
  const [dtLoading, setDtLoading] = useState(true)
  const { pathname } = useLocation()
  const [render, setRender] = useState(false)
  
  useEffect(() => {
    if(pathname === '/pending'){
        setTimeout(() => {
          updateData()
          setRender(!render)
        }, 3000)
    }
  }, [render])
  
  useEffect(() => {
    updateData()
    setRender(!render)
  }, [pathname]);
  
  const updateData = async () => {
    try{
      setDtLoading(true)
      const response = await instance.get(`/?api=201.applications&user=${pathname === '/pending' ? '0' : '1'}`)
      
      if(pathname === '/applications'){
        setData(response.data.applications)
      }else{
        if(JSON.stringify(pending) !== JSON.stringify(response.data.applications)){
          setPending(response.data.applications)
        }
      }
      setDtLoading(false)
      
    }catch (error){
      handleErrors(error, "Cannot retrieve applications")
      setDtLoading(false)
    }
  }
  
  
  return (
    <ApplicationProviderContext.Provider value={{ data, setData, dtLoading, setDtLoading, pending, setPending, updateData }}>
      {children}
    </ApplicationProviderContext.Provider>
  )
}