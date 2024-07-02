import DarkModeButton from "@/components/custom/DarkModeButton.jsx";
import {useAuth} from "@/providers/AuthProvider.jsx";
import {Link, useLocation} from "react-router-dom"
import {cn} from "@/lib/utils.ts";
import {Button} from "@/components/ui";
import {RowsIcon} from "@radix-ui/react-icons";
import {useState} from "react";
const Navbar = ({ }) => {
  const { auth } = useAuth()
  const { pathname } = useLocation()
  const [ toggleNav, setToggleNav ] = useState(false)
  return (
    <nav>
      <div className="bg-blue-950 w-screen h-[68px] justify-center flex items-center">
        <div className="flex justify-between w-full mx-4 md:mx-8 items-center">
          <p className="text-center text-base md:text-2xl font-bold text-white">Adamson University</p>
          <div className="text-sm hidden md:flex items-center gap-2">
            {auth.user_access !== '' && (
              <>
                <Link
                  to={'/home'}
                  className={cn(
                    "cursor-pointer p-2 bg-blue-950 hover:bg-blue-900 rounded-md text-white hover:text-gray-200 transition-all duration-300",
                    pathname === '/home' || pathname === '/' ? 'disabled bg-blue-900' : null
                  )}
                >Home</Link>
                <Link
                  to={'/applications'}
                  className={cn(
                    "cursor-pointer p-2 bg-blue-950 hover:bg-blue-900 rounded-md text-white hover:text-gray-200 transition-all duration-300",
                    pathname === '/applications' ? 'disabled bg-blue-900' : null
                  )}>My applications</Link>
                {auth.user_access === 'hr' && (
                  <Link
                    to={'/pending'}
                    className={cn(
                      "cursor-pointer p-2 bg-blue-950 hover:bg-blue-900 rounded-md text-white hover:text-gray-200 transition-all duration-300",
                      pathname === '/pending' ? 'disabled bg-blue-900' : null
                    )}
                  >Applications</Link>
                )}
              </>
            )}
            <DarkModeButton/>
          </div>
          <div className=" md:hidden">
            <Button
              className="bg-blue-900 rounded-sm hover:bg-blue-950"
              onClick={()=>setToggleNav(!toggleNav)}
            >
              <RowsIcon className="text-white"/>
            </Button>
          </div>
        </div>
      
      </div>
      <div className={cn("transition-all duration-300 bg-white h-0 overflow-hidden border-gray-300 border", toggleNav ? 'h-36' : 'h-0')}>
        <div className="p-2">
          {auth.user_access !== '' && (
            <>
              <Link
                to={'/home'}
                className={cn(
                  "px-4 rounded-md block w-full cursor-pointer p-2 text-zinc-900 transition-all duration-300",
                  pathname === '/home' || pathname === '/' ? 'text-white disabled bg-blue-900' : 'hover:bg-blue-100 hover:text-zinc-900'
                )}
              >Home</Link>
              <Link
                to={'/applications'}
                className={cn(
                  "px-4 rounded-md block w-full cursor-pointer p-2 text-zinc-900 transition-all duration-300",
                  pathname === '/applications' ? 'text-white disabled bg-blue-900' : 'hover:bg-blue-100 hover:text-zinc-900'
                )}>My applications</Link>
              {auth.user_access === 'hr' && (
                <Link
                  to={'/pending'}
                  className={cn(
                    "px-4 rounded-md block w-full hover:bg-blue-100 hover:text-zinc-900 cursor-pointer p-2 text-zinc-900 transition-all duration-300",
                    pathname === '/pending' ? 'text-white disabled bg-blue-900' : null
                  )}
                >Applications</Link>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar