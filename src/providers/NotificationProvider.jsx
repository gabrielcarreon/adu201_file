import {createContext, useContext, useEffect, useState} from "react";

const NotificationContext = createContext()
export const useNotification = () => useContext(NotificationContext)
export const NotificationProvider = ({ children }) => {
  const [notifCount, setNotifCount] = useState(0)
  // onfocus = () => {
  //   setNotifCount(0)
  // }
  //
  useEffect(() => {
    document.title = `${notifCount > 0 ? `(${notifCount})` : ''} Adamson University - 201 File`
  }, [notifCount]);
  return (
    <NotificationContext.Provider value={{ setNotifCount, notifCount }}>
      {children}
    </NotificationContext.Provider>
  )
}