import {useTheme} from "@/providers";
import {useState} from "react";
import {Button} from "@/components/ui";
import {SunIcon, MoonIcon} from "@radix-ui/react-icons";

const DarkModeButton = () => {
  const { theme, setTheme } = useTheme()
  const [ darkMode, setDarkMode ] = useState(theme === 'dark')
  return (
    <Button className="z-20 hover:bg-gray-100 my-4 bg-white text-zinc-900" onClick={() => {
      setTheme(darkMode ? 'light' : 'dark')
      setDarkMode(!darkMode)
    }}>
      {darkMode ? <SunIcon /> : <MoonIcon />}
    </Button>
  )
}

export default DarkModeButton