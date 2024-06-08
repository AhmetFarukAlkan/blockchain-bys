import React from 'react';
import {useModal} from '../Hooks/useSlices';
import modalRoute from '../Routes/modalRoute';

const ModalProvider = () => {
  const openedModals = useModal();

  const renderModal = ({item, index}) => {
    const modal = modalRoute.find((modal) => item.name === modal.name);

    if (modal) {
      return React.createElement(modal.component, {
        ...openedModals.modals.find((item) => item.name === modal.name),
        key: index
      });
    }
  };

  return <>{openedModals.modals.map((item, index) => renderModal({item, index}))}</>;
};

export default ModalProvider;
