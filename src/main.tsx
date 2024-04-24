import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { CustomRouter } from "./inc/Router.tsx";
import routes from './routes.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CustomRouter routes={routes}/>
  </React.StrictMode>,
)
