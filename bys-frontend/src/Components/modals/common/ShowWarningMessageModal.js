import React from 'react';
import BaseModal from '../../common/base-modal/BaseModal';
import BaseText from '../../common/base-text/BaseText';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ShowWarningMessageModal = ({props}) => {
  const { title = 'Uyarı', body, buttons } = props;

  const modalProps = {
    header: {
      title: title,
      icon: 'cross'
    },
    isCancellable: true,
    buttons: buttons,
  };

  return (
    <BaseModal {...modalProps} >
      <FontAwesomeIcon
        icon={'fa-solid fa-circle-info'}
        size="xl"
        color={'orange'}
        className={'mr-2'}
      />
      <BaseText text={body}/>
    </BaseModal>
  );
};

export default ShowWarningMessageModal;
