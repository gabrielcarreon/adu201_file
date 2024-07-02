import {Route, Routes} from "react-router-dom";
import App from "@/App.jsx";
import UserApplicationPage from "@/pages/User/UserApplicationPage.jsx";
import React from "react";
import PendingApplicationPage from "@/pages/PendingApplicationPage.jsx";
import {ApplicationProvider} from "@/providers/ApplicationProvider.jsx";

const MultiPath = ({ paths, element }) => {
  return paths.map((path, index) => (
    <Route key={index} path={path} element={element} />
  ));
}

const CustomRoutes = ({ }) => {
  return (
    <Routes>
      {MultiPath({
        paths: ["/", "/home", ""],
        element: <App/>
      })}
      <Route path="/applications" element={<ApplicationProvider><UserApplicationPage/></ApplicationProvider>}></Route>
      <Route path="/pending" element={<ApplicationProvider><PendingApplicationPage/></ApplicationProvider>}></Route>
    </Routes>
  )
}


export default CustomRoutes