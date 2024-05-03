import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { CustomRouter } from "./inc/Router.tsx";
import routes from './routes.tsx'
import {ThemeProvider} from "@/lib/ThemeProvider.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
        {/* @ts-ignore*/}
        <CustomRouter routes={routes}/>
    </ThemeProvider>
  </React.StrictMode>,
)
