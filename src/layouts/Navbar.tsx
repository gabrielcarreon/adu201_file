import DarkModeButton from "@/components/custom/DarkModeButton.tsx";

const Navbar = () => {

  return (
    <div className="bg-blue-950 w-screen h-[68px] justify-center flex items-center">
      <div className="flex justify-between w-full mx-8 items-center">
        <p className="text-center text-2xl font-bold text-white">Adamson University</p>
        <DarkModeButton/>
      </div>
    </div>
  )
}

export default Navbar