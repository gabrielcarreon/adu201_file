import React, {createContext, useCallback, useContext, useState} from 'react'

const FileContext = createContext()

export const useFile = () => useContext(FileContext)

export const FileProvider = ({ children }) => {
  const [fileStates, setFileStates] = useState({});

  const resetFiles = useCallback(() => {
    setFileStates({});
  }, []);

  const updateFiles = useCallback((key, files) => {
    setFileStates(prevStates => ({
      ...prevStates,
      [key]: files
    }));
  }, []);
  // const updateFiles = (key, files) => {
  //   setFileStates(prevStates => ({
  //     ...prevStates,
  //     [key]: files
  //   }));
  // };

  return (
    <FileContext.Provider value={{ fileStates, updateFiles, resetFiles }}>
      {children}
    </FileContext.Provider>
  );
}
