import React, {useEffect, useState} from 'react';
import Toastify from 'toastify-js';
import {useDeleteFileMutation} from '../../../../Api/Services/FileService/fileService';
import useConfirm from '../../../../Hooks/useConfirmHook';
import {useMain} from '../../../../Hooks/useSlices';
import BaseView from '../../../common/base-view/BaseView';
import OutlineRed from '../../../common/button/OutlineRed';
import {Modal} from 'react-bootstrap';

const ShowFiles = (props) => {
  const {
    files = [],
    deleteAction = false,
    userControl = true,
    invalidatesTags = {},
    className,
    request
  } = props;

  const {user} = useMain();

  const [showingFiles, setShowingFiles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    setShowingFiles(files);
  }, [files]);

  const {isConfirmed} = useConfirm();

  const handleDeleteFile = async (fileId) => {
    const confirmed = await isConfirmed('Dosyayı silmek istediğinizden emin misiniz?');
    if (confirmed) {
      request({id: fileId, invalidatesTags}).unwrap().then(r => {
        setShowingFiles(prevState => {
          return prevState.filter((item) => item.id !== fileId);
        });

        Toastify({
          text: 'Dosya başarılı bir şekilde silindi',
          duration: 2000,
          newWindow: true,
          close: true,
          backgroundColor: 'linear-gradient(to right, #37ecba, #72afd3)',
          stopOnFocus: true
        }).showToast();
      });
    }
  };

  return (
    <BaseView className={className}>
      {showingFiles.length > 0 && showingFiles.map((file, index) => {
        return (
          <div className="pb-2 inline-block mr-4" key={index}>
            {file.extension === 'jpg'
             || file.extension === 'png'
             || file.extension === 'svg'
             ? <img src={file.url} alt={file.name} width="100px" height="100px" onClick={() => {setShowModal(true); setSelectedImage(file.url)}}/>
             : <a href={file.url} download target="_blank" rel="noopener noreferrer">
               {file.name}
             </a>
            }
            <br/>
            {
              deleteAction && (!userControl || user.id === file.creator_id)
              ? <div className="text-center mt-2">
                <OutlineRed label={'sil'} className="ml-2" icon={'trash'} onClick={() => handleDeleteFile(file.id)}/>
              </div>
              : ''
            }
          </div>
        );
      })}
      <Modal show={showModal} size="xl" onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Görsel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={selectedImage} alt="Selected Image"/>
        </Modal.Body>
      </Modal>
    </BaseView>
  );
};

export default ShowFiles;
