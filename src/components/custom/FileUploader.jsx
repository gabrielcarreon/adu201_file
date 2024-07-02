import React, { useEffect } from 'react'
import { FilePond, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import { useFile } from "@/providers/FileProvider.jsx"
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginValidateType from 'filepond-plugin-file-validate-type'

registerPlugin(FilePondPluginImagePreview)
registerPlugin(FilePondPluginValidateType)
const FileUploader = ({ id, options }) => {
  const { fileStates, updateFiles } = useFile()

  const handleUpdateFiles = (fileItems) => {
    updateFiles(id, fileItems.map(fileItem => fileItem.file));
  }

  useEffect(() => {
    if (!fileStates[id]) {
      updateFiles(id, []);
    }
  }, [id, fileStates, updateFiles]);

  return (
    <FilePond
      allowFileTypeValidation={true}
      fileValidateTypeLabelExpectedTypes={'Only {allTypes} file types are allowed.'}
      acceptedFileTypes={options?.fileTypes}
      files={fileStates[id] || []}
      onupdatefiles={handleUpdateFiles}
      allowMultiple={true}
      name={`files[${id}]`}
    />
  )
};

export default FileUploader;
