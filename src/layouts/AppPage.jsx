import {Navbar} from "@/layouts/index.js";
import {ApplicationContent, CustomDialog, DataTable, Welcome} from "@/components/custom/index.js";
import {FileViewerProvider} from "@/providers/FileViewerProvider.jsx";
import React from "react";
import {useApplication} from "@/providers/ApplicationProvider.jsx";
import {useLocation} from "react-router-dom";

export const AppPage = ({ states, dataTable, appContent }) => {
  const { data, setData, dtLoading, setDtLoading, pending, setPending } = useApplication()
  const { pathname } = useLocation()
  const dataTableData = pathname === '/pending' ? pending: data
  return (
    <div className="overflow-x-hidden">
      <div>
        <Navbar/>
      </div>
      <div className="m-4 mx-4 md:mx-20">
        <Welcome/>
        <div className="mt-2">
          <DataTable
            columnData={dataTable?.columns}
            states={{
              loading: dtLoading
            }}
            data={dataTableData}
            properties={{
              filterId: "ctrl_no",
              filterPlaceholder: "Search by transaction number"
            }}
          />
        </div>
      </div>
      {states?.dialogOpen && (
        <CustomDialog
          states={{
            dialogOpen: states?.dialogOpen,
            setDialogOpen: states?.setDialogOpen,
          }}
          data={{
            title: `#${appContent?.applicationData?.app_info.ctrl_no}`
          }}
          styles={{
            dialogContent: "max-w-7xl"
          }}>
          <FileViewerProvider>
            <ApplicationContent
              data={appContent?.applicationData}
              states={{
                setDialogOpen: states?.setDialogOpen,
                setApplicationData: states?.setApplicationData,
                dataTable: dataTable?.data,
                setDataTableData: states?.setData
              }}/>
          </FileViewerProvider>
        </CustomDialog>
      )}
    </div>
  )
}