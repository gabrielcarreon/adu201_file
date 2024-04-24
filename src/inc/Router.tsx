
interface Routes {
   [key: string]: {
    element: JSX.Element
  }
}
const CustomRouter = ( { routes } : Routes) : JSX.Element => {
  const currentRoute : string[] | null = location.search.match( /\\?page=(.+)/)
  return routes[currentRoute?.[1] ?? '/']
}

export { CustomRouter }