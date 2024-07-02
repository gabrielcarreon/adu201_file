import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import {toast} from "@/components/ui";
import {global} from "@/inc/global.ts";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function ucwords(input :string){
  return input.toLowerCase().replace(/\b[a-z]/g, (letter) => {
    return letter.toUpperCase()
  })
}

export function getAvatar({ id, accessLvl}){
  return `https://learn.adamson.edu.ph/primarypicavatar/getuserimg.php?x=${id}_${accessLvl}`
}

export function colorCodeStatus(value: string){
  let className: string
  switch (value){
    case 'pending':
      className = 'bg-yellow-600'
      break
    case 'done':
      className = 'bg-green-600'
      break
    case 'cancelled':
    case 'declined':
      className = 'bg-red-600'
      break
  }

  return {
    style: className
  }
}

export function handleErrors(error: { response: { data: { errors: string | never[]; }; }; }, title: string){
  try{
    const errorLength = error.response.data.errors.length

      if(error.response.data.errors[0] === 'Session expired.'){
        setTimeout(() => {
          window.location.href = global.appUrl
        }, 2000)
      }
    toast({
      variant: "destructive",
      description: `${error.response.data.errors[0]} ${errorLength > 1 ? `and ${errorLength - 1} other error ${errorLength - 1 !== 1 ? 's' : ''}` : ''}`,
      title: title
    })
  }catch(error){
    toast({
      variant: "destructive",
      description: `Something went wrong`,
      title: title
    })
  }

}