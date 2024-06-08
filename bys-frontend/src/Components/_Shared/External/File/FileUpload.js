import React, {useState} from 'react';
import {FilePond, registerPlugin} from 'react-filepond';
import {BACKEND_URL} from '../../../../Constants/backendUrlConstants';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond/dist/filepond.min.css'
registerPlugin(FilePondPluginImagePreview)

const FileUpload = (props) => {

  const {
    filePath,
    files,
    setFiles
  } = props;

  const token = localStorage.getItem('access_token');

  return (
    <>
      <FilePond
        files={files}
        allowMultiple={true}
        onupdatefiles={setFiles}
        instantUpload={false}
        labelIdle='Sürükle bırak yaparak veya <span className="filepond--label-action">buraya tıklayarak</span> dosya veya görsel ekleyebilirsiniz.'
        server={{
          url: process.env.REACT_APP_BASE_URL,
          timeout: 30000,
          process: {
            url: BACKEND_URL.FILE + BACKEND_URL.UPLOAD + '?path=' + filePath,
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Access-Control-Allow-Credentials': true
            },
            onload: (response) => JSON.parse(response),
            onerror: (response) => response.data
          },
          revert: {
            url: BACKEND_URL.FILE + BACKEND_URL.DELETE,
            headers: {
              'Authorization': `Bearer ${token}`,
              'Access-Control-Allow-Credentials': true
            }
          }
        }}
      />
    </>
  );
};

export default FileUpload;
