import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {ThemeProvider} from "@/providers/ThemeProvider.jsx";
import {FileProvider} from "@/providers/FileProvider.jsx";
import {AuthProvider} from "@/providers/AuthProvider.jsx";
import {ConfirmationDialogProvider} from "@/providers/ConfirmationDialogProvider.jsx";
import {Toaster} from "@/components/ui/toaster.tsx"
import {ConfirmationDialog} from "@/components/custom/index.js"
import {HashRouter as Router, Route, Routes} from 'react-router-dom';
import CustomRoutes from "@/inc/Routes.jsx";
import {NotificationProvider} from "@/providers/NotificationProvider.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <AuthProvider>
          <ThemeProvider>
              <FileProvider>
                  <ConfirmationDialogProvider>
                    <NotificationProvider>
                      <Router>
                        <CustomRoutes/>
                      </Router>
                    </NotificationProvider>
                    
                    {/*<RouteProvider/>*/}
                    <Toaster duration={2000}/>
                    <ConfirmationDialog />
                  </ConfirmationDialogProvider>
              </FileProvider>
          </ThemeProvider>
      </AuthProvider>
  </React.StrictMode>,
)
