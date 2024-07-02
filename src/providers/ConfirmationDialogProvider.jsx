import {createContext, useContext, useState} from "react";

const ConfirmationDialogContext = createContext()

export const useConfirmDialog = () => useContext(ConfirmationDialogContext)

export const ConfirmationDialogProvider = ({children}) => {
    const [confirmState, setConfirmState] = useState(false)
    const [confirmData, setConfirmData] = useState({})
    return (
        <ConfirmationDialogContext.Provider value={{ confirmData, setConfirmData, confirmState, setConfirmState }}>
            {children}
        </ConfirmationDialogContext.Provider>
    )
}