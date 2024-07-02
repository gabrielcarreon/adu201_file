import {PuffLoader} from "react-spinners";

export const CustomPuffLoader = ({ state, text }) => {
  return (
   <>
     {state ?
       <PuffLoader
         color="#36d7b7"
         size={50}
         aria-label="Loading Spinner"
         data-testid="loader" /> :
       text}
   </>
  )
}