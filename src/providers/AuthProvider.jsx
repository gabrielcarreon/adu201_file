import {createContext, useContext, useEffect, useMemo, useState} from "react";
import instance from "@/inc/axios_config.ts";
import {toast} from "@/components/ui/use-toast.ts";
import {global} from "@/inc/global.ts";
import {getAvatar, handleErrors} from "@/lib/utils.ts";

const AuthContext = createContext()
export const useAuth = () => useContext(AuthContext)
export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        fname: '',
        mname: '',
        lname: '',
        email: '',
        _csrf_token: '',
        emp_no: '',
        image_url: '',
        user_access: '',
    })
    useMemo(() => {
        
        (async () => {
            try{
                const { data: { message: sessionToken }} =  await instance.get('?api=session.create')
                const { data: { message: { user_info, access_info } }} = await instance.get('?api=session')
                setAuth({
                    ...auth,
                    email: user_info[0]?.adamsonmail,
                    fname: user_info[0]?.fname,
                    mname: user_info[0]?.mname,
                    emp_no: user_info[0]?.mname,
                    lname: user_info[0]?.lname,
                    _csrf_token: sessionToken,
                    image_url: getAvatar({ id: user_info[0]?.id, accessLvl: 2}),
                    user_access: access_info
                })
            }catch (error){
            
            }
            
        })()
    }, [])
    
    useEffect(() => {
        setInterval(async () => {
            try{
                await instance.get('?api=session.check')
            }catch (error){
                handleErrors(error, "Session expired.")
                setTimeout(() => {
                    window.location.href = global.appUrl
                }, 2000)
            }
        }, 30000)
    }, []);
    return(
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}