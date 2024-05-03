import {useTheme} from "@/lib/ThemeProvider.tsx";
import {useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import {SunIcon, MoonIcon} from "@radix-ui/react-icons";

const DarkModeButton = () => {
  const { setTheme } = useTheme()
  const [ darkMode, setDarkMode ] = useState(false)

  return (
    <Button className="z-20 hover:bg-gray-100 absolute right-0 top-0 m-4 bg-white text-zinc-900" onClick={() => {
      setTheme(darkMode ? 'light' : 'dark')
      setDarkMode(!darkMode)
    }}>
      {darkMode ? <SunIcon /> : <MoonIcon />}
    </Button>
  )
}

export default DarkModeButton