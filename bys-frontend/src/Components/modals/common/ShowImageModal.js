import React from 'react';
import BaseModal from '../../common/base-modal/BaseModal';
import BaseView from '../../common/base-view/BaseView';

const ShowImageModal = ({props}) => {
  const { src } = props;

  const modalProps = {
    header: {
      title: 'Görsel',
      icon: 'cross'
    },
    isCancellable: true,
    fullScreen: true
  };

  return (
    <BaseModal {...modalProps} >
        <BaseView className={'flex justify-center'}>
          <img src={src} alt="Modal Image"/>
        </BaseView>
    </BaseModal>
  );
};

export default ShowImageModal;
