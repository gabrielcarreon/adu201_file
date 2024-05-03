
interface Routes {
   [key: string]: {
    element: JSX.Element
  }
}
const CustomRouter = ( { routes } : Routes) : JSX.Element | void => {
  if(location.search.match( /\\?api=(.+)/)){
    return
  }
  const currentRoute : string[] | null = location.search.match( /\\?page=(.+)/)

  // @ts-ignore
  return routes[currentRoute?.[1] ?? '/']
}

export { CustomRouter }